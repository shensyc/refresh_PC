$(function(){
  $('.header_box').load('header.html',function(){
    main();
    navText('产品中心');
  });

  //获取pid
  var str=window.location.href;
  var pid=str.substr(str.lastIndexOf('=')+1);
  $.ajax({
    type:'post',
    url:'php/product_detail.php',
    data:{pid:pid},
    success:function(data){
      //console.log(data);
      $('.pdinfo_img>img').attr("src",data.pic);
      $('.pdinfo_text>h2').html(data.title1);
      var listHtml='';
      listHtml+='<li>型号：'+data.model+'</li>';
      listHtml+='<li>功能：'+data.func+'</li>';
      listHtml+='<li>噪音：'+data.noise+'</li>';
      listHtml+='<li>风量：'+data.wind+'</li>';
      listHtml+='<li>适用对象：'+data.applyTo+'</li>';
      listHtml+='<li>适用面积：'+data.size+'</li>';
      listHtml+='<li>空气净化能效等级：'+data.level+'</li>';
      $('.pdinfo_text>ul').html(listHtml);
      $('#price').html(data.price);
      $('.pd_details').html(data.detail);
    }
  });
  //添加购物车
  $('#addCart').click(function(e){
    e.preventDefault();
    //判断用户是否登录
    if(!sessionStorage.uid){//未登录
      location.href='login.html';
    }else{//已登录
      var uid=sessionStorage['uid'];
      $.ajax({
        type:'post',
        url:'php/cart_detail_add.php',
        data:{uid:uid,pid:pid},
        success:function(data){
          //console.log(data);
          if(data.code==1){
            alert('添加成功！');
            cartList();
          }
        }
      });
    }
  });


});