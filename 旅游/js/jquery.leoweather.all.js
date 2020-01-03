function Weather2Arr(weather){
	var ret=[], today = new Date();
	ret.城市=weather.city;
ret.年=Number(today.getYear());
if (ret.年 < 1900) ret.年 += 1900;
ret.月=today.getMonth();
ret.日=today.getDate();
ret.时=today.getHours();
ret.分=today.getMinutes();
ret.秒=today.getSeconds();
var ww = today.getDay();
if (ww == 0) ww = '日';
if (ww == 1) ww = '一';
if (ww == 2) ww = '二';
if (ww == 3) ww = '三';
if (ww == 4) ww = '四';
if (ww == 5) ww = '五';
if (ww == 6) ww = '六';
var hh = today.getHours(),xx='';
if (hh < 06) {
	xx = '凌晨';
} else if (hh < 09) {
	xx = '早上';
} else if (hh < 12) {
	xx = '上午';
} else if (hh < 14) {
	xx = '中午';
} else if (hh < 17) {
	xx = '下午';
} else if (hh < 19) {
	xx = '傍晚';
} else {
	xx = '晚上';
};
ret.时段=xx;
	ret.空气指数=weather.data[0].air;
	ret.空气等级=weather.data[0].air_level;
	ret.空气提示=weather.data[0].air_tips;
	ret.空气湿度=weather.data[0].humidity;
	ret.警报=[];
	ret.警报.报警内容=weather.data[0].alarm.alarm_content;
	ret.警报.报警级别=weather.data[0].alarm.alarm_level;
	ret.警报.报警类型=weather.data[0].alarm.alarm_type;
	ret.紫外线指数=weather.data[0].index[0].level;
	ret.紫外线提示=weather.data[0].index[0].desc;
	ret.穿衣指数=weather.data[0].index[3].level;
	ret.穿衣提示=weather.data[0].index[3].desc;
	ret.洗车指数=weather.data[0].index[4].level;
	ret.洗车提示=weather.data[0].index[4].desc;

	ret.周=weather.data[0].week;
	ret.星期=weather.data[0].week;
	ret.日期=weather.data[0].day;
	ret.日期f=weather.data[0].date;
	ret.天气=weather.data[0].wea;
	ret.图标=weather.data[0].wea_img;
	ret.当前气温=weather.data[0].tem;
	ret.最高气温=weather.data[0].tem1;
	ret.最低气温=weather.data[0].tem2;
	ret.风向=weather.data[0].win[0];
	ret.风级=weather.data[0].win_speed;
	for(let i=1; i<weather.data.length; i++){
		ret['周'+i]=weather.data[i].week;
		ret['星期'+i]=weather.data[i].week;
		ret['日期'+i]=weather.data[i].day;
		ret['日期f'+i]=weather.data[i].date;
		ret['天气'+i]=weather.data[i].wea;
		ret['图标'+i]=weather.data[i].wea_img;
		ret['当前气温'+i]=weather.data[i].tem;
		ret['最高气温'+i]=weather.data[i].tem1;
		ret['最低气温'+i]=weather.data[i].tem2;
		ret['风向'+i]=weather.data[i].win[0];
		ret['风级'+i]=weather.data[i].win_speed;
	}
	return ret;
}


//	时间：	{时段}{年}{月}{日}{时}{分}{秒}{周}
//	天气： {城市}{天气}{气温}{风向}{风级}{图标}{最高气温}{最低气温}{}{}{}{}{}{}{}
//	图标：	自己去选取样式网址，https://www.tianqiapi.com/diy.php?style=ya
function Getweather(vcity, is=false){
	var ret, data;
	$.ajax({
		async:false,
		type: 'post',
		url: 'https://www.tianqiapi.com/api/?version=v1&appid=86986721&appsecret=eXm5G85Y&city='+vcity,
		dataType: "json",
		success: function(w) {
			if(is){
				console.log(w);
				return w;
			}
			data=w;
		}
	});
	if(is)return;
	alldata=data;
	ret=Weather2Arr(data);
	return ret;
}

String.prototype.balance=function(begin,end){
	var a=0,b=0,c=0,d,e=0,i=0,ret=[],str=this;
	a=this.indexOf(begin);
	if(a<0)return;
	b=a;
	while(a>0){
		i++;
		a=this.indexOf(begin, a+begin.length);
	}
	while(i && c>-1){
		i--;
		c=this.indexOf(end, c+end.length);
	}
	
	if(c<0){
		while(i){
			str += end;
			i--;
		}
		c=str.length;
	};
	ret.a=b;
	ret.b=c;
	return ret;
};

(function($) {
	$.fn.setobj = function(data, txt) {
		var str = this[0].other;
		if(txt) str=txt;
		else if(!str){str=this[0].innerHTML;}
		this.html(str.setobj(data));
	}
})(jQuery);
String.prototype.readKey=function(key){
	var a=this.indexOf(key+'='),b;
	if(a<0)return null;
	a += key.length+2;
	b=this.indexOf('"', a)
	return(this.substr(a,b-a));
}
String.prototype.gethtml=function(objname){
	var ret=[],a,b,c,str=this, lstr;
	ret=str.balance('<'+objname, '</'+objname);
	if(ret==undefined)return;
	str=str.substr(ret.a, ret.b-ret.a);
	a=str.indexOf('>')+1;
	lstr=str.substr(0, a);
	str=str.substr(a);
	begin=this.substr(0,ret.a);
	end=this.substr(ret.b);
	end=end.substr(end.indexOf('>')+1);
	ret={a: begin,b:lstr, c:str, d:end};
	return ret;
}
String.prototype.setobj=function(data){
	var ret = '',str=this, lstr='', tmp, d;
	str=str.replace(/\{\" /g,'{"');
	str=str.replace(/\{\' /g,'{\'');
	
	d=str.gethtml('loop');
	var code='',a,b,c;
	if(d){
		var len=Number(d.b.readKey('len')),i=Number(d.b.readKey('begin')), arr, key='',tree=d.b.readKey('tree');
		if(tree){
			eval('arr=data'+tree+';');
			key=Object.keys(arr);
			if(!len)len=key.length;
		}
		if(d.c.indexOf('<loop')>-1){
			d.c = d.c.setobj(data,tree);
		}
		for(;i<len;i++){
			tmp = d.c.replace(/\{loop_key\}/g, key[i]);
			ret += tmp.replace(/\{loop_value\}/g, arr[key[i]]);
		}
		ret = d.a+ret+d.d;
	}
	ret=str.replace(/\{(.*?)\}/g, function() {
		code='ret=data', ret='';
		if(arguments[1].indexOf('[')<0 || arguments[1].indexOf('.')<0){
			code += '['+arguments[1]+'];';
		}else{
			code += arguments[1]+';';
		}
		eval(code);
		if(ret === undefined){
			console.log(code);
			ret=arguments[0];
		}
		return ret;
	});
	return ret;
};















