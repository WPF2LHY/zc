
//增加或这修改cookie;
function  setCookie(name,value,n){
	var oDate=new Date();
	oDate.setDate(oDate.getDate()+n);
	document.cookie=name+"="+value+";expires="+oDate;
}

 
//获取到cookie;
	function getCookie(name){
		var str=document.cookie;
		var arr=str.split("; ");
		for(var i=0;i<arr.length;i++){
			var newArr=arr[i].split("=");
			if(newArr[0]==name){
				return newArr[1];
			}
		}
	}

//删除cookie;
// function removeCookie(name){
// 	  setCookie(name,1,-1);
// }
		function removeCookie(name){
				setCookie(name,1,-1);
			}
