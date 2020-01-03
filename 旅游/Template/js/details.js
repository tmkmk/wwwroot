let cartype = document.getElementById("cartype")
	let CarBtn = document.getElementById('carbtn');
	let oDiv1 = document.getElementById('overlay');
	let oDiv2 = document.getElementById('win');
	let oSpan = oDiv2.getElementsByTagName('span')[0];
	let closebtn=document.getElementsByClassName("car")
	 
	CarBtn.onclick = function(){
		oDiv1.style.display = 'block';
		oDiv2.style.display = 'block';
	}
	oSpan.onclick = function(){
		oDiv1.style.display = 'none';
		oDiv2.style.display = 'none';
	}
	for(let i=0;i<=closebtn.length;i++){
/*		closebtn[i].onclick = function(){
			oDiv1.style.display = 'none';
			oDiv2.style.display = 'none';
			cartype.innerHTML="车型"+(i+1);
		}*/
	}