<?php
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

header('Content-type:text/html; Charset=utf-8');
$encodingAesKey = "dJOcGBXMOelSYN9nR9zTlDaVln49bgrPkNEUZEyCR1n";  //服务器配置中的消息加解密密钥(EncodingAESKey)
$token = "WXJD_TOKEN"; //服务器配置中的令牌(Token)
$appId = "wx203cc77c39552399";  //你的appid

$arr = [
	'raw_data' => '<xml>
    <ToUserName><![CDATA[gh_1ade035239b6]]></ToUserName>
    <Encrypt><![CDATA[mTXniqx6zlPHokpunD+6o+MypQRYBZZIFbAlTekbvSOuVqIFjgZE3qH9Ox1p8diNQH5dcmLEVps8rfrNEAWT4e8Y5BiTh+aj/XAbJw/k4lfpjHILjNqLJL62VOzihMcDxkc9aqLM3GnhSwOAjljIyFvySRCqwHJVJm00DNpd/eT8sNJiqBH3X0btKB35Pi9DXroWt3mYPFLqo88OXosI2t9BZYGmUZALXOxTZVE8LtsGlB2L+KNv/nt94d17tCTbtSQrA/1YQUkZjl1AHEfBS8U6zZTBCdBKqR6eDgOF0O6sPS7fIqTpuj/wGjPK8VobY8MU4FRDxHWvu2+7o0KGtcgYKw6W0j+tJuIb/NQZnGn8mkDDcM7AiKggRdGHRhC8m/9UDLVOw/uEnC2UEzwUCpsxUm3CEGVTcc+UZOmzJnaKX4S+LYLGg/EeXFXjaw0DPIiWcVWgWZNiXkKmTSEuJQ==]]></Encrypt>
</xml>',
	'get_data' => [
		'signature' => '9e1d0e54ed84a5a4964931da3dea59e896d7804d',
		'timestamp' => '1577626457',
		'nonce' => '480889145',
		'openid' => 'os0AXwCLDuj8cnfm767A33kNve34',
		'encrypt_type' => 'aes',
		'msg_signature' => '491f391463ae2bb44e1b25abf7f71ea2587a689c'
	]
];
$_GET = $arr['get_data'];
$msgSignature = $_GET['msg_signature'];
$timestamp = $_GET['timestamp'];
$nonce = $_GET['nonce'];
$xml = $arr['raw_data'];
include_once('1.php');
$pc = new WXBizMsgCrypt($token, $encodingAesKey, $appId);
$msg = '';
$errCode = $pc->decryptMsg($msgSignature, $timestamp, $nonce, $xml, $msg);
/*
	public function encryptMsg($replyMsg, $timeStamp, $nonce, &$encryptMsg)
	public function decryptMsg($msgSigna, $timestamp, $nonce, $postData, &$msg)

*/

function object_array($array)
{
	if (is_object($array)) {
		$array = (array) $array;
	}
	if (is_array($array)) {
		foreach ($array as $key => $value) {
			$array[$key] = object_array($value);
		}
	}
	return $array;
}
// $msg = simplexml_load_string($msg, 'simplexml_load_string', LIBXML_NOCDATA);
$m= object_array($msg);
// $errCode = $pc->encryptMsg($m['Content'], $timestamp, $nonce, $msg);
$txt= '<xml><ToUserName><![CDATA[gh_0322f2da56f9]]></ToUserName>
<FromUserName><![CDATA[oUxa9wknoaATMCOv6b68TxDUI-Xc]]></FromUserName>
<CreateTime>1577681741</CreateTime>
<MsgType><![CDATA[text]]></MsgType>
<Content><![CDATA[你好啊]]></Content>
<MsgId>22586973269000841</MsgId>
</xml>';
$xml = new DOMDocument();
$xml->loadXML($txt);

function GetXML($txt, $elem){
	$xml = new DOMDocument();
	$xml->loadXML($txt);
	$a = $xml->getElementsByTagName($elem);
	return $a->item(0)->nodeValue;
}
mPrint($xml->getElementsByTagName('CreateTime')->item(0)->nodeValue);
$array_a = $xml->getElementsByTagName('Content');
mPrint($array_a->item(0)->nodeValue);


