var express = require('express');
var router = express.Router();
var qr = require('../models/customer')
var validator = require('validator');

module.exports = function(app){

  router.post('/register',function(req,res){
    var phone = req.body.phone;
    var id;
    if(isPhone(phone) == true){
      qr.findCustomerPhone(phone)
        .then(function(results){
          if(results===undefined){
            var val = Math.floor(1000 + Math.random() * 9000);
            var date = new Date().toISOString().split('T')[0];
            var user = [phone,date,'unconfirmed',val];
            return qr.insertCustomerPhone(user);
          }else{
            var arr = [results.phone,results.code,results.id]
            return qr.registerResolve(arr);
          }
      }).then(function(arr){
        id = arr.pop();
        return qr.sendSms(arr[0],arr[1]);
      }).then(function(){
        var data = {status:"success",id:id};
        res.json(data);
      }).catch(function(err){
        var data = {status:"error",message:'sorry,some thing happend'};
        res.json(data);
      })
    }else{
      var data = {status:"error",message:'sdt khong hop le'};
      res.json(data)
    }
  })

  router.post('/verify',function(req,res){
    var id = req.body.id;
    var code = req.body.code;
    qr.findPhone(id)
      .then(function(results){
        if(results===undefined){
          return qr.catchReject('id');
        }else{
          if(code == results.code){
            var data = {status:"success",message:results.status};
            res.json(data);
          }else{
            return qr.catchReject('code');
          }
        }
      }).catch(function(err){
        if(err = 'code'){
          var data = {status:"error",message:'sai code'};
          res.json(data);
        }else if(err = 'id'){
          var data = {status:"error",message:'sai id'};
          res.json(data)
        }else{
          var data = {status:"error",message:'sorry,some thing happend'};
          res.json(data)
        }
      })
  })


  router.post('/resendCode',function(req,res){
    var id = req.body.id;
    var code = Math.floor(1000 + Math.random() * 9000);
    var arr = [code,id];
    qr.updateCode(arr)
      .then(function(){
        return qr.sendSms(phone,code);
    }).then(function(){
      var data = {status:"success"};
      res.json(data);
    }).catch(function(err){
      var data = {status:"error",message:'sorry,some thing happend'};
      res.json(data);
    })
  })

  router.post('/updateInfo',function(req,res){
    var id = req.body.id;
    var name = req.body.name;
    var email = req.body.email;
    var gender = req.body.gender;
    var country = req.body.country;
    qr.findPhone(id)
      .then(function(results){
        if(results===undefined){
          return qr.catchReject('id');
        }else{
          var arr = [name,email,gender,country,'confirmed',id]
          return qr.updateInfo(arr);
        }
    }).then(function(){
        var data = {status:"success"};
        res.json(data);
    }).catch(function(err){
      if(err = 'id'){
        var data = {status:"error",message:'sai id'};
        res.json(data)
      }else{
        var data = {status:"error",message:'sorry,some thing happend'};
        res.json(data);
      }
    })

  })

  router.get('/profile/:id',function(req,res){
    qr.findPhone()
      .then(function(results){
        var data = {status:"success",message:results};
        res.json(data);
    }).catch(function(err){
      var data = {status:"error",message:'sorry,some thing happend'};
      res.json(data);
    })
  })

  router.post('/updateProfile',function(req,res){
    var id = req.body.id;
    var phone = req.body.phone;
    var name = req.body.name;
    var email = req.body.email;
    var gender = req.body.gender;
    var country = req.body.country;
    var code;
    qr.findPhone(id)
      .then(function(results){
        if(results.phone==phone){
          var arr = [name,email,gender,country,id]
          return qr.updateProfile(arr);
        }else{
          code = Math.floor(1000 + Math.random() * 9000);
          var arr = [name,email,gender,country,phone,code,id]
          return qr.updateProfilePhone(arr)
        }
    }).then(function(results){
        if(results===1){
          return qr.sendSms(phone,code);
        }
    }).then(function(results){
      var data = {status:"success"};
      res.json(data);
    }).catch(function(err){
      var data = {status:"error",message:'sorry,some thing happend'};
      res.json(data);
    })

  })

  router.post('/updatePhone',function(req,res){
    var id = req.body.id;
    var code = req.body.code;
    qr.findPhone(id)
      .then(function(results){
        if(results===undefined){
          return qr.catchReject('id');
        }else{
          if(code == results.code){
            var arr = [results.updated_phone,id]
            return qr.updatePhone(arr);
          }else{
            return qr.catchReject('code');
          }
        }
      }).then(function(){
        var data = {status:"success"};
        res.json(data);
      }).catch(function(err){
        if(err = 'code'){
          var data = {status:"error",message:'sai code'};
          res.json(data);
        }else if(err = 'id'){
          var data = {status:"error",message:'sai id'};
          res.json(data)
        }else{
          var data = {status:"error",message:'sorry,some thing happend'};
          res.json(data)
        }
      })
  })



  app.use('/booking', router);

  function isPhone(phone){
     phone=phone.toString();
     return (phone.match(/\d/g).length===11 || phone.match(/\d/g).length===12);
  }



}
