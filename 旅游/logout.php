<?php 
	header('Content-type:text/html; charset=utf-8');
	$lasturl='/';
	if(isset($_GET['lasturl']))$lasturl=$_GET['lasturl'];
	if(isset($_SESSION['电话']) === false) header('location:'.$lasturl);

	// 注销后的操作
	@session_start();
	// 清除Session
	$username = $_SESSION['电话'];  //用于后面的提示信息
	$_SESSION = array();
	@session_destroy(); //清除所有注册信息
 
	// 清除Cookie
	setcookie('电话', '', time()-99);
	setcookie('code', '', time()-99);
	$_SESSION = array();
	// 提示信息
	header('location:'.$lasturl);
 
 ?>
