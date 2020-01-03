const JSON_HEX_QUOT = 8, JSON_HEX_TAG = 1, JSON_HEX_AMP = 2, JSON_HEX_APOS = 4, JSON_NUMERIC_CHECK = 32, JSON_UNESCAPED_SLASHES = 64, JSON_UNESCAPED_UNICODE = 256, JSON_FORCE_OBJECT = 16;
function json_encode(val,options = 0){var gettype=Object.prototype.toString;switch( gettype.call(val) ){case '[object String]':return json_escape_string(val,options);break;case '[object Number]':if(val % 1 === 0){return val;}else{return isFinite(val)?val:0;}break;case '[object Boolean]':return val?true:false;break;case '[object Undefined]':return null;break;case '[object Null]':return null;break;case '[object Object]':return json_encode_array(val,options);break;case '[object Array]':return json_encode_array(val,options);break;case '[object Function]':return null;break;default:return null;break;}}
function json_escape_string(val,options){var pos = 0;var len = val.length;if(len == 0){return '""';}if(options & JSON_NUMERIC_CHECK){        if (!isNaN(parseInt(val))) {       		if(val % 1 === 0){return val;}else{return isFinite(val)?val:0;}        }}if(len == null){return null;}else if(len == 0){return '""';}var result = '"';while(pos < len){us = val.charAt(pos);switch(us){case '"':if(options & JSON_HEX_QUOT){result += "\\u0022";}else{result += "\\\"";}break;case '\\':result += "\\\\";break;case '/':if (options & JSON_UNESCAPED_SLASHES ) {result += us;} else {result += "\\/";}break;case '\b':result += "\\b";break;case '\f':result += "\\f";break;case '\n':result += "\\n";break;case '\r':result += "\\r";break;case '\t':result += "\\t";break;case '<':if (options & JSON_HEX_TAG) {result += "\\u003C";} else {result += '<';}break;case '>':if (options & JSON_HEX_TAG) {result += "\\u003E";} else {result += '>';}break;case '&':if (options & JSON_HEX_AMP) {result += "\\u0026";} else {result += '&';}break;case '\'':if (options & JSON_HEX_APOS) {result += "\\u0027";} else {result += '\'';}break;default:if ((us >= ' ' && (us & 127) == us) || IsDigit(us) || IsAlpha(us) || (options & JSON_UNESCAPED_UNICODE)) {result += us;}else{/*result += "\\u00"+parseInt(us.charCodeAt(0),10).toString(16);*/let tmp = parseInt(us.charCodeAt(0),10).toString(16);while(tmp.length < 4){tmp = '0'+tmp;}result += "\\u"+tmp;}break;}pos++;}result += '"';return result;}
function IsDigit(cCheck) { return (('0'<=cCheck) && (cCheck<='9')); }
function IsAlpha(cCheck) { return ((('a'<=cCheck) && (cCheck<='z')) || (('A'<=cCheck) && (cCheck<='Z'))) }
function is_index_array(val,options){if(options & JSON_FORCE_OBJECT){return false;}var index = 0;for(var item in val){if(item == index){index++;}else{return false;}}return true;}
function json_encode_array(val,options){if(!is_index_array(val,options)){var result = '{';}else{var result = '[';}if(!is_index_array(val,options)){for(var item in val){result += json_encode(item,options)+':'+json_encode(val[item],options);result += ',';}}else{for(var item in val){result += json_encode(val[item]);result += ',';}}if(result.length > 1){result = result.substring(0,result.length-1)}if(!is_index_array(val,options)){result += '}';}else{result += ']';}return result;}

const Getitem = 1001,Getuser = 1002,Get交易记录 = 1003,Get商品类型 = 1004,Get商品评价 = 1005,Get购物车 = 1006,Get服务承诺 = 1007,Get车型 = 1008,Get预定须知 = 1009,Get权限 = 1100,Additem = 2001,Adduser = 2002,Add交易记录 = 2003,Add商品类型 = 2004,Add商品评价 = 2005,Add购物车 = 2006,Add服务承诺 = 2007,Add车型 = 2008,Add预定须知 = 2009,Add权限 = 2100,Upitem = 3001,Upuser = 3002,Up交易记录 = 3003,Up商品类型 = 3004,Up商品评价 = 3005,Up购物车 = 3006,Up服务承诺 = 3007,Up车型 = 3008,Up预定须知 = 3009,Up权限 = 3100;

