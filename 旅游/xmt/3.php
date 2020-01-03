<?php
@session_start();
function mPrintX($val, $dqh = __LINE__)
{
	echo "<pre>\n当前行：" . $dqh . ' ';
	print_r($val);
	echo  "</pre>";
	exit;
}
function mPrint($val, $dqh = __LINE__)
{
	echo "<pre>\n当前行：" . $dqh . ' ';
	print_r($val);
	echo  "</pre>";
	// exit;
}
function writeLog($data, $page, $h)
{
	return file_put_contents('err.log', '错误页面:' . $page . '	第' . $h . "行\r\n" . print_r($data, true), FILE_APPEND);
}

class WxMaterial
{
	private $appId;
	private $appSecret;
	private function GetFileName($val)
	{
		$a = strrpos($val, '/');
		if (!$a) $a = strrpos($val, '\\');
		return substr($val, $a + 1);
	}
	public function WxMaterial($appId, $appSecret)
	{
		$this->appSecret = $appSecret;
		$this->appId = $appId;
	}
	private function https_request($url, $data = '', $type = "get", $res = "json")
	{
		//1.初始化curl
		$curl = curl_init();
		//2.设置curl的参数
		curl_setopt($curl, CURLOPT_URL, $url);
		curl_setopt($curl, CURLOPT_SSL_VERIFYPEER, FALSE);
		curl_setopt($curl, CURLOPT_SSL_VERIFYHOST, FALSE);
		curl_setopt($curl, CURLOPT_RETURNTRANSFER, 1); //以文件流的形式返回,而不是输出
		if ($type == "post") {
			curl_setopt($curl, CURLOPT_POST, 1);
			if (!isset($data['media'])) $data = json_encode($data, JSON_UNESCAPED_UNICODE);
			// mPrint($data, __LINE__);
			curl_setopt($curl, CURLOPT_POSTFIELDS, $data);
		}
		//3.采集
		$output = curl_exec($curl);
		//4.关闭
		curl_close($curl);
		if ($res == 'json') {
			return json_decode($output, true);
		}
	}
	public function getWxAccessToken()
	{
		if (!isset($_SESSION[$this->appId]) || $_SESSION[$this->appId]['time'] < time()) {
			$url = "https://api.weixin.qq.com/cgi-bin/token?grant_type=client_credential&appid=" . $this->appId . "&secret=" . $this->appSecret;
			$res = $this->https_request($url);
			if (isset($res['errcode'])) {
				// 出错了
				writeLog($res, __FILE__, __LINE__);
				mPrint('获取ID=' . $this->appId . '的token时出错', __FILE__ . __LINE__);
				mPrintX($res);
			}
			//将重新获取到的access_token存到session里
			$_SESSION[$this->appId] = [
				'token' => $res["access_token"],
				'time' => time() + (int) $res['expires_in']
			];
		}
		return $_SESSION[$this->appId]['token'];
	}
	//上传图片素材(该方法只能获取到图片的URL)	 2016-11-3
	public function AddImg($filename)
	{
		if (!file_exists($filename)) return 0;
		$url = "https://api.weixin.qq.com/cgi-bin/media/uploadimg?access_token=";
		$url .= $this->getWxAccessToken();
		// $url .= '&type=image';
		$data = array('media' => new CURLFile($filename, '', $this->GetFileName($filename)));
		$res = $this->https_request($url, $data, 'post');
		return $res;
	}
	public function AddOther($file, $filename = '')
	{
		$url = 'https://api.weixin.qq.com/cgi-bin/material/add_material?access_token=';
		$url .= $this->getWxAccessToken();
		if (!$filename) $filename = $this->GetFileName($file);
		$a = strrpos($file, '.');
		$b = substr($file, $a);
		if (strcasecmp($b, substr($filename, $a))) $filename .= $b;
		$data = array('media' => new CURLFile($file, '', $filename));
		// mPrintX($data);
		$res = $this->https_request($url, $data, 'post');
		return $res;
	}
	public function AddNews($articles) // 传递数据为articles数组
	{
		$data = ["articles" => $articles];
		$url = 'https://api.weixin.qq.com/cgi-bin/material/add_news?access_token=';
		$url .= $this->getWxAccessToken();
		return $this->https_request($url, $data, 'post');
	}
	public function GetMaterial($media_id)
	{
		$url = 'https://api.weixin.qq.com/cgi-bin/material/get_material?access_token=';
		$url .= $this->getWxAccessToken();
		$data = [
			'media_id' => $media_id
		];
		return $this->https_request($url, $data, 'post');
	}
	public function GetMaterialList($type = 'news', $offset = 0, $count = 20)
	{ //图片(image),视频(video),语音(voice),图文(news)
		$url = 'https://api.weixin.qq.com/cgi-bin/material/batchget_material?access_token=';
		$url .= $this->getWxAccessToken();
		$data = [
			'type' => $type,
			'offset' => $offset,
			'count' => $count
		];
		return $this->https_request($url, $data, 'post');
	}
	public function DelMaterial($media_id)
	{
		$url = 'https://api.weixin.qq.com/cgi-bin/material/del_material?access_token=';
		$url .= $this->getWxAccessToken();
		$data = [
			'media_id' => $media_id
		];
		return $this->https_request($url, $data, 'post');
	}
	public function UpMaterial($media_id, $article, $index = 0)
	{
		$data = [
			'media_id' => $media_id,
			"index" => $index, // 要更新的文章在图文消息中的位置(多图文消息时，此字段才有意义),第一篇为0
			"articles" => $article
		];
		$url = 'https://api.weixin.qq.com/cgi-bin/material/update_news?access_token=';
		$url .= $this->getWxAccessToken();
		$res = $this->https_request($url, $data, 'post');
		return $res;
	}
	public function sendTag($media_id, $tag_id = -1)
	{
		$url = 'https://api.weixin.qq.com/cgi-bin/message/mass/sendall?access_token=';
		$url .= $this->getWxAccessToken();
		if ($tag_id > -1) {
			$filter = ['is_to_all' => false, 'tag_id' => $tag_id];
		} else {
			$filter = ['is_to_all' => true];
		}
		$data = [
			'filter' => $filter,
			'mpnews' => ['media_id' => $media_id],
			'msgtype' => 'mpnews', // 群发的消息类型，图文消息为mpnews，文本消息为text，语音为voice，音乐为music，图片为image，视频为video，卡券为wxcard
			'send_ignore_reprint', 1 // 图文消息被判定为转载时，是否继续群发。 1为继续群发（转载），0为停止群发。 该参数默认为0。
		];
		return $this->https_request($url, $data, 'post');
	}
	public function sendTagImg($media_id, $tag_id = -1)
	{
		$url = 'https://api.weixin.qq.com/cgi-bin/message/mass/sendall?access_token=';
		$url .= $this->getWxAccessToken();
		if ($tag_id > -1) {
			$filter = ['is_to_all' => false, 'tag_id' => $tag_id];
		} else {
			$filter = ['is_to_all' => true];
		}
		$data = [
			'filter' => $filter,
			'image' => ['media_id' => $media_id],
			'msgtype' => 'image', // 群发的消息类型，图文消息为mpnews，文本消息为text，语音为voice，音乐为music，图片为image，视频为video，卡券为wxcard
			'send_ignore_reprint', 1 // 图文消息被判定为转载时，是否继续群发。 1为继续群发（转载），0为停止群发。 该参数默认为0。
		];
		return $this->https_request($url, $data, 'post');
	}
}
// echo '<img src=/pic/0.jpg>';
// return;
define('article', [
	"title" => '标题',
	"thumb_media_id" => '',
	"author" => '作者',
	"digest" => '',
	"show_cover_pic" => true,
	"content" => 'html内容',
	"content_source_url" => 'http://www.qq.com',
]);

if (false) {
	$appId = "wx203cc77c39552399";
	$appSecret = "0991faf68a043f26267a3a18a8f8e9dc";
} else {
	$appId = "wx7aa0284f2f02eabc";
	$appSecret = "96467e7a8cda26551940c65b7785a3d3";
}
$t = new WxMaterial($appId, $appSecret);
// mPrint($t->AddOther($_SERVER['DOCUMENT_ROOT'] . '/pic/loginbeach.jpg'));
$d=[article];
$d[0]['thumb_media_id']= 'KEVS0Mk2aMS8PjsQbbe9sob0z3tANtHPfVd';
mPrint($t->sendTagImg('KEVS0Mk2aMS8PjsQbbe9sob0z3tANtHPfVd-fnYDwME'));
// mPrint($t->GetMaterialList('news'));
// mPrint($t->sendTag('UGMsZ62zmoaxUUMfb5FqqzroGpFYNvDMgEj7EckWUK0'));
