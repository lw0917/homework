/*
 * @Author: LiWei 
 * @Date: 2018-12-21 14:59:26 
 * @Last Modified by: mikey.zhaopeng
 * @Last Modified time: 2019-01-15 20:39:19
 */
var express = require('express');
var router = express.Router();
var mongo =require('mymongo1610');
/* GET home page. */
//获取收入或支出的图标
router.get('/api/icon-list', function(req, res, next) {
         var type=req.query.type;
         mongo.find('icon',{type:type},function(err,result){
             if(err){
                res.json({code:0,msg:err})
             }else{
              res.json({code:1,msg:result})
             }
         })
});

//添加账单
router.get('/api/addList', function(req, res, next) {
  var type=req.query.types;
  var url=req.query.url;
  var num=req.query.num;
  var name=req.query.names;
 mongo.insert('bill',{type:type,url:url,num:num,name:name},function(err,result){
      if(err){
          res.json({code:0,msg:err})
      }else{
       res.json({code:1,msg:'添加成功',data:result})
      } 
   }) 
});

//查询所有账单
router.get('/api/bill-list', function(req, res, next) {
 
 mongo.find('bill',function(err,result){
      if(err){
        return  res.json({code:0,msg:err})
      }else{
       res.json({code:1,msg:result})
      } 
 }) 
});


module.exports = router;