odata=[];
bequery(0,{});
function getodata(val, index){
	var arr=odata[val],ret=[],r2=[],t,j;
	if(!arr)return ;
	index=Number(index);
	for(let i=0; i<arr.length; i++){
		t=Number(arr[i]['节点']);
		if(!index || ((index & t) == t)){
			ret.push(function(arr){
				let ret=[];
				ret['标题']=arr['标题'];
				ret['内容']=arr['内容'];
				ret['节点']=arr['节点'];
				return ret;
			}(arr[i]));
		}
	}
	return ret;
}

msgtxt='';
function httpget(url = '/', yibu = true){
	var arrd = new Array();
	$.ajax({
		async:yibu,// 异步执行
		url: url,
		type: 'GET',
		datatype: "json",
		success: function(msg){
			msgtxt=msg;
			return;
		},
		error: function(xhr,textStatus){
			console.log("err");
		}
    })
}
httpget('/1.html');
function runurljs(url = '/', yibu = true){
	var arrd = new Array();
	$.ajax({
		async:yibu,// 异步执行
		url: url,
		type: 'GET',
		datatype: "json",
		success: function(msg){
			eval(msg);
			return;
		},
		error: function(xhr,textStatus){
			console.log("err");
		}
    })
}
function bequery(value = 0, commond='', other=null, yibu = true){
	var arrd = new Array();
	$.ajax({
		async:yibu,// 异步执行
		url: '/q.php',
		type: 'POST',
		data: {
			val:value,
			cmd:encodeURIComponent(json_encode(commond))
		},
		datatype: "json",
		success: function(msg){
			let arr = msg;
			try{
				arr = JSON.parse(msg, true);
				
			}catch(err){
			//	console.log(err);
				console.log(msg);
				return;
			}
			value=Number(value);
			if(value < 1000){
				odata = arr;
			}else if(value > 2000) eval(other);
			else if($('#zbl').length){
				if(!other){
					other=$('#'+value)[0];
				}
//				console.log(arr);
				AllManagerClick(arr, other);
			}
			else funCallBack[value](arr, other);
		},
		error: function(xhr,textStatus){
			funCallBack[value](false, other);
		}
    })
}
function UpLoadFile() {
	var mform = document.getElementById('upload');
	formData = new FormData(mform);
	console.log(formData);
	$.ajax({
		url: "upload.php",
		type: "post",
		data: formData,
		datatype: "json",
		processData: false,
		contentType: false,
		success: function(res) {
			ret = json.parse(res);// 失败为false 成功为文件路径 例如: upload/123.jpg
		},
		error: function(err) {
			alert("网络连接失败,稍后重试", err);
		}
	})
	return false;
}
function GetTextImg(val){
	if(!val)val=$('#详情')[0].value;
	var re = /src="([^"]*)"/g;
	var ret=[], arrt=[];
	while (arrt = re.exec(val)) {
		ret[ret.length] = arrt[1];
	}
	return ret;
}
var mfun = new Array();
var funCallBack = new Array();
var alltmp=0;
var otherarr=false;
function arrcat(a1,a2){
	var ret = a1;
	var arr=Object.keys(a2);
	for(let i=0; i<arr.length; i++){
		ret[arr[i]]=a2[arr[i]];
	}
	return ret;
}
function toarr(val){
	var ret = new Array();
	var arr=Object.keys(val);
	for(let i=0; i<arr.length; i++){
		ret[arr[i]]=val[arr[i]];
	}
	return ret;
}
function delarr(val, key){
	var ret = new Array();
	var arr=Object.keys(val);
	for(let i=0; i<arr.length; i++){
		if(arr[i] == key) continue;
		ret[arr[i]]=val[arr[i]];
	}
	return ret;
}
function CallBackFristExe(arr, other, Pointer){
	if(typeof(arr[0]) != 'undefined' && typeof(arr[0]['count(*)']) != 'undefined'){
		obj = $(other);
		obj.append('<div></div>');
		CreatePages(obj.children('div')[1],arr[0]['count(*)'], 10, 6, 1, 'funCallBack['+Pointer+'](callbackval)');
		return true;
	}
	if(typeof(other) == 'undefined'){
		let a=toarr({ 'limit':arr});
		if(otherarr){
			a=arrcat(a, otherarr);
		}
		bequery(Pointer,a, obj.children('div')[0]);
		return true;
	}
	return false;
}
function addcss(val){
	$("<link>")
	.attr({ rel: "stylesheet",
	type: "text/css",
	href: val
	})
	.appendTo("head");
}
function delkeys(arr){
	let k = Object.keys(arr);
	var ret = new Array();
	for(let i = 0; i < k.length; i++)
	{
		ret[i]=arr[k[i]];
	}
	return ret;
}
function dbdelkeys(arr){
	for(let i = 0; i < arr.length; i++){
		arr[i] = delkeys(arr[i]);
	}
	return arr;
}
function addOther(ret, cls, id, other){
	if(cls){ret += " class='"+cls+"'";}
	if(id){ret += " id='"+id+"'";}
	if(other){ret += " "+other;}
	return ret;
}
function CreateTable(data, th, cls, id, other){
	var ret=addOther("<table", cls, id, other), t;
	ret += "><thead><tr>";
	if(!th){
		if(data.length < 1) return '';
		th=[];t=Object.keys(data[0]);
		for(let i=0; i<t.length; i++){
			th[t[i]]=t[i];
		}
	}
	var keys=Object.keys(th);
	
	for(let i=0; i<keys.length; i++){
		ret += "<th>"+keys[i]+"</th>";
	}
	keys = delkeys(th);
	ret += "</tr></thead><tbody>"
	for(let i=0; i< data.length; i++){
		ret += function(data, res){
			var ret = "<tr>";
			for(let i=0; i<res.length; i++){
				ret += "<td>"+data[res[i]]+"</td>";
			}
			ret += "</tr>";
			return ret;
		}(data[i], keys);
	}
	ret += "</tbody></table>";
	return ret;
}
function CreateButton(name, cls='topbtnothercss', blg, mimg, id, other){
	let ret = '<p>' + name + '</p></div>';
	if(mimg){
		ret = '><img src=\'' + mimg + '\'/>' + ret;
	}else{
		ret ='>' + ret;
	}
	if(other) ret = ' ' + other + ret;
	if(id) ret = ' id=' + id + ret;
	if(blg) ret = ' style="background-image: url(' + blg +')"' + ret;
	ret = ' class="button ' + cls + '"' + ret;
	ret = '<div ' + ret;
	return ret;
};

