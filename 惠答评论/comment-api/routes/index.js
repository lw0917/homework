var express = require('express');
var router = express.Router();
var mongo=require('mymongo1610');

/* 添加账单 */
router.post('/api/addList', function(req, res, next) {
    var num=req.body.num,
        src=req.body.src,
        title=req.body.title,
        intro=req.body.intro||'';
    mongo.insert('mung',{num:num,src:src,title:title,intro:intro},function(err,result){
        if(err){
          res.json({code:0,msg:err})
        }else{
          res.json({code:1,msg:'添加成功'})
        }
    })
});
//主页查询
router.get('/api/getList', function(req, res, next) {
 
  mongo.find('mung',function(err,result){
      if(err){
        res.json({code:0,msg:err})
      }else{
        res.json({code:1,msg:result})
      }
  })
});



module.exports = router;
