$(function(){
  $('.header_box').load('header.html',function(){
    main();
  });

  $('#uname').blur(unameCheck);
  $('#upwd').blur(upwdCheck);

  $('#login').click(function(){
    if(unameCheck()&&upwdCheck()){//验证通过
      var uname= $.trim($('#uname').val());
      var upwd= $.trim($('#upwd').val());
      $.ajax({
        type:"post",
        url:'php/user_login.php',
        data:{unameOrPhone:uname,upwd:upwd},
        success:function(data){
          //console.log(data);
          if(data.code!=1){//登录不成功
            $('#uname_tips').show().text('用户名或密码不正确');
          }else{//登录成功
            sessionStorage.uid=data.uid;
            sessionStorage.uname=data.uname;
            history.go(-1);
          }
        }
      });
    }

  });




  //验证用户名
  function unameCheck(){
    var uname= $.trim($('#uname').val());
    if(!uname){//当用户名为空的时候
      $('#uname_tips').show().text('用户名不能为空');
      $('#uname_icon').show();
      return false;
    }else{
      $('#uname_tips').hide();
      $('#uname_icon').hide();
      return true;
    }
  }
  //验证密码
  function upwdCheck(){
    var upwd= $.trim($('#upwd').val());
    if(!upwd){//当用户名为空的时候
      $('#upwd_tips').show();
      $('#upwd_icon').show();
      return false;
    }else{
      $('#upwd_tips').hide();
      $('#upwd_icon').hide();
      return true;
    }
  }

});



