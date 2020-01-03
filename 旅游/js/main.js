const JSON_HEX_QUOT = 8,
	JSON_HEX_TAG = 1,
	JSON_HEX_AMP = 2,
	JSON_HEX_APOS = 4,
	JSON_NUMERIC_CHECK = 32,
	JSON_UNESCAPED_SLASHES = 64,
	JSON_UNESCAPED_UNICODE = 256,
	JSON_FORCE_OBJECT = 16;

function json_encode(val, options = 0) {
	var gettype = Object.prototype.toString;
	switch (gettype.call(val)) {
		case '[object String]':
			return json_escape_string(val, options);
			break;
		case '[object Number]':
			if (val % 1 === 0) {
				return val;
			} else {
				return isFinite(val) ? val : 0;
			}
			break;
		case '[object Boolean]':
			return val ? true : false;
			break;
		case '[object Undefined]':
			return null;
			break;
		case '[object Null]':
			return null;
			break;
		case '[object Object]':
			return json_encode_array(val, options);
			break;
		case '[object Array]':
			return json_encode_array(val, options);
			break;
		case '[object Function]':
			return null;
			break;
		default:
			return null;
			break;
	}
}

function json_escape_string(val, options) {
	var pos = 0;
	var len = val.length;
	if (len == 0) {
		return '""';
	}
	if (options & JSON_NUMERIC_CHECK) {
		if (!isNaN(parseInt(val))) {
			if (val % 1 === 0) {
				return val;
			} else {
				return isFinite(val) ? val : 0;
			}
		}
	}
	if (len == null) {
		return null;
	} else if (len == 0) {
		return '""';
	}
	var result = '"';
	while (pos < len) {
		us = val.charAt(pos);
		switch (us) {
			case '"':
				if (options & JSON_HEX_QUOT) {
					result += "\\u0022";
				} else {
					result += "\\\"";
				}
				break;
			case '\\':
				result += "\\\\";
				break;
			case '/':
				if (options & JSON_UNESCAPED_SLASHES) {
					result += us;
				} else {
					result += "\\/";
				}
				break;
			case '\b':
				result += "\\b";
				break;
			case '\f':
				result += "\\f";
				break;
			case '\n':
				result += "\\n";
				break;
			case '\r':
				result += "\\r";
				break;
			case '\t':
				result += "\\t";
				break;
			case '<':
				if (options & JSON_HEX_TAG) {
					result += "\\u003C";
				} else {
					result += '<';
				}
				break;
			case '>':
				if (options & JSON_HEX_TAG) {
					result += "\\u003E";
				} else {
					result += '>';
				}
				break;
			case '&':
				if (options & JSON_HEX_AMP) {
					result += "\\u0026";
				} else {
					result += '&';
				}
				break;
			case '\'':
				if (options & JSON_HEX_APOS) {
					result += "\\u0027";
				} else {
					result += '\'';
				}
				break;
			default:
				if ((us >= ' ' && (us & 127) == us) || IsDigit(us) || IsAlpha(us) || (options & JSON_UNESCAPED_UNICODE)) {
					result += us;
				} else { /*result += "\\u00"+parseInt(us.charCodeAt(0),10).toString(16);*/
					let tmp = parseInt(us.charCodeAt(0), 10).toString(16);
					while (tmp.length < 4) {
						tmp = '0' + tmp;
					}
					result += "\\u" + tmp;
				}
				break;
		}
		pos++;
	}
	result += '"';
	return result;
}

function IsDigit(cCheck) {
	return (('0' <= cCheck) && (cCheck <= '9'));
}

function IsAlpha(cCheck) {
	return ((('a' <= cCheck) && (cCheck <= 'z')) || (('A' <= cCheck) && (cCheck <= 'Z')))
}

function is_index_array(val, options) {
	if (options & JSON_FORCE_OBJECT) {
		return false;
	}
	var index = 0;
	for (var item in val) {
		if (item == index) {
			index++;
		} else {
			return false;
		}
	}
	return true;
}

function json_encode_array(val, options) {
	if (!is_index_array(val, options)) {
		var result = '{';
	} else {
		var result = '[';
	}
	if (!is_index_array(val, options)) {
		for (var item in val) {
			result += json_encode(item, options) + ':' + json_encode(val[item], options);
			result += ',';
		}
	} else {
		for (var item in val) {
			result += json_encode(val[item]);
			result += ',';
		}
	}
	if (result.length > 1) {
		result = result.substring(0, result.length - 1)
	}
	if (!is_index_array(val, options)) {
		result += '}';
	} else {
		result += ']';
	}
	return result;
}

String.prototype.balance = function(begin, end) {
	var a = 0,
		b = 0,
		c = 0,
		d, e = 0,
		i = 0,
		ret = [],
		str = this;
	a = this.indexOf(begin);
	if (a < 0) return;
	b = a;
	while (a > 0) {
		i++;
		a = this.indexOf(begin, a + begin.length);
	}
	while (i && c > -1) {
		i--;
		c = this.indexOf(end, c + end.length);
	}

	if (c < 0) {
		while (i) {
			str += end;
			i--;
		}
		c = str.length;
	};
	ret.a = b;
	ret.b = c;
	return ret;
};

