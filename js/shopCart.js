$(function() {

	$.ajax({
		type: "get",
		url: "http://jx.xuzhixiang.top/ap/api/cart-list.php?id=" + getCookie("id") + "",
		async: true,
		dataType: "json",
		success: function(data) {
			data = data.data;
			//console.log(data);
			var str = "";
			for(let i = 0; i < data.length; i++) {
				str += `<li>
						<input type="checkbox" class="liinput">
						<img src='${data[i].pimg}'>
						<span>${data[i].pdesc}</span>						
						<span class="price">${data[i].pprice}</span>
						<input type="button" value="-" class="btnReduce">
						<i class="shop_count">${data[i].pnum}</i>
						<input type="button" value="+" class="btnAdd">
						<p class="shop_price">${data[i].pnum*data[i].pprice}</p>
						<span class="delete_btn">删除</span>					
				</li>`;
			}
			$("#article_div_ul").html(str);

			//显示价格：
			  var shop_price = document.getElementsByClassName("shop_price");			  
			  var newArr=[];
			  for(let i = 0; i < shop_price.length;i++){
			  	newArr.push(Number(shop_price[i].innerHTML));
			  }
			  //console.log(newArr);
			  var total_price = 0;
			  for(var i = 0 ; i<newArr.length;i++){
			  	total_price += newArr[i];
			  }
			  $(".article_ul_down1").html(total_price);
			  
			  //点击按钮增加商品；
			  
			  $(".btnAdd").click(function(){
			  	var index = $(this).parent().index();
			  	var pid =data[index].pid;					
			  	$.ajax({
			  		type:"get",			  		url:"http://jx.xuzhixiang.top/ap/api/add-product.php?uid="+getCookie("id")+"&pid="+pid+"&pnum=1",
			  		async:true,
			  		dataType:"json",
			  		success:function(data){
			  			//console.log(data)
			  			$.ajax({
			  				type:"get",
			  				url:"http://jx.xuzhixiang.top/ap/api/cart-list.php?id="+getCookie("id")+"",
			  				async:true,
			  				dataType:"json",
			  				success:function(data){			  					
			  					data=data.data;
			  					console.log(data);
			  					$(".shop_count").eq(index).html(data[index].pnum);
			  					
			  					//点击按钮价格
			  						var total_price= 0;
			  						var per_price = 0;
			  						for( var i =0; i< data.length ;i++){
			  							total_price += data[i].pprice*data[i].pnum;
			  							per_price = data[i].pprice*data[i].pnum
			  						}
			  						$(".article_ul_down1").html(total_price);
			  						$(".shop_price").html(per_price);
			  				}
			  			});
			  		}
			  	});
			  })
			  
			  //点击按钮减少商品：
			  $(".btnReduce").click(function(){
			  	var index = $(this).parent().index();
			  	var pid =data[index].pid;					
			  	$.ajax({
			  		type:"get",			  		
			  		url:"http://jx.xuzhixiang.top/ap/api/add-product.php?uid="+getCookie("id")+"&pid="+pid+"&pnum=-1",
			  		async:true,
			  		dataType:"json",
			  		success:function(data){
			  			//console.log(data)
			  			$.ajax({
			  				type:"get",
			  				url:"http://jx.xuzhixiang.top/ap/api/cart-list.php?id="+getCookie("id")+"",
			  				async:true,
			  				dataType:"json",
			  				success:function(data){			  					
			  					data=data.data;
			  					console.log(data);
			  					$(".shop_count").eq(index).html(data[index].pnum);
			  				//当商品为0的时候，删除商品
			  				if(data[index].pnum==0){
			  					console.log(index);
			  					$(".btnReduce").eq(index).parent().remove();
			  					$.ajax({
			  						type:"get",			  						url:"http://jx.xuzhixiang.top/ap/api/cart-delete.php?uid="+getCookie("id")+"&pid="+pid+"",
			  						async:true,
			  						dataType:"json",
			  						success:function(data){
			  							console.log(data);
			  							
			  						}
			  					});
			  				}
			  						  					
			  					//点击按钮价格
			  						var total_price= 0;
			  						var per_price = 0;
			  						for( var i =0; i< data.length ;i++){
			  							total_price += data[i].pprice*data[i].pnum;
			  							per_price = data[i].pprice*data[i].pnum
			  						}
			  						$(".article_ul_down1").html(total_price);
			  						$(".shop_price").html(per_price);
			  				}
			  			});
			  		}
			  	});
			  })
			  
			  
			  //点击删除按钮的时候全部删除;
			  	$(".delete_btn").click(function(){
			  		var index = $(this).parent().index();
			  		var pid =data[index].pid;
			  		$(".delete_btn").eq(index).parent().remove();
			  		$.ajax({
			  			type:"get",
			  		url:"http://jx.xuzhixiang.top/ap/api/cart-delete.php?uid="+getCookie("id")+"&pid="+pid+"",
			  			async:true,
			  			dataType:"json",
			  			success:function(data){
			  				console.log(data)
			  			}
			  		});
			  		//页面显示的价格也要变化：
			  		 var shop_price = document.getElementsByClassName("shop_price");			  
						  var newArr=[];
						  for(let i = 0; i < shop_price.length;i++){
						  	newArr.push(Number(shop_price[i].innerHTML));
						  }
						  //console.log(newArr);
						  var total_price = 0;
						  for(var i = 0 ; i<newArr.length;i++){
						  	total_price += newArr[i];
						  }
						  $(".article_ul_down1").html(total_price);
			  		
			  	})
			  	
			  	//全选删除:
			  	$("#checkAll").click(function(){
					$("li input").prop("checked",$(this).prop("checked"));
				});
				$("#checkOther").click(function(){
					$("li input").each(function(){
						$(this).prop("checked",!$(this).prop("checked"));
					})
				});
				$("li input").click(function(){
					if($("li input:checked").length == $("li input").length){
						$("#checkAll").prop("checked",true);
					}else{
						$("#checkAll").prop("checked",false);
					}
				})
		}
	})
})