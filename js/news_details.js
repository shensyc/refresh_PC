$(function(){
  $('.header_box').load('header.html',function(){
    main();
    navText('公司动态');
  });

  //获取nid
  var str=window.location.href;
  var nid=str.substr(str.lastIndexOf('=')+1);
  $.ajax({
    type:'post',
    url:'php/news_detail.php',
    data:{nid:nid},
    success:function(data){
      //console.log(data);
      $('.news_details>h2').html(data.title);
      var t=dateFormat(parseInt(data.pubTime),'-');
      $('.news_details>span').append(t);
      $('.news_content').html(data.content);
    }
  });


});