(function($) {
	$.fn.setobj = function(data, txt) {
		var str = this[0].other;
		if (txt) str = txt;
		else if (!str) {
			str = this[0].innerHTML;
		}
		this.html(str.setobj(data));
	}
})(jQuery);
String.prototype.readKey = function(key) {
	var a = this.indexOf(key + '='),
		b;
	if (a < 0) return null;
	a += key.length + 2;
	b = this.indexOf('"', a)
	return (this.substr(a, b - a));
}
String.prototype.gethtml = function(objname) {
	var ret = [],
		a, b, c, str = this,
		lstr;
	ret = str.balance('<' + objname, '</' + objname);
	if (ret == undefined) return;
	str = str.substr(ret.a, ret.b - ret.a);
	a = str.indexOf('>') + 1;
	lstr = str.substr(0, a);
	str = str.substr(a);
	begin = this.substr(0, ret.a);
	end = this.substr(ret.b);
	end = end.substr(end.indexOf('>') + 1);
	ret = {
		a: begin,
		b: lstr,
		c: str,
		d: end
	};
	return ret;
}
String.prototype.setobj = function(data) {
	var ret = '',
		str = this,
		lstr = '',
		tmp, d;
	str = str.replace(/\{\" /g, '{"');
	str = str.replace(/\{\' /g, '{\'');

	d = str.gethtml('loop');
	var code = '',
		a, b, c;
	if (d) {
		var len = Number(d.b.readKey('len')),
			i = Number(d.b.readKey('begin')),
			arr, key = '',
			tree = d.b.readKey('tree');
		if (tree) {
			eval('arr=data' + tree + ';');
			key = Object.keys(arr);
			if (!len) len = key.length;
		}
		if (d.c.indexOf('<loop') > -1) {
			d.c = d.c.setobj(data, tree);
		}
		for (; i < len; i++) {
			tmp = d.c.replace(/\{loop_key\}/g, key[i]);
			ret += tmp.replace(/\{loop_value\}/g, arr[key[i]]);
		}
		ret = d.a + ret + d.d;
	}
	ret = str.replace(/\{(.*?)\}/g, function() {
		code = 'ret=data', ret = '';
		if (arguments[1].indexOf('[') < 0 && arguments[1].indexOf('.') < 0) {
			code += '[' + arguments[1] + '];';
		} else {
			code += arguments[1] + ';';
		}
		eval(code);
		if (ret === undefined) {
			console.log(code, ret);
			ret = arguments[0];
			console.log(ret, code);
		}
		return ret;
	});
	return ret;
};


const login = 0,
	regdit = 1,
	Getitem = 1001,
	Getuser = 1002,
	Get交易记录 = 1003,
	Get商品类型 = 1004,
	Get商品评价 = 1005,
	Get购物车 = 1006,
	Get服务承诺 = 1007,
	Get车型 = 1008,
	Get预订须知 = 1009,
	Get权限 = 1100,
	Additem = 2001,
	Adduser = 2002,
	Add交易记录 = 2003,
	Add商品类型 = 2004,
	Add商品评价 = 2005,
	Add购物车 = 2006,
	Add服务承诺 = 2007,
	Add车型 = 2008,
	Add预订须知 = 2009,
	Add权限 = 2100,
	Upitem = 3001,
	Upuser = 3002,
	Up交易记录 = 3003,
	Up商品类型 = 3004,
	Up商品评价 = 3005,
	Up购物车 = 3006,
	Up服务承诺 = 3007,
	Up车型 = 3008,
	Up预订须知 = 3009,
	Up权限 = 3100;
odata = [];
//bequery(0,{});
function getodata(val, index) {
	var arr = odata[val],
		ret = [],
		r2 = [],
		t, j;
	if (!arr) return;
	index = Number(index);
	for (let i = 0; i < arr.length; i++) {
		t = Number(arr[i]['节点']);
		if (!index || ((index & t) == t)) {
			ret.push(function(arr) {
				let ret = [];
				ret['标题'] = arr['标题'];
				ret['内容'] = arr['内容'];
				ret['节点'] = Number(arr['节点']);
				return ret;
			}(arr[i]));
		}
	}
	return ret;
}

msgtxt = '';

function httpget(url = '/', yibu = true) {
	var arrd = new Array();
	$.ajax({
		async: yibu, // 异步执行
		url: url,
		type: 'GET',
		datatype: "json",
		success: function(msg) {
			msgtxt = msg;
			return;
		},
		error: function(xhr, textStatus) {
			console.log("err");
		}
	})
}
httpget('/1.html');

function runurljs(url = '/', yibu = true) {
	var arrd = new Array();
	$.ajax({
		async: yibu, // 异步执行
		url: url,
		type: 'GET',
		datatype: "json",
		success: function(msg) {
			eval(msg);
			return;
		},
		error: function(xhr, textStatus) {
			console.log("err");
		}
	})
}
LastCmd = '';
LastVal = '';

function bequery(value = 0, commond = '', other = null, yibu = true) {
	LastCmd = commond;
	LastVal = value;
	var arrd = new Array();
	$.ajax({
		async: yibu, // 异步执行
		url: '/q.php',
		type: 'POST',
		data: {
			val: value,
			cmd: encodeURIComponent(json_encode(commond))
		},
		datatype: "json",
		success: function(msg) {
			let arr = msg;
			try {
				arr = JSON.parse(msg, true);

			} catch (err) {
				// console.log(err);
				console.log(value, commond, other,msg);
				return;
			}
			switch (other) {
				case 'manager':
					manager(arr, value);
					return;
				case 'CreateItem':
					CreateItem(arr, value);
					return;
			}
			if (msg == 'true' || msg == 'false') {
				funCallBack[value](msg, other, value, commond);
				return;
			}
			let val = Number(value);
			if (val < 101) {
				odata = arr;
			} else if (val > 2000) {
				console.log('运行other', other);
				eval(other);
			} else if (val>1000 && $('#zbl').length) {
				if (!other) {
					other = $('#' + val)[0];
				}
				AllManagerClick(arr, other);
			} else funCallBack[value](arr, other, value, commond);
		},
		error: function(xhr, textStatus) {
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
			ret = json.parse(res); // 失败为false 成功为文件路径 例如: upload/123.jpg
		},
		error: function(err) {
			alert("网络连接失败,稍后重试", err);
		}
	})
	return false;
}

function GetTextImg(val) {
	if (!val) val = $('#详情')[0].value;
	var re = /src="([^"]*)"/g;
	var ret = [],
		arrt = [];
	while (arrt = re.exec(val)) {
		ret[ret.length] = arrt[1];
	}
	return ret;
}
var mfun = new Array();
var funCallBack = new Array();
var alltmp = 0;
var otherarr = false;

function arrcat(a1, a2) {
	var ret = a1;
	var arr = Object.keys(a2);
	for (let i = 0; i < arr.length; i++) {
		ret[arr[i]] = a2[arr[i]];
	}
	return ret;
}

function toarr(val) {
	var ret = new Array();
	var arr = Object.keys(val);
	for (let i = 0; i < arr.length; i++) {
		ret[arr[i]] = val[arr[i]];
	}
	return ret;
}

function delarr(val, key) {
	var ret = new Array();
	var arr = Object.keys(val);
	for (let i = 0; i < arr.length; i++) {
		if (arr[i] == key) continue;
		ret[arr[i]] = val[arr[i]];
	}
	return ret;
}

function CallBackFristExe(arr, other, Pointer) {
	if (typeof(arr[0]) != 'undefined' && typeof(arr[0]['count(*)']) != 'undefined') {
		obj = $(other);
		obj.append('<div></div>');
		CreatePages(obj.children('div')[1], arr[0]['count(*)'], 10, 6, 1, 'funCallBack[' + Pointer + '](callbackval)');
		return true;
	}
	if (typeof(other) == 'undefined') {
		let a = toarr({
			'limit': arr
		});
		if (otherarr) {
			a = arrcat(a, otherarr);
		}
		bequery(Pointer, a, obj.children('div')[0]);
		return true;
	}
	return false;
}

function addcss(val) {
	$("<link>")
		.attr({
			rel: "stylesheet",
			type: "text/css",
			href: val
		})
		.appendTo("head");
}

function delkeys(arr) {
	let k = Object.keys(arr);
	var ret = new Array();
	for (let i = 0; i < k.length; i++) {
		ret[i] = arr[k[i]];
	}
	return ret;
}

function dbdelkeys(arr) {
	for (let i = 0; i < arr.length; i++) {
		arr[i] = delkeys(arr[i]);
	}
	return arr;
}

function addOther(ret, cls, id, other) {
	if (cls) {
		ret += " class='" + cls + "'";
	}
	if (id) {
		ret += " id='" + id + "'";
	}
	if (other) {
		ret += " " + other;
	}
	return ret;
}

function CreateTable(data, th, cls, id, other) {
	var ret = addOther("<table", cls, id, other),
		t;
	ret += "><thead><tr>";
	if (!th) {
		if (data.length < 1) return '';
		th = [];
		t = Object.keys(data[0]);
		for (let i = 0; i < t.length; i++) {
			th[t[i]] = t[i];
		}
	}
	var keys = Object.keys(th);

	for (let i = 0; i < keys.length; i++) {
		ret += "<th>" + keys[i] + "</th>";
	}
	keys = delkeys(th);
	ret += "</tr></thead><tbody>"
	for (let i = 0; i < data.length; i++) {
		ret += function(data, res) {
			var ret = "<tr>";
			for (let i = 0; i < res.length; i++) {
				ret += "<td><textarea rows='1' readonly='readonly'>" + data[res[i]] + "</textarea></td>";
			}
			ret += "</tr>";
			return ret;
		}(data[i], keys);
	}
	ret += "</tbody></table>";
	return ret;
}

function CreateButton(name, cls = 'topbtnothercss', blg, mimg, id, other) {
	let ret = '<p>' + name + '</p></div>';
	if (mimg) {
		ret = '><img src=\'' + mimg + '\'/>' + ret;
	} else {
		ret = '>' + ret;
	}
	if (other) ret = ' ' + other + ret;
	if (id) ret = ' id=' + id + ret;
	if (blg) ret = ' style="background-image: url(' + blg + ')"' + ret;
	ret = ' class="button ' + cls + '"' + ret;
	ret = '<div ' + ret;
	return ret;
};

function CreateButtonMin(title, cls, id, other) {
	var ret = addOther("<button", cls, id, other) + ">";
	ret += title + "</button>";
	return ret;
}

function CreatePages(sum, num, max, now = 1, fun = '', other = '') {
	sum = Number(sum);
	num = Number(num);
	max = Number(max);
	now = Number(now);
	//	if(typeof(obj)!='object')return;
	if (sum < 1) sum = 1;
	if (num < 1) num = 1;
	if (max < 5) max = 5;
	if (now < 1) now = 1;
	/*	if(String(Number(obj.innerHTML))===obj.innerHTML){
			obj= obj.parentNode.parentNode;
		}*/
	var ret = "<div " + other + ">";
	var clicktmp = " onclick=\"" + fun + "\"";
	var tmp = false,
		t = 0;
	if (now === 1) tmp = "disabled='disabled'";
	tmp += clicktmp;
	var z = Math.ceil(sum / num),
		k = 0;
	if (now > z) {
		now = z
	};
	if (now > z) {
		now = z;
	}
	k = z < max ? z : max;
	let j = k - 2;
	ret += "<button value='0," + (num - 1) + "'" + tmp + ">1</button>";
	var a = now - Math.ceil(j / 2);
	if (a < 2) a = 2;
	var b = a + j;
	b = b < z ? b : z;
	if (b - a < max - 2) a = b - max + 2;
	if (a < 2) a = 2;
	if (a > 2) ret += "...";
	while (a <= b || a == z) {
		if (now == a) tmp = "disabled='disabled'";
		else tmp = false;
		t = a * num;
		t = t < sum ? t : sum;
		tmp += clicktmp;
		ret += "<button value='" + ((a - 1) * num) + "," + (t - 1) + "'" + tmp + ">" + a + "</button>";
		a++;
	}
	if (a < z) {
		if (now == z) tmp = "disabled='disabled'";
		else tmp = false;
		tmp += clicktmp;
		ret += "...<button value='" + ((z - 1) * num) + "," + (sum - 1) + "'" + tmp + ">" + z + "</button>";
	}
	ret += "第<input style='width:30px' value='" + now + "'/>页</div>";
	return ret;
}
/*↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓*/

var alltemp;
app = '';
if (typeof(angular) != 'undefined') app = angular.module('appdate', ["wui.date"]);

function SetTime(val) {
	起始时间.value = val;
}
// var arr2= {"ID":"3","\u521b\u5efa\u65f6\u95f4":"2019\u002d11\u002d21 14\u003a24\u003a27","\u4fee\u6539\u65f6\u95f4":"2019\u002d12\u002d17 17\u003a49\u003a41","\u4f7f\u7528\u65f6\u95f4":"2019\u002d11\u002d21 14\u003a24\u003a27","\u5f52\u5c5e\u7528\u6237":"1","\u5546\u54c1\u7c7b\u578b":"1","\u8d77\u59cb\u65f6\u95f4":"2019\u002d11\u002d21 10\u003a03\u003a05","\u7ec8\u6b62\u65f6\u95f4":"2019\u002d11\u002d21 10\u003a03\u003a53","\u8d77\u59cb\u5730\u5740":"<textarea>\u4f26\u6566","\u7ec8\u6b62\u5730\u5740":"\u7231\u4e01\u5821gfdsgsdfg","\u4ef7\u683c":"2888","\u6743\u91cd":"2","\u6d4f\u89c8\u91cf":"0","\u5546\u54c1\u540d\u79f0":"\u4f26\u6566\u002d\u7231\u4e01\u5821\u62fc\u8f66\u6e38","\u9014\u7ecf":"\u8bae\u4f1a\u5927\u697c\u002d\u4e2d\u592e\u5e7f\u573a","\u9884\u8ba2\u987b\u77e5":"0","\u670d\u52a1\u627f\u8bfa":"9","\u8ba1\u4ef7\u5355\u4f4d":"\u5143\/\u4eba","\u4eba\u6570":"2","\u8f66\u578b":"7","\u56fe\u793a":["1\u002ejpg","2\u002ejpg","3\u002ejpg","4\u002ejpg"],"\u8be6\u60c5":"<p>\n\t\u7b2c\u4e00\u7ad9\uff1a<strong>\u7f57\u9a6c\u6597\u517d\u573a<\/strong> \u7f57\u9a6c\u6597\u517d\u573a\uff08Colosseo\uff09\u53c8\u8bd1\u4f5c\u53e4\u7f57\u9a6c\u6597\u517d\u573a\u3001\u7f57\u9a6c\u5927\u89d2\u6597\u573a\u3001\u7f57\u9a6c\u5706\u5f62\u7ade\u6280\u573a\u3001\u79d1\u6d1b\u897f\u59c6\uff1b\u539f\u540d\u5f17\u83b1\u6587\u5706\u5f62\u5267\u573a\uff0c\u62c9\u4e01\u8bed\uff1aAnfiteatrFlavio \/ Amphitheatrvm falvvm\uff09\u7ade\u6280\u573a\u7684\u540d\u79f0\u6765\u6e90\u201cColossus\u201d\u672c\u6765\u89e3\u4f5c\u5de8\u50cf\uff0c\u56e0\u4e3a\u5c3c\u7984\u65f6\u671f\u6b64\u5904\u6709\u4e00\u5ea7\u4ed6\u672c\u4eba\u7684\u5de8\u50cf\u3002\u662f\u53e4\u7f57\u9a6c\u65f6\u671f\u6700\u5927\u7684\u5706\u5f62\u89d2\u6597\u573a\uff0c\u662f\u53e4\u7f57\u9a6c\u5e1d\u56fd\u6807\u5fd7\u6027\u7684\u5efa\u7b51\u7269\u4e4b\u4e00\u3002\u7ade\u6280\u573a\u5efa\u5728\u53e6\u4e00\u4e2a\u7f57\u9a6c\u7687\u5e1d\u5c3c\u7984\uff08Nero\uff09\u7684\u201c\u91d1\u5bab\u201d\uff08\u62c9\u4e01\u8bed\uff1aDomus Aurea\uff09\u539f\u5740\u4e4b\u4e0a\uff0c\u4fee\u5efa\u4e8e\u516c\u514372\u5e74\u002d82\u5e74\u95f4\uff0c\u4f4d\u4e8e\u73b0\u4eca\u7f57\u9a6c\u4e2d\u5fc3\u3002\u6574\u4e2a\u6597\u517d\u573a\u6700\u591a\u53ef\u5bb9\u7eb35\u4e07\u4eba\uff0c\u5374\u56e0\u5165\u573a\u8bbe\u8ba1\u5468\u5230\u800c\u4e0d\u4f1a\u51fa\u73b0\u62e5\u5835\u6df7\u4e71\uff0c\u8fd9\u79cd\u5165\u573a\u7684\u8bbe\u8ba1\u5373\u4f7f\u662f\u4eca\u5929\u7684\u5927\u578b\u4f53\u80b2\u573a\u4f9d\u7136\u6cbf\u7528\u3002\n<\/p>\n<p>\n\t<br \/>\n<\/p>\n<p>\n\t<br \/>\n<\/p>\n<p>\n\t\u7b2c\u4e8c\u7ad9\uff1a\u7f57\u9a6c\u6597\u517d\u573a\n\u7f57\u9a6c\u6597\u517d\u573a\uff08Colosseo\uff09\u53c8\u8bd1\u4f5c\u53e4\u7f57\u9a6c\u6597\u517d\u573a\u3001\u7f57\u9a6c\u5927\u89d2\u6597\u573a\u3001\u7f57\u9a6c\u5706\u5f62\u7ade\u6280\u573a\u3001\u79d1\u6d1b\u897f\u59c6\uff1b\u539f\u540d\u5f17\u83b1\u6587\u5706\u5f62\u5267\u573a\uff0c\u62c9\u4e01\u8bed\uff1aAnfiteatrFlavio \/ Amphitheatrvm falvvm\uff09\u7ade\u6280\u573a\u7684\u540d\u79f0\u6765\u6e90\u201cColossus\u201d\u672c\u6765\u89e3\u4f5c\u5de8\u50cf\uff0c\u56e0\u4e3a\u5c3c\u7984\u65f6\u671f\u6b64\u5904\u6709\u4e00\u5ea7\u4ed6\u672c\u4eba\u7684\u5de8\u50cf\u3002\u662f\u53e4\u7f57\u9a6c\u65f6\u671f\u6700\u5927\u7684\u5706\u5f62\u89d2\u6597\u573a\uff0c\u662f\u53e4\u7f57\u9a6c\u5e1d\u56fd\u6807\u5fd7\u6027\u7684\u5efa\u7b51\u7269\u4e4b\u4e00\u3002\u7ade\u6280\u573a\u5efa\u5728\u53e6\u4e00\u4e2a\u7f57\u9a6c\u7687\u5e1d\u5c3c\u7984\uff08Nero\uff09\u7684\u201c\u91d1\u5bab\u201d\uff08\u62c9\u4e01\u8bed\uff1aDomus Aurea\uff09\u539f\u5740\u4e4b\u4e0a\uff0c\u4fee\u5efa\u4e8e\u516c\u514372\u5e74\u002d82\u5e74\u95f4\uff0c\u4f4d\u4e8e\u73b0\u4eca\u7f57\u9a6c\u4e2d\u5fc3\u3002\u6574\u4e2a\u6597\u517d\u573a\u6700\u591a\u53ef\u5bb9\u7eb35\u4e07\u4eba\uff0c\u5374\u56e0\u5165\u573a\u8bbe\u8ba1\u5468\u5230\u800c\u4e0d\u4f1a\u51fa\u73b0\u62e5\u5835\u6df7\u4e71\uff0c\u8fd9\u79cd\u5165\u573a\u7684\u8bbe\u8ba1\u5373\u4f7f\u662f\u4eca\u5929\u7684\u5927\u578b\u4f53\u80b2\u573a\u4f9d\u7136\u6cbf\u7528\u3002\n<\/p>\n<p>\n\t<br \/>\n<\/p>\n<p>\n\t<br \/>\n<\/p>\n<p>\n\t\u7b2c\u4e09\u7ad9\uff1a\u7f57\u9a6c\u6597\u517d\u573a\n\u7f57\u9a6c\u6597\u517d\u573a\uff08Colosseo\uff09\u53c8\u8bd1\u4f5c\u53e4\u7f57\u9a6c\u6597\u517d\u573a\u3001\u7f57\u9a6c\u5927\u89d2\u6597\u573a\u3001\u7f57\u9a6c\u5706\u5f62\u7ade\u6280\u573a\u3001\u79d1\u6d1b\u897f\u59c6\uff1b\u539f\u540d\u5f17\u83b1\u6587\u5706\u5f62\u5267\u573a\uff0c\u62c9\u4e01\u8bed\uff1aAnfiteatrFlavio \/ Amphitheatrvm falvvm\uff09\u7ade\u6280\u573a\u7684\u540d\u79f0\u6765\u6e90\u201cColossus\u201d\u672c\u6765\u89e3\u4f5c\u5de8\u50cf\uff0c\u56e0\u4e3a\u5c3c\u7984\u65f6\u671f\u6b64\u5904\u6709\u4e00\u5ea7\u4ed6\u672c\u4eba\u7684\u5de8\u50cf\u3002\u662f\u53e4\u7f57\u9a6c\u65f6\u671f\u6700\u5927\u7684\u5706\u5f62\u89d2\u6597\u573a\uff0c\u662f\u53e4\u7f57\u9a6c\u5e1d\u56fd\u6807\u5fd7\u6027\u7684\u5efa\u7b51\u7269\u4e4b\u4e00\u3002\u7ade\u6280\u573a\u5efa\u5728\u53e6\u4e00\u4e2a\u7f57\u9a6c\u7687\u5e1d\u5c3c\u7984\uff08Nero\uff09\u7684\u201c\u91d1\u5bab\u201d\uff08\u62c9\u4e01\u8bed\uff1aDomus Aurea\uff09\u539f\u5740\u4e4b\u4e0a\uff0c\u4fee\u5efa\u4e8e\u516c\u514372\u5e74\u002d82\u5e74\u95f4\uff0c\u4f4d\u4e8e\u73b0\u4eca\u7f57\u9a6c\u4e2d\u5fc3\u3002\u6574\u4e2a\u6597\u517d\u573a\u6700\u591a\u53ef\u5bb9\u7eb35\u4e07\u4eba\uff0c\u5374\u56e0\u5165\u573a\u8bbe\u8ba1\u5468\u5230\u800c\u4e0d\u4f1a\u51fa\u73b0\u62e5\u5835\u6df7\u4e71\uff0c\u8fd9\u79cd\u5165\u573a\u7684\u8bbe\u8ba1\u5373\u4f7f\u662f\u4eca\u5929\u7684\u5927\u578b\u4f53\u80b2\u573a\u4f9d\u7136\u6cbf\u7528\u3002\n<\/p>"};
// SetItemInfo(arr2);
ousemoveobj = false;

function funimgonmousemove(obj) {
	if (ousemoveobj == obj) return;
	ousemoveobj = obj;
	$('#_small')[0].style.backgroundImage = obj.style.backgroundImage;
}

function SetItemInfo(arr) {
	//	console.log(arr);
	var obj = $('#left_ul'),
		i = 0,
		ret = '';
	for (i = 0; i < arr['图示'].length; i++) {
		ret += "<li><div class='small2' style='background-image: url(" + arr['图示'][i] +
			");' onmousemove='funimgonmousemove(this);'></div></li>";
	}
	obj[0].innerHTML = ret;
	$('#_small')[0].style.backgroundImage = "url(" + arr['图示'][0] + ")";
	$('.r1_2_right')[0].children[0].innerHTML = arr['商品名称'];
	$('#city_browsr')[0].innerHTML = arr['起始地址'] + arr['终止地址'];
	$('#itinerary')[0].innerHTML = arr['起始地址'] + '&nbsp;' + arr['途经'] + '&nbsp;' + arr['终止地址'];
	$('#price')[0].innerHTML = arr['价格'];
	$('#price')[0].other = arr['价格'];
	$('#money')[0].innerHTML = arr['价格'];
	$('#price2')[0].innerHTML = arr['计价单位'];

	$('#起始时间')[0].value = arr['起始时间'];
	//	$('#goods_num')[0].value=arr['人数'];
	$('#goods_num')[0].max = arr['人数'];
	$('#carbtn')[0].value = arr['车型'];
	if (arr['商品类型'] == 9) {
		obj = $('#goods_num');
		obj[0].value = arr['人数'];
		obj.attr('disabled', 'disabled');
		obj = obj.parent().find('button');
		console.log(obj);
		for (i in obj) {
			obj.eq(i).attr('disabled', 'disabled');
		}
		$('#carbtn').attr('disabled', 'disabled');
		obj = getodata('车型', arr['车型'])[0];
		$('#cartype')[0].value = obj['节点'];
		$('#cartype')[0].innerHTML = obj['标题'];
	}
	$('#overlay')[0].innerHTML = arr['详情'];
	ret = getodata('预订须知');
	var a = '';
	for (i = 0; i < ret.length; i++) {
		if ((ret[i]['节点'] & arr['预订须知']) == ret[i]['节点']) {
			a += "<p>" + ret[i]['内容'] + "</p>";
		}
	}
	$('.hint_1')[0].innerHTML = a;
	ret = getodata('服务承诺');
	var a = '';
	for (i = 0; i < ret.length; i++) {
		if ((ret[i]['节点'] & arr['服务承诺']) == ret[i]['节点']) {
			a += "<p>" + ret[i]['内容'] + "</p>";
		}
	}
	$('.hint_2')[0].innerHTML = a;
	return;
}

function buyitem(val) {
	var arr = [];
	arr['金额'] = $('#money')[0].innerHTML;
	arr['商品ID'] = ItemID;
	arr['商品名称'] = $('.r1_2_right')[0].children[0].innerHTML;
	arr['起始时间'] = $('#起始时间')[0].value;
	arr['人数'] = $('#goods_num')[0].value;
	arr['车型'] = $('#cartype')[0].value;
	if (!arr['车型']) return;
	console.log(arr);

}

function ItemClick(id) {
	window.location.href = "jmp.php?page=item&cmd=" + id;
}

function AddItem(arr, isret = false) {
	if (Number(arr) == arr || arr == undefined) return '';
	var txt = "";
	for (let i = 0; i < arr.length; i++) {
		//		console.log(arr[i]);
		arr[i]['图示'] = arr[i]['图示'].split('|');
		//		console.log(arr[i]['图示'][0]);
		txt += "<div onclick=ItemClick(" + arr[i]['ID'] + ") class='item item_2' style=\"background-image: url('" + arr[i][
			'图示'
		][0] + "');\"><div class='item_s'><div class='item_sl'>" + arr[i]['商品名称'] + "</div><div class='item_sr'>" + arr[i][
			'价格'
		] + arr[i]['计价单位'] + "</div></div></div>\n";
	}

	if (isret) return txt;
	$('#info')[0].innerHTML = "<div class='info wf'>" + txt + "</div>";
}

function funPageClick(val) {
	PageNow = val.innerHTML;
	var cmd = LastCmd;
	cmd['limit'] = val.value;
	bequery(LastVal, cmd);
}
PageSum = 0;
PageNum = 0;
PageMax = 8;
PageNow = 1;
LastArr = '';

function AddAllItems(arr, obj) {
	if (Number(arr[0]['数据']) == arr[0]['数据'] && arr[0]['nolimit'] == undefined) return;
	var txt = "";
	var txt2 = '';
	if (arr[0]['nolimit']) {
		if (arr[0]['数据'][0]['count(*)']) {
			PageSum = arr[0]['数据'][0]['count(*)'];
			PageNum = arr[0]['主页数量'];
			arr = delarr(LastCmd, '总数');
			LastArr = arr;
			bequery(LastVal, arr, obj);
			return;
		}
		txt += "<div class='w100 yc yc_2' ><div class='label yc'><b class='fs48'>" + arr[0]['名称'] +
			"</b><div class='fgx'></div><a>" + arr[0]['说明'] + "</a>";
		txt += "</div><div class='info w100'>" + AddItem(arr[0]['数据'], true) + "</div>";
		txt += "<div id='pageid'>" + CreatePages(PageSum, PageNum, PageMax, PageNow, "funPageClick(this);") +
			"</div></div></div>";
	} else {
		PageSum = 0;
		for (let i = 0; i < arr.length; i++) {
			txt2 += "<div class='TopBottonSize'>" + CreateButton(arr[i]['名称'], 'topbtnothercss', '', '', arr[i]['ID']) +
				"</div>";
			txt += "<div class='w100 yc yc_2' ><div class='label yc'><b class='fs48'>" + arr[i]['名称'] +
				"</b><div class='fgx'></div><a>" + arr[i]['说明'] + "</a>";
			txt += "</div><div class='info w100'>" + AddItem(arr[i]['数据'], true) + "</div>";
			txt += "<div class='moreBottonSize'><div class='button yj bx 123 seemore' id='" + arr[i]['ID'] +
				"'><img src='images/u48.png'><p>查看更多</p></div></div></div>";
		}
	}
	
	if (!obj) obj = $('#info')[0];
	obj.innerHTML = txt;
	//	obj=$(obj).find('#page');
	if (arr.length > 1) {
		document.getElementById('mtop').innerHTML =
			"<div class='TopBottonSize'><div class='button' id='a'><p>快速导航</p></div></div>" + txt2;
	}
	ImgMouseIn();
}

function addbotton2(obj) {
	let a = $(obj).closest('.top').find('.button');
	for (let i = 0; i < a.length; i++) {
		a.removeAttr('style');
	}
	$(obj).attr('style', 'background-position: 0px -421px;');
	a = $('#searchaddr')[0];
	var str = $(obj).find('p').text();
	a.placeholder = str;

	//	console.log($(obj).attr('style'));
}

function ss() {
	var a = $('#searchaddr')[0];
	if (!a.value) return;
	var str = a.placeholder,
		arr = [];
	arr['终止地址'] = 'like %' + a.value + '%';
	switch (str) {
		case '目的地':

			break;
		case '拼行':
			arr['商品类型'] = 1;
			break;
		case '景点相关':
			arr['商品类型'] = 4;
			break;
		case '特价酒店':
			arr['商品类型'] = 6;
			break;
	}
	arr.isall = 1;
	console.log(arr);
	bequery(Getitem, arr);
}

function MainClick(obj) {
	let str = obj.children[obj.children.length - 1].innerHTML;
	var arr = [];
	switch (str) {
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
		case '用户登录':
			window.location = '/login.html';
			/*		let arr={'标题':"请输入用户名和密码"};
					arr['用户名']='';
					arr['密码']='';
					messagebox(arr, 'loginclick');*/
			break;
		case '我的信息':
			window.location = "jmp.php?page=manager";
			break;
		case '查看更多':
			bequery(Getitem, {
				'商品类型': obj.id,
				'isall': 1,
				'nolimit': 1,
				'总数': 1
			});
			break;
		case '我要发布':
			window.location = "jmp.php?page=createitem&cmd=" + obj.id;
			break;
		case '开启探索之旅':
			ss();
			break;
		default:
			outherClick(obj);
			break;
	}

}

function outherClick(obj) {
	//	let a=$(obj).parent().parent();
	let a = obj.parentNode.parentNode,
		arr = [];
	switch (a.id) {
		case 'mtop': // 网站导航
			if (obj.id == 'a') {
				window.location.href = '/';
				return;
			}
			arr = {
				'商品类型': obj.id,
				'isall': 1,
				'nolimit': 1,
				'总数': 1
			};
			bequery(Getitem, arr, $('#info')[0]);
			break;
		case 'mfoot': // 我的发布
			arr['权重'] = 1;
			arr['归属用户'] = UserID;
			arr['isall'] = 1;
			if (obj.id !== 'a') {
				arr['nolimit'] = 1;
				arr['ID'] = obj.id;
			}
			bequery(Getitem, arr, $('#info')[0]);
			break;
		default:

			break;
	}
}

function ImgMouseIn() {
	var a = $('.button');
	for (let i = 0; i < a.length; i++) {
		a.eq(i).attr('onclick', "MainClick(this);");
	}
	
	a = $('#login');
	if (typeof(UserID) == 'undefined' || !UserID) {
		$('#mfoot').attr('style', "display:none;");
		a.find('p')[0].innerHTML = '用户登录';
	} else {
		$('#mfoot').removeAttr('style');
		a.find('p')[0].innerHTML = '我的信息';
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
				eval(callback + "(res.ret);");
			} else {
				console.log('用户点击了取消' + JSON.stringify(res));
			}
		}
	});
}
funCallBack[login] = function(arr, other) {
	var str = window.location.href,
		url = str.substr(str.indexOf('?') + 1);
	if (url == str) url = '/';
	if (arr == 'true') {
		alert('登录成功!');
		window.location.href = url;
	} else {
		alert('用户名或密码错误,请重新输入!');
	}
};
funCallBack[regdit] = function(arr, other) {
	if (arr == 'true') {
		alert('注册成功!');
		window.location.href = '/';
	} else {
		alert('电话号码已被注册,请更换或直接登录!');
	}
};

