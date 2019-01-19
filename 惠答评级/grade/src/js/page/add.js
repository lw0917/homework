require(['../js/main.js'],function(){
    require(['jquery','flex'],function($){
      
        init();
        function init(){
           //初始化渲染
           loadData() 
           //添加点击事件
           addEvent();
        }
        function loadData(){
            $.ajax({
                url:'/api/getList',
                dataType:'json',
                success:function(res){
                    if(res.code===1){
                        renderList(res.msg)
                    }
                }
            })
        }
        function renderList(data){
            var str='';
            data.forEach(function(file){
                str+=`<li data-id="${file._id}">${file.title}</li>`
            })
            $('.list').html(str);
        }
        function addEvent(){
             //点击返回主页面
             $('.back').on('click',function(){
                 location.href='../../index.html';
             })
             //点击前往详情页
             $('.list').on('click','li',function(){
                 location.href='../../page/number.html?id='+$(this).attr('data-id');
             })
        }
        //获取地址栏参数
        function getUrl(){
          return   JSON.parse('{"'+decodeURI(location.search).split('?')[1].replace('&&','";"').replace('=','":"')+'"}'); 
        }

    })
})