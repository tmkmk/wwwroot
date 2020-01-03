function delNullArr(object) {
	var ret = [];
	for (const key in object) {
		if (object[key]) {
			ret[key] = object[key];
		}
	}
	return ret;
}

function manager(arr, value) {
	console.log(arr, value);
	var i, str, tmp, txt, obj, objybl = $('#ybl');
	switch (value) {
		case Getuser:
			users = arr;
			obj = $('#login');
			if (users[0].权限) {
				obj.click(function() {
					ClickLoginOut();
				});
				obj.find('p')[0].innerHTML = '退出登录';
				obj = $('#title').find('p')[0];
				obj.innerHTML = '用户管理';
				if (!$('#zbl').find('.button').length) {
					setZbl = true;
					bequery(Get商品类型, {'other': users[0].权限 + '&用户类型=用户类型'}, 'manager');
				}
				str = '<div class="w700px " style="margin-left:60px;margin-top:30px;background-color: #F9F9F9;">' +
					'		<div class="h45px txtc" style="line-height: 45px;font-size: 24px;background-color: #398439;">' +
					'			个人信息修改</div>' +
					'		<div class="y" style="margin-left: 60px;">' +
					'			<div class="h45px x " style="margin-top: 20px;">' +
					'				<div class=" wf x jc">' +
					'					<span>姓名</span><input id="姓名" type="text" placeholder="{[0].姓名}">' +
					'				</div>' +
					'				<div class="wf x jc">' +
					'					<span>昵称</span><input id="昵称" type="text" placeholder="{[0].昵称}">' +
					'				</div>' +
					'			</div>' +
					'			<div class="h45px x " style="margin-top: 20px;">' +
					'				<div class=" wf x jc">' +
					'					<span>手机</span><input id="电话" type="text" placeholder="{[0].电话}">' +
					'				</div>' +
					'				<div class="wf x jc">' +
					'					<span>邮箱</span><input id="邮箱" type="text" placeholder="{[0].邮箱}">' +
					'				</div>' +
					'			</div>' +
					'			<div class="h45px x " style="margin-top: 20px;">' +
					'				<div class=" wf x jc">' +
					'					<span>身份证</span><input id="身份证" type="text" placeholder="{[0].身份证}">' +
					'				</div>' +
					'				<div class="wf x jc">' +
					'					<span>常住城市</span><input id="常住城市" type="text" placeholder="{[0].常住城市}">' +
					'				</div>' +
					'			</div>' +
					'		</div>' +
					'		<div class="h45px xyc" style="margin-top: 30px;">' +
					'			<button id="upData" class="hf w240px yj">修&nbsp;&nbsp;&nbsp;&nbsp;改</button>' +
					'		</div>' +
					'	</div>';
				if (users.length > 1) {
					tmp = ['ID', '余额', '密码', '姓名', '昵称', '电话', '邮箱', '身份证', '地址', '常住城市', '微信', '驾驶证', '推荐ID', '上级ID', '类型', '用户组',
						'权限', '创建时间', '修改时间', '使用时间'
					];
					str += '<div class="table_all"><table><thead><tr><th>' + tmp.join('</th><th>') + '</th></tr></thead><tbody>';
					for (i = 1; i < users.length; i++) {
						str += '<tr><td>{[' + i + '].' + tmp.join('}</td><td>{[' + i + '].') + '}</td></tr>';
					}
					str += '</tbody></table></div>';
					str = str.setobj(users);
				} else {
					str = str.setobj(users);
				}
				obj = $('#upData');
				if (obj.length) obj.click(function() {
					let cmd = [];
					cmd['ID'] = users[0].ID;
					cmd['姓名'] = $('#姓名')[0].value;
					cmd['昵称'] = $('#昵称')[0].value;
					cmd['电话'] = $('#电话')[0].value;
					cmd['邮箱'] = $('#邮箱')[0].value;
					cmd['身份证'] = $('#身份证')[0].value;
					cmd['常住城市'] = $('#常住城市')[0].value;
					cmd = delNullArr(cmd);
					bequery(Upuser, cmd, 'manager');
				});
			} else {
				obj.click(function() {
					window.location = '/login.html?' + window.location.href;
				});
				obj.find('p')[0].innerHTML = '用户登录';
				alert('错误!\r\n      您还未登录.请先登录!');
			}
			break;
		case Get商品类型:
			if (setZbl) {
				tmp = '';
				tmp += '<div class="button h24px" id=' + Getuser + '><p>用户管理</p></div>';
				tmp += '<div class="button h24px" id=' + Getitem + '><p>所有发布</p></div>';
				for (i = 0; i < arr.length; i++) {
					tmp += '<div class="button h24px yr" id=' + Getitem + '><p align="right" id=' + arr[i].ID + '>' + arr[i].名称 +
						'</p></div>';
				}
				tmp += '<div class="button h24px" id=' + Get交易记录 + '><p>交易记录</p></div>';
				tmp += '<div class="button h24px" id=' + Get商品评价 + '><p>评价管理</p></div>';
				if (users[0].类型 != 2) tmp += '<div class="button h24px" id=' + Get购物车 + '><p>购物车</p></div>';
				if (users[0].类型 == 3) {
					tmp += '<div class="button h24px" id=' + Get商品类型 + '><p>商品类型</p></div>';
					tmp += '<div class="button h24px" id=' + Get权限 + '><p>权限</p></div>';
					tmp += '<div class="button h24px" id=' + Get车型 + '><p>车型</p></div>';
					tmp += '<div class="button h24px" id=' + Get预订须知 + '><p>预订须知</p></div>';
				}
				obj = $('#zbl');
				obj[0].innerHTML = tmp;
				obj = obj.find(".button");
				for (i = 0; i < obj.length; i++) {
					obj.eq(i).click(function (v) {
						var thisobj = v.currentTarget, cmd = [];
						obj = $('#title').find('p')[0];
						obj.innerHTML = $(thisobj).find('p')[0].innerHTML;
						if (thisobj.id == Getitem && Number($(thisobj).find('p')[0].id)) {
							cmd['商品类型'] = $(thisobj).find('p')[0].id;
							// console.log(cmd['商品类型']);
						}
						else if (thisobj.id == Get商品评价) {
							cmd['getitem'] = 1;
						}
						bequery(Number(thisobj.id), cmd, 'manager');
					});
				}
				setZbl = false;
			} else {
				var str = '<div class="contentent3">' +
					'	<table class="thty-table">' +
					'		<thead>' +
					'			<tr>' +
					'				<th>ID</th>' +
					'				<th>创建时间</th>' +
					'				<th>修改时间</th>' +
					'				<th>用户类型</th>' +
					'				<th>名称</th>' +
					'				<th>说明</th>' +
					'				<th>主页数量</th>' +
					'			</tr>' +
					'		</thead>' +
					'		<tbody>';
				for (var i = 0; i < arr.length; i++) {
					str += '<tr>' +
						'				<td>{[' + i + '].ID}</td>' +
						'				<td>{[' + i + '].创建时间}</td>' +
						'				<td>{[' + i + '].修改时间}</td>' +
						'				<td>{[' + i + '].用户类型}</td>' +
						'				<td>{[' + i + '].名称}</td>' +
						'				<td>{[' + i + '].说明}</td>' +
						'				<td>{[' + i + '].主页数量}</td>' +
						'			</tr>';
				}
				str += ' </tbody>' + ' </table>' + '</div>';
				str = str.setobj(arr);
			}
			break;
		case Getitem:
			arr.forEach(function(item, index, c) {
				arr[index].图示 = arr[index].图示.split('|');
			});
			
			var str = '<div class="contentent2">' +
				' <div class="contentent2_hd">' +
				'<ul class="order_lists1 cartTop">' +
				'<li class="list_id">ID</li>' +
				' <li class="list_img">商品图示</li>' +
				' <li class="list_con">商品名称</li>' +
				' <li class="list_adbeg">起始地</li>' +
				' <li class="list_adend">目的地</li>' +
				' <li class="list_price">价格</li>' +
				' <li class="list_timbeg">起始时间</li>' +
				' <li class="list_timend">终止时间</li>' +
				' <li class="list_peonum">人数</li>' +
				'<li class="list_cartyp">车型</li>' +
				'<li class="list_oper">操作</li>' +
				'<button class="list_addnew" onclick="javascript:addinfo({[0].商品类型})">新增</button>' +
				// '<button class="list_addnew" onclick="javascript:addinfo({['+arr+'].商品类型})">新增</button>' +
				'</ul>' +
				'</div>' +
				'<div class="cartBox">' +
				' <div class="order_content">';
			if(arr.length>=1)
				{
			for (let i = 0; i < arr.length; i++) {
				str +=
					' <ul class="order_lists1">' +
					' <li class="list_id">' +
					' <p class="idpo">{[' + i + '].ID}</p>' +
					' </li>' +
					' <li class="list_img">' +
					' <div href="javascript:;" class="shopimage"><img src="{[' + i + '].图示[0]}"></div>' +
					' </li>' +
					' <li class="list_con">' +
					' <div class="list_text"><a href="javascript:;">{[' + i + '].商品名称}</a></div>' +
					' </li>' +
					' <li class="list_adbeg">' +
					' <p>{[' + i + '].起始地址} </p>' +
					' </li>' +
					' <li class="list_adend">' +
					' <p>{[' + i + '].终止地址}</p>' +
					' </li>' +
					' <li class="list_price">' +
					' <p class="price">{[' + i + '].价格}</p>' +
					' </li>' +
					' <li class="list_timbeg">' +
					' <p>{[' + i + '].起始时间}</p>' +
					' </li>' +
					' <li class="list_timend">' +
					' <p>{[' + i + '].终止时间}</p>' +
					' </li>' +
					' <li class="list_peomum">' +
					' <p>{[' + i + '].人数}</p>' +
					' </li>' +
					' <li class="list_cartyp">' +
					' <p>{[' + i + '].车型} </p>' +
					' </li>' +
					'<li class="list_oper">'+
					'<button class="opbut" onclick="javascript:editbut({['+i+'].ID})">修&nbsp改</button>'+
					'</li>'+
					' </ul>';
			}
			str += '</div>' + '</div>' + '</div>';
			str = str.setobj(arr);
			}
			else if(arr.length==0)
			{
				str += '</div>' + '</div>' + '</div>';
			}
			// console.log(arr);
			break;
		case Get交易记录:
			arr.forEach(function(value, key, c) {
				arr[key].数据.图示 = arr[key].数据.图示.split('|');
			});
			var str = '<div class="contentent3">' +
				' <table class="deal-table">' +
				' <thead>' +
				' <tr>' +
				' <th>支付单号</th>' +
				' <th>商品ID</th>' +
				' <th>商品类型</th>' +
				' <th>商品名称</th>' +
				' <th>创建时间</th>' +
				' <th>修改时间</th>' +
				' <th>金额</th>' +
				' <th>到账</th>' +
				' <th>归属商家</th>' +
				' <th>归属客户</th>' +
				' <th>起始时间</th>' +
				' <th>人数</th>' +
				' <th>车型</th>' +
				' </tr>' +
				' </thead>' +
				' <tbody>';
			for (var i = 0; i < arr.length; i++) {
				str += ' <tr>' +
					' <td>{[' + i + '].支付单号}</td>' +
					' <td>{[' + i + '].商品ID}</td>' +
					' <td>{[' + i + '].商品类型}</td>' +
					' <td>{[' + i + '].商品名称}</td>' +
					' <td>{[' + i + '].创建时间}</td>' +
					' <td>{[' + i + '].修改时间}</td>' +
					' <td>{[' + i + '].金额}</td>' +
					' <td>{[' + i + '].到账}</td>' +
					' <td>{[' + i + '].归属商家}</td>' +
					' <td>{[' + i + '].归属客户}</td>' +
					' <td>{[' + i + '].起始时间}</td>' +
					' <td>{[' + i + '].人数}</td>' +
					' <td>{[' + i + '].车型}</td>' +
					' </tr>';
			}
			str += ' </tbody>' + ' </table>' + '</div>';
			str = str.setobj(arr);
			break;
		case Get商品评价:
			arr.forEach(function(value, key, c) {
				arr[key].数据.图示 = arr[key].数据.图示.split('|');
			});
			var str = '<div class="contentent3">' +
				' <table class="eval-table">' +
				' <thead>' +
				' <tr>' +
				' <th>ID</th>' +
				' <th>创建时间</th>' +
				' <th>修改时间</th>' +
				' <th>商品ID</th>' +
				' <th>评价打分</th>' +
				' <th>评价内容</th>' +
				' </tr>' +
				' </thead>' +
				' <tbody>';
			for (var i = 0; i < arr.length; i++) {
				str += ' <tr>' +
					' <td>{[' + i + '].ID}</td>' +
					' <td>{[' + i + '].创建时间}</td>' +
					' <td>{[' + i + '].修改时间}</td>' +
					' <td>{[' + i + '].商品ID}</td>' +
					' <td>{[' + i + '].评价打分}</td>' +
					' <td>{[' + i + '].评价内容}</td>' +
					' </tr>';
			}
			str += ' </tbody>' + ' </table>' + '</div>';
			str = str.setobj(arr);
			break;
		case Get购物车:
			arr.forEach(function(value, key, c) {
				arr[key].数据.图示 = arr[key].数据.图示.split('|');
			});
			var str = '<div class="contentent3">' +
				' <table class="shop-table">' +
				' <thead>' +
				' <tr>' +
				' <th>ID</th>' +
				' <th>商品ID</th>' +
				' <th>商品类型</th>' +
				' <th>商品名称</th>' +
				' <th>创建时间</th>' +
				' <th>修改时间</th>' +
				' <th>金额</th>' +
				' <th>到账</th>' +
				' <th>归属商家</th>' +
				' <th>归属客户</th>' +
				' <th>起始时间</th>' +
				' <th>人数</th>' +
				' <th>车型</th>' +
				' </tr>' +
				' </thead>' +
				' <tbody>';
			for (var i = 0; i < arr.length; i++) {
				str += ' <tr>' +
					' <td>{[' + i + '].ID}</td>' +
					' <td>{[' + i + '].商品ID}</td>' +
					' <td>{[' + i + '].商品类型}</td>' +
					' <td>{[' + i + '].商品名称}</td>' +
					' <td>{[' + i + '].创建时间}</td>' +
					' <td>{[' + i + '].修改时间}</td>' +
					' <td>{[' + i + '].金额}</td>' +
					' <td>{[' + i + '].到账}</td>' +
					' <td>{[' + i + '].归属商家}</td>' +
					' <td>{[' + i + '].归属客户}</td>' +
					' <td>{[' + i + '].起始时间}</td>' +
					' <td>{[' + i + '].人数}</td>' +
					' <td>{[' + i + '].车型}</td>' +
					' </tr>';
			}
			str += ' </tbody>' + ' </table>' + '</div>';
			str = str.setobj(arr);
			break;
		case Get权限:
			// arr.forEach(function(value, key, c) {
			// 	arr[key].数据.图示 = arr[key].数据.图示.split('|');
			// });
			var str = '<div class="contentent3">'+
		'	<table class="limit-table">'+
		'		<thead>'+
		'			<tr>'+
		'				<th>ID</th>'+
		'				<th>创建时间</th>'+
		'				<th>修改时间</th>'+
		'				<th>使用时间</th>'+
		'				<th>标题</th>'+
		'				<th>内容</th>'+
		'				<th>节点</th>'+
		'			</tr>'+
		'		</thead>'+
		'		<tbody>';
		
			for (var i = 0; i < arr.length; i++) {
				str += '<tr>'+
		'				<td>{['+i+'].ID}</td>'+
		'				<td>{['+i+'].创建时间}</td>'+
		'				<td>{['+i+'].修改时间}</td>'+
		'				<td>{['+i+'].使用时间}</td>'+
		'				<td>{['+i+'].标题}</td>'+
		'				<td>{['+i+'].内容}</td>'+
		'				<td>{['+i+'].节点}</td>'+
		'			</tr>';
			}
			str += ' </tbody>' + ' </table>' + '</div>';
			
			str = str.setobj(arr);
			break;
		case Get车型:
			// arr.forEach(function(value, key, c) {
			// 	arr[key].数据.图示 = arr[key].数据.图示.split('|');
			// });
			var str = '<div class="contentent3">'+
		'	<table class="cars-table">'+
		'		<thead>'+
		'			<tr>'+
		'				<th>ID</th>'+
		'				<th>创建时间</th>'+
		'				<th>修改时间</th>'+
		'				<th>使用时间</th>'+
		'				<th>标题</th>'+
		'				<th>内容</th>'+
		'				<th>节点</th>'+
		'			</tr>'+
		'		</thead>'+
		'		<tbody>';
			for (var i = 0; i < arr.length; i++) {
				str += '<tr>'+
		'				<td>{['+i+'].ID}</td>'+
		'				<td>{['+i+'].创建时间}</td>'+
		'				<td>{['+i+'].修改时间}</td>'+
		'				<td>{['+i+'].使用时间}</td>'+
		'				<td>{['+i+'].标题}</td>'+
		'				<td><textarea class="carinfo">{['+i+'].内容}</textarea></td>'+
		'				<td>{['+i+'].节点}</td>'+
		'			</tr>';
			}
			str += ' </tbody>' + ' </table>' + '</div>';
			str = str.setobj(arr);
			break;
		case Get预订须知:
			// arr.forEach(function(value, key, c) {
			// 	arr[key].数据.图示 = arr[key].数据.图示.split('|');
			// });
			var str = '<div class="contentent3">'+
		'	<table class="warn-table">'+
		'		<thead>'+
		'			<tr>'+
		'				<th>ID</th>'+
		'				<th>创建时间</th>'+
		'				<th>修改时间</th>'+
		'				<th>使用时间</th>'+
		'				<th>标题</th>'+
		'				<th>内容</th>'+
		'				<th>节点</th>'+
		'			</tr>'+
		'		</thead>'+
		'		<tbody>';
			for (var i = 0; i < arr.length; i++) {
				str += '<tr>'+
		'				<td>{['+i+'].ID}</td>'+
		'				<td>{['+i+'].创建时间}</td>'+
		'				<td>{['+i+'].修改时间}</td>'+
		'				<td>{['+i+'].使用时间}</td>'+
		'				<td>{['+i+'].标题}</td>'+
		'				<td>{['+i+'].内容}</td>'+
		'				<td>{['+i+'].节点}</td>'+
		'			</tr>';
			}
			str += ' </tbody>' + ' </table>' + '</div>';
			str = str.setobj(arr);
		break;
	}
	objybl.html(str);
	setheight();
}

function Createzbl(arr) {

}
bequery(Getuser, {}, 'manager');

function setheight() {
	let h = window.innerHeight > document.body.clientHeight ? window.innerHeight : document.body.clientHeight;
	h -= 160;
	$('#info').css('min-height', h);
	$('#zbl').css('min-height', h);
}

function editbut(arr){
	var n=arr;
	console.log(n);
	window.open('/jmp.php?page=createitem&id='+n+'');
}

function addinfo(arr){
	var n=arr;
	console.log(n);
	window.open('/jmp.php?page=createitem&addtype='+n+'');
}

window.onresize = setheight;
