var qr = require('../models/login')
var express = require('express');
var router = express.Router();

module.exports = function(app,passport){

  router.use('/login', function (req, res, next) {
     if (req.isAuthenticated()){
       res.redirect('/admin');
     }else{
       return next();
     }
  })

  router.get('/login',function(req,res){
    res.render('./user/views/login',{ message: req.flash('Message') })
  })

  router.post('/login',passport.authenticate('local-login', {
     successRedirect : '/admin',
     failureRedirect:'/admin/login',
     failureFlash: true
   }));

   router.use('/', function (req, res, next) {
     	if (req.isAuthenticated()){
        return next();
     	}else{
        res.redirect('/admin/login');
     	}
   })

   router.get('/',function(req,res){
     var name = req.session.passport.user.name;
     var img = req.session.passport.user.img;
     var role = req.session.passport.user.role;

     res.render('./user/views/home',{role:role,name:name,img:img})
   })

   router.get('/logout',function(req,res){
     req.logout();
     res.redirect('/admin/login');
   })


  app.use('/admin', router);


}
