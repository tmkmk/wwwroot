<?php

header("Content-Type:text/html;charset=utf-8");
$myrun = "";


$arr = [];
$arr['ID']='>0';
$arr['b']='b';
$arr['limit']='0,6';

unset($arr['b']);


include_once("q.php");

getpermit();
$UserID = 0;
if(isset($_SESSION['ID']))$UserID=$_SESSION['ID'];
//$myrun .= 'UserID = '.$UserID.'; Permit = '.$_SESSION['权限'].';';
$cs = 0;
if(isset($_GET['p']) && $_GET['p']==2){
	include_once("Template/2.html");
}else{
	include_once("Template/index.html");
}

?>
#生成秘钥 github
ssh-keygen -t rsa -f ~/.ssh/id_rsa.github -C "290820086@qq.com"
ssh-keygen -t rsa -f ~/.ssh/id_rsa.gitee -C "290820086@qq.com"

