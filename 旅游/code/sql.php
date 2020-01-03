<?php
$con=null;
$Username="root";
$Password="123654";
$ServerName="localhost";
$TableName="tour_data";


function mprint($val){
	echo "\r\n<pre>\r\n";
	print_r($val);
	echo "\r\n</pre>\r\n";
}
function mprintx($val){
	echo "\r\n<pre>\r\n";
	var_dump($val);
	echo "\r\n</pre>\r\n";
	die();
}
function isret($val){
//	mprintx($_SESSION);
}
function ConnectSql(){
	global $con, $Username, $Password, $ServerName, $TableName;
	if($con == null) $con=mysqli_connect($ServerName, $Username, $Password, $TableName);
	mysqli_options($con,MYSQLI_OPT_INT_AND_FLOAT_NATIVE,true);
}
ConnectSql();
function CloseSQL(){
	global $con;
	mysqli_close($con);
	$con = null;
}
function CreateData(){
	global $con;
	if($con){
		$sql="create database ".$TableName;
		if(mysql_query($sql, $con)){
			echo "成功";
		}else{
			echo "执行语句失败:".mysql_error();
		}
	}else{
		echo "建立连接失败:".mysql_error();
	}
}
function getoper($val){
	$str1 = substr($val, 0, 1);
	if($str1 == ' ')return 0;
	$str2 = substr($val, 0, 2);
	if($str2 =='!='){
		return 2;
	}elseif(
	$str1 == '>' ||
	$str1 == '<' ||
	$str1 == '='
	){
		return 1;
	}elseif(substr($val, 0, 5) == 'like '){
		return 5;
	}
	return 0;
}
function formatMysql($val){
	if(!$val)$val=0;
	return str_replace("'","''",$val);
}
function isNo($val){
	$isno=['ID','价格','权重','浏览量','权限','类型','余额','上级ID','推荐ID','归属用户','商品类型','服务承诺','预订须知','车型','人数','金额','到账','商品ID','归属商家','归属客户','评价打分','节点'];
	$num = count($isno);
	for($i=0; $i<$num; $i++){
		if($val == $isno[$i])return true;
	}
	return false;
}
function formatGet($val){
	if($val === array())return '';
	$p = array_keys($val);
	$ret = ' where ';
	$ret2 = '';
	$str = false;
	$j = 0;
	$num = count($p);
	for($i = 0; $i < $num; $i++){
		if($p[$i] === '权重' || $p[$i] === 'other') continue;
		$ret2 = formatMysql($val[$p[$i]]);
		$j = getoper($ret2);
		if($p[$i] === 'limit'){
			$str = ' limit '.$ret2;
			continue;
		}
/*		$j = strpos($ret2, ':');
		if($j === false || $j > 4){
			// 没有条件语句.直接进行组装
			$ret .= ' and '.$ret2;
		}else{
			$str = substr($ret2, 0, $j);
			if($str == 'or' || $str == 'or(' || $str == 'and' || $str == 'and('){
				$ret .= ' '.$str;
			}
			
		}*/
		
		$ret .= $p[$i];
		if(isNo($p[$i]) || $val[$p[$i]] === 'CURRENT_TIMESTAMP'){
			if($j === 0){
				$ret .= '='.$ret2.' and ';
			}else{
				$ret .= ' '.$ret2.' and ';
			}
		}else{
			if($j === 0){
				$ret .= '=\''.$ret2.'\' and ';
			}else{
				$ret .= ' '.substr($ret2, 0, $j).'\''.substr($ret2,$j).'\' and ';
			}
		}
	}

	if(strlen($ret)>12)$ret = substr($ret, 0, -5);
	if(isset($val['other']) && $val['other'] != null && strpos($val['other'],";")===false) $str = $val['other'].$str;
	if(isset($val['权重']) && $val['权重'] != null){$str = ' ORDER BY 权重 DESC,修改时间 DESC'.$str;}
	elseif(substr($str,0,1)==','){$str = ' ORDER BY '. substr($str,1);}
	$ret .= $str;
	return $ret;
}
function GetData($tab, $val, $delpass=true){ // 失败返回假,成功以二维数组形式返回查询到的结果.
	isret($tab);
	global $con;
	$ret=array();
	$sql = 'select ';
	if(isset($val['总数'])){
		$sql .= 'count(*) from ';
		unset($val['limit']);
		unset($val['总数']);
	}else{
		$sql .= '* from ';
	}
	$sql .= $tab.formatGet($val);
	// mprintx($sql);
	$result = mysqli_query($con, $sql);
	
	if($result === false) return false;
	$ret = mysqli_fetch_all($result,MYSQLI_ASSOC);
	mysqli_free_result($result);// 释放结果内存。
	return $ret;
}
function runsql($sql){
	global $con;
	$result = mysqli_query($con, $sql);
	
	if($result === false) return false;
	$ret = mysqli_fetch_all($result,MYSQLI_ASSOC);
//	mprintx($ret);
	mysqli_free_result($result);// 释放结果内存。
	return $ret;

}
// var_dump(ReadData("SELECT * FROM item where (ID<4)  ORDER BY 权重 DESC,ID DESC limit 0,2"));


