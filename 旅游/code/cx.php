<?php
// session_start();
if (!session_id()) session_start();
/*define('游客',[
	'item'=>1,
	'user'=>1,
	'交易记录'=>0,
	'商品类型'=>1,
	'商品评价'=>1,
	'服务承诺'=>1,
	'权限'=>0,
	'权限组'=>0,
	'购物车'=>0,
	'车型'=>1,
	'预定须知'=>1,
]);*/

function getpermit(){
	if (isset($_SESSION['类型'])) {
		return $_SESSION['类型'];
	}
	if(isset($_COOKIE['电话'])){
		$cmd=['电话'=>$_COOKIE['电话']];
		$arr = GetData('user',$cmd, false);
		if(count($arr) < 1) return false;
		$parr = array_keys($arr[0]);
		$_SESSION=$arr[0];
//		$arr=runsql('select * from 用户组 where ID='.$_SESSION['权限']);
//		$_SESSION['权限']=$arr[0];
		return $_SESSION['类型'];
	}
	return false;
}
//runsql('SELECT * FROM `user`');
getpermit();
$UserID = 0;
//mprintx($_SESSION);

if(isset($_SESSION['ID'])){
	$UserID=$_SESSION['ID'];
}
$myrun = 'UserID = '.$UserID.'; ';

define('登录', 0);
define('注册', 1);
define('游客', 0);
define('会员', 1);
define('商家', 2);
define('管理员', 3);
define("Getitem", 1001);
define("Getuser", 1002);
define("Get交易记录", 1003);
define("Get商品类型", 1004);
define("Get商品评价", 1005);
define("Get购物车", 1006);
define("Get服务承诺", 1007);
define("Get车型", 1008);
define("Get预订须知", 1009);
define("Get权限", 1100);

define("Additem", 2001);
define("Adduser", 2002);
define("Add交易记录", 2003);
define("Add商品类型", 2004);
define("Add商品评价", 2005);
define("Add购物车", 2006);
define("Add服务承诺", 2007);
define("Add车型", 2008);
define("Add预订须知", 2009);
define("Add权限", 2100);

define("Upitem", 3001);
define("Upuser", 3002);
define("Up交易记录", 3003);
define("Up商品类型", 3004);
define("Up商品评价", 3005);
define("Up购物车", 3006);
define("Up服务承诺", 3007);
define("Up车型", 3008);
define("Up预订须知", 3009);
define("Up权限", 3100);

include_once ("code/sql.php");

$mfun = array();
$mfun[100]=function($cmd){
	$ret=[];
	$ret['服务承诺']= GetData('服务承诺',[]);
	$ret['车型']= GetData('车型',[]);
	$ret['预订须知']= GetData('预订须知',[]);
	return $ret;
};
$mfun[101]=function($cmd){
	if(isset($_SESSION['ID'])){
		return $_SESSION['ID'];
	}else{
		return 0;
	}
	
};
$mfun[Getitem]=function($cmd){
	if(isset($cmd['isall'])){
		unset($cmd['isall']);
//		mprintx($cmd);
		if(isset($cmd['商品类型'])){
			$tmp['ID']=$cmd['商品类型'];
		}else{
			$tmp=[];
		}
		if(isset($cmd['write'])){
			unset($cmd['write']);
			$tmp['用户类型']=$_SESSION['类型'];
		}
		$ret = GetData('商品类型',$tmp);
		$num = count($ret);
		$tmp=$cmd;
		for($i = 0; $i < $num; $i++){
			$tmp['商品类型']=$ret[$i]['ID'];
			$tmp['权重']=$ret[$i]['ID'];
			if(isset($tmp['nolimit'])){
				$ret[$i]['nolimit']=true;
				unset($tmp['nolimit']);
			}else{
				$tmp['limit']='0,'.$ret[$i]['主页数量'];
			}
			$ret[$i]['数据'] = GetData('item',$tmp);
		}
		return $ret;
	}
	return GetData('item',$cmd);
};
function arrAdd($arr, $arrb){
	$num=count($arrb);
	$p=array_keys($arrb);
	for($i=0; $i<$num; $i++){
		$arr[]=$arrb[$p[$i]];
	}
	return $arr;
}
$mfun[Getuser]=function($cmd){
	$ret=[];
	$ret[] = $_SESSION;
	if(isset($_SESSION['类型']) && $_SESSION['类型']==管理员){
		$ret=arrAdd($ret,GetData('user',$cmd));
	}
	$ret[0]['密码']='';
	return $ret;
};
$mfun[Get交易记录]=function($cmd){
	switch(getpermit()){
		case 会员:
			$cmd['归属客户']=$_SESSION['ID'];
			break;
		case 商家:
			$cmd['归属商家']=$_SESSION['ID'];
			break;
		case 管理员:
			
			break;
		default:
			return;
	}
	$ret=GetData('交易记录',$cmd);
	foreach($ret as $key=>$value){
		$tmp=[];
		$tmp['ID']=$ret[$key]['商品ID'];
		$tmp=GetData('item', $tmp);
		$ret[$key]['数据']=$tmp[0];
	}
	return $ret;
};
$mfun[Get商品类型]=function($cmd){
	if(isset($cmd['add'])){
		if(!isset($_SESSION['权限'])){
			return false;
		}
		unset($cmd['add']);
		$cmd['other']=$_SESSION['权限'].'&用户类型=用户类型';
	}
	return GetData('商品类型',$cmd);
};
$mfun[Get商品评价]=function($cmd){
	$getitem=false;
	if(isset($cmd['getitem'])){
		unset($cmd['getitem']);
		$getitem=true;
	}
	$ret = GetData('商品评价',$cmd);
	if($getitem){
		foreach($ret as $key=>$value){
			$tmp=[];
			$tmp['ID']=$ret[$key]['商品ID'];
			$tmp=GetData('item', $tmp);
			$ret[$key]['数据']=$tmp[0];
		}
	}
	
	return $ret;
};
$mfun[Get权限]=function($cmd){
	return GetData('权限',$cmd);
};
$mfun[Get购物车]=function($cmd){
	switch(getpermit()){
		case 会员:
			$cmd['归属客户']=$_SESSION['ID'];
			break;
		case 商家:
			$cmd['归属商家']=$_SESSION['ID'];
			break;
		case 管理员:
			
			break;
		default:
			return;
	}
	$ret=GetData('购物车',$cmd);
	foreach($ret as $key=>$value){
		$tmp=[];
		$tmp['ID']=$ret[$key]['商品ID'];
		$tmp=GetData('item', $tmp);
		$ret[$key]['数据']=$tmp[0];
	}
	return $ret;
};
$mfun[Get服务承诺]=function($cmd){
	return GetData('服务承诺',$cmd);
};
$mfun[Get车型]=function($cmd){
	return GetData('车型',$cmd);
};
$mfun[Get预订须知]=function($cmd){
	return GetData('预订须知',$cmd);
};