funCallBack[101] = function(arr, other) {
	UserID = arr;
};

funCallBack[Getitem] = function(arr, other, lv, lc) {
	// console.log(arr);
	if (!arr.length) {
		$('#info')[0].innerHTML = '对不起!您所输入的条件数据为空!';
		return;
	}
	if (arr[0]['数据'] === undefined) {
		arr[0]['图示'] = arr[0]['图示'].split('|');
		SetItemInfo(arr[0]);
		txtautoheight();
		return;
	}
	AddAllItems(arr, other);
};

function menuclick(val) {
	let id = val.id;
	SetTitletxtobj[0].value = id;
	bequery(id, {}, val);
}
var SelectData;

function SelectChange(val, obj) {
	var data = SelectData[val],
		txt = '',
		th = [];
	t = Object.keys(SelectData[0]['数据'][0]);
	for (let i = 0; i < t.length; i++) {
		th[t[i]] = t[i];
	}
	txt += CreateTable(data['数据']);
	obj.innerHTML = txt;
	SetTitletxtobj[0].innerHTML = "<p>所有发布</p>";
	addTableDoubleClick(obj);
}
var SetTitletxtobj = $('#title');

function AllManagerClick(arr, other) {
	if (other!==undefined && Number(other.id) === Getitem) {
		SelectData = arr;
		let txt = "";
		for (let i = 0; i < arr.length; i++) {
			txt += "<option value='" + i + "'>" + arr[i]['名称'] + "(" + arr[i]['数据'].length + ')</option>';
		}
		var obj = $(other.parentNode);
		var obj2 = obj.find('select');
		if (obj2.length) {
			obj2[0].innerHTML = txt;
		} else {
			txt = "<select onchange='SelectChange(this.value, ybl);'>" + txt + "</select>";
			obj.append(txt);
		}
		SetTitletxtobj[0].innerHTML = "<p>" + $(other).find('p')[0].innerHTML + "</p>";
		obj = $("#ybl")[0];
		SelectChange(0, obj);
		return;
	}
	var txt = CreateTable(arr);
	ybl.innerHTML = txt;
	SetTitletxtobj[0].innerHTML = "<p>" + $(other).find('p')[0].innerHTML + "</p>";
}
funCallBack[Getuser] = function(arr, other) {
	var txt = CreateTable(arr);
	ybl.innerHTML = txt;
	SetTitletxtobj[0].innerHTML = "<p>" + $(other).find('p')[0].innerHTML + "</p>";
};