function CreateButtonMin(title, cls, id, other){
	var ret = addOther("<button", cls, id, other)+">";
	ret += title + "</button>";
	return ret;
}
function CreatePages(obj, sum, num, max, now=1, fun='', other=''){
	sum = Number(sum);num = Number(num);max = Number(max);now = Number(now);
	if(typeof(obj)!='object')return;
	if(sum<1)sum=1;
	if(num<1)num=1;
	if(max<5)max=5;
	if(now < 1)now=1;
	if(String(Number(obj.innerHTML))===obj.innerHTML){
		obj= obj.parentNode.parentNode;
	}
	var ret = "<div "+other+">";
	var tmp=false, t=0;
	if(now === 1)tmp="disabled='disabled'";
	var z = Math.ceil(sum/num), k = 0;
	if(now>z){now=z};
	if(now > z){now=z;}
	k=z<max?z:max;
	let j =k-2;
	ret += "<button value='0,"+(num-1)+"'"+tmp+">1</button>";
	var a= now-Math.ceil(j/2);
	var arr=fun.split("callbackval");
	var x= now*num-1;if(x>sum)x=sum;
	arr = arr[0]+"'"+(now-1)*num+","+x+"'"+arr[1]+";";
	eval(arr);
	if(a<2)a=2;
	var b= a+j;
	b= b<z?b:z;
	if(b-a < max-2) a=b-max+2;
	if(a<2)a=2;
	if(a>2) ret += "...";
	while(a<b || a == z){
		if(now == a)tmp="disabled='disabled'";else tmp=false;
		t = a*num;
		t = t<sum?t:sum;
		ret += "<button value='"+((a-1)*num)+","+(t-1)+"'"+tmp+">"+a+"</button>";
		a++;
	}
	if(a < z){
		if(now == z)tmp="disabled='disabled'";
		ret += "...<button value='"+((z-1)*num)+","+(sum-1)+"'"+tmp+">"+z+"</button>";
	}
	ret += "第<input style='width:30px' value='"+now+"'/>页</div>";
	obj.innerHTML=ret;
	obj2 = $(obj).find('button');
	for(let i=0; i<obj2.length; i++){
		tmp = "CreatePages(this, '"+sum+"', '"+num+"', '"+max+"', '"+obj2[i].innerHTML+"', '"+fun+"', '"+other+"',);";
		
		obj2.eq(i).attr('onclick', tmp);
	}
	
}
/*↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓*/

