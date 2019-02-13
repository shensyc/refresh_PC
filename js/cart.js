$(function(){
  $('.header_box').load('header.html',function(){
    main();
    $('.s_cart').remove();//删除导航条上的购物车部分
  });

  if(sessionStorage.uid){
    cList();
  }
});
//购物车列表
function cList(){
  $.ajax({
    type:'post',
    url:'php/cart_detail_select.php',
    data:{uid:sessionStorage.uid},
    success:function(data){
      //console.log(data);
      if(data.products.length==0){//购物车为空
        $('.cartcon_list>h2').html('购物车中没有任何商品！<a href="product.html">产品中心</a>');
        $('.cart_header em').text(0);
        $('.cart_header strong').text('0.00');
      }else{//读取列表
        var d=data.products;
        var listHtml='<ul>';
        var count=0;//购物车总数量
        var priceSum=0;//总金额
        for(var i=0;i< d.length;i++){
          var priceS=d[i].price*d[i].count;
          listHtml+='<li data-pid="'+d[i].pid+'" data-did="'+d[i].did+'">'
          +' <input type="checkbox" class="cart_checkbox"/>'
          +' <a href="product_details.html?pid='+ d[i].pid+'" class="cart_img"><img src="'+ d[i].pic+'" alt=""/></a>'
          +' <a href="product_details.html?pid='+ d[i].pid+'" class="cart_title">'+d[i].title1+'</a>'
          +' <i>¥'+d[i].price+'</i>'
          +' <div class="operation">'
          +' <span class="minus">-</span><input type="text" value="'+ d[i].count+'"/><span class="add">+</span>'
          +' </div>'
          +' <strong>'+ priceS.toFixed(2)+'</strong>'
          +' <em class="remove"></em>'
          +'</li>';
          count+=parseInt(d[i].count);
          priceSum+=priceS;
        }
        listHtml+='</ul>';
        $('.cartcon_list').html(listHtml);
        $('.cart_header em').text(count);
        $('.cart_header strong').text(priceSum.toFixed(2));
      }
    }
  });
}
//更新数量
$('.cartcon_list').on('click','.operation span',function(){
  var pid=$(this).parents('li').attr('data-pid');
  var did=$(this).parents('li').attr('data-did');
  var count=$(this).siblings('input').val();
  if($(this).is('.minus')){//用户点击的是‘-’号
    if(count==1) return;
    count--;
  }else{//用户点击的是‘+’号
    count++;
  }
  $.ajax({
    type:'post',
    url:'php/cart_detail_update.php',
    data:{pid:pid,did:did,count:count},
    success:function(data){
      if(data.code==1){
        cList();//刷新购物车下拉列表
      }
    }
  });
});
//删除商品
$('.cartcon_list').on('click','.remove',function(){
  var thisLi=$(this).parent();
  var did=thisLi.attr('data-did');
  $.ajax({
    type:'post',
    url:'php/cart_detail_delete.php',
    data:{did:did},
    success:function(data){
      if(data.code==1){
        //thisLi.remove();
        cList();//刷新购物车列表
      }
    }
  });
});

//全选&全不选
$('.cartcon_list').on('click','.cart_checkbox',function(){
  if($(this).is(':checked')){
    var numC=$('.cart_checkbox:checked').size();
    var numL=$('.cart_checkbox').size();
    if(numC==numL){
      $('.checkbox_all').prop("checked",true);
    }
  }else{
    $('.checkbox_all').prop("checked",false);
  }
});
$('.checkbox_all').click(function(){
  if($(this).is(':checked')){
    $('.cart_checkbox').prop("checked",true);
  }else{
    $('.cart_checkbox').prop("checked",false);
  }
});

