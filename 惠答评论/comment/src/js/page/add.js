require(['../js/main.js'],function(){
    require(['jquery','bscroll','flex'],function($,bscroll){
        
         var id=getUrl().id,
             data=null;
        init();
        function init(){
             new bscroll('section',{
                 probeType:2,
                 click:true
             })
             new bscroll('.con',{
                probeType:2,
                click:true
            })
            //初始化渲染
            loadData();
           //添加点击事件
           addEvent();
        }
        
        function loadData(){
            $.ajax({
                url:'/api/getList',
                dataType:'json',
                data:{
                    id:id
                },
                success:function(res){
                    data=res.msg;
                    console.log(res.msg)
                     if(res.code===1){
                         render(res.msg);
                     }
                }
            })
        }

        function render(data){
               //渲染标题和内容
                     //渲染标题
                      $('.content>h2').html(data[0].title);
                     //渲染文章
                       $('.content>p').html(data[0].con);
               //渲染footer的各个标签
                     //渲染收藏
                     $('footer>span').eq(0).find('b').html(data[0].like);
                     //渲染有用
                     $('footer>span').eq(1).find('b').html(data[0].collect);
                     //渲染评论数量
                     $('footer>span').eq(2).find('b').html(data[0].com.length);
               //渲染评论列表
                var str='';
                data[0].com.forEach(function(file){
                     str+=` <li>
                          <img src="../images/${file.icon}" alt="">
                          <div class="right">
                             <h2><span>${file.user}</span><time>${file.time}</time>></h2>
                             <p>${file.con}</p>
                          </div>
                        </li>`
                })
                $('ul').html(str);
        }

        function addEvent(){
             //点击返回主页面
             $('.back').on('click',function(){
                 location.href='../../index.html';
             })
             //展示评论界面
             $('footer').on('click','.add',function(){
                  $('.mask').addClass('active');
                  $('.mask').show();
             })
             //点击关闭评论页面
             $('.close').on('click',function(){
                  $('.mask').removeClass('active');
                  loadData();
             })
           
            //点击发布,添加评论
            $('.btn').on('click',function(){
                
                var obj={
                     icon:'100.jpg',
                     user:'toney',
                     con:$('input').val(),
                     time:new Date()
                }  
                data[0].com.push(obj);
                $('input').val('');
                    $.ajax({
                        url:'/api/addList',
                        type:'post',
                        data:{
                            id:id,
                            com:JSON.stringify(data[0].com)   
                        },
                        dataType:'json',
                        success:function(res){
                           if(res.code===1){
                               alert('添加完成');
                               loadData();
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