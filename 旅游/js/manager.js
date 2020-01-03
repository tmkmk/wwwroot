const JSON_HEX_QUOT = 8, JSON_HEX_TAG = 1, JSON_HEX_AMP = 2, JSON_HEX_APOS = 4, JSON_NUMERIC_CHECK = 32, JSON_UNESCAPED_SLASHES = 64, JSON_UNESCAPED_UNICODE = 256, JSON_FORCE_OBJECT = 16;
function json_encode(val,options = 0){var gettype=Object.prototype.toString;switch( gettype.call(val) ){case '[object String]':return json_escape_string(val,options);break;case '[object Number]':if(val % 1 === 0){return val;}else{return isFinite(val)?val:0;}break;case '[object Boolean]':return val?true:false;break;case '[object Undefined]':return null;break;case '[object Null]':return null;break;case '[object Object]':return json_encode_array(val,options);break;case '[object Array]':return json_encode_array(val,options);break;case '[object Function]':return null;break;default:return null;break;}}
function json_escape_string(val,options){var pos = 0;var len = val.length;if(len == 0){return '""';}if(options & JSON_NUMERIC_CHECK){        if (!isNaN(parseInt(val))) {       		if(val % 1 === 0){return val;}else{return isFinite(val)?val:0;}        }}if(len == null){return null;}else if(len == 0){return '""';}var result = '"';while(pos < len){us = val.charAt(pos);switch(us){case '"':if(options & JSON_HEX_QUOT){result += "\\u0022";}else{result += "\\\"";}break;case '\\':result += "\\\\";break;case '/':if (options & JSON_UNESCAPED_SLASHES ) {result += us;} else {result += "\\/";}break;case '\b':result += "\\b";break;case '\f':result += "\\f";break;case '\n':result += "\\n";break;case '\r':result += "\\r";break;case '\t':result += "\\t";break;case '<':if (options & JSON_HEX_TAG) {result += "\\u003C";} else {result += '<';}break;case '>':if (options & JSON_HEX_TAG) {result += "\\u003E";} else {result += '>';}break;case '&':if (options & JSON_HEX_AMP) {result += "\\u0026";} else {result += '&';}break;case '\'':if (options & JSON_HEX_APOS) {result += "\\u0027";} else {result += '\'';}break;default:if ((us >= ' ' && (us & 127) == us) || IsDigit(us) || IsAlpha(us) || (options & JSON_UNESCAPED_UNICODE)) {result += us;}else{/*result += "\\u00"+parseInt(us.charCodeAt(0),10).toString(16);*/let tmp = parseInt(us.charCodeAt(0),10).toString(16);while(tmp.length < 4){tmp = '0'+tmp;}result += "\\u"+tmp;}break;}pos++;}result += '"';return result;}
function IsDigit(cCheck) { return (('0'<=cCheck) && (cCheck<='9')); }
function IsAlpha(cCheck) { return ((('a'<=cCheck) && (cCheck<='z')) || (('A'<=cCheck) && (cCheck<='Z'))) }
function is_index_array(val,options){if(options & JSON_FORCE_OBJECT){return false;}var index = 0;for(var item in val){if(item == index){index++;}else{return false;}}return true;}
function json_encode_array(val,options){if(!is_index_array(val,options)){var result = '{';}else{var result = '[';}if(!is_index_array(val,options)){for(var item in val){result += json_encode(item,options)+':'+json_encode(val[item],options);result += ',';}}else{for(var item in val){result += json_encode(val[item]);result += ',';}}if(result.length > 1){result = result.substring(0,result.length-1)}if(!is_index_array(val,options)){result += '}';}else{result += ']';}return result;}


const Get文章 = 0, Get文章分类 = 1, Get服务 = 2, Get机构 = 3, Get用户 = 4, Get人员特长 = 5, Get律师 = 6, Add文章 = 1000, Add文章分类 = 1001, Add服务 = 1002, Add机构 = 1003, Add用户 = 1004, Add人员特长 = 1005, Add律师 = 1006, Up文章 = 2000, Up文章分类 = 2001, Up服务 = 2002, Up机构 = 2003, Up用户 = 2004, Up人员特长 = 2005, Up律师 = 2006, 查询总数 = 9000, defData = {
"人员特长":{ 'ID':0, '创建时间':"CURRENT_TIMESTAMP", '修改时间':"CURRENT_TIMESTAMP", '使用时间':"CURRENT_TIMESTAMP", '名称':'', '说明':'' },
	"律师":{ 'ID':0, '创建时间':"CURRENT_TIMESTAMP", '修改时间':"CURRENT_TIMESTAMP", '使用时间':"CURRENT_TIMESTAMP", '姓名':'', '证件号':'', '电话':'', '图组':'', '简介':'', '擅长':'', '隶属机构':0 },
	"文章":{ 'ID':0, '创建时间':"CURRENT_TIMESTAMP", '修改时间':"CURRENT_TIMESTAMP", '使用时间':"CURRENT_TIMESTAMP", '名称':'', '说明':'', '作者':'', '图组':'', '分类':0, '访问量':0 },
"文章分类":{ 'ID':0, '创建时间':"CURRENT_TIMESTAMP", '修改时间':"CURRENT_TIMESTAMP", '使用时间':"CURRENT_TIMESTAMP", '名称':'', '说明':'' },
	"服务":{ 'ID':0, '创建时间':"CURRENT_TIMESTAMP", '修改时间':"CURRENT_TIMESTAMP", '使用时间':"CURRENT_TIMESTAMP", '名称':'', '说明':'', '权重':'' },
	"机构":{ 'ID':0, '创建时间':"CURRENT_TIMESTAMP", '修改时间':"CURRENT_TIMESTAMP", '使用时间':"CURRENT_TIMESTAMP", '名称':'', '说明':'', '电话':'', '拥有服务':''},
  "管理员":{ 'ID':0, '创建时间':"CURRENT_TIMESTAMP", '修改时间':"CURRENT_TIMESTAMP", '使用时间':"CURRENT_TIMESTAMP", '用户名':'', '密码':'', '姓名':'', '证件号':'', '电话':'' }
};



