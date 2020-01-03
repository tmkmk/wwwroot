/*
	@description --model:1.btn 2.tip 3.load
	@param --setting --存放配置 $.extend()  外部配置可以覆盖默认配置

*/
$("<link>")
.attr({ rel: "stylesheet",
type: "text/css",
href: "/plugins/Messagebox/Messagebox.css"
})
.appendTo("head");

function Popup() {
	this.alertWrap = null;//遮罩层
	this.alertCont = null;//弹窗盒子
	this.result = {}; //消息存放
	//默认配置参数
	this.setting = {
		// title:'标题',
		// tipText:'说明文字',
		// textArea : '额外添加区域',
		// loadImg : '加载图片url',
		showBtn: false,   //true 显示按钮 false 隐藏 （默认没有按钮）
		showDouble: false,  //true 双按钮 false 单按钮
		cancelText: '取消',//默认,外部定义可覆盖
		confirmText: '确认'
	}
}
Popup.prototype.init = function (options) {
	$.extend(this.setting, options); //默认配置与自定义配置
	this.mark();
	this.create();
	this.dir();
};
//遮罩
Popup.prototype.mark = function () {
	this.alertWrap = $("<div class='alert_Wrap'></div>");
};
//弹窗
var tarr=new Array();
Popup.prototype.create = function () {
	this.alertCont = $("<div class='alertCont'></div>");
	var arr = this.setting.val;
	this.alertCont.append($("<div class='alertTitle'>" + arr['标题'] + "</div>"));
	tarr=Object.keys(arr);
	tarr[0]=arr['标题'];
	for(let i=1; i<tarr.length; i++){
		let temp = "<div class='alertText'>";
		if(tarr[i].substr(0,1) == '<'){
			temp += tarr[i];
		}else{
			temp += "<b>"+tarr[i]+":</b>";
		}
		if(arr[tarr[i]].substr(0,1) == '<'){
			temp += arr[tarr[i]];
		}else{
			temp += "<input id='"+tarr[i]+"' value='"+arr[tarr[i]]+"'/></div>";
		}
		this.alertCont.append($(temp));
	}
/*	//title
	if (this.setting.title) {
		this.alertTitle = $("<div class='alertTitle'>" + this.setting.title + "</div>");
		this.alertCont.append(this.alertTitle);
	}
	//tipText
	if (this.setting.tipText) {
		this.alertText = $("<div class='alertText'>" + this.setting.tipText + "</div>");
		this.alertCont.append(this.alertText);
	}
	if (this.setting.tipText1) {
		this.alertText = $("<div class='alertText'><b>姓名:</b><input id='姓名' value='" + this.setting.tipText1 + "'/></div>");
		this.alertCont.append(this.alertText);
	}
	if (this.setting.tipText2) {
		this.alertText = $("<div class='alertText'><b>手机号码:</b><input id='手机号码' value='" + this.setting.tipText2 + "'/></div>");
		this.alertCont.append(this.alertText);
	}
	if (this.setting.tipText3) {
		this.alertText = $("<div class='alertText'><b>身份证号码:</b><input id='身份证号码' value='" + this.setting.tipText3 + "'/></div>");
		this.alertCont.append(this.alertText);
	}
	//textArea
	if (this.setting.textArea) {
		this.alertArea = $("<div class='alertArea'>" + this.setting.textArea + "</div>");
		this.alertCont.append(this.alertArea);
	}
	//loadImg
	if (this.setting.loadImg) {
		this.alertCont.addClass("alertLoad");
		this.alertLoadImg = $("<img class='load_img' src='" + this.setting.loadImg + "' />");
		this.alertCont.append(this.alertLoadImg);
	}*/
	//showBtn
	if (this.setting.showBtn && this.setting.showDouble === true) {
		//双
		this.alertBtn = $("<div class='alertBtn clearfix'></div>");
		this.cancel_btn = $("<input class='cancel_btn' type='button' value=" + this.setting.cancelText + ">");
		this.confirm_btn = $("<input class='alert_confirm_btn' type='button' value=" + this.setting.confirmText + ">");
		this.alertBtn.append(this.cancel_btn);
		this.alertBtn.append(this.confirm_btn);
		this.alertCont.append(this.alertBtn);
	} else if (this.setting.showBtn && this.setting.showDouble === false) {
		//单
		this.alertBtn = $("<div class='alertBtn'></div>");
		this.confirm_btn = $("<input class='alert_confirm_btn confirm_int' type='button' value=" + this.setting.confirmText + ">");
		this.alertBtn.append(this.confirm_btn);
		this.alertCont.append(this.alertBtn);
	}
	this.alertWrap.append(this.alertCont);
	$("body").append(this.alertWrap);
};
//自定义函数
Popup.prototype.dir = function () {
	var _this = this;
	if (this.cancel_btn) {
		this.cancel_btn.on("click", function () {
			_this.alertWrap.remove();
			_this.result = {
				cancel: true,
				showCancel: "取消操作!"
			};
			if (_this.setting.success) {
				_this.setting.success(_this.result);
			}
		})
	}
	if (this.confirm_btn) {
		this.confirm_btn.on("click", function () {
			var mret={'标题':tarr[0]};
			for(let i=1; i<tarr.length; i++){
				mret[tarr[i]]=document.getElementById(tarr[i]).value;
			}
			_this.alertWrap.remove();
			_this.result = {
				confirm: true,
				showCancel: "确认操作!",
				ret:mret
			};
			if (_this.setting.success) {
				_this.setting.success(_this.result);
			}
		})
	}
};
//关闭
Popup.prototype.close = function () {
	console.log(姓名.value);
	this.alertWrap.remove();
};

