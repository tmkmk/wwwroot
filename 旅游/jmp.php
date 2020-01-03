<?php
header("Content-Type:text/html;charset=utf-8");



if(count($_GET) < 1) die();
$page=$_GET['page'];
$cmd='';
if(isset($_GET['cmd']))$cmd=$_GET['cmd'];
include_once("code/cx.php");


switch ($page){
	case 'item':
		$ItemID=$cmd;
		$myrun= $cmd.'; bequery(Getitem,tmp,"item");'.$myrun;
		@session_start();
//		print_r($myrun);
		$cs = 3;
		include_once("Template/item.html");
		break;
	case 'createitem':
		$cs = 1;
		include_once("Template/createitem.html");
		break;
	case 'manager':
		$myrun= $UserID.'; '.$myrun;
		$cs = 2;
		include_once("Template/manager.html");
		break;
}


?>