function BottonClick(obj){
	otherarr = false;
	let str = $(obj).find('li')[0].innerHTML;
//	console.log(str, '按钮被单击');
	mfun[str](obj);
	obj = $(obj).eq(0);
	
	var nan = obj.siblings();
	if(obj.style == null){
		obj.attr('style', 'background-color:#ccc;padding-top:0.01px');
		//console.log(str);
		nan.attr('style','');
	}

}

//一键发布
function SubmiClick(obj){
	let str = $(obj)[0].innerHTML;
	submcli[str](obj);
}
var submcli = new Array();
submcli['已发布信息']=function(obj){
	let ytable = "<div class=\"am-g\"><div class=\"am-u-sm-12\"><table class=\"am-table am-table-striped am-table-hover\"><thead><tr><th><input type=\"checkbox\" name=\"checkall\" /></th><th>标题</th><th>发布时间</th><th>上线时间</th><th>浏览量</th></tr></thead><tbody>";
	let ydata = "<tr><td><input type=\"checkbox\" name=\"checkbox\" /></td><td>网上政务服务若干轨</td><td>2019/20/30</td><td>2019/19/30</td><td>99999</td></tr>";
	let ybg = "</tbody></table><div class=\"am-form-group\"><div><label for=\"doc-ipt-file-1\">已绑定账号</label></div><label class=\"am-checkbox-inline\"><input type=\"checkbox\" value=\"option1\"> 微信</label><label class=\"am-checkbox-inline\"><input type=\"checkbox\" value=\"option2\"> 大鱼</label><label class=\"am-checkbox-inline\"><input type=\"checkbox\" value=\"option3\"> 百家</label></div>";
	let yages = "<p style=\"float:right\"><button type=\"submit\" class=\"am-btn am-btn-default\">保存</button>&emsp;<button type=\"submit\" class=\"am-btn am-btn-default\">发布</button></p></div>";
	$('#yjsum')[0].innerHTML = ytable+ydata+ybg+yages;
};
submcli['新建信息']=function(obj){
	let snb = "<div class=\"am-g\"><div class=\"am-u-sm-12\"><form class=\"am-form\"><fieldset class=\"fieldset\"><div class=\"am-form-group\"><input type=\"text\" class=\"\" id=\"doc-ipt-email-1\" style=\"height:50px\" placeholder=\"请输入文章标题\"></div><div class=\"am-form-group\"><input type=\"email\" class=\"\" id=\"doc-ipt-email-1\" style=\"height:50px\" placeholder=\"请输入作者\"></div><div class=\"am-form-group\"><textarea class=\"\" rows=\"5\" id=\"doc-ta-1\"> 这里开始写正文</textarea></div><div><label for=\"doc-ipt-file-1\">封面和摘要</label><div class=\"am-g\"><div class=\"am-u-sm-4\"><div class=\"am-form-group\"><p>上传的封面图</p><input type=\"file\" id=\"doc-ipt-file-1\"><p class=\"am-form-help\">请选择要上传的封面图</p></div></div><div class=\"am-u-sm-8\"><div class=\"am-form-group\"><textarea class=\"\" rows=\"5\" id=\"doc-ta-1\">填选,如果不填写默认抓取正文前五十个字</textarea></div></div></div></div><div class=\"am-form-group\"><div><label for=\"doc-ipt-file-1\">已绑定账号</label></div><label class=\"am-checkbox-inline\"><input type=\"checkbox\" value=\"option1\"> 微信</label><label class=\"am-checkbox-inline\"><input type=\"checkbox\" value=\"option2\"> 大鱼</label><label class=\"am-checkbox-inline\"><input type=\"checkbox\" value=\"option3\"> 百家</label></div><p style=\"float:right\"><button type=\"submit\" class=\"am-btn am-btn-default\">保存</button>&emsp;<button type=\"submit\" class=\"am-btn am-btn-default\">发布</button></p></fieldset></form></div></div>";
	$('#yjsum')[0].innerHTML = snb;
};
submcli['一键发布信息']=function(obj){
	let snb = "<div class=\"fw-bd\"><div class=\"fw-zenter\"><strong>微信公众号</strong></div><div><span>已绑定</span>&emsp;&emsp;<button type=\"button\" class=\"am-btn am-btn-primary am-btn-sm\">立即绑定</button></div></div><div class=\"fw-bd\"><div class=\"fw-zenter\"><strong>头条</strong></div><div><span>未绑定</span>&emsp;&emsp;<button type=\"button\" class=\"am-btn am-btn-primary am-btn-sm\">立即绑定</button></div></div><div class=\"fw-bd\"><div class=\"fw-zenter\"><strong>百家</strong></div><div><span>未绑定</span>&emsp;&emsp;<button type=\"button\" class=\"am-btn am-btn-primary am-btn-sm\">立即绑定</button></div></div><div class=\"fw-bd\"><div class=\"fw-zenter\"><strong>微博</strong></div><div><span>已绑定</span>&emsp;&emsp;<button type=\"button\" class=\"am-btn am-btn-primary am-btn-sm\">立即绑定</button></div></div><div class=\"fw-bd\"><div class=\"fw-zenter\"><strong>大鱼</strong></div><div><span>未绑定</span>&emsp;&emsp;<button type=\"button\" class=\"am-btn am-btn-primary am-btn-sm\">立即绑定</button></div></div>";
	$('#yjsum')[0].innerHTML = snb;
};
submcli['自媒体管理']=function(obj){
	mfun['自媒体一键发布']();
	submcli['已发布信息']();
};
/*↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓*/
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

