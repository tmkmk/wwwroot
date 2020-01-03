var CurrentBox=false;
function selectodata(val, o1){
	if(o1 == undefined){
		var arr=getodata(val.id);
		if(arr){
			var t1='',t2='';
			for(let i=0; i<arr.length; i++){
				t1 +="<button onclick='selectodata(this,0);' onmousemove='selectodata(this,1);' value='"+arr[i]['节点']+"'>"+arr[i]['标题']+"</button>";
				t2 +="<div>"+arr[i]['内容']+"</div>";
			}
			t1 = "<div class='top h24px'>"+t1+"</div>";
			t2 = "<div style='display:none;' id='msgtmpdiv'>"+t2+"</div>";
			t1 += t2+"<div id='msgdisplay'></div>";
			MessageBox(val.id, t1);//.bodyDiv[0].parentNode.parentNode.style.height="auto";
			CurrentBox=val;
		}
	}else if(o1 === 0){// click
		if(val.style.backgroundColor){
			val.style.backgroundColor='';
			CurrentBox.value=Number(CurrentBox.value)-Number(val.value);
		}else{
			val.style.backgroundColor='#fff';
			CurrentBox.value=Number(CurrentBox.value)+Number(val.value);
		}
	}else if(o1 === 1){// onmousemove
		objtmp=val.parentNode.parentNode.children[1];
		objthis=val.parentNode;
		o1=objthis.childElementCount;
		var obj=val.parentNode.parentNode.children[2], str='';
		for(let i=0; i< o1; i++){
			if(objthis.children[i] === val){
				str = objtmp.children[i].innerHTML;
				if(str != obj.innerHTML)obj.innerHTML=str;
			}
		}
		
	}
}
function selectcar(){
	selectodata2($('#cartype')[0], undefined,'车型','请选择车型');
}
function selectodata2(val, o1,o2,o3){
	var mobj=$('#cartype')[0];
	if(o1 == undefined){
		var arr=getodata(o2);
		if(arr){
			var t1='',t2='', v2=$('#carbtn')[0];
			for(let i=0; i<arr.length; i++){
				if((Number(v2.value)&arr[i]['节点']) != arr[i]['节点']) continue;
				t1 +="<button onclick='selectodata2(this,0);' onmousemove='selectodata2(this,1);' value='"+arr[i]['节点']+"'>"+arr[i]['标题']+"</button>";
				t2 +="<div>"+arr[i]['内容']+"</div>";
			}
			t1 = "<div class='top h24px'>"+t1+"</div>";
			t2 = "<div style='display:none;' id='msgtmpdiv'>"+t2+"</div>";
			t1 += t2+"<div id='msgdisplay'></div>";
			var dialog=0;
			KindEditor.ready(function(K) {
				dialog = K.dialog({
					width : 500,
					title : o3,
					body : "<div style='margin:10px;'>"+t1+"</div>",
					closeBtn : {
						name : '关闭',
						click : function(e) {
							dialog.remove();
						}
					},
					yesBtn : {
						name : '确定',
						click : function(e) {
							var a=$('.ke-dialog-header')[0];
							var str = a.innerHTML;
							CurrentBox.innerHTML=str.substr(0,str.indexOf('<'));
							dialog.remove();
						}
					},
					noBtn : {
						name : '取消',
						click : function(e) {
							dialog.remove();
							mobj.value=0;
						}
					}
				});
				ret = dialog;
			});
			dialog.bodyDiv[0].parentNode.parentNode.style.height="auto";
			CurrentBox=val;
		}
	}else if(o1 === 0){// click
		var a=$('.ke-dialog-header')[0];
		var str = a.innerHTML;
		str=str.substr(str.indexOf('<'));
		a.innerHTML=val.innerHTML+str;
		mobj.value=val.value;
	}else if(o1 === 1){// onmousemove
		objtmp=val.parentNode.parentNode.children[1];
		objthis=val.parentNode;
		o1=objthis.childElementCount;
		var obj=val.parentNode.parentNode.children[2], str='';
		for(let i=0; i< o1; i++){
			if(objthis.children[i] === val){
				str = objtmp.children[i].innerHTML;
				if(str != obj.innerHTML)obj.innerHTML=str;
			}
		}
		
	}
}
function addTableDoubleClick(TableID){
	var objtb=$(TableID);
	objtb.unbind();
	objtb.on('dblclick', 'td',
	function() {
		var td=$(this),i,dialog=td.closest('tr').children(), to=$('#title'),tt=to.text(), itemid=dialog.eq(0).text();
		for(i=0;i<dialog.length;i++){
			if(dialog[i]===this)break;
		}
		if(i < 4){
			alert('错误!\r\n此项数据无法修改');
			return;
		}
		i = td.closest('table').find('th').eq(i).text();
		if(to.val()==Getitem){
			tt += ' '+SelectData[$('select').val()]['名称'];
		}
		tt += ' ID='+itemid+'&nbsp;&nbsp;&nbsp;&nbsp;'+i;
		
		KindEditor.ready(function(K) {
			dialog = K.dialog({
				width : '653px',
				title : tt,
				body : "<div><strong><textarea id='textareatmpId' name='content'>" + td.children()[0].innerHTML + "</textarea></strong></div>",
				closeBtn : {
					name : '关闭',
					click : function(e) {
						dialog.remove();
					}
				},
				yesBtn : {
					name : '确定',
					click : function(e) {
						let data=[];
						data[i]=$('#textareatmpId').val();
						data['ID']=itemid;
						td.children()[0].innerHTML=data[i];
						bequery(Number(to.val())+2000, data,"alert('成功!\\n修改数据成功')");
						dialog.remove();
					}
				},
				noBtn : {
					name : '取消',
					click : function(e) {
						dialog.remove();
					}
				}
			});
		});
		dialog.bodyDiv[0].parentNode.parentNode.style.height="auto";
		editor = KindEditor.create('textarea[name="content"]', {
				allowFileManager: true,
				});
				console.log(this);
			var autoheight = editor.edit.doc.body.scrollHeight;
			editor.edit.setHeight(autoheight);
//			editor.edit.setWidth(500);
			obj=$(editor.edit.doc);
	});
}
myKE='';
KindEditor.create('', {
		afterCreate:function(){myKE=this;}
	});
	
function setman2other(arr){
	var a=Number(arr['车型']), b=getodata('车型'),rarr=[];
	for(let i=0;i<b.length;i++){
		if((a&b[i]['节点']) == b[i]['节点']){
			rarr.push(b[i]);
		}
	}
	console.log(rarr);
}

String.prototype.push=function(str){
	console.log(this+str);
	//this +=str;
}
bpic=['/images/banner/1.jpg','/images/banner/2.jpg','/images/banner/3.jpg'];
objbandiv=$('#banner');
function funbanner(val,now=0){
	//objbandiv.style.backgroundImage="url(/images/banner/3.jpg)"
	if(val<101){
		objbandiv.children().attr('style', 'opacity:'+(val/100));
		val++;
		setTimeout("funbanner("+val+","+now+");",30);
	}else{
		val=10;
		objbandiv[0].style.backgroundImage="url("+bpic[now]+")";
		objbandiv[0].children[0].style.opacity=0;
		now++;
		if(now >= bpic.length)now=0;
		objbandiv[0].children[0].src=bpic[now];
		
		setTimeout("funbanner(0,"+now+");",3000);
	}
}
















