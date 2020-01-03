<?php
include_once ("code/sql.php");
define("cx项目", 0);
define("cx用户", 1);// 登录
define("cx交易记录", 2);
define("cx商品类型", 3);
define("cx商品评价", 4);
define("cx权限", 5);
define("cx项目详情", 6);

function GetItems($limit, $where){// cx项目
	$sql = 'select ID,商品名称,价格,计价单位,图示 from item'.$where.' ORDER BY 权重 DESC,ID DESC limit '.$limit;
	$arr = QueryData($sql);
	$num = count($arr);
	for($i = 0; $i < $num; $i++){
		$arr[$i]['图示'] = explode('|', $arr[$i]['图示']);
	}
	return $arr;
}

function GetItemInfo($ID){// cx项目详情
	$sql = 'select * from item where ID='.$ID;
	$arr = QueryData($sql)[0];
	$arr['图示'] = explode('|', $arr['图示']);
	return $arr;
}
function Login($cmd){// cx用户
	
}
function funcx交易记录($cmd){// cx交易记录
	
}
function funcx商品类型($cmd){// cx商品类型
	if($cmd == 'list'){
		
		return QueryData('select * from 商品类型');
	}
	$sql = 'select ID,名称,说明,主页数量 from 商品类型';
	$arr = QueryData($sql);
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
function getpermit(){
	if (isset($_SESSION['权限'])) {
		return $_SESSION['权限'];
	}
	if(isset($_COOKIE['电话']) && isset($_COOKIE['code'])){
		$sql = "select * from user where 电话='".$_COOKIE['电话']."'";
		$arr = QueryData($sql);
		if(count($arr) < 1 || md5($arr[0]['密码']) != $_COOKIE['code']) return false;
		$parr = array_keys($arr[0]);
		$num = count($parr);
		for($i = 0; $i < $num; $i++){
			$_SESSION[$parr[$i]] = $arr[0][$parr[$i]];
		}
		return $_SESSION['权限'];
	}
	return false;
}
function loginout(){
	setcookie('电话', '', time()-999);
	setcookie('code', '', time()-999);
	@session_destroy(); //清除所有注册信息
	$_SESSION = array();
}
function loginin($username, $password){
	$sql = "select * from user where 电话='".$username."'";
	$arr = QueryData($sql);
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