mfun['用户管理']=function(obj){
	let yhmd="<div class='am-g fw-right-top'><div class='am-u-sm-8'><p class='fw-ph'>用户名单</p><button type='button' class='am-btn am-btn-default' data-am-modal='{target: ' #doc-modal-1 '}'>添加用户</button></div><div class='am-u-sm-4'><form actiom='' class='am-form fw-ss'><input type='text' id='doc-ipt-email-1' placeholder='输入电子邮件'></form></div></div><div class='am-g'><div class='am-u-sm-9'><p class='fw-ph2'>全部542225人</p></div><div class='am-u-sm-3'><span>导出所有用户</span>&emsp;&emsp;<span>导入用户</span></div></div><div class='am-g'><div class='am-u-sm-12'></div></div>";
	$('#ybl')[0].innerHTML = yhmd;
	let arr=new Array();
	arr['总数']=1;
	bequery(Get用户,arr,$('#ybl').children('div')[2]);

};
funCallBack[Get用户] = function(arr, other){
	if(CallBackFristExe(arr, other, Get用户))return;

	var bt={
		'用户名':'用户名',
		'姓名':'姓名',
		'电话':'电话',
		'证件号':'证件号',
		'创建时间':'创建时间'
	}
	other.innerHTML=CreateTable(bt, arr,"am-table am-table-striped am-table-hover");
};

mfun['全部']=function(val){
	otherarr = false;
	let arr=new Array(), Pointer=0;
	arr['总数']=1;
	if(val == 1){
		Pointer = Get机构;
	}else{
		Pointer = Get机构类别;
	}
	bequery(Pointer,arr,$('#ybl').children('div')[2]);
};
mfun['已审']=function(val){
	let arr=new Array(), Pointer=0;
	console.log('已审'+val);
	if(val == 1){
		Pointer = Get机构;
	}else{
		Pointer = Get机构类别;
	}
	arr['审核状态']=1;
	otherarr = toarr(arr);
	arr['总数']=1;
	bequery(Pointer,arr,$('#ybl').children('div')[2]);
};
mfun['未审']=function(val){
	let arr=new Array(), Pointer=0;
	if(val == 1){
		Pointer = Get机构;
	}else{
		Pointer = Get机构类别;
	}
	arr['审核状态']=0;
	otherarr = toarr(arr);
	arr['总数']=1;
	bequery(Pointer,arr,$('#ybl').children('div')[2]);
};

mfun['服务机构管理']=function(val){
	if(typeof(val) == 'number'){
		alltmp=val;
		mfun['全部'](alltmp);
		return;
	}
	let btop = "<div class='am-g fw-right-jg'><div class='am-u-sm-12'><button onclick=\"mfun['服务机构管理'](1);\" type='button' class='am-btn am-btn-default am-btn-lg'>申请记录</button>&emsp;<button onclick=\"mfun['服务机构管理'](1<<1);\" type='button' class='am-btn am-btn-default am-btn-lg'>机构类别</button></div></div><div class='am-g fw-right-top'><div class='am-u-sm-6'><button onclick=\"mfun['全部'](alltmp);\" type='button' class='am-btn am-btn-default'>全部</button>&emsp;<button onclick=\"mfun['已审'](alltmp);\" type='button' class='am-btn am-btn-default'>已审核</button>&emsp;<button onclick=\"mfun['未审'](alltmp);\" type='button' class='am-btn am-btn-default'>未审核</button></div><div class='am-u-sm-6'><form actiom='' class='am-form fw-ss' style='width:80%'><input type='text' id='doc-ipt-email-1' placeholder='搜索'></form></div></div><div class='am-g'><div class='am-u-sm-12'></div></div>";
	$('#ybl')[0].innerHTML = btop;
	mfun['服务机构管理'](1);
	return;
	let arr=new Array();
	arr['总数']=1;
	bequery(Get机构,arr,$('#ybl').children('div')[2]);
};
funCallBack[Get机构] = function(arr, other){
	if(CallBackFristExe(arr, other, Get机构))return;

	var bt={
		'机构名称':'名称',
		'机构营业执照':'图组',
		'申请人':'申请人',
		'申请人电话':'电话',
		'申请时间':'创建时间'
	}
	other.innerHTML=CreateTable(bt, arr,"am-table am-table-striped am-table-hover");
};
function addcss(val){
	$("<link>")
	.attr({ rel: "stylesheet",
	type: "text/css",
	href: val
	})
	.appendTo("head");
}
function CreateItem(val, other){
	if(val && val.innerHTML != '新建' && val.innerHTML != '提交'){
		let arr=new Array();
		if(val.innerHTML == '信息公示'){
			arr['分类']=1;
		}else if(val.innerHTML == '便民服务'){
			arr['分类']=4;
		}else if(val.innerHTML == '服务动态'){
			arr['分类']=2;
		}else if(val.innerHTML == '政策解读'){
			arr['分类']=3;
		}else if(typeof(other)=='number'){
			arr['分类']=other;
		}else{
			console.log('未知数据:', val);
			return;
		}
		otherarr = toarr(arr);
		arr['总数']=1;
		bequery(Get文章,arr,$('#ybl').children('div')[2]);
		return;
	}
	var a=$('#ybl').children('div').eq(2);a.attr('style',"display:none;");
	var b=$('#createitem');b.removeAttr('style');
	if(val && val.innerHTML == '提交'){
		myKE.sync();
		a.removeAttr('style');
		b.attr('style',"display:none;");
		var arr=new Array();
		arr['名称']=$('#title')[0].value;
		arr['说明']=$('#content')[0].value;
		arr['作者']=$('#author')[0].value;
		arr['图组']='';
		var reg = new RegExp("(<img src=\"\ alt=)");  //正则表达式
		arr['说明'].match(reg);
		var re = /src="([^"]*)"/g;
		while (arrt = re.exec(arr['说明'])) {
			arr['图组'] += arrt[1]+"|";
		}
		if(otherarr && otherarr['分类']) arr['分类']=otherarr['分类'];
		bequery(Add文章, arr);
		console.log(arr);
	}
}
mfun['信息管理']=function(obj){
	let ctop =  "<div class='am-g fw-right-jg'><div class='am-u-sm-12'><button type='button' onclick='CreateItem(this,null);' class='am-btn am-btn-default am-btn-lg'>信息公示</button>&emsp;&emsp;<button type='button' onclick='CreateItem(this,null);' class='am-btn am-btn-default am-btn-lg'>便民服务</button>&emsp;&emsp;<button type='button' onclick='CreateItem(this,null);' class='am-btn am-btn-default am-btn-lg'>服务动态</button>&emsp;&emsp;<button type='button' onclick='CreateItem(this,null);' class='am-btn am-btn-default am-btn-lg'>政策解读</button>&emsp;&emsp;</div></div><div class='am-g fw-right-top'><div style='margin-bottom:25px' class='am-u-sm-6'><button type='button' onclick='funCallBack[Get文章]();' value='fwxxfb' class='am-btn am-btn-default'>已发布</button>&emsp;<button type='button' onclick='CreateItem(this,null);' class='am-btn am-btn-default'>新建</button></div></div><div class='am-g'><div class='am-u-sm-12'></div></div>";
	$('#ybl')[0].innerHTML = ctop;
	ctop={};
	ctop.innerHTML='信息公示';
	CreateItem(ctop);
};
funCallBack[Get文章] = function(arr, other){
	if(CallBackFristExe(arr, other, Get文章))return;
	var bt={
		'名称':'名称',
		'内容':'说明',
		'发布时间':'创建时间',
		'访问量':'访问量',
		'权重':'权重'
	}
	if(otherarr && otherarr['所属文章']){
		console.log(arr);
		bt={
			'被评价机构':'所属文章',
			'评价时间':'修改时间',
			'评价人':'作者',
			'评价结果':'权重',
			'评价详情':'说明'
		};
		for(let i=0; i<arr.length; i++){
			switch(arr[i]['权重']){
				case 0:
					arr[i]['权重']='满意';
					break;
				case 1:
					arr[i]['权重']='一般';
					break;
				default:
					arr[i]['权重']='不满意';
					break;
			}
		}
	}
	other.innerHTML=CreateTable(bt, arr,"am-table am-table-striped am-table-hover");
//	console.log(arr);
};
mfun['普法微媒管理']=function(obj){
	let txt="<div class='am-g fw-right-jg'><div class='am-u-sm-12'></div></div>";
	
	txt += "<div class='am-g fw-right-top'><div style='margin-bottom:25px' class='am-u-sm-6'>";
	txt += CreateButtonMin('新建', 'am-btn am-btn-default', false,"onclick=\"CreateItem(this, 5);\"")+"</div></div>";
	
	txt += "<div class='am-g'><div class='am-u-sm-12'></div></div>";
	
	$('#ybl')[0].innerHTML = txt;
	CreateItem({},5);
};
mfun['法网网群管理']=function(obj){
	let txt="<div class='am-g fw-right-jg'><div class='am-u-sm-12'></div></div>";
	
	txt += "<div class='am-g fw-right-top'><div style='margin-bottom:25px' class='am-u-sm-6'>";
	txt += CreateButtonMin('新建', 'am-btn am-btn-default', false,"onclick=\"CreateItem(this, 6);\"")+"</div></div>";
	
	txt += "<div class='am-g'><div class='am-u-sm-12'></div></div>";
	
	$('#ybl')[0].innerHTML = txt;
	CreateItem({},6);
};
mfun['链接管理']=function(obj){
	let txt="<div class='am-g fw-right-jg'><div class='am-u-sm-12'></div></div>";
	
	txt += "<div class='am-g fw-right-top'><div style='margin-bottom:25px' class='am-u-sm-6'>";
	txt += CreateButtonMin('新建', 'am-btn am-btn-default', false,"onclick=\"CreateItem(this, 7);\"")+"</div></div>";
	
	txt += "<div class='am-g'><div class='am-u-sm-12'></div></div>";
	
	$('#ybl')[0].innerHTML = txt;
	CreateItem({},7);
};
mfun['满意度调查']=function(obj){
	txt = "<div></div><div></div><div class='am-g'><div class='am-u-sm-12'></div></div>";
	$('#ybl')[0].innerHTML = txt;
	let arr=new Array();
	arr['所属文章']='>0';
	otherarr = toarr(arr);
	arr['总数']=1;

	bequery(Get文章,arr,$('#ybl').children('div')[2]);
};

