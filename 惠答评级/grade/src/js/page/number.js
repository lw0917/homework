require(['../js/main.js'],function(){
    require(['jquery','bscroll','flex'],function($,bscroll){
         var id=getUrl().id;
         init();
        function init(){
             //初始化滚动
              new bscroll('section',{
                  probeType:2,
                  click:true
              })
             //初始化渲染   
             loadData();

             //添加点击事件
             addEvent()
         }
         
         function loadData(){
              $.ajax({
                  url:'/api/getList',
                  dataType:'json',
                  data:{
                      id:id
                  },
                  success:function(res){
                      if(res.code===1){
                          renderList(res.msg)
                      }
                  }
              })
         }

         function renderList(data){
              $('.content h2').html(data[0].title);
              $('.content p').html(data[0].con);
              if(data[0].grade!=0){
                   //清除所有星星的所有样式
                   $('.right span').removeClass('icon-shoucang').removeClass('icon-favoritesfilling');
                   //点击谁给谁和前面所有的星星添加icon图标和样式
                   $('.right span').eq(data[0].grade-1).addClass('icon-favoritesfilling').prevAll().addClass('icon-favoritesfilling');
                   //给点击之后的星星添加原始样式
                   $('.right span').eq(data[0].grade-1).nextAll().addClass('icon-shoucang');
              }
              
         }
         function addEvent(){
            //点击返回添加账单页面
            $('.back').on('click',function(){
                location.href='../../page/add.html';
            })
            //给文章评级icon-favoritesfilling
            $('.right').on('click','span',function(){
                   //清除所有星星的所有样式
                   $('.right span').removeClass('icon-shoucang').removeClass('icon-favoritesfilling');
                   //点击谁给谁和前面所有的星星添加icon图标和样式
                   $(this).addClass('icon-favoritesfilling').prevAll().addClass('icon-favoritesfilling');
                   //给点击之后的星星添加原始样式
                   $(this).nextAll().addClass('icon-shoucang');
    
                   $.ajax({
                       url:'/api/addList',
                       data:{
                           id:id,
                           grade:$(this).index()+1
                       },
                       type:'post',
                       success:function(res){
                          if(res.code===1){
                              alert(res.msg);
                          }
                       }
                   })
            })
         }
          
         //获取地址栏参数
        function getUrl(){
            return   JSON.parse('{"'+decodeURI(location.search).split('?')[1].replace('&&','";"').replace('=','":"')+'"}'); 
          }
    })
})