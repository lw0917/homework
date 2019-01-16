require(['./js/main.js'],function(){
    require(['jquery','bscroll','flex'],function($,bscroll){
        //滚动初始化
        var sroll=new bscroll('.con',{
            probeType:2,
            click:true
        });
        //初始化加载页面
         Init()
         var shou=0;
         var zhi=0;
        function Init(){
              //初始化加载账单
              loadList()
              //点击跳转
             $('.aside').on('click',function(){
                 location.href='./page/add.html';
             })
        }
        
        function loadList(){
             $.ajax({
                 url:'/api/bill-list',
                 dataType:'json',
                 success:function(res){
                    if(res.code===1){
                        renderList(res.msg)
                    }
                 }
             })
        }
        //渲染列表
        function renderList(data){
             var str='';
             var baseUrl='./images/';
             data.forEach(function(file){
                 if(file.type==='1'){
                     num=`<span class="num">${'+'+file.num}</span>`;
                     shou+=file.num*1;
                 }else{
                    num=`<span class="active">${'-'+file.num}</span>`;
                    zhi+=file.num*1;
                 }
                 str+=`<div class="bill">
                           <img src="${baseUrl+file.url}" alt="">
                           <span class="name">${file.name}</span>
                           <p>备注</p>${num}</div>`
             })
             $('.list').html(str);
             $('.shou').html(shou);
             $('.zhi').html(zhi);
        }

    })
})