/*↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑*/

mfun['自媒体一键发布']=function(obj){
	let ytop = "<div class=\"am-g fw-right-jg\"><div class=\"am-u-sm-12\"><button type=\"button\" class=\"am-btn am-btn-default am-btn-lg\" onclick=\"SubmiClick(this)\">自媒体管理</button>&emsp;&emsp;<button type=\"button\" class=\"am-btn am-btn-default am-btn-lg\" onclick=\"SubmiClick(this)\">一键发布信息</button>&emsp;&emsp;</div></div><div class=\"am-g fw-right-jg\"><div class=\"am-u-sm-6\"><button type=\"button\" onclick=\"SubmiClick(this)\" class=\"am-btn am-btn-default am-btn-lg\">已发布信息</button>&emsp;&emsp;<button type=\"button\" class=\"am-btn am-btn-default am-btn-lg\" onclick=\"SubmiClick(this)\">新建信息</button>&emsp;&emsp;</div><div class=\"am-u-sm-6\"><form actiom=\"\" class=\"am-form fw-ss\" style=\"width:80%;margin-bottom:40px\"><input type=\"text\" id=\"doc-ipt-email-1\" placeholder=\"搜索\"></form></div></div><div id=\"yjsum\">";
	$('#ybl')[0].innerHTML = ytop;
	submcli['已发布信息']();
};


//信息发布窗口
function NewsClick(obj){
	let str = $(obj)[0].innerText;
	newst[str](obj);
}
var newst = new Array();

