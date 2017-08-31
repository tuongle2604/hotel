var qr = require('../models/reservation')
var express = require('express');
var router = express.Router();

module.exports = function(app,passport){



   router.get('/reservation',function(req,res){
     var name = req.session.passport.user.name;
     var img = req.session.passport.user.img;
     var role = req.session.passport.user.role;
     var hotel = req.query.hotel;

     var checkIn = req.query.checkin;
     var checkOut = req.query.checkout;
     if(role == 'root'){
       if(isDate(checkIn) && isDate(checkOut)){
         if(checkIn<checkOut){
           var arr =[checkIn,checkIn,checkOut,checkOut,checkIn,checkOut,hotel,'no check'];
           var list;

           qr.findListHotel(idHotel)
             .then(function(results){
               list = results;
               return qr.findHotelReservation(arr)
            }).then(function(results){
              res.render('./user/views/reservation/manageReservation',{data:results,list:list,role:role,name:name,img:img,message:req.flash('Message')})
            }).catch(function(err){
              res.send('sorry! something happended');
            })
         }else{
           req.flash('Message','ngày check out phải sau ngày check in');
           res.redirect('/admin/reservation')
         }
       }else{
         qr.findListHotel()
           .then(function(results){
             res.render('./user/views/reservation/manageReservation',{data:undefined,list:results,role:role,name:name,img:img,message:req.flash('Message')})
          }).catch(function(err){
            res.send('sorry! something happended');
          })

       }
     }else{
       var idHotel = req.session.passport.user.id_hotel;

       if(isDate(checkIn) && isDate(checkOut)){
         if(checkIn<checkOut){
           var arr =[checkIn,checkIn,checkOut,checkOut,checkIn,checkOut,idHotel,'no check'];

             qr.findHotelReservation(arr)
               .then(function(results){
                res.render('./user/views/reservation/manageReservation',{data:results,list:undefined,role:role,name:name,img:img,message:req.flash('Message')})
             }).catch(function(err){
                res.send('sorry! something happended');
              })
         }else{
           req.flash('Message','ngày check out phải sau ngày check in');
           res.redirect('/admin/reservation')
         }
       }else{
         qr.findReservation(idHotel)
           .then(function(results){
             res.render('./user/views/reservation/manageReservation',{data:results,list:undefined,role:role,name:name,img:img,message:req.flash('Message')})
          }).catch(function(err){
            res.send('sorry! something happended');
          })

       }
     }
   })

   router.post('/reservation',function(req,res){
     var checkIn = req.body.checkin;
     var checkOut = req.body.checkout;
     var role = req.session.passport.user.role;
     if(role == 'root'){
       var hotel = req.body.hotel;
       var hotelId = hotel.slice(0,hotel.indexOf("."));

       res.redirect(`/admin/reservation?checkin=${checkIn}&checkout=${checkOut}&hotel=${hotelId}`)
     }else{
       res.redirect(`/admin/reservation?checkin=${checkIn}&checkout=${checkOut}`)
     }
   })

   router.use('/reservation/update/:id', function (req, res, next) {
     var id = req.params.id;
     var hotelId = req.session.passport.user.id_hotel;
     var role = req.session.passport.user.role;
     if(role =='root'){
       return next();
     }else{
       qr.checkReservation(hotelId,id)
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

    router.get('/reservation/update/:id',function(req,res){
      var id = req.params.id;
      qr.updateReservation(id)
        .then(function(results){
          req.flash('Message','check in thành công');
          res.redirect('/admin/reservation');
      }).catch(function(err){
          res.send('sorry! something happended')
      })
    })

    router.get('/reservation/create/:id',function(req,res){
      var name = req.session.passport.user.name;
      var img = req.session.passport.user.img;
      var role = req.session.passport.user.role;
      var id = req.params.id;
      if(role == 'root'){
        qr.findListHotel()
          .then(function(results){
            res.render('./user/views/reservation/createReservation',{list:results,id:id,role:role,name:name,img:img,message:req.flash('Message')})

        }).catch(function(arr){
          res.send('sorry! something happended')
        })
      }else{
        res.render('./user/views/reservation/createReservation',{list:undefined,id:id,role:role,name:name,img:img,message:req.flash('Message')})
      }
    })

    router.post('/reservation/create',function(req,res){
      var rooms = req.body.room.split(',');
      var checkIn = req.body.checkin;
      var checkOut = req.body.checkout;
      var role = req.session.passport.user.role;
      var id = req.body.id;
      var d = new Date();
      date = currentDate(d);
      if(isDate(checkIn) && isDate(checkOut) && rooms){
        if(checkIn<checkOut && checkIn>=date){
          qr.getRoomsPrice(rooms)
            .then(function(results){
                var total = 0;
                var arrRoom = [];
                results.forEach(function(e){
                  var obj = {roomNoomber:e.room_number,capacity:e.capacity,price:e.price};
                  arrRoom.push(obj);
                  total += e.price;
                })
                var payment = [total,JSON.stringify(arrRoom)];
                return qr.insertPayment(payment);
          }).then(function(results){
                if(role == 'root'){
                  var hotel = req.body.hotel;
                  var hotelId = hotel.slice(0,hotel.indexOf("."));
                  var arr = [hotelId,id,date,checkIn,checkOut,results,'direct','checkin'];
                  return qr.insertReservation(arr);
                }else{
                  var hotelId = req.session.passport.user.id_hotel;
                  var arr = [hotelId,id,date,checkIn,checkOut,results,'direct','checkin'];
                  return  qr.insertReservation(arr);
                }
          }).then(function(results){
            return qr.insertReserved(results,rooms);
          }).then(function(){
                req.flash('Message','tạo thành công');
                res.redirect(`/admin/reservation/create/${id}`)
              }).catch(function(err){
                res.send('sorry! something happended')
              })
        }else{
          req.flash('Message','kiểm tra lại ngày check in và check out');
          res.redirect(`/admin/reservation/create/${id}`)
        }
      }else{
        req.flash('Message','cần nhập đủ thông tin');
        res.redirect(`/admin/reservation/create/${id}`)
      }

    })



  router.get('/emptyroom',function(req,res){
    var name = req.session.passport.user.name;
    var img = req.session.passport.user.img;
    var role = req.session.passport.user.role;
    var checkIn = req.query.checkin;
    var checkOut = req.query.checkout;

    if(role == 'root'){
      if(isDate(checkIn) && isDate(checkOut)){
        if(checkIn<checkOut){
          var hotel = req.query.hotel;
          var data;
          var arr =[checkIn,checkIn,checkOut,checkOut,checkIn,checkOut];
          if(hotel=='All' || hotel =='all'){

            qr.countAllEmptyRoom(arr)
              .then(function(results){
                data = results;
                return qr.findListHotel();
            }).then(function(results){
              res.render('./user/views/emptyroom/roomAdmin',{data:data,list:results,role:role,name:name,img:img,message:req.flash('Message')})
            }).catch(function(err){
               req.flash('Message','sorry! something happended');
               res.redirect('/admin/emptyroom')
             })
          }else{

            var idHotel = hotel.slice(0,hotel.indexOf("."));
            var arr =[idHotel,checkIn,checkIn,checkOut,checkOut,checkIn,checkOut,idHotel];
            qr.findEmptyRoom(arr)
              .then(function(results){
                data = results;
                return qr.findListHotel();
            }).then(function(results){
              res.render('./user/views/emptyroom/roomUser',{data:data,list:results,role:role,name:name,img:img,message:req.flash('Message')})
            }).catch(function(err){
               req.flash('Message','sorry! something happended');
               res.redirect('/admin/emptyroom')
             })
          }

        }else{
          req.flash('Message','ngày check out phải sau ngày check in');
          res.redirect('/admin/emptyroom')
        }
      }else{
        qr.findListHotel()
          .then(function(results){
            res.render('./user/views/emptyroom/roomAdmin',{list:results,data:undefined,role:role,name:name,img:img,message:req.flash('Message')})
        }).catch(function(err){
            res.send('sorry! something happended')
        })
      }
    }else{
      if(isDate(checkIn) && isDate(checkOut)){
        if(checkIn<checkOut){
          var idHotel = req.session.passport.user.id_hotel;
          var arr =[idHotel,checkIn,checkIn,checkOut,checkOut,checkIn,checkOut,idHotel];

          qr.findEmptyRoom(arr)
            .then(function(results){
             res.render('./user/views/emptyroom/roomUser',{data:results,role:role,name:name,img:img,message:req.flash('Message')})
          }).catch(function(err){
             req.flash('Message','sorry! something happended');
             res.redirect('/admin/emptyroom')
           })
        }else{
          req.flash('Message','ngày check out phải sau ngày check in');
          res.redirect('/admin/emptyroom')
        }
      }else{
        res.render('./user/views/emptyroom/roomUser',{data:undefined,role:role,name:name,img:img,message:req.flash('Message')})
      }
    }

  })

  router.post('/emptyroom',function(req,res){
    var checkIn = req.body.checkin;
    var checkOut = req.body.checkout;
    var hotel = req.body.hotel;
    var role = req.session.passport.user.role;
    if(role == 'root'){
      res.redirect(`/admin/emptyroom?checkin=${checkIn}&checkout=${checkOut}&hotel=${hotel}`)
    }else{
      res.redirect(`/admin/emptyroom?checkin=${checkIn}&checkout=${checkOut}`)
    }
  })




  app.use('/admin', router);

  var isDate = function(date) {
   return (new Date(date) !== "Invalid Date") && !isNaN(new Date(date));
  }

  var currentDate = function(date) {
  var yyyy = date.getFullYear().toString();
  var mm = (date.getMonth()+1).toString();
  var dd  = date.getDate().toString();

  var mmChars = mm.split('');
  var ddChars = dd.split('');

  return yyyy + '-' + (mmChars[1]?mm:"0"+mmChars[0]) + '-' + (ddChars[1]?dd:"0"+ddChars[0]);
 }


}
