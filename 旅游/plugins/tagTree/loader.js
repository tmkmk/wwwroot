function addjs2(val){
	let str = "<script src='"+val+"'></script>";
	document.writeln(str);
}
function addcss2(val){
	$("<link>")
	.attr({ rel: "stylesheet",
	type: "text/css",
	href: val
	})
	.appendTo("head");
}
addcss2('plugins/tagTree/tagTree.css');
addjs2('plugins/tagTree/tagTree.js');