newst['信息公示']=function(obj){
	let ctopf = "<div id=\"newswith\"><div class=\"am-g fw-right-top\"><div  style=\"margin-bottom:25px\" class=\"am-u-sm-6\"><button type=\"button\" onclick=\"ZnewsClick(this);\" value=\"fwxxfb\" class=\"am-btn am-btn-default\">已发布信息</button>&emsp;<button type=\"button\" class=\"am-btn am-btn-default\" onclick=\"ZnewsClick(this);\">新建信息</button></div><div id=\"xxfbz\">";
	$('#newswith')[0].innerHTML = ctopf;
//	znews['已发布信息']();
};
newst['便民服务']=function(obj){
	let ctopf = "<div class=\"am-g fw-right-top fw-right-jg\"><div class=\"am-u-sm-6\"><button type=\"button\" onclick=\"BnewsClick(this)\" class=\"am-btn am-btn-default am-btn-lg\">服务管理</button>&emsp;&emsp;<button type=\"button\" onclick=\"BnewsClick(this)\" class=\"am-btn am-btn-default am-btn-lg\">服务机构管理</button>&emsp;&emsp;</div></div><div id=\"bmfwg\">";
	$('#newswith')[0].innerHTML = ctopf;
	znewb['服务管理']();	
};
newst['服务动态']=function(obj){
	let ctopf = "<div class=\"am-g fw-right-top\"><div class=\"am-u-sm-6\"><button type=\"button\" class=\"am-btn am-btn-default\" onclick=\"FwButt(this)\">已发布信息</button>&emsp;<button type=\"button\" class=\"am-btn am-btn-default\" onclick=\"FwButt(this)\">新建信息</button></div></div><div id=\"fuwud\">";
	$('#newswith')[0].innerHTML = ctopf;
	fwbutto['已发布信息']();
};
newst['政策解读']=function(obj){
	let ctopf = "<div class=\"am-g fw-right-top\"><div class=\"am-u-sm-6\"><button type=\"button\" class=\"am-btn am-btn-default\" onclick=\"ZcButt(this)\">已发布信息</button>&emsp;<button type=\"button\" class=\"am-btn am-btn-default\" onclick=\"ZcButt(this)\">新建信息</button></div></div><div id=\"zcbb\">";
	$('#newswith')[0].innerHTML = ctopf;
	zcbutto['已发布信息']();
};
//政策解答子窗口
function ZcButt(obj){
	let strs = $(obj)[0].innerText;
	// console.log(strs);
	zcbutto[strs](obj);
}

var zcbutto = new Array();
zcbutto['已发布信息']=function(obj){
	var data=[
	{
		'ID':0,
		'创建时间':"2015-11-11",
		'修改时间':"CURRENT_TIMESTAMP",
		'使用时间':"CURRENT_TIMESTAMP",
		'名称':'名称1',
		'说明':'说明1',
		'作者':'作者1',
		'图组':'图组1',
		'分类':0,
		'访问量':111,
		'操作':'<a href=\"\"><i class=\"am-icon-edit\"></i>&ensp;编辑</a>&emsp;&emsp;<a href=\"\"><i class=\"am-icon-trash-o\"></i>&ensp;删除</a>'
	},
	{
		'ID':0,
		'创建时间':"2015-12-12",
		'修改时间':"CURRENT_TIMESTAMP",
		'使用时间':"CURRENT_TIMESTAMP",
		'名称':'名称2',
		'说明':'说明2',
		'作者':'作者2',
		'图组':'图组2',
		'分类':0,
		'访问量':222,
		'操作':'<a href=\"\"><i class=\"am-icon-edit\"></i>&ensp;编辑</a>&emsp;&emsp;<a href=\"\"><i class=\"am-icon-trash-o\"></i>&ensp;删除</a>'
	}];
	var bt={
		'标题':'名称',
		'发布时间':'创建时间',
		'浏览量':'访问量',
		'操作':'图组'
	}
	let cpage = "<div class=\"am-g\"><div class=\"am-u-sm-3\"></div><div class=\"am-u-sm-9\"><button type=\"button\" class=\"am-btn am-btn-default am-btn-xs\">1</button>&nbsp;<button type=\"button\" class=\"am-btn am-btn-default am-btn-xs\">2</button>&nbsp;<button type=\"button\" class=\"am-btn am-btn-default am-btn-xs\">...</button>&nbsp;<button type=\"button\" class=\"am-btn am-btn-default am-btn-xs\">99</button>&nbsp;<button type=\"button\" class=\"am-btn am-btn-default am-btn-xs\">100</button>第 <input type=\"text\" name=\"\" style=\"width:80px\"> 页<button type=\"button\" class=\"am-btn am-btn-primary am-btn-xs\">跳转</button></div></div></div></div>";
	$('#zcbb')[0].innerHTML = CreateTable(bt, data,"am-table am-table-striped am-table-hover")+cpage;
}
zcbutto['新建信息'] = function(obj){
	let ctabl =	"<div class=\"am-g\"><div class=\"am-u-sm-12\"><form class=\"am-form\"><fieldset><div class=\"am-form-group\"><input type=\"text\" class=\"\" id=\"doc-ipt-email-1\" style=\"height:50px\" placeholder=\"请输入文章标题\"></div><div class=\"am-form-group\"><input type=\"email\" class=\"\" id=\"doc-ipt-email-1\" style=\"height:50px\" placeholder=\"请输入作者\"></div><div class=\"am-form-group\"><textarea class=\"\" rows=\"5\" id=\"doc-ta-1\"> 这里开始写正文</textarea></div><div><label for=\"doc-ipt-file-1\">封面和摘要</label><div class=\"am-g\"><div class=\"am-u-sm-4\"><div class=\"am-form-group\"><p>上传的封面图</p><input type=\"file\" id=\"doc-ipt-file-1\"><p class=\"am-form-help\">请选择要上传的封面图</p></div></div><div class=\"am-u-sm-8\"><div class=\"am-form-group\"><textarea class=\"\" rows=\"5\" id=\"doc-ta-1\">填选,如果不填写默认抓取正文前五十个字</textarea></div></div></div></div><p style=\"float:right\"><button type=\"submit\" class=\"am-btn am-btn-default\">保存</button>&emsp;<button type=\"submit\" class=\"am-btn am-btn-default\">发布</button></p></fieldset></form></div></div></div>";
	$('#zcbb')[0].innerHTML = ctabl;
}