var alltemp;
var app = angular.module('appdate',["wui.date"]);
function SetTime(val){
	起始时间.value = val;
}
function SetItemInfo(arr){
	var a = $('.imga').eq(0).prop('src', 'pic/'+arr['图示'][1]);
	a = $('.imgb');
	for(let i = 0; i < a.length; i++){
		a.eq(i).prop('src', 'pic/' + arr['图示'][i]);
	}
	商品名称.innerHTML=arr['商品名称']
	线路.innerHTML=arr['起始地址']+'&emsp;'+arr['途经']+'&emsp;'+arr['终止地址'];
	浏览城市.innerHTML=arr['起始地址']+'&emsp;'+arr['终止地址'];
	预订须知.innerHTML=arr['预订须知']/*---------------------------*/
	服务承诺.innerHTML=arr['服务承诺']/*---------------------------*/
	价格.innerHTML=arr['价格']+arr['计价单位']
	a="SetTime(\""+arr['起始时间']+"\");";
	setTimeout(a,100);
	人数.value=arr['人数']
	车型.innerHTML=arr['车型']
	详情.innerHTML=arr['详情']
	
}
function ItemClick(id){
	window.location.href="jmp.php?page=item&cmd="+id;
}
function AddItem(arr, isret=false){
	if(Number(arr) == arr || arr == undefined)return '';
	var txt="";
	for(let i=0; i<arr.length; i++){
//		console.log(arr[i]);
		arr[i]['图示'] = arr[i]['图示'].split('|');
//		console.log(arr[i]['图示'][0]);
		txt += "<div onclick=ItemClick("+arr[i]['ID']+") class='item' style=\"background-image: url('/pic/"+arr[i]['图示'][0]+"');\"><div class='item_s'><div class='item_sl'>"+arr[i]['商品名称']+"</div><div class='item_sr'>"+arr[i]['价格']+arr[i]['计价单位']+"</div></div></div>\n";
	}

	if(isret) return txt;
	$('#info')[0].innerHTML="<div class='info wf'>"+txt+"</div>";
}

