var qr = require('../models/customer')
var express = require('express');
var router = express.Router();

module.exports = function(app,passport){

  router.get('/customer/find',function(req,res){
    var name = req.session.passport.user.name;
    var img = req.session.passport.user.img;
    var role = req.session.passport.user.role;
    var phone = req.query.phone;
    var customerName = req.query.name;

    if(phone || customerName){
      if(phone){
        qr.findPhone(phone)
          .then(function(results){
            res.render('./user/views/customer/findCustomer',{data:results,role:role,name:name,img:img})
        }).catch(function(err){
          res.send('sorry ! some thing happend');
        })
      }else{
        qr.findName(customerName)
          .then(function(results){
            res.render('./user/views/customer/findCustomer',{data:results,role:role,name:name,img:img})
        }).catch(function(err){
          res.send('sorry ! some thing happend');
        })
      }
    }else{
      res.render('./user/views/customer/findCustomer',{data:undefined,role:role,name:name,img:img})
    }


  })

  router.post('/customer/find',function(req,res){
    var key = req.body.key;
    if(isNaN(key)){
      res.redirect(`/admin/customer/find?name=${key}`)
    }else{
      res.redirect(`/admin/customer/find?phone=${key}`)
    }
  })

  router.get('/customer/add',function(req,res){
    var name = req.session.passport.user.name;
    var img = req.session.passport.user.img;
    var role = req.session.passport.user.role;
    res.render('./user/views/customer/addCustomer',{role:role,name:name,img:img,message:req.flash('Message')})
  })

  router.post('/customer/add',function(req,res){
    var customerName = req.body.name;
    var phone = req.body.phone;
    var email = req.body.email;
    var gender = req.body.gender;
    var country = req.body.country;
    if(customerName && phone && gender && country){
      qr.findPhone(phone)
        .then(function(results){
          if(results.length==0){
            var d = new Date();
            var date = d.toLocaleDateString();
            var code = Math.floor(1000 + Math.random() * 9000);

            var arr = [customerName,phone,email,gender,country,date,'confirmed',code]
            return qr.insertCustomer(arr);
          }else{
            return qr.catchReject('exists');
          }
      }).then(function(results){
          req.flash('Message','thêm thành công');
          res.redirect('/admin/customer/add');
      }).catch(function(err){
          if(err == 'exists'){
            req.flash('Message','số điện thoại đã tồn tại');
            res.redirect('/admin/customer/add');
          }else{
            res.send('sorry ! some thing happend');
          }
      })
    }else{
      req.flash('Message','chưa nhập đủ thông tin');
      res.redirect('/admin/customer/add');
    }

  })


  app.use('/admin', router);

  function isPhone(phone){
     phone=phone.toString();
     return (phone.match(/\d/g).length===11 || phone.match(/\d/g).length===12);
  }

}