$mfun[Additem]=function($cmd){
	switch(getpermit()){
		case 会员:
			if($cmd['商品类型']<8 || $cmd['商品类型']>9)return;
			break;
		case 商家:
			if($cmd['商品类型']>7)return;
			break;
		case 管理员:
			
			break;
		default:
			return;
	}
	global $UserID;
	unset($cmd['ID']);
	unset($cmd['创建时间']);
	unset($cmd['修改时间']);
	unset($cmd['使用时间']);
	unset($cmd['归属用户']);
	unset($cmd['浏览量']);
	unset($cmd['权重']);
	$cmd['归属用户']=$UserID;
	return AddData('item',$cmd);
};
$mfun[Adduser]=function($cmd){
	if(getpermit() > 游客) return false;
	return AddData('user',$cmd);
};
$mfun[Add交易记录]=function($cmd){
	if(getpermit() < 会员) return false;
	return AddData('交易记录',$cmd);
};
$mfun[Add商品类型]=function($cmd){
	if(getpermit() < 管理员) return false;
	return AddData('商品类型',$cmd);
};
$mfun[Add商品评价]=function($cmd){
	if(getpermit() != 会员) return false;
	return AddData('商品评价',$cmd);
};
$mfun[Add权限]=function($cmd){
	if(getpermit() < 管理员) return false;
	return AddData('权限',$cmd);
};
$mfun[Add购物车]=function($cmd){
	if(getpermit() != 会员) return false;
	return AddData('购物车',$cmd);
};
$mfun[Add服务承诺]=function($cmd){
	if(getpermit() < 管理员) return false;
	return AddData('服务承诺',$cmd);
};
$mfun[Add车型]=function($cmd){
	if(getpermit() < 管理员) return false;
	return AddData('车型',$cmd);
};
$mfun[Add预订须知]=function($cmd){
	if(getpermit() < 管理员) return false;
	return AddData('预订须知',$cmd);
};


$mfun[Upitem]=function($cmd){
	if(getpermit() < 游客 ) return false;
	return UpData('item',$cmd);
};
$mfun[Upuser]=function($cmd){
	if(getpermit() < 游客) return false;
	return UpData('user',$cmd);
};
$mfun[Up交易记录]=function($cmd){
	if(getpermit() != 会员) return false;
	return UpData('交易记录',$cmd);
};
$mfun[Up商品类型]=function($cmd){
	if(getpermit() < 管理员) return false;
	return UpData('商品类型',$cmd);
};
$mfun[Up商品评价]=function($cmd){
	if(getpermit() < 会员) return false;
	return UpData('商品评价',$cmd);
};
$mfun[Up权限]=function($cmd){
	if(getpermit() < 管理员) return false;
	return UpData('权限',$cmd);
};
$mfun[Up购物车]=function($cmd){
	if(getpermit() != 会员) return false;
	return UpData('购物车',$cmd);
};
$mfun[Up服务承诺]=function($cmd){
	if(getpermit() < 管理员) return false;
	return UpData('服务承诺',$cmd);
};
$mfun[Up车型]=function($cmd){
	if(getpermit() < 管理员) return false;
	return UpData('车型',$cmd);
};
$mfun[Up预订须知]=function($cmd){
	if(getpermit() < 管理员) return false;
	return UpData('预订须知',$cmd);
};
$mfun['Get']=function($cmd){
	mprintx('123');
	return GetData('购物车',$cmd);
};
$mfun['Add']=function($cmd){
	return AddData('购物车',$cmd);
};
$mfun['Up']=function($cmd){
	return UpData('购物车',$cmd);
};

