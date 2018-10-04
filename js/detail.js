$(function(){
	
	var id=location.search.slice(4);
	console.log(id);
	$.ajax({
		type:"get",
		url:"http://jx.xuzhixiang.top/ap/api/detail.php?id="+id,
		async:true,
		dataType: "json",
		success:function(data){
			var str="";
			data=data.data;
			console.log(data);
			str+=`
				<p>${data.pname}</p>
				<img src="${data.pimg}">
				<h4>${"￥"+data.pprice}</h4>
				<h5>${data.pdesc}</h5>
				<span class="gouMai">立即购买</span>
				<span class="addShop">加入购物车</span>
				
			`;
			$(".detail_box").html(str);
			
			$(".addShop").click(function(){
					//console.log(id)
				$.ajax({
					type:"get",
					url:"http://jx.xuzhixiang.top/ap/api/add-product.php?uid="+getCookie("id")+"&pid="+id+"&pnum=1",
					async:true,
					dataType: "json",
					success:function(data){
						console.log(data);
					}
				});

			})
		
			$(".gouMai").click(function(){
			console.log("aa")
			$(location).attr("href","shopCart.html");
		})
		}
	});
	
})
