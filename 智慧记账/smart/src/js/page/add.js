/*
 * @Author: LiWei 
 * @Date: 2018-12-21 17:05:49 
 * @Last Modified by: mikey.zhaopeng
 * @Last Modified time: 2018-12-25 10:28:59
 */
require(['../js/main.js'],function(){
    require(['jquery','bscroll','flex'],function($,bscroll){

          var type=1;
         Init()
         
         //初始化
         function Init(){
           
            renderIcon();
            addEvent();
            var sroll=new bscroll('.icon',{
                probeType:2,
                click:true
            });
         } 
         function renderIcon(){
             $.ajax({
                 url:'/api/icon-list',
                 dataType:'json',
                 data:{
                    type:type
                 },
                 success:function(res){
                     if(res.code===1){
                        renderDl(res.msg);
                     }
                 }
             })
         }

        function renderDl(data){
             var str='';
             var baseUrl='../images/';
             data.forEach(function(file){
                   str+=`  <dl>
                   <dt>
                       <img src="${baseUrl+file.url}" alt="">
                   </dt>
                   <dd>${file.name}</dd>
               </dl>`
             })
             $('.icon').html(str);
             $('.title span').html(data[0].name);
             $('.title img').attr('src',baseUrl+data[0].url);
        }
        function addEvent(){
               $('header').on('click','span',function(){
                     $(this).addClass('active').siblings().removeClass('active');
                     type=$(this).attr('data-type');
                     renderIcon();
               })
               $('.icon').on('click','dl',function(){
                  $('.title span').html($(this).find('dd').html());
                  $('.title img').attr('src',$(this).find('img').attr('src'));
               })
               $('.btn').on('click',function(){
                      var obj={
                              types:type,
                              names:$('.title span').html(),
                              url: $('.title img').attr('src'),
                              num:$('.ipt').val()
                         }
                      $.ajax({
                          url:'/api/addList',
                          dataType:'json',
                          data:{
                            types:obj.types,
                            names:obj.names,
                            url: obj.url,
                            num:obj.num
                          },
                          success:function(res){
                             if(res.code===1){
                                 alert('添加成功');
                                 location.href='../../index.html';
                             }
                          }
                      })
               })
        }

    })
})