//服务动态子窗口
function FwButt(obj){
	let strs = $(obj)[0].innerText;
	// console.log(strs);
	fwbutto[strs](obj);
}
var fwbutto = new Array();
fwbutto['已发布信息']=function(obj){
	var data=[
	{
		'ID':0,
		'创建时间':"2015-11-11",
		'修改时间':"CURRENT_TIMESTAMP",
		'使用时间':"CURRENT_TIMESTAMP",
		'名称':'名称1',
		'说明':'说明1',
		'作者':'作者1',
		'图组':'图组1',
		'分类':0,
		'访问量':111,
		'操作':'<a href=\"\"><i class=\"am-icon-edit\"></i>&ensp;编辑</a>&emsp;&emsp;<a href=\"\"><i class=\"am-icon-trash-o\"></i>&ensp;删除</a>'
	},
	{
		'ID':0,
		'创建时间':"2015-12-12",
		'修改时间':"CURRENT_TIMESTAMP",
		'使用时间':"CURRENT_TIMESTAMP",
		'名称':'名称2',
		'说明':'说明2',
		'作者':'作者2',
		'图组':'图组2',
		'分类':0,
		'访问量':222,
		'操作':'<a href=\"\"><i class=\"am-icon-edit\"></i>&ensp;编辑</a>&emsp;&emsp;<a href=\"\"><i class=\"am-icon-trash-o\"></i>&ensp;删除</a>'
	}];
	var bt={
		'标题':'名称',
		'发布时间':'创建时间',
		'浏览量':'访问量',
		'操作':'图组'
	}
	let cpage = "<div class=\"am-g\"><div class=\"am-u-sm-3\"></div><div class=\"am-u-sm-9\"><button type=\"button\" class=\"am-btn am-btn-default am-btn-xs\">1</button>&nbsp;<button type=\"button\" class=\"am-btn am-btn-default am-btn-xs\">2</button>&nbsp;<button type=\"button\" class=\"am-btn am-btn-default am-btn-xs\">...</button>&nbsp;<button type=\"button\" class=\"am-btn am-btn-default am-btn-xs\">99</button>&nbsp;<button type=\"button\" class=\"am-btn am-btn-default am-btn-xs\">100</button>第 <input type=\"text\" name=\"\" style=\"width:80px\"> 页<button type=\"button\" class=\"am-btn am-btn-primary am-btn-xs\">跳转</button></div></div></div></div>";
	$('#fuwud')[0].innerHTML = CreateTable(bt, data,"am-table am-table-striped am-table-hover")+cpage;
}
fwbutto['新建信息']=function(obj){
	let ctabl =	"<div class=\"am-g\"><div class=\"am-u-sm-12\"><form class=\"am-form\"><fieldset><div class=\"am-form-group\"><input type=\"text\" class=\"\" id=\"doc-ipt-email-1\" style=\"height:50px\" placeholder=\"请输入文章标题\"></div><div class=\"am-form-group\"><input type=\"email\" class=\"\" id=\"doc-ipt-email-1\" style=\"height:50px\" placeholder=\"请输入作者\"></div><div class=\"am-form-group\"><textarea class=\"\" rows=\"5\" id=\"doc-ta-1\"> 这里开始写正文</textarea></div><div><label for=\"doc-ipt-file-1\">封面和摘要</label><div class=\"am-g\"><div class=\"am-u-sm-4\"><div class=\"am-form-group\"><p>上传的封面图</p><input type=\"file\" id=\"doc-ipt-file-1\"><p class=\"am-form-help\">请选择要上传的封面图</p></div></div><div class=\"am-u-sm-8\"><div class=\"am-form-group\"><textarea class=\"\" rows=\"5\" id=\"doc-ta-1\">填选,如果不填写默认抓取正文前五十个字</textarea></div></div></div></div><p style=\"float:right\"><button type=\"submit\" class=\"am-btn am-btn-default\">保存</button>&emsp;<button type=\"submit\" class=\"am-btn am-btn-default\">发布</button></p></fieldset></form></div></div>";
	$('#fuwud')[0].innerHTML = ctabl;
}



