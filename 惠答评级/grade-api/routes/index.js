var express = require('express');
var router = express.Router();
var mongo=require('mymongo1610');
var mongodb=require('mongodb');

/* 修改分数 */
router.post('/api/addList', function(req, res, next) {
    var id=mongodb.ObjectId(req.body.id),
         grade=req.body.grade;
        
    mongo.update('grade',{_id:id},{grade:grade},function(err,result){
        if(err){
          res.json({code:0,msg:err})
        }else{
          res.json({code:1,msg:'评分完毕'})
        }
    })
});
//主页查询
router.get('/api/getList', function(req, res, next) {
    var id=req.query.id||'';
            id=id?{_id:mongodb.ObjectId(id)}:'';
  mongo.find('grade',id,function(err,result){
      if(err){
        res.json({code:0,msg:err})
      }else{
        res.json({code:1,msg:result})
      }
  })
});



module.exports = router;
