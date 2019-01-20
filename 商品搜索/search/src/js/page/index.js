require(['./js/main.js'],function(){
    require(['jquery','bscroll','flex'],function($,bscroll){
        //初始化滚动
        var scroll=new bscroll('section',{
               probeType:2,
               click:true
           }),
           page=1,
           len=10,
           total=0;
        init(); 
       function init(){
           
          //初始化加载
          loadData() 
          //添加页面的点击事件
          addEvent();
          //渲染搜索历史
          loadSpan();
       }
        //加载数据并渲染
       function loadData(title){
             $.ajax({
                 url:'/api/getList',
                 dataType:'json',
                 data:{
                     title:title,
                     page:page,
                     len:len
                 },
                 success:function(res){
                     if(res.code===1){ 
                         total=res.total;  
                         if(title){
                            renderList(res.msg);
                         }
                          renderCon(res.msg);     
                        }
                   }
             })
        }
        function renderList(data){
            var str='';
            data.forEach(function(file){
                str+=`<li>${file.title}</li>`
            })
            $('.header').show();
            $('.header').html(str);
        }

        function renderCon(data){
              var str='';
              data.forEach(function(file){
                  str+=`<li>
                          <img src="./images/${file.url}" alt="">
                          <h2>${file.title}</h2>
                       </li>`
              })
              $('.list').append(str);
              
           if($('.con').height()>=$('section').height()){
               $('.up').show()
           }else{
            $('.up').hide()
           }
           scroll.refresh();
        }

       function loadSpan(){
            $.ajax({
                url:'/api/getSpan',
                dataType:'json',
                success:function(res){
                    if(res.code===1){
                        renderSpan(res.msg)
                    }
                }
            })
       } 

       function renderSpan(data){
            var str='';
            data.forEach(function(file){
                str+=`<span>${file.title}</span>`
            })
            $('.nav').html(str);
       }
    
      
       function addEvent(){
            $('.ipt').on('input',function(){
           
                var val=$(this).val().trim();
                $('.up').html("上拉加载")
                     if(val!=''){
                        $('.header').show();
                        $('.up').hide();
                          page=1;
                          total=0;
                        loadData(val);
                        $('.list').html(''); 
                     }else{
                         $('.list').html('');
                         page=1;
                         total=0;
                        $('.header').hide();
                         loadData();
                     }
            })
            //点击搜索的
            $('.btn').on('click',function(){
                 $('.header').hide();
                 var val=$('.ipt').val();
                 if(val){
                    $('.up').html("上拉加载")
                     serach(val);
                 }
            })
             //点击搜索历史的
            $('.header').on('click','li',function(){
                 $('.up').html("上拉加载")
                  $('.header').show();
                  $('.ipt').val($(this).html());
                  serach($(this).html());
            })
             //点击搜索列表的
            $('.nav').on('click','span',function(){
                 $('.up').html("上拉加载")
                  $('.ipt').val($(this).html());
                  serach($(this).html());
                    $('.header').hide();
            })
            //点击x，清除input值
            $('.del').on('click',function(){
                $('.header').hide();
                if($('.ipt').val().trim()!=''){
                      $('.ipt').val('');
                      $('.list').html('');
                      $('.up').hide();
                      $('.up').html("上拉加载")
                       loadData();
                }
            })
            
            //上拉加载，下拉刷新
            scroll.on('scroll',function(){
               if(this.y<this.maxScrollY-120){
                     $('.up').html('释放加载更多')
               }else if(this.y>this.maxScrollY-80) {
                $('.up').html("上拉加载")
               } 
               if(page===total){
                $('.up').html("没有更多数据")
               }
            })
            scroll.on('scrollEnd',function(){
                if( $('.up').html()==='释放加载更多'){
                    $('.up').html('上拉加载')
                    page++;
                    loadData($('.ipt').val());
                }
            })
            //把搜索的商品放入数据库，并加载数据
            function serach(val){
                console.log(val)
                $.ajax({
                    url:'/api/addList',
                    type:'post',
                    dataType:'json',
                    data:{
                        title:val
                    },
                    success:function(res){
                         if(res.code===1){
                             loadSpan();
                         }
                         $('.list').html('');
                         $('.up').hide();
                           page=1;
                           total=0;
                         loadData(val);
                    }
                })
            }
       }
    })
})