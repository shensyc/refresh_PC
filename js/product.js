$(function(){
  $('.header_box').load('header.html',function(){
    main();
    navText('产品中心');
  });
  var type=1;//产品类型
  var pageNum=1;//请求页码
  var pageCount;//总页数
  //获取type值
  var str=window.location.href;
  if(str.lastIndexOf('=')!=-1){
    var type=str.substr(str.lastIndexOf('=')+1);
  }
  $('.pl_header a').removeClass();
  $('.pl_header a').eq(type-1).addClass('cur');
  pList(type,pageNum);



  //切换类型时
  $('.pl_header a').click(function(e){
    e.preventDefault();
    $('.pl_header a').removeClass();
    $(this).addClass('cur');
    type=$(this).index()+1;
    pageNum=1;
    pList(type,pageNum);
  });

  //页码点击事件
  $(".pages").on('click','a',function(e){
    e.preventDefault();//清除a标记的默认行为
    var index=$(this).index();//获取用户点击的a标记的下标
    if(index==0){//用户点击的为上一页
      if(pageNum==1) return;
      pageNum--;
    }else if(index==pageCount+1){//当用户点击的是下一页的时候
      if(pageNum==pageCount) return;
      pageNum++;
    }else{//点击页码的时候
      pageNum=index;
    }
    pList(type,pageNum);
  });





  function pList(type,pageNum){
    $.ajax({
      type:'post',
      url:'php/product_select.php',
      data:{type:type,pageNum:pageNum},
      success:function(d){
        console.log(d);
        var data= d.data;//列表数据
        var n=data.length;//列表长度
        //生成列表
        var listHtml='';
        for(var i=0;i<n;i++){
          listHtml+='<li>'
            +'<a href="product_details.html?pid='+data[i].pid+'"><img src="'+data[i].pic+'" alt=""/></a>'
            +'<div class="pdlist_text clearfloat">'
            +'<h3>'
            +'<p>'+data[i].model+'</p>'
            +'<span>'+data[i].title2+'</span>'
            +'</h3>'
            +'<a href="product_details.html?pid='+data[i].pid+'">查看详情</a>'
            +'</div>'
            +'</li>';
        }
        $('.product_list').html(listHtml);

        //动态生成页码
        pageCount= d.pageCount;
        var pageHtml='<a href="">上一页</a>';
        for(var i=1;i< d.pageCount+1;i++){
          pageHtml+='<a href="">'+i+'</a>';
        }
        pageHtml+='<a href="">下一页</a>';
        $('.pages').html(pageHtml);
        //让当前页码高亮
        $('.pages a').eq(d.pageNum).addClass('cur');
        //为上一页下一页添加样式
        if(d.pageNum==1){
          $('.pages a:first').addClass('default');
        }
        if(d.pageNum== d.pageCount){
          $('.pages a:last').addClass('default');
        }
      }
    });
  }


});