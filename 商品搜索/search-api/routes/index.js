var express = require('express');
var router = express.Router();
var mongo=require('mymongo1610');
var mongodb=require('mymongo1610/utils/getCollection.js');


/* 添加账单 */
router.post('/api/addList', function(req, res, next) {
    var title=req.body.title;  
    mongo.find('searcharr',{title:title},function(err,result){
           if(err){
               res.json({code:0,msg:err})
           }else{
               if(result.length>0){
                res.json({code:3,msg:'已存在'})
               }else{
                mongo.insert('searcharr',{title:title},function(err,result){
                  if(err){
                    res.json({code:0,msg:err})
                  }else{
                    res.json({code:1,msg:'添加成功'})
                  }
              })
               }
           }
    })
   
});

//搜索历史查询
router.get('/api/getSpan', function(req, res, next) {
  mongo.find('searcharr',function(err,result){
      if(err){
        res.json({code:0,msg:err})
      }else{
        res.json({code:1,msg:result})
      }
  })
});

//模糊查询
router.get('/api/getList',function(req,res,next){
      var title=req.query.title||'',
          page=req.query.page,
          len=req.query.len*1;
          title=title?{title:{$regex:title}}:'';
      mongodb('searchcon',function(err,con,col){
           if(err){
            res.json({code:0,msg:err})
           }else{
              col.find(title).toArray(function(err,result){
                if(err){
                  res.json({code:0,msg:err})
                }else{
                     var total=Math.ceil(result.length/len);//计算总页数
                     var skips=(page-1)*len;//计算起始下标
                     col.find(title).skip(skips).limit(len).toArray(function(err,result){
                         if(err){
                            res.json({code:0,msg:err})
                         }else{
                             res.json({code:1,msg:result,total:total})
                         }
                         con.close();
                     })
                }
              })
           }
      })
})



module.exports = router;
