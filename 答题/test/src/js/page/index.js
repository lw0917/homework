require(['./js/main.js'],function(){
    require(['jquery','flex'],function($){
        var num=0,
            arr=[];
        init(); 
       function init(){
          //加载数据并渲染
          loadData();
          //添加页面的点击事件
          addEvent();
       }
    
       function loadData(){
             $.ajax({
                 url:'/api/getList',
                 dataType:'json',
                 data:{
                   num:num
                 },
                 success:function(res){
                     if(res.code===1){                      
                       renderList(res);
                     }else if(res.code===4){
                         $('footer').hide();
                         renderList(res);
                     }
                 }
             })
       }
    
       function renderList(data){
              //渲染总页数和分页数；
              $('.num').html(`<b>${++num}</b> / ${data.total}`); 
              //渲染题目
              $('.title').html(data.msg.title);
              //选项
              var str='';
              for(var key in data.msg.answer){
                  str+=`<li>
                            <span>${key}</span><p>${data.msg.answer[key]}</p>
                       </li>`
              } 
             $('ul').html(str);
             //渲染正确答案
             $('.result').html(data.msg.result);   
       }
       function addEvent(){
            $('ul').on('click','span', function(){
                  if($('.con').hasClass('show')){
                      return
                  }else{
                       if($(this).html()==$('.result').html()){
                           $(this).addClass('active');
                       }else{
                          $(this).addClass('error');
                       }
                        $('.con').addClass('show');
                  }  
            })
            $('.btn').on('click',function(){
                if($('.con').hasClass('show')){
                    $('.con').removeClass('show');
                    loadData();
                }else{
                    $('.mask').removeClass('hidden');
                }  
            })
            
            $('ol').on('click','li',function(){
                $(this).addClass('bg');
                arr.push($(this).html());
            })
            $('.close').on('click',function(){
                $('.mask').addClass('hidden');
                $('ol li').removeClass('bg');
                $('.ipt').val('');
                arr.length=0;
            })
            $('.sub').on('click',function(){
                if($('.ipt').val()){
                    arr.push($('.ipt').val());
                }
                if(arr.length>0){
                    $.ajax({
                        url:'/api/addList',
                        type:'post',
                        dataType:'json',
                        data:{
                            arr:arr
                        },
                        success:function(res){
                            if(res.code===1){
                                arr.length=0;
                                $('.mask').addClass('hidden');
                                $('ol li').removeClass('bg');
                                $('.ipt').val('');
                                loadData();
                            }
                        }
                     })

                }else{
                    $('.mask').addClass('hidden');
                    $('ol li').removeClass('bg');
                    $('.ipt').val('');
                }     
            })     
       }
    })
})