function AddAllItems(arr, obj){
	if(Number(arr[0]['主页数量']) == arr[0]['主页数量'] && arr[0]['nolimit']==undefined) return;
	var txt = "";var txt2='';
	for(let i = 0; i < arr.length; i++){
		txt +="<div class='wf yc' id='"+arr[i]['ID']+"'><div class='label yc'><b class='fs48'>"+arr[i]['名称']+"</b><div class='fgx'></div>";

		if(arr[i]['权限'] == (Number(arr[i]['权限'])&Permit)){
			txt += CreateButton('我要发布', 'bjcolor h45px bx','','',arr[i]['ID']);
			txt2 += "\n<div class='TopBottonSize'>"+CreateButton(arr[i]['名称'], 'bjcolor','','',arr[i]['ID'])+"</div>";
		}
		txt += "<a>"+arr[i]['说明']+"</a>";
		txt2 += "\n<div class='TopBottonSize'>"+CreateButton(arr[i]['名称'], 'topbtnothercss','','',arr[i]['ID'])+"</div>";
		txt += "</div><div class='info wf'>"+AddItem(arr[i]['主页数量'], true)+"</div>";
		if(arr[i]['nolimit'])txt += "</div></div>"; else txt += "<div class='moreBottonSize'><div class='button yj bx 123'><img src='images/u48.png'><p>查看更多</p></div></div></div>";
		
		
	}
	if(!obj)obj=$('#info')[0];
	obj.innerHTML=txt;
	if(UserID)txt = "<div class='TopBottonSize'><div class='button' id='a'><p>我的发布</p></div></div>"+txt2;
	else txt='';
	if(arr.length>1){
		document.getElementById('mfoot').innerHTML= txt;
		document.getElementById('mtop').innerHTML="<div class='TopBottonSize'><div class='button' id='a'><p>快速导航</p></div></div>"+txt2;
	}
	ImgMouseIn();
}
function addbotton2(obj){
	let a = $(obj).parent().parent().find('.botton');
	for(let i = 0; i < a.length; i++){
//str=str.replace(/ botton2/g, "");
		if(a[i].className.indexOf(' botton2') >= 0){
			a[i].className = a[i].className.replace(/ botton2/g, "");
			break;
		}
	}
	obj.className += " botton2";
}
function MainClick(obj){
//	console.log(obj);
	let str = obj.children[obj.children.length-1].innerHTML;
	switch (str){
		case '目的地':
			addbotton2(obj);
			break;
		case '拼行':
			addbotton2(obj);
			break;
		case '目的地':
			addbotton2(obj);
			break;
		case '景点相关':
			addbotton2(obj);
			break;
		case '特价酒店':
			addbotton2(obj);
			break;
		case '立即预定':
			
			break;
		case '加入购物车':
			
			break;
		case '用户登录':
			window.location='/login.html';
/*		let arr={'标题':"请输入用户名和密码"};
		arr['用户名']='';
		arr['密码']='';
		messagebox(arr, 'loginclick');*/
			break;
		case '我的信息':
			
			console.log('登录');
			break;
		case '查看更多':
			
			break;
		case '我要发布':
			window.location="jmp.php?page=createitem&cmd="+obj.id;
			break;
		default:
			outherClick(obj);
			break;
	}

}
function outherClick(obj){
//	let a=$(obj).parent().parent();
	let a = obj.parentNode.parentNode, arr=[];
	switch(a.id){
		case 'mtop': // 网站导航
			if(obj.id == 'a') {
				window.location.href='/';
				return;
			}
			arr={'ID':obj.id,'权重':1, 'nolimit':1, 'isall':1};
			bequery(Getitem,arr, $('#info')[0]);
			break;
		case 'mfoot':// 我的发布
			arr['权重']=1;
			arr['归属用户']=UserID;
			arr['isall']=1;
			if(obj.id !== 'a'){
				arr['nolimit']=1;
				arr['ID']=obj.id;
			}
			bequery(Getitem,arr, $('#info')[0]);
			break;
		default:
			
			break;
	}
}
function ImgMouseIn(){
	var a = $('.button');
	for(let i=0; i<a.length; i++){
		a.eq(i).attr('onclick', "MainClick(this);");
	}
	a= $('#login');
	if(typeof(UserID) == 'undefined' || !UserID){
		$('#mfoot').attr('style', "display:none;");
		a.find('p')[0].innerHTML='用户登录';
	}else{
		$('#mfoot').removeAttr('style');
		a.find('p')[0].innerHTML='我的信息';
	}
}
function messagebox(arr, callback) {　　　　　　
	var popupModel = new Popup();
	popupModel.init({
		val: arr,
		tipText1: '张三',
		tipText2: '18888888888',
		tipText3: '123456789012345678',
		showBtn: true,
		showDouble: true,
		success: function(res) {
			if (res.confirm) {
				eval(callback+"(res.ret);");
			} else {
				console.log('用户点击了取消' + JSON.stringify(res));
			}
		}
	});
}
function loginclick(val){
	console.log('回调开始');
	console.log(val);
}


window.onload = function() {
	//ImgMouseIn();
}

