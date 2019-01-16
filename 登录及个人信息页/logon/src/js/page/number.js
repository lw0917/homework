require(['../js/main.js'],function(){
    require(['jquery','flex'],function($){
         
         init();
        function init(){
             //添加点击事件
             addEvent()
         }
         function addEvent(){
            //点击返回添加账单页面
            $('header').on('click',function(){
                location.href='../../page/add.html';
            })
            //给键盘添加点击事件
            $('ul').on('click','span',function(){
                 var num=$('.number'),
                     that=$(this).html();
                if(that==='.'){
                    if(num.html().indexOf('.')!=-1){
                        num.html(num.html());
                    }else{
                        num.html(num.html()+that);
                    }
                }else if(that=='&lt;'){
                      if(num.html().length<=1){
                           num.html('0.00');
                      }else{
                          num.html(num.html().slice(0,num.html().length-1));
                      }
                }else if(that==='完成'){
                    if(num.html()==='0.00'){
                        alert('金额不能为空');
                    }else{
                         location.href='../../page/add.html?num='+num.html();
                    }
                }else if(that==='+'||that==='-'){
                    num.html(num.html());
                }else if(num.html()==='0.00'){
                    num.html(that);
                }else if(num.html().indexOf('.')!=-1&&num.html().split('.')[1].length===2){
                    num.html(num.html());
                }else{   
                   num.html(num.html()+that);
                }
            })
         }
    })
})