funCallBack[Get商品类型] = function(arr, other) {
	if (other.id === 'title') {
		other.innerHTML = "<div id='title' class='xyc'><p>" + arr[0]['名称'] + "</p><a>" + arr[0]['说明'] + "</a></div>";
		return;
	}

};

function ClickLoginOut() {
	window.location.href = '/logout.php?lasturl=' + window.location.href;
}


funCallBack[Additem] = function(arr, other) {
	console.log(arr, other);

};
funCallBack['banner'] = function(arr, other) {
	bpic = arr;
	funbanner(101);
};



var tah = [];

function sleepz() {
	tah[0] = $('.ke-edit')[0];
	if (tah[0] == undefined) {
		setTimeout("sleepz()", 100);
		return;
	}
}
sleepz();

function txtautoheight(id) {
	ret = false;
	if (!id) id = 'textarea';
	$(function() {
		$.fn.autoHeight = function() {
			function autoHeight(elem) {
				elem.style.height = 'auto';
				elem.scrollTop = 0; //防抖动
				let h = Number(elem.scrollHeight) + 20;
				elem.style.height = h + 'px';
				if (!ret) ret = elem.style.height;
			}
			this.each(function() {
				autoHeight(this);
				$(this).on('keyup', function() {
					autoHeight(this);
				});
			});
		}
		$(id).autoHeight();
	});
}
addrun = function() {};

