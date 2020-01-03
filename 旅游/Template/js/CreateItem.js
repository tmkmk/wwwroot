bequery(Get商品类型, { 'add': 1 }, 'CreateItem');
function SelectChange2(o) {
	var obj, i;
	obj = $('#title').children();
	// obj.eq(1).find("option").attr("selected", false);
	// obj.eq(1).find("option[value='2']").attr("selected", true);
	obj[0].innerHTML = obj.eq(1).find('option[value=' + o + ']').html();
	obj[0].value = o;
}
itemId = 0;
function CreateItem(data, val) {
	console.log(data, val);
	if (data === false) {
		alert('错误!\n修改失败,请重试!');
		// window.location.href = '/login.html?' + window.location.href;
		return;
	}
	var i, j, k, tmp, str, txt, obj, key;
	switch (val) {
		case Get商品类型:
			obj = $('#title').children();
			// console.log(obj);
			txt = '<select onchange="SelectChange2(this.value);">';
			for (key in data) {
				txt += '<option value=' + data[key].ID + '>' + data[key].名称 + '</option>';
			}
			txt += '</select>';
			obj.eq(1).html(txt);
			txt = window.location.href;
			txt = txt.substr(txt.indexOf('?') + 1);
			txt = txt.split('&');
			for (i = 0; i < txt.length; i++) {
				if (txt[i].indexOf('id=') === 0) {
					itemId = Number(txt[i].substr(3));
					bequery(Getitem, { ID: itemId }, 'CreateItem');
				}
				if (txt[i].indexOf('addtype=') === 0) {
					SelectChange2(txt[i].substr(8));
				}
			}
			break;
		case Additem:
			window.location.href = '/jmp.php?page=item&cmd=' + data;
			break;
		case Upitem:
			window.location.href = '/jmp.php?page=item&cmd=' + data;
			break;
		case Getitem:
			商品名称.value = data[0].商品名称;
			SelectChange2(data[0].商品类型);
			起始时间.value = data[0].起始时间;
			终止时间.value = data[0].终止时间;
			起始地址.value = data[0].起始地址;
			终止地址.value = data[0].终止地址;
			途经.value = data[0].途经;
			价格.value = data[0].价格;
			人数.value = data[0].人数;
			计价单位.value = data[0].计价单位;
			预订须知.value = data[0].预订须知;
			服务承诺.value = data[0].服务承诺;
			车型.value = data[0].车型;
			详情.innerHTML = data[0].详情;
			详情.value = data[0].详情;
			c();
			break;
	}
}
function AddItem() {
	var arr = {
		'商品名称': 商品名称.value,
		'商品类型': $('#title').children()[0].value,
		'起始时间': 起始时间.value,
		'终止时间': 终止时间.value,
		'起始地址': 起始地址.value,
		'终止地址': 终止地址.value,
		'途经': 途经.value,
		'价格': 价格.value,
		'人数': 人数.value,
		'计价单位': 计价单位.value,
		'预订须知': 预订须知.value,
		'服务承诺': 服务承诺.value,
		'车型': 车型.value,
		'详情': 详情.value,
		'图示': GetTextImg(详情.value).join('|'),
		'归属用户': UserID
	};
	if (itemId) arr.ID = itemId;
	bequery(bqv, arr, 'CreateItem');
}
function CreateItemSelect(val, o1) {
	if (o1 == undefined) {
		var arr = getodata(val.id);
		if (arr) {
			val.value = 0;
			var t1 = '',
				t2 = '';
			for (let i = 0; i < arr.length; i++) {
				t1 += "<button onclick='CreateItemSelect(this,0);' onmousemove='CreateItemSelect(this,1);' value='" + arr[i]['节点'] + "'>" + arr[i]['标题'] + "</button>";
				t2 += "<div>" + arr[i]['内容'] + "</div>";
			}
			t1 = "<div class='top h24px'>" + t1 + "</div>";
			t2 = "<div style='display:none;' id='msgtmpdiv'>" + t2 + "</div>";
			t1 += t2 + "<div id='msgdisplay'></div>";
			// MessageBox(val.id, t1); //.bodyDiv[0].parentNode.parentNode.style.height="auto";
			KindEditor.ready(function (K) {
				var dialog = K.dialog({
					width: 500,
					title: val.id,
					body: '<div style="margin:10px;"><strong>' + t1 + '</strong></div>',
					closeBtn: {
						name: '关闭',
						click: function (e) {
							CurrentBox.value = 0;
							dialog.remove();
						}
					},
					yesBtn: {
						name: '确定',
						click: function (e) {
							dialog.remove();
						}
					},
					noBtn: {
						name: '取消',
						click: function (e) {
							CurrentBox.value = 0;
							dialog.remove();
						}
					}
				});
				ret = dialog;
			});
			ret.bodyDiv[0].parentNode.parentNode.style.height = "auto";
			CurrentBox = val;
		}
	} else if (o1 === 0) { // click
		if (val.style.backgroundColor) {
			val.style.backgroundColor = '';
			CurrentBox.value = Number(CurrentBox.value) - Number(val.value);
		} else {
			val.style.backgroundColor = '#fff';
			CurrentBox.value = Number(CurrentBox.value) + Number(val.value);
		}
	} else if (o1 === 1) { // onmousemove
		objtmp = val.parentNode.parentNode.children[1];
		objthis = val.parentNode;
		o1 = objthis.childElementCount;
		var obj = val.parentNode.parentNode.children[2],
			str = '';
		for (let i = 0; i < o1; i++) {
			if (objthis.children[i] === val) {
				str = objtmp.children[i].innerHTML;
				if (str != obj.innerHTML) obj.innerHTML = str;
			}
		}

	}
}
function c() {
	KindEditor.ready(function (K) {
		var editor1 = K.create('textarea[name="content"]', {
			cssPath: 'plugins/KindEditor/prettify.css',
			uploadJson: 'plugins/KindEditor/upload_json.php',
			fileManagerJson: 'plugins/KindEditor/file_manager_json.php',
			allowFileManager: true,
			afterCreate: function () {
				myKE = this;
				var self = this;
				K.ctrl(document, 13, function () {
					self.sync();
					K('form[name=example]')[0].submit();
				});
				K.ctrl(self.edit.doc, 13, function () {
					self.sync();
					K('form[name=example]')[0].submit();
				});
			}
		});
		prettyPrint();
	});
}
bqv = Upitem;
if (window.location.href.indexOf('id=') < 0) {
	c();
	bqv = Getitem;
}
