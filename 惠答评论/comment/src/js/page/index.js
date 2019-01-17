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
             var str='';
             data.forEach(function(file){
                  str+=`<div class="con" data-id="${file._id}">
                          <h2>${file.title}</h2>
                          <p>${file.con}</p>
                          <div class="foot">
                            <span>收藏<b>${file.like}</b></span>
                            <span>有用<b>${file.collect}</b></span>
                            <span>评论<b>${file.com.length}</b></span>
                          </div>
                       </div>`
                })
            $('.list').html(str);
       }
       function addEvent(){
            $('.list').on('click','.con',function(){
                var id=$(this).attr('data-id');
                location.href='./page/add.html?id='+id;
            })
       }

    })
})