function settitle(val) {
	var o = $('.ke-dialog-header')[0],
		str = o.innerHTML;
	str = str.substr(str.indexOf('<'));
	o.innerHTML = val + str;
}

function selectaddr(val) {
	if (val.value) return;
	addrun = settitle;
	KindEditor.ready(function(K) {
		var dialog = K.dialog({
			width: 600,
			height: 480,
			title: '请点击地图选择',
			body: '<iframe src="/plugins/KindEditor/baidumap/map.html" class="wf hf"></frame>',
			closeBtn: {
				name: '关闭',
				click: function(e) {
					dialog.remove();
				}
			},
			yesBtn: {
				name: '确定',
				click: function(e) {
					val.value = $('.ke-dialog-header').text();
					dialog.remove();
				}
			},
			noBtn: {
				name: '取消',
				click: function(e) {
					dialog.remove();
				}
			}
		});
	});

}

mtmp =
	'<p><span style="font-size: 14pt;">数组遍历方法</span></p><p><span style="font-size: 18px;"><strong><span style="color: #ff0000;">1.for循环</span></strong></span></p><p>使用临时变量，将长度缓存起来，避免重复获取数组长度，当数组较大时优化效果才会比较明显。</p>';

function MessageBox(ti, msg, tcb) {
	//	K=myKE;
	mapWidth = 400;
	var ret;
	KindEditor.ready(function(K) {
		var dialog = K.dialog({
			width: 500,
			title: ti,
			body: '<div style="margin:10px;"><strong>' + msg + '</strong></div>',
			closeBtn: {
				name: '关闭',
				click: function(e) {
					dialog.remove();
				}
			},
			yesBtn: {
				name: '确定',
				click: function(e) {

					dialog.remove();
				}
			},
			noBtn: {
				name: '取消',
				click: function(e) {
					dialog.remove();
				}
			}
		});
		ret = dialog;
	});
	ret.bodyDiv[0].parentNode.parentNode.style.height = "auto";
	return ret;
}
//$('.autohf')[0].style.height='800px';
//runurljs('plugins/tagTree/tagTree.js');
var tmp = [{
	other: "onclick='menuclick(this);'",
	name: "1标签",
	id: '1',
	value: "1",
	children: []
}];

