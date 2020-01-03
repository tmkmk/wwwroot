function CreateTh(object) {
	var ret='';
	for (let key in object) {
		ret += '<th>' + object[key] + '</th>';
	}
	return ret;
}
// '<th>' + tmp.join('<th></th>') + '</th>'
//<td>{['+i+'].ID}</td>
str = '';
tmp = ['ID', '余额', '密码', '姓名', '昵称', '电话', '邮箱', '身份证', '地址', '常住城市', '微信', '驾驶证', '推荐ID', '上级ID', '类型', '用户组', '权限', '创建时间', '修改时间', '使用时间'];
str += '<table><thead><tr><th>' + tmp.join('</th><th>') + '</th></tr></thead><tbody>';
for (let i = 0; i < 5; i++) {
	str += '<tr><td>{[' + i + '].' + tmp.join('}</td><td>{[' + i + '].') + '}</td></tr>';
}
str += '</tbody></table>';
