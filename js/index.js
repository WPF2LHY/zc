$(function() {
	
	$.ajax({
		type: "get",
		url: "http://jx.xuzhixiang.top/ap/api/productlist.php",
		async: true,
		dataType: "json",
		success: function(data) {
			var str = "";
			var newArr=[];
			data = data.data;
//			console.log(data);			
			for(let i = 0; i < data.length; i++) {
				if(data[i].pname){
					newArr.push(data[i])
				}
			}	
			console.log(newArr);
			for(let i=0;i<newArr.length;i++){
				str += `<li>
				<a href="detail.html?id=${newArr[i].pid}" target="_blank">
					<p>${newArr[i].pname}</p>
					<img src="${newArr[i].pimg}" class="img-responsive" alt="Responsive image">
					<h5>${"￥"+newArr[i].pprice}</h5>
					<h4>${newArr[i].pdesc}</h4>	
				</a>
				</li>`;
			}
			
			$(".article_ul").html(str);
		}
	});
	
		$.ajax({
			type:"get",
			url:"http://jx.xuzhixiang.top/ap/api/reg.php?username=zhang&password=zhang",
			async:true,	
			dataType: "json",
			success:function(data){
				console.log(data)	
			}
		});
		$.ajax({
			type:"get",
			url:"http://jx.xuzhixiang.top/ap/api/login.php?username=zhang&password=han",
			async:true,
			dataType: "json",
			success:function(data){
				console.log(data);
				setCookie("id",data.data.id)
			}
		});

})
