function butpush()
{
	var sUsername=document.getElementById("username");
	var sPassword=document.getElementById("password");
	var sRepassword=document.getElementById("repassword");
	var sRealname=document.getElementById("realname");
	var sIdnum=document.getElementById("id-num");
	var isError=true;
	var idcheck=/(^\d{15}$)|(^\d{18}$)|(^\d{17}(\d|X|x)$)/;
	var phonecheck= /(^1[3|4|5|7|8|9]\d{9}$)|(^09\d{8}$)/;
	if(sUsername.value.length > 10||sUsername.value.length <1){	
		alert("请输入正确的用户名.");
		return;
	}
	if(sPassword.value.length <1)
	{
		alert("请输入密码.");
		return;
	}
	if(sPassword.value.length <1)
	{
		alert("请输入确认密码.");
		return;
	}
	if(sRepassword.value!=sPassword.value)
	{
		alert("确认密码与原密码不一致.");
		return;
	}
	
	if(sRealname.value.length <1)
	{
		alert("请输入真实姓名.");
		return;
	}
	if(idcheck.test(sIdnum.value)!==true)
	{
		alert("请输入正确的身份证号码.");
		return;
	}
	if(phonecheck.test(sPhonenum.value)!==true)
	{
		alert("请输入正确的电话号码.");
		return;
	}
	var arr={
		'电话':sUsername.value,
		'密码':sPassword.value,
		'姓名':sRealname.value,
		'身份证':sIdnum.value
	};
	if($('.checkbox').children()[0].checked) arr['保存7天']=1;
	bequery(regdit, arr);
}

function openUrl2()
{
	var url='login.html';
	window.location.href=url;
}