$mfun[注册]=function($cmd){
	setcookie('电话', '', time()-999);
	$_SESSION=[];
	$ret=false;
	if(isset($cmd['电话']) && 
	isset($cmd['密码']) && 
	isset($cmd['姓名']) && 
	isset($cmd['身份证'])
	){
		$sql="select * from user where 电话='{$cmd['电话']}'";
		$sql=runsql($sql);
		if(!count($sql)){
			$tmp=[
				'密码'=>$cmd['密码'],
				'电话'=>$cmd['电话'],
				'姓名'=>$cmd['姓名'],
				'身份证'=>$cmd['身份证'],
				'权限'=>1,
				'类型'=>1,
				'余额'=>0,
				'微信'=>'',
				'驾驶证'=>'',
				'地址'=>'',
				'上级ID'=>0,
				'推荐ID'=>0
			];
			AddData('购物车',$cmd);
			if (isset($cmd['保存7天'])) {
				setcookie('电话', $cmd['电话'], time()+7*24*60*60);
			} else {
				// 没有勾选则删除Cookie
				setcookie('电话', '', time()-999);
			}
			$ret=true;
		}
	}
	return $ret;
};
$mfun[登录]=function($cmd){
	setcookie('电话', '', time()-999);
	$_SESSION=[];
	$ret=false;
	if(isset($cmd['电话']) && isset($cmd['密码'])){
		$sql="select * from user where 电话='{$cmd['电话']}' and 密码='{$cmd['密码']}'";
		$sql=runsql($sql);
		if(count($sql)){
			$_SESSION=$sql[0];
			if (isset($cmd['保存7天'])) {
				setcookie('电话', $cmd['电话'], time()+7*24*60*60);
			} else {
				// 没有勾选则删除Cookie
				setcookie('电话', '', time()-999);
			}
			$ret=true;
		}
	}
	return $ret;
};

function GetItems($limit, $where){// cx项目
	$sql = 'select ID,商品名称,价格,计价单位,图示 from item'.$where.' ORDER BY 权重 DESC,ID DESC limit '.$limit;
	$arr = GetData($sql);
	$num = count($arr);
	for($i = 0; $i < $num; $i++){
		$arr[$i]['图示'] = explode('|', $arr[$i]['图示']);
	}
	return $arr;
}

function GetItemInfo($ID){// cx项目详情
	$sql = 'select * from item where ID='.$ID;
	$arr = GetData($sql)[0];
	$arr['图示'] = explode('|', $arr['图示']);
	return $arr;
}
function Login($cmd){// cx用户
	
}
function funcx交易记录($cmd){// cx交易记录
	
}
function funcx商品类型($cmd){// cx商品类型
	if($cmd == 'list'){
		
		return GetData('select * from 商品类型');
	}
	$sql = 'select ID,名称,说明,主页数量 from 商品类型';
	$arr = GetData($sql);
	if($cmd == null) return $arr;
	$num = count($arr);
	for($i = 0; $i < $num; $i++){
		$arr[$i]['主页数量'] = GetItems('0,'.$arr[$i]['主页数量'], ' where 商品类型='.$arr[$i]['ID']);
	}
	return $arr;
}
function funcx商品评价($cmd){// cx商品评价
	
}
function cx权限($cmd){// cx权限
	
}

function loginout(){
	setcookie('电话', '', time()-999);
	setcookie('code', '', time()-999);
	@session_destroy(); //清除所有注册信息
	$_SESSION = array();
}
function loginin($username, $password){
	$cmd=['电话'=>$username];
	$arr = GetData('user',$cmd, false);
	if(count($arr) < 1) return false;
	if (($username == $arr[0]['电话']) && ($password == $arr[0]['密码'])) {
		# 用户名和密码都正确,将用户信息存到Session中array_keys
		$parr = array_keys($arr[0]);
		$num = count($parr);
		for($i = 0; $i < $num; $i++){
			$_SESSION[$parr[$i]] = $arr[0][$parr[$i]];
		}
		if (isset($_POST['remember']) && $_POST['remember'] == "yes") {
			setcookie('电话', $username, time()+7*24*60*60);
			setcookie('code', md5($password), time()+7*24*60*60);
		} else {
			// 没有勾选则删除Cookie
			setcookie('电话', '', time()-999);
			setcookie('code', '', time()-999);
		}
		return true;
	}
	return false;
}



//mysqli_close($con);
?>