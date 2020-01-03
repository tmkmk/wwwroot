<?php

include_once("code/cx.php");

if(count($_POST) == 0) $_POST = $_GET;
if(!isset($_POST['val'])) return ;
$val = (int)$_POST['val'];
if($val == 0)$val=$_POST['val'];
if (isset($_POST['cmd']) === false) $cmd = json_encode(array());
else $cmd = urldecode($_POST['cmd']);

if($val == 'banner'){
	$dir = 'images/banner/';
	$banner = scandir($dir);
	array_splice($banner, 0, 2);
	foreach($banner as $key=>$value){
		$banner[$key] = '/'.$dir.$banner[$key];
	}
	echo json_encode($banner);
	return;
}
$isend=false;


define("文章2",[
	'ID'=>1,
	'名称'=>'like 这里是名称%',
	]);

if($val==='sql'){
	mprint(runsql($cmd));
	return;
}
$table=false;
try{
	$cmd = json_decode($cmd, true);
	if(isset($_POST['table']))$table = urldecode($_POST['table']);
}catch (Exception $e){
	echo '错误';
}

if(isset($_GET['val']) && isset($_GET['cmd'])){
	mprint($mfun[$val]($cmd));
	$isend = true;
}

if(is_array($cmd) && $val !== 0){
	if(is_String($val)){
		echo json_encode($mfun[$val]($cmd, $val));
	}
	else {
		if($val>3000 && (!isset($cmd['ID']) || !isset($cmd['归属用户']) || $cmd['归属用户'] !=$_SESSION['ID'])){
			echo json_encode(false);
		}else echo json_encode($mfun[$val]($cmd));
		// echo json_encode(false);
	}
	$isend = true;
//	var_dump ($mfun[$val]($cmd));
}


CloseSQL();
if($isend)die();
?>