function butpush()
{
	var lUsername=document.getElementById("username");
	var lPassword=document.getElementById("password");
	var lErrorhint=document.getElementById("errorhint");
	var isError=true;
	if(lUsername.value.length > 11||lUsername.value.length <7){	
		
		return;
	}
	if(lPassword.value.length <1)
	{
		alert("请输入验证码.");
		return;
	}
	var arr={'电话':lUsername.value, '密码':lPassword.value};
	if($('.checkbox1')[0].checked) arr['保存7天']=1;
	bequery(login, arr);
}

function openUrl1()
{
	var url='signin.html';
	window.location.href = url; 
}
objps=$('#password');
objuser=$('#username');
objuser.keyup(function(k){
	if(k.keyCode == 13){
		objps.focus();
	}
});
objps.keyup(function(k){
	if(k.keyCode == 13){
		butpush();
	}
});