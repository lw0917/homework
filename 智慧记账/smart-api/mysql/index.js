  var  mysql=require('mysql');
  var pool=mysql.createPool({
           port:3306,
           user:'root',
           database:'logindata',
           connectionLimit:100
  })
  module.exports=function(sql,arr,ck){
      pool.getConnection(function(err,con){
          if(err){
              return ck&&ck(err)
          }
          con.query(sql,arr,function(err,result,filed){
              if(err){
                  return ck&&ck(err)
              }
              ck&&ck(null,result)
              con.release()
          })
      })
  }