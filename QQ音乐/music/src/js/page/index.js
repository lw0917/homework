require(['./js/main.js'],function(){
    require(['jquery','bscroll','flex'],function($,bscroll){
        init(); 
       function init(){
           //初始化滚动
           var scroll=new bscroll('section',{
               probeType:2,
               click:true
           })
          //加载数据并渲染
          loadData();
          //添加页面的点击事件
          addEvent();
       }
    
       function loadData(){
             $.ajax({
                 url:'/api/getList',
                 dataType:'json',
                 success:function(res){
                     if(res.code===1){
                         renderList(res.msg);
                     }
                 }
             })
       }
    
       function renderList(data){
             var str='',
                 sum=0;
             data.forEach(function(file){
                  sum+=file.num*1;
                  str+=` <div class="con">
                            <img src="./images/${file.src}" alt="">
                            <div class="title">
                               <h2>${file.title}</h2>
                               <p>${file.intro}</p>
                            </div>
                            <span>${file.num}</span>      
                         </div>`
                })
            $('.sum').html(sum);
            $('.list').html(str);
       }
       function addEvent(){
            $('.btn').on('click',function(){
                location.href='./page/add.html';
            })
       }

    })
})