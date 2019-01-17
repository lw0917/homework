var express = require('express');
var router = express.Router();
var mongo=require('mymongo1610');
var mongodb=require('mongodb');

/* 添加账单 */
router.post('/api/addList', function(req, res, next) {
    var id=mongodb.ObjectId(req.body.id),
         com=JSON.parse(req.body.com);
    mongo.update('comment',{"_id":id},{"com":com},function(err,result){
        if(err){
          res.json({code:0,msg:err})
        }else{
          res.json({code:1,msg:result})
        }
    })
});
//主页查询
router.get('/api/getList', function(req, res, next) {
    var id=req.query.id||null;
         id=id?{_id:mongodb.ObjectId(id)}:'';
  mongo.find('comment',id,function(err,result){
      if(err){
        res.json({code:0,msg:err})
      }else{
        res.json({code:1,msg:result})
      }
  })
});



module.exports = router;