function inmanager() {
	var txt = '<div class="xc">' + CreateButton('所有发布', 'h24px', '', '', Getitem, 'onclick="menuclick(this);"') + '</div>';
	txt += '<div class="xc">' + CreateButton('用户管理', 'h24px', '', '', Getuser, 'onclick="menuclick(this);"') + '</div>';
	txt += '<div class="xc">' + CreateButton('交易记录', 'h24px', '', '', Get交易记录, 'onclick="menuclick(this);"') + '</div>';
	txt += '<div class="xc">' + CreateButton('商品类型', 'h24px', '', '', Get商品类型, 'onclick="menuclick(this);"') + '</div>';
	txt += '<div class="xc">' + CreateButton('评价管理', 'h24px', '', '', Get商品评价, 'onclick="menuclick(this);"') + '</div>';
	txt += '<div class="xc">' + CreateButton('服务承诺', 'h24px', '', '', Get服务承诺, 'onclick="menuclick(this);"') + '</div>';
	txt += '<div class="xc">' + CreateButton('权限', 'h24px', '', '', Get权限, 'onclick="menuclick(this);"') + '</div>';
	txt += '<div class="xc">' + CreateButton('购物车', 'h24px', '', '', Get购物车, 'onclick="menuclick(this);"') + '</div>';
	txt += '<div class="xc">' + CreateButton('车型', 'h24px', '', '', Get车型, 'onclick="menuclick(this);"') + '</div>';
	txt += '<div class="xc">' + CreateButton('预订须知', 'h24px', '', '', Get预订须知, 'onclick="menuclick(this);"') + '</div>';
	$('#zbl')[0].innerHTML = txt;
	menuclick($('#1001')[0]);
}
if (typeof(cs) == 'undefined') cs = -1;
switch (cs) {
	case 0:
		bequery('banner', {}); // 启动横幅
		objmenu = $('.main_menu .top');
		addbotton2(objmenu.find('.button')[0]);
		bequery(Getitem, {
			'isall': 1
		}, $('#info')[0]);
		break;
	case 1:
		bequery(100, []);
		break;
	case 2:
		// inmanager();
		break;
	case 3:
		bequery(100, []);
		break;
}
bequery(101, {});
