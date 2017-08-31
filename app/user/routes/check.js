var qr = require('../models/check')
var express = require('express');
var router = express.Router();

module.exports = function(app,passport){

    router.get('/checkin',function(req,res){
      var name = req.session.passport.user.name;
      var img = req.session.passport.user.img;
      var role = req.session.passport.user.role;
      var hotel = req.query.hotel;
      var checkIn = req.query.checkin;
      var checkOut = req.query.checkout;
      if(role == 'root'){
        if(isDate(checkIn) && isDate(checkOut)){
          if(checkIn<checkOut){
            var arr =[checkIn,checkIn,checkOut,checkOut,checkIn,checkOut,hotel,'checkin'];
            var list;

            qr.findListHotel(idHotel)
              .then(function(results){
                list = results;
                return qr.findHotelCheckIn(arr)
             }).then(function(results){
               res.render('./user/views/checkin',{data:results,list:list,role:role,name:name,img:img,message:req.flash('Message')})
             }).catch(function(err){
               res.send('sorry! something happended');
             })
          }else{
            req.flash('Message','ngày check out phải sau ngày check in');
            res.redirect('/admin/checkin')
          }
        }else{
          qr.findListHotel()
            .then(function(results){
              res.render('./user/views/checkin',{list:results,data:undefined,role:role,name:name,img:img,message:req.flash('Message')})
           }).catch(function(err){
             res.send('sorry! something happended');
           })

        }
      }else{
        var idHotel = req.session.passport.user.id_hotel;

        if(isDate(checkIn) && isDate(checkOut)){
          if(checkIn<checkOut){
            var arr =[checkIn,checkIn,checkOut,checkOut,checkIn,checkOut,idHotel,'checkin'];

              qr.findHotelCheckIn(arr)
                .then(function(results){
                 res.render('./user/views/checkin',{data:results,list:undefined,role:role,name:name,img:img,message:req.flash('Message')})
              }).catch(function(err){
                 res.send('sorry! something happended');
               })
          }else{
            req.flash('Message','ngày check out phải sau ngày check in');
            res.redirect('/admin/checkin')
          }
        }else{
          qr.findCheckIn(idHotel)
            .then(function(results){
              res.render('./user/views/checkin',{data:results,list:undefined,role:role,name:name,img:img,message:req.flash('Message')})
           }).catch(function(err){
             res.send('sorry! something happended');
           })

        }
      }

    })

    router.post('/checkin',function(req,res){
      var checkIn = req.body.checkin;
      var checkOut = req.body.checkout;
      var role = req.session.passport.user.role;
      if(role == 'root'){
        var hotel = req.body.hotel;
        var hotelId = hotel.slice(0,hotel.indexOf("."));

        res.redirect(`/admin/checkin?checkin=${checkIn}&checkout=${checkOut}&hotel=${hotelId}`)
      }else{
        res.redirect(`/admin/checkin?checkin=${checkIn}&checkout=${checkOut}`)
      }
    })



    router.get('/checkout',function(req,res){
      var name = req.session.passport.user.name;
      var img = req.session.passport.user.img;
      var role = req.session.passport.user.role;
      var hotel = req.query.hotel;
      var checkIn = req.query.checkin;
      var checkOut = req.query.checkout;
      if(role == 'root'){
        if(isDate(checkIn) && isDate(checkOut)){
          if(checkIn<checkOut){
            var arr =[checkIn,checkIn,checkOut,checkOut,checkIn,checkOut,hotel,'checkout'];
            var list;

            qr.findListHotel(idHotel)
              .then(function(results){
                list = results;
                return qr.findHotelCheckIn(arr)
             }).then(function(results){
               res.render('./user/views/checkout',{data:results,list:list,role:role,name:name,img:img,message:req.flash('Message')})
             }).catch(function(err){
               res.send('sorry! something happended');
             })
          }else{
            req.flash('Message','ngày check out phải sau ngày check in');
            res.redirect('/admin/checkout')
          }
        }else{
          qr.findListHotel()
            .then(function(results){
              res.render('./user/views/checkout',{list:results,data:undefined,role:role,name:name,img:img,message:req.flash('Message')})
           }).catch(function(err){
             res.send('sorry! something happended');
           })

        }
      }else{
        var idHotel = req.session.passport.user.id_hotel;

        if(isDate(checkIn) && isDate(checkOut)){
          if(checkIn<checkOut){
            var arr =[checkIn,checkIn,checkOut,checkOut,checkIn,checkOut,idHotel,'checkout'];

              qr.findHotelCheckIn(arr)
                .then(function(results){
                 res.render('./user/views/checkout',{data:results,list:undefined,role:role,name:name,img:img,message:req.flash('Message')})
              }).catch(function(err){
                 res.send('sorry! something happended');
               })
          }else{
            req.flash('Message','ngày check out phải sau ngày check in');
            res.redirect('/admin/checkout')
          }
        }else{
          qr.findCheckOut(idHotel)
            .then(function(results){
              res.render('./user/views/checkout',{data:results,list:undefined,role:role,name:name,img:img,message:req.flash('Message')})
           }).catch(function(err){
             res.send('sorry! something happended');
           })

        }
      }

    })

    router.post('/checkout',function(req,res){
      var checkIn = req.body.checkin;
      var checkOut = req.body.checkout;
      var role = req.session.passport.user.role;
      if(role == 'root'){
        var hotel = req.body.hotel;
        var hotelId = hotel.slice(0,hotel.indexOf("."));

        res.redirect(`/admin/checkout?checkin=${checkIn}&checkout=${checkOut}&hotel=${hotelId}`)
      }else{
        res.redirect(`/admin/checkout?checkin=${checkIn}&checkout=${checkOut}`)
      }
    })

    router.use('/checkin/update/:id', function (req, res, next) {
      var id = req.params.id;
      var hotelId = req.session.passport.user.id_hotel;
      var role = req.session.passport.user.role;
      if(role =='root'){
        return next();
      }else{
        qr.checkCheckIn(hotelId,id)
          .then(function(results){
            if(results.length>0){
              return next();
            }else{
              res.send('bạn không thể truy cập vào trang này');
            }
        }).catch(function(err){
          res.send('sorry! something happended');
        })
      }

    })

     router.get('/checkin/update/:id',function(req,res){
       var id = req.params.id;
       qr.updateCheckIn(id)
         .then(function(results){
           req.flash('Message','check out thành công');
           res.redirect('/admin/checkin');
       }).catch(function(err){
         res.send('sorry! something happended')
       })
     })



  app.use('/admin', router);


  var isDate = function(date) {
   return (new Date(date) !== "Invalid Date") && !isNaN(new Date(date));
 }

}
