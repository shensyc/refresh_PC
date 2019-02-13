$(function(){
    $('.footer').load('footer.html');
});

//通用js主函数
function main(){
    //购物车下拉菜单
    $(".s_cart").mouseover(function(){
        $(".cart_dropdown").stop().slideDown(100,function(){
            $(".cart_dropdown").attr('style','display:block');
        });
    });
    $(".s_cart").mouseout(function(){
        $(".cart_dropdown").stop().slideUp(100);
    });

    //判断用户是否登录
    if(sessionStorage.uid){//用户已登录
        var text='<li class="top_user"><a href="">'+sessionStorage.uname+'</a></li>'
                +'<li class="top_quit"><a href="">退出</a></li>';
        $('.h_con>ul').append(text);
        $('.top_quit').click(function(){
            sessionStorage.clear();
        });
        cartList();//刷新头部购物车列表

    }else{//用户未登录
        var text='<li><a href="login.html" class="h_login">登录</a></li>'
                +'<li><em>|</em></li>'
                +'<li><a href="register.html" class="h_register">注册</a></li>';
        $('.h_con>ul').append(text);

    }

}
//导航项高亮显示
function navText(text){
    $('.nav>ul>li').each(function(){
        var thisText=$(this).children("a").text()
        if(thisText==text){
            $(this).addClass('cur');
        }
    });
}
//时间格式转换函数
function dateFormat(time,sign){
    var t=new Date(time);
    var tf=function(i){return i>9?i:'0'+i};
    var year= t.getFullYear();
    var month= tf(t.getMonth()+1);
    var day= tf(t.getDate());
    return year+sign+month+sign+day;
}
//购物车列表
function cartList(){
    $.ajax({
        type:'post',
        url:'php/cart_detail_select.php',
        data:{uid:sessionStorage.uid},
        success:function(data){
            //console.log(data);
            if(data.products.length==0){//购物车为空
                $('.cart_dropdown>h3').html('您的购物车为空~');
            }else{//读取列表
                var d=data.products;
                var cartList='<ul>';
                var count=0;//购物车总数量
                var priceSum=0;//总金额
                for(var i=0;i< d.length;i++){
                    cartList+='<li data-pid="'+d[i].pid+'" data-did="'+d[i].did+'">'
                        +'<a href="product_details.html?pid='+ d[i].pid+'"><img src="'+ d[i].pic+'" alt=""/></a>'
                        +' <div class="h_cart_operation">'
                        +' <span class="h_cart_minus">-</span><input type="text" value="'+ d[i].count+'"/><span class="h_cart_add">+</span>'
                        +' </div>'
                        +' <strong>'+ d[i].price+'</strong>'
                        +' <em class="h_cart_remove"></em>'
                        +'</li>';
                    count+=parseInt(d[i].count);
                    priceSum+=d[i].price*d[i].count;
                }
                cartList+='</ul>';
                $('.cart_dropdown').html(cartList);
                $('#cart_sum').text(count);
                var htmlJs='<div class="cd_js clearfloat">'
                      +'<span>共计：<strong>'+priceSum.toFixed(2)+'</strong></span>'
                      +'<a href="cart.html">结算</a>'
                      +'</div>';
                $('.cart_dropdown').append(htmlJs);
            }
        }
    });
}
//购物车产品数量的增加/减少功能
$('.header_box').on('click','.h_cart_operation span',function(){
    var pid=$(this).parents('li').attr('data-pid');
    var did=$(this).parents('li').attr('data-did');
    var count=$(this).siblings('input').val();
    if($(this).is('.h_cart_minus')){//用户点击的是‘-’号
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
                cartList();//刷新购物车下拉列表
            }
        }
    });
});

//删除购物车
$('.header_box').on('click','.h_cart_remove',function(){
    var thisLi=$(this).parent();
    var did=thisLi.attr('data-did');
    $.ajax({
        type:'post',
        url:'php/cart_detail_delete.php',
        data:{did:did},
        success:function(data){
            if(data.code==1){
                //thisLi.remove();
                cartList();//刷新购物车列表
            }
        }
    });
});






