require(['./js/main.js'],function(){
    require(['jquery','flex'],function($){
        init(); 
       function init(){
          //添加页面的点击事件
          addEvent();
       }
       function addEvent(){
            $('.btn').on('click',function(){
                location.href='./page/add.html';
            })
       }

    })
})