var express = require('express');
var router = express.Router();
var mongo=require('mymongo1610');

/* 添加账单 */
router.post('/api/addList', function(req, res, next) {
             res.json({code:1,msg:'添加成功'})   
});
//主页查询
router.get('/api/getList', function(req, res, next) {
  var num=req.query.num;
  mongo.find('test',function(err,result){
      if(err){
        res.json({code:0,msg:err})
      }else{
        if(num>=result.length-1){
          res.json({code:4,msg:result[num],total:result.length})
        }else{
          res.json({code:1,msg:result[num],total:result.length})
        } 
      }
  })
});



module.exports = router;