//信息管理子窗口
function ZnewsClick(obj){
	let strs = $(obj)[0].innerText;
	znews[strs](obj);
};
var znews = new Array();
znews['已发布信息']=function(obj){
	let ctabl =	"<div class=\"am-u-sm-6\"><form actiom=\"\" class=\"am-form fw-ss\" style=\"width:80%;\"><input type=\"text\" id=\"doc-ipt-email-1\" placeholder=\"搜索\"></form></div></div><div class=\"am-g\"><div class=\"am-u-sm-12\"><table class=\"am-table am-table-striped am-table-hover\"><thead><tr><th>标题</th><th>发布时间</th><th>浏览量</th><th>操作</th></tr></thead>";
	let cdata = "<tbody><tr><td>网上政务服务</td><td>2019/01/01</td><td>1590</td><td><a href=\"\"><i class=\"am-icon-edit\"></i>&ensp;编辑</a>&emsp;&emsp;<a href=\"\"><i class=\"am-icon-trash-o\"></i>&ensp;删除</a></td></tr></tbody></table></div></div>";
	let cend =  "<div class=\"am-g\"><div class=\"am-u-sm-12\">每页显示<button type=\"button\" class=\"am-btn am-btn-default am-btn-xs\">20</button>&nbsp;<button type=\"button\" class=\"am-btn am-btn-default am-btn-xs\">50</button>&nbsp;<button type=\"button\" class=\"am-btn am-btn-default am-btn-xs\">100</button></div></div><br />";
	let cpage = "<div class=\"am-g\"><div class=\"am-u-sm-3\"></div><div class=\"am-u-sm-9\"><button type=\"button\" class=\"am-btn am-btn-default am-btn-xs\">1</button>&nbsp;<button type=\"button\" class=\"am-btn am-btn-default am-btn-xs\">2</button>&nbsp;<button type=\"button\" class=\"am-btn am-btn-default am-btn-xs\">...</button>&nbsp;<button type=\"button\" class=\"am-btn am-btn-default am-btn-xs\">99</button>&nbsp;<button type=\"button\" class=\"am-btn am-btn-default am-btn-xs\">100</button>第 <input type=\"text\" name=\"\" style=\"width:80px\"> 页<button type=\"button\" class=\"am-btn am-btn-primary am-btn-xs\">跳转</button></div></div></div>";

	var data=[
	{
		'ID':0,
		'创建时间':"2015-11-11",
		'修改时间':"CURRENT_TIMESTAMP",
		'使用时间':"CURRENT_TIMESTAMP",
		'名称':'名称1',
		'说明':'说明1',
		'作者':'作者1',
		'图组':'图组1',
		'分类':0,
		'访问量':111,
		'操作':'<a href=\"\"><i class=\"am-icon-edit\"></i>&ensp;编辑</a>&emsp;&emsp;<a href=\"\"><i class=\"am-icon-trash-o\"></i>&ensp;删除</a>'
	},
	{
		'ID':0,
		'创建时间':"2015-12-12",
		'修改时间':"CURRENT_TIMESTAMP",
		'使用时间':"CURRENT_TIMESTAMP",
		'名称':'名称2',
		'说明':'说明2',
		'作者':'作者2',
		'图组':'图组2',
		'分类':0,
		'访问量':222,
		'操作':'<a href=\"\"><i class=\"am-icon-edit\"></i>&ensp;编辑</a>&emsp;&emsp;<a href=\"\"><i class=\"am-icon-trash-o\"></i>&ensp;删除</a>'
	}];
	var bt={
		'标题':'名称',
		'发布时间':'创建时间',
		'浏览量':'访问量',
		'操作':'图组'
	}

	$('#xxfbz')[0].innerHTML = CreateTable(bt, data,"am-table am-table-striped am-table-hover")+cpage;
};
znews['新建信息']=function(obj){
	let ctabl =	"<div class=\"am-g\"><div class=\"am-u-sm-12\"><form class=\"am-form\"><fieldset><div class=\"am-form-group\"><input type=\"text\" class=\"\" id=\"doc-ipt-email-1\" style=\"height:50px\" placeholder=\"请输入文章标题\"></div><div class=\"am-form-group\"><input type=\"email\" class=\"\" id=\"doc-ipt-email-1\" style=\"height:50px\" placeholder=\"请输入作者\"></div><div class=\"am-form-group\"><div id=\"editor\"></div></div><div><label for=\"doc-ipt-file-1\">封面和摘要</label><div class=\"am-g\"><div class=\"am-u-sm-4\"><div class=\"am-form-group\"><p>上传的封面图</p><input type=\"file\" id=\"doc-ipt-file-1\"><p class=\"am-form-help\">请选择要上传的封面图</p></div></div><div class=\"am-u-sm-8\"><div class=\"am-form-group\"><textarea class=\"\" rows=\"5\" id=\"doc-ta-1\">填选,如果不填写默认抓取正文前五十个字</textarea></div></div></div></div><p style=\"float:right\"><button type=\"submit\" class=\"am-btn am-btn-default\">保存</button>&emsp;<button type=\"submit\" class=\"am-btn am-btn-default\">发布</button></p></fieldset></form></div></div>";
	$('#xxfbz')[0].innerHTML = ctabl;
};



function BnewsClick(obj){
	let strs = $(obj)[0].innerHTML;
	znewb[strs](obj);
	// console.log(strs);
};