function formatAdd($val){
	unset($val['ID']);unset($val['创建时间']);unset($val['修改时间']);unset($val['使用时间']);
	$p = array_keys($val);
	$ret = '';
	$ret2 = ' (';
	$num = count($p);
	for($i = 0; $i < $num; $i++){
		$ret2 .= $p[$i].', ';
		if(isNo($p[$i]) || $val[$p[$i]] === 'CURRENT_TIMESTAMP' ) $ret .= formatMysql($val[$p[$i]]). ', ';
		else $ret .= '\''.formatMysql($val[$p[$i]]).'\', ';
	}
	if(strlen($ret2)>2)$ret2 = substr($ret2, 0, -2);
	$ret2 .= ") values (";
	$ret = $ret2.substr($ret, 0, -2).')';
	return $ret;
}
function AddData($tab, $val){ // 失败返回真,成功返回假
	if($tab == null){
		return false;
	}
	global $con;
	$sql = "insert into ".$tab.formatAdd($val);
	// mprintx($sql);
//	mprintx($sql);
	$result = mysqli_query($con, $sql);
	if($result === false) return false;
	$result=mysqli_query($con,'select @@IDENTITY');
	$ret = mysqli_fetch_all($result,MYSQLI_ASSOC);
	mysqli_free_result($result);// 释放结果内存。
	return $ret[0]['@@IDENTITY'];
}
function formatUp($val){
	// UPDATE `tjsf`.`管理员` SET `证件号` = '123x',电话='789' WHERE `管理员`.`ID` = 1;
	unset($val['ID']);
	$val['修改时间'] = 'CURRENT_TIMESTAMP';
	$p = array_keys($val);
	$ret = '';
	$num = count($p);
	for($i = 0; $i < $num; $i++){ // 如果 $p[$i] === 'id' 则跳过
		if($p[$i] == 'ID') continue;
		$ret .= $p[$i].'=';
		if(isNo($p[$i]) || $val[$p[$i]] === 'CURRENT_TIMESTAMP') $ret .= formatMysql($val[$p[$i]]). ', ';
		else $ret .= '\''.formatMysql($val[$p[$i]]).'\', ';
	}
	$ret = substr($ret, 0, -2);
	return $ret;
}
function UpData($tab, $val){ // 失败返回真,成功返回假
	if($val == null 
	|| $tab == null
	){
		return false;
	}
	if($tab == '服务承诺' || $tab == '权限' || $tab == '车型' || $tab == '预订须知'){
		$val['节点']='(1<<(ID-1))';
	}
	//UPDATE `tjsf`.`管理员` SET `证件号` = '123x' WHERE `管理员`.`ID` = 1;
	global $con;
	$sql = "UPDATE ".$tab.' set '.formatUp($val).' where ID='.$val['ID'];
	// mprintx($sql);
	$result = mysqli_query($con, $sql);
	if($result === false) return false;
	return $val['ID'];
}
function unsetarr($arr, $uarr){
	$a= count($arr); $u=count($uarr);
	foreach($arr as $i=>$ak){
		foreach($uarr as $k=>$v){
			if($i === $v)unset($arr[$i]);
		}
	}
	return $arr;
}


/*
set @a=IFNULL((select max(id)from 权限),0);
INSERT INTO `tour_data`.`权限` (`名称`, `节点`) VALUES ('浏览记录', 1<<@a);
*/
?>