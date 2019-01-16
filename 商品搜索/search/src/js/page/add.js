require(['../js/main.js'],function(){
    require(['jquery','swiper','flex'],function($,swiper){
         var num=0,
             src='',
             intro='',
             title='';
        init();
        function init(){
            //初始化轮播
           new swiper('.banner');
           //初始化金额
           $('.number').html(location.search?getUrl().num:num);
           //添加点击事件
           addEvent();
        }
        
        function addEvent(){
             //点击返回主页面
             $('.head').on('click',function(){
                 location.href='../../index.html';
             })
             //点击前往键盘页
             $('.number').on('click',function(){
                 location.href='../../page/number.html';
             })
             //点击选择类型
             $('.swiper-wrapper').on('click','dl',function(){
                $(this).addClass('active').siblings().removeClass('active').parent().siblings().find('dl').removeClass('active');
                src=$(this).attr('data-src');
                title=$(this).attr('data-title'); 
            })
            //点击完成,添加账单
            $('footer').on('click',function(){
                  num=$('.number').html();
                  intro=$('input').val();
                   src=src?src:'100.jpg';
                   title=title?title:'菜单';
                if(num!=0){
                    $.ajax({
                        url:'/api/addList',
                        type:'post',
                        data:{
                           num:num,
                           src:src,
                           title:title,
                           intro:intro
                        },
                        dataType:'json',
                        success:function(res){
                           if(res.code===1){
                               alert('添加完成');
                               $('.number').html('0')
                               location.href="../../index.html";
                           }
                        }
                    })
                }else{
                    alert('请输入金额')
                }
            })
        }
        //获取地址栏参数
        function getUrl(){
          return   JSON.parse('{"'+decodeURI(location.search).split('?')[1].replace('&&','";"').replace('=','":"')+'"}'); 
        }

    })
})