mfun['']=function(obj){
	
};
funCallBack[Getitem]=function(arr, other){
	if(arr[0]['主页数量'] === undefined){
		arr[0]['图示']=arr[0]['图示'].split('|');
		SetItemInfo(arr[0]);
		txtautoheight();
		return;
	}
	AddAllItems(arr, other);
};
function menuclick(val){
	let id = val.id;
	bequery(id,{}, val);
}
var SelectData;
function SelectChange(val,obj){
	var data=SelectData[val], txt='', th=[];t=Object.keys(SelectData[0]['主页数量'][0]);
	for(let i=0; i<t.length; i++){
		th[t[i]]=t[i];
	}
	txt +=CreateTable(data['主页数量']);
	obj.innerHTML=txt;
	SetTitletxtobj[0].innerHTML= "<p>所有发布</p>";
}
var SetTitletxtobj=$('#title');
function AllManagerClick(arr, other){
	if(Number(other.id)=== Getitem){
		SelectData=arr;
		let txt="";
		for(let i=0; i< arr.length; i++){
			txt += "<option value='"+i+"'>"+arr[i]['名称']+"("+arr[i]['主页数量'].length+')</option>';
		}
		var obj=$(other.parentNode);
		var obj2=obj.find('select');
		if(obj2.length){
			obj2[0].innerHTML = txt;
		}else{
			txt = "<select onchange='SelectChange(this.value, ybl);'>"+txt+"</select>";
			obj.append(txt);
			}
		SetTitletxtobj[0].innerHTML= "<p>"+$(other).find('p')[0].innerHTML+"</p>";
		obj=$("#ybl")[0];
		SelectChange(0, obj);
		return;
	}
	var txt = CreateTable(arr);
	ybl.innerHTML=txt;
	SetTitletxtobj[0].innerHTML= "<p>"+$(other).find('p')[0].innerHTML+"</p>";
}
funCallBack[Getuser]=function(arr, other){
	var txt = CreateTable(arr);
	ybl.innerHTML=txt;
	SetTitletxtobj[0].innerHTML= "<p>"+$(other).find('p')[0].innerHTML+"</p>";
};


funCallBack[Get商品类型]=function(arr, other){
	if(other.id === 'title'){
		other.innerHTML = "<div id='title' class='xyc'><p>"+arr[0]['名称']+"</p><a>"+arr[0]['说明']+"</a></div>";
		return;
	}

};



function funAddData(val){
	let str = val.getElementsByTagName("p")[0].innerHTML;
	var bq=0, obj=$('#zbl');
	switch (str){
		case '增加一条':
			if(obj.length){
				str=$('#title').find('p')[0].innerHTML;
				obj = obj.find('p');
				for(let i=0; i<obj.length; i++){
					if(obj[i].innerHTML == str){
						bq=Number(obj[i].parentNode.id);
						bequery(bq+1000, {}, 'bequery('+bq+',{});');
						return;
					}
				}
			}
			break;
	}
	
	var arr={
	'商品名称':商品名称.value,
	'商品类型':ct['id'],
	'起始时间':起始时间.value,
	'终止时间':终止时间.value,
	'起始地址':起始地址.value,
	'终止地址':终止地址.value,
	'途经':途经.value,
	'价格':价格.value,
	'人数':人数.value,
	'计价单位':计价单位.value,
	'预订须知':预订须知.value,
	'服务承诺':服务承诺.value,
	'车型':车型.value,
	'详情':详情.value,
	'图示':GetTextImg(详情.value).join('|')
	};
	mprintx(arr);
//	bequery(Additem, atmp);
}
funCallBack[Additem]=function(arr, other){
	console.log(arr,other);

};



var tah=[];
function sleepz(){
	tah[0]=$('.ke-edit')[0];
	if(tah[0] == undefined){
		setTimeout("sleepz()", 100);
		return;
	}
}
sleepz();

function txtautoheight(id){
	ret=false;
	if(!id)id='textarea';
	$(function(){
		$.fn.autoHeight = function(){
		function autoHeight(elem){
			elem.style.height = 'auto';
			elem.scrollTop = 0; //防抖动
			let h=Number(elem.scrollHeight)+20;
			elem.style.height = h + 'px';
			if(!ret)ret=elem.style.height;
		}
		this.each(function(){
			autoHeight(this);
			$(this).on('keyup', function(){
				autoHeight(this);
			});
		});
	}
	$(id).autoHeight();
	});
}
function selectaddr(val){
	if(val.value)return;
	myKE.clickToolbar('baidumap', val);
}

mtmp='<p><span style="font-size: 14pt;">数组遍历方法</span></p><p><span style="font-size: 18px;"><strong><span style="color: #ff0000;">1.for循环</span></strong></span></p><p>使用临时变量，将长度缓存起来，避免重复获取数组长度，当数组较大时优化效果才会比较明显。</p>';
function MessageBox(ti,msg, tcb){
//	K=myKE;
	mapWidth=400;
	var ret;
	KindEditor.ready(function(K) {
		var dialog = K.dialog({
			width : 500,
			title : ti,
			body : '<div style="margin:10px;"><strong>'+msg+'</strong></div>',
			closeBtn : {
				name : '关闭',
				click : function(e) {
					dialog.remove();
				}
			},
			yesBtn : {
				name : '确定',
				click : function(e) {
					obj=$(dialog);
					console.log(obj);
					console.log(mtmp);
//					dialog.remove();
				}
			},
			noBtn : {
				name : '取消',
				click : function(e) {
					dialog.remove();
				}
			}
		});
		ret = dialog;
	});
	ret.bodyDiv[0].parentNode.parentNode.style.height="auto";
	return ret;
}
//$('.autohf')[0].style.height='800px';
//runurljs('plugins/tagTree/tagTree.js');
var tmp=[
	{
		other:"onclick='menuclick(this);'",
		name:"1标签",
		id:'1',
		value:"1",
		children:[]
	}
];

function inmanager(){
	var txt = '<div class="xc">'+CreateButton('所有发布', 'h24px','','',Getitem, 'onclick="menuclick(this);"')+ '</div>';
	txt += '<div class="xc">'+CreateButton('用户管理', 'h24px','','',Getuser, 'onclick="menuclick(this);"')+ '</div>';
	txt += '<div class="xc">'+CreateButton('交易记录', 'h24px','','',Get交易记录, 'onclick="menuclick(this);"')+ '</div>';
	txt += '<div class="xc">'+CreateButton('商品类型', 'h24px','','',Get商品类型, 'onclick="menuclick(this);"')+ '</div>';
	txt += '<div class="xc">'+CreateButton('评价管理', 'h24px','','',Get商品评价, 'onclick="menuclick(this);"')+ '</div>';
	txt += '<div class="xc">'+CreateButton('服务承诺', 'h24px','','',Get服务承诺, 'onclick="menuclick(this);"')+ '</div>';
	txt += '<div class="xc">'+CreateButton('权限', 'h24px','','',Get权限, 'onclick="menuclick(this);"')+ '</div>';
	txt += '<div class="xc">'+CreateButton('购物车', 'h24px','','',Get购物车, 'onclick="menuclick(this);"')+ '</div>';
	txt += '<div class="xc">'+CreateButton('车型', 'h24px','','',Get车型, 'onclick="menuclick(this);"')+ '</div>';
	txt += '<div class="xc">'+CreateButton('预定须知', 'h24px','','',Get预定须知, 'onclick="menuclick(this);"')+ '</div>';
	$('#zbl')[0].innerHTML = txt;
	menuclick($('#1001')[0]);
}

switch (cs){
	case 0:
		bequery(Getitem,{}, $('#info')[0]);
		break;
	case 1:
		
		break;
	case 2:
		inmanager();
		break;
}
//msgtxt
function onerun(){
	var obj = $('body');
//	obj.append('<div id="msgbox" class="w50px h45px bx" style="position:fixed; "></div>');
	obj.append(msgtxt);
	document.onmousemove=function(ev){
		var oEvent=ev||event;
		var oDiv=document.getElementById('msgbox');
		
		oDiv.style.left=event.clientX+'px';
		oDiv.style.top=event.clientY+'px';
	}

}
//setTimeout('onerun();', 200);