var znewb = new Array();
znewb['服务管理']=function(obj){
	var data=[
	{
		'ID':0,
		'创建时间':"2015-11-11",
		'修改时间':"CURRENT_TIMESTAMP",
		'使用时间':"CURRENT_TIMESTAMP",
		'名称':'名称1',
		'说明':'说明1',
		'作者':'作者1',
		'图组':'图组1',
		'分类':0,
		'访问量':111,
		'操作':'<a href=\"\"><i class=\"am-icon-edit\"></i>&ensp;编辑</a>&emsp;&emsp;<a href=\"\"><i class=\"am-icon-trash-o\"></i>&ensp;删除</a>'
	},
	{
		'ID':0,
		'创建时间':"2015-12-12",
		'修改时间':"CURRENT_TIMESTAMP",
		'使用时间':"CURRENT_TIMESTAMP",
		'名称':'名称2',
		'说明':'说明2',
		'作者':'作者2',
		'图组':'图组2',
		'分类':0,
		'访问量':222,
		'操作':'<a href=\"\"><i class=\"am-icon-edit\"></i>&ensp;编辑</a>&emsp;&emsp;<a href=\"\"><i class=\"am-icon-trash-o\"></i>&ensp;删除</a>'
	}];
	var bt={
		'标题':'名称',
		'发布时间':'创建时间',
		'浏览量':'访问量',
		'操作':'图组'
	}
	let cpage = "<div class=\"am-g\"><div class=\"am-u-sm-3\"></div><div class=\"am-u-sm-9\"><button type=\"button\" class=\"am-btn am-btn-default am-btn-xs\">1</button>&nbsp;<button type=\"button\" class=\"am-btn am-btn-default am-btn-xs\">2</button>&nbsp;<button type=\"button\" class=\"am-btn am-btn-default am-btn-xs\">...</button>&nbsp;<button type=\"button\" class=\"am-btn am-btn-default am-btn-xs\">99</button>&nbsp;<button type=\"button\" class=\"am-btn am-btn-default am-btn-xs\">100</button>第 <input type=\"text\" name=\"\" style=\"width:80px\"> 页<button type=\"button\" class=\"am-btn am-btn-primary am-btn-xs\">跳转</button></div></div></div></div></div>";
	$('#bmfwg')[0].innerHTML = CreateTable(bt, data,"am-table am-table-striped am-table-hover")+cpage;
}
znewb['服务机构管理']=function(obj){
	let ctopf = "<div class=\"am-g fw-right-top fw-right-jg\"><div class=\"am-u-sm-6\"><button type=\"button\" onclick=\"BnewsClick(this)\" class=\"am-btn am-btn-default am-btn-lg\">服务管理</button>&emsp;&emsp;<button type=\"button\" onclick=\"BnewsClick(this)\" class=\"am-btn am-btn-default am-btn-lg\">服务机构管理</button>&emsp;&emsp;</div></div><div id=\"bmfwg\">";
	var data=[
	{
		'ID':0,
		'创建时间':"2015-11-11",
		'修改时间':"CURRENT_TIMESTAMP",
		'使用时间':"CURRENT_TIMESTAMP",
		'名称':'名称1',
		'说明':'说明1',
		'作者':'作者1',
		'图组':'图组1',
		'分类':0,
		'访问量':111,
		'操作':'<a href=\"\"><i class=\"am-icon-edit\"></i>&ensp;编辑</a>&emsp;&emsp;<a href=\"\"><i class=\"am-icon-trash-o\"></i>&ensp;删除</a>'
	},
	{
		'ID':0,
		'创建时间':"2015-12-12",
		'修改时间':"CURRENT_TIMESTAMP",
		'使用时间':"CURRENT_TIMESTAMP",
		'名称':'名称2',
		'说明':'说明2',
		'作者':'作者2',
		'图组':'图组2',
		'分类':0,
		'访问量':222,
		'操作':'<a href=\"\"><i class=\"am-icon-edit\"></i>&ensp;编辑</a>&emsp;&emsp;<a href=\"\"><i class=\"am-icon-trash-o\"></i>&ensp;删除</a>'
	},
	{
		'ID':0,
		'创建时间':"2015-12-12",
		'修改时间':"CURRENT_TIMESTAMP",
		'使用时间':"CURRENT_TIMESTAMP",
		'名称':'名称3',
		'说明':'说明3',
		'作者':'作者3',
		'图组':'图组3',
		'分类':0,
		'访问量':222,
		'操作':'<a href=\"\"><i class=\"am-icon-edit\"></i>&ensp;编辑</a>&emsp;&emsp;<a href=\"\"><i class=\"am-icon-trash-o\"></i>&ensp;删除</a>'
	}];
	var bt={
		'标题':'名称',
		'发布时间':'创建时间',
		'浏览量':'访问量',
		'操作':'图组'
	}
	let cpage = "<div class=\"am-g\"><div class=\"am-u-sm-3\"></div><div class=\"am-u-sm-9\"><button type=\"button\" class=\"am-btn am-btn-default am-btn-xs\">1</button>&nbsp;<button type=\"button\" class=\"am-btn am-btn-default am-btn-xs\">2</button>&nbsp;<button type=\"button\" class=\"am-btn am-btn-default am-btn-xs\">...</button>&nbsp;<button type=\"button\" class=\"am-btn am-btn-default am-btn-xs\">99</button>&nbsp;<button type=\"button\" class=\"am-btn am-btn-default am-btn-xs\">100</button>第 <input type=\"text\" name=\"\" style=\"width:80px\"> 页<button type=\"button\" class=\"am-btn am-btn-primary am-btn-xs\">跳转</button></div></div></div></div></div>";
	$('#bmfwg')[0].innerHTML = CreateTable(bt, data,"am-table am-table-striped am-table-hover")+cpage;
}






















function funtst(){
	let arr= new Array;
	arr['ID']='>0';
	bequery(Get文章, arr, '查询ID>0的所有数据');
}


funCallBack[Get文章分类] = function(arr, other){
	
};
funCallBack[Get服务] = function(arr, other){
	
};

funCallBack[Get人员特长] = function(arr, other){
	
};
funCallBack[Get律师] = function(arr, other){
	
};

funCallBack[Add文章] = function(arr, other){
	console.log(arr,otherarr);
};
funCallBack[Add文章分类] = function(arr, other){
	
};
funCallBack[Add服务] = function(arr, other){
	
};
funCallBack[Add机构] = function(arr, other){
	
};
funCallBack[Add用户] = function(arr, other){
	
};
funCallBack[Add人员特长] = function(arr, other){
	
};
funCallBack[Add律师] = function(arr, other){
	
};

funCallBack[Up文章] = function(arr, other){
	console.log(arr,other);
};
funCallBack[Up文章分类] = function(arr, other){
	
};
funCallBack[Up服务] = function(arr, other){
	
};
funCallBack[Up机构] = function(arr, other){
	
};
funCallBack[Up用户] = function(arr, other){
	
};
funCallBack[Up人员特长] = function(arr, other){
	
};
funCallBack[Up律师] = function(arr, other){
	
};

function bequery(value = 0, commond='', other=null, yibu = true){
	var arrd = new Array();
	$.ajax({
		async:yibu,// 异步执行
		url: '/',
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
			funCallBack[Number(value)](arr, other);
		},
		error: function(xhr,textStatus){
			console.log("err");
/*        console.log('错误', xhr.responseText)；
        console.log(xhr)；
        console.log(textStatus)；*/
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

function delkeys(arr){
	let k = Object.keys(arr);
	var ret = new Array();
	for(let i = 0; i < k.length; i++){
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
function CreateTable(th, data, cls, id, other){
	var ret=addOther("<table", cls, id, other);
	ret += "><thead><tr>";
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
function CreateButton(name, cls, blg, mimg, id, other){
	let ret = '<li>' + name + '</li></div>';
	if(mimg){
		ret = '><img src=\'' + mimg + '\'/>' + ret;
	}else{
		ret ='>' + ret;
	}
	if(other) ret = ' ' + other + ret;
	if(id) ret = ' id=\'' + id + '\'' + ret;
	if(blg) ret = ' style="background-image: url(' + blg +')"' + ret;
	if(cls) ret = ' class="' + cls + '"' + ret;
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
//		tmp = "CreatePages(this, sum, "+obj2[i].innerHTML+", max, now, cls, id, other)";
		tmp = "CreatePages(this, '"+sum+"', '"+num+"', '"+max+"', '"+obj2[i].innerHTML+"', '"+fun+"', '"+other+"',);";
		
		obj2.eq(i).attr('onclick', tmp);
	}
	
}
function cb(val){
	console.log('新的函数返回', val);
}
//CreatePages($('body')[0],100, 40, 6, 2, "cb(callbackval)");

















