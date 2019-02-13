$(function(){
  $('.header_box').load('header.html',function(){
    main();
    navText("公司动态");
  });

  var pageNum=1;//请求页码
  var pageCount;//总页码数
  newsList();

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
    newsList();
  });




function newsList(){
  $.ajax({
    type:"post",
    url:"php/news_select.php",
    data:{pageNum:pageNum},
    success:function(d){
      //console.log(data);
      var data=d.data;
      var n=data.length;
      var html="";
      for(var i=0;i<n;i++){
        var t=dateFormat(parseInt(data[i].pubTime),'-');
        html+='<li><span>'+t+'</span><a href="news_details.html?nid='+data[i].nid+'">'+data[i].title+'</a></li>';
      }
      $('.news>ul').html(html);

      //动态显示页码
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




