var qr = require('../models/account')
var express = require('express');
var multer  = require('multer')
var router = express.Router();

module.exports = function(app,passport){

  var storage	=	multer.diskStorage({
      destination: function (req, file, callback) {
        callback(null, './public/user/upload');
      },
      filename: function (req, file, callback) {
        callback(null,Date.now()+file.originalname);
      }
    });
   var upload = multer({ storage : storage}).single('file');


  router.use('/account', function (req, res, next) {
    if (req.session.passport.user.role == 'hotel' || req.session.passport.user.role == 'root'){
      return next();
    }else{
      res.redirect('/admin');
    }
  })

  router.use('/account/edit/:id', function (req, res, next) {
    var id = req.params.id;
    var hotelId = req.session.passport.user.id_hotel;
    var role = req.session.passport.user.role;
    qr.checkAccount(hotelId,id)
      .then(function(results){
        if(results.length>0 && results[0].role!='root' && results[0].role!=role){
          return next();
        }else{
          res.send('bạn không thể truy cập vào trang này');
        }
    }).catch(function(err){
      res.send('sorry! something happended');
    })
  })

  router.use('/account/delete/:id', function (req, res, next) {
    var id = req.params.id;
    var hotelId = req.session.passport.user.id_hotel;
    var role = req.session.passport.user.role;
    qr.checkAccount(hotelId,id)
      .then(function(results){
        if(results.length>0 && results[0].role!='root' && results[0].role!=role){
          return next();
        }else{
          res.send('bạn không thể truy cập vào trang này');
        }
    }).catch(function(err){
      res.send('sorry! something happended');
    })
  })

  router.get('/account',function(req,res){
    var role = req.session.passport.user.role;
    var hotelId = req.session.passport.user.id_hotel;
    var name = req.session.passport.user.name;
    var img = req.session.passport.user.img;
    var currentPage = req.query.page;
    var pageCount;
    if(!currentPage){
      currentPage=1;
    }
    if(role=='root'){
      qr.countTotalAccount()
         .then(function(results){
           var total = results[0].count;
           pageCount =  Math.ceil(total / 10);
           return qr.findTotalAccount(currentPage);
         }).then(function(results){
           res.render('./user/views/account/manageAccount',{
             data:results,
             role:role,
             name:name,
             img:img,
             page:currentPage,
             count:pageCount,
             message: req.flash('Message')});
         }).catch(function(err){
           res.redirect('/error')
         });
    }else{
      qr.countHotelAccount(hotelId)
         .then(function(results){
           var total = results[0].count;
           pageCount =  Math.ceil(total / 10);
           return qr.findHotelAccount(currentPage,hotelId);
         }).then(function(results){
           res.render('./user/views/account/manageAccount',{
             data:results,
             role:role,
             name:name,
             img:img,
             page:currentPage,
             count:pageCount,
             message: req.flash('Message')});
         }).catch(function(err){
           res.redirect('/error')
         });
    }
  })

  router.get('/account/add',function(req,res){
    var name = req.session.passport.user.name;
    var img = req.session.passport.user.img;
    var role = req.session.passport.user.role;
    if(role == 'root'){
      qr.findListHotel()
         .then(function(results){
           res.render('./user/views/account/addAccount',{
             data:results,
             name:name,
             img:img,
             role:role,
             message: req.flash('Message')})
      }).catch(function(err){
        res.redirect('/error')
      })
    }else{
      res.render('./user/views/account/addAccount',{
        name:name,
        img:img,
        role:role,
        message: req.flash('Message')})
    }

  })

  router.post('/account/add',upload,function(req,res){
    var role = req.session.passport.user.role;
    var name = req.body.name;
    var email = req.body.email;
    var password = req.body.password;
    var updateRole = req.body.role;
    if(req.file){
      var path =`/user/upload/${req.file.filename}`;
    }else{
      var path =`/user/upload/default.png`;
    }
    if(password.length>7){
      if(role=='root'){
        var hotel = req.body.hotel;
        var id = hotel.slice(0,hotel.indexOf("."));
        var arr = [name,email,qr.encode(password),updateRole,id,path];
        qr.findEmail(email)
          .then(function(results){
            if(results.length>0){
              return qr.catchReject('email')
            }else{
              return qr.insertAccount(arr);
            }
         }).then(function(results){
           req.flash('Message', 'tạo thành công');
           res.redirect('/admin/account/add');
         }).catch(function(err){
           if(err=='email'){
             req.flash('Message','email đã tồn tại');
             res.redirect('/admin/account/add');
           }else{
             req.flash('Message',err);
             res.redirect('/admin/account/add');
           }
         });
      }else{
        var idHotel = req.session.passport.user.id_hotel;
        var arr = [name,email,qr.encode(password),updateRole,idHotel,path];
        if(updateRole=='root'){
          res.send('bạn không thể truy cập vào trang này');
        }else{
          qr.findEmail(email)
            .then(function(results){
              if(results.length>0){
                return qr.catchReject('email')
              }else{
                return qr.insertAccount(arr);
              }
           }).then(function(results){
             req.flash('Message', 'tạo thành công');
             res.redirect('/admin/account/add');
           }).catch(function(err){
             if(err=='email'){
               req.flash('Message','email đã tồn tại');
               res.redirect('/admin/account/add');
             }else{
               req.flash('Message',err);
               res.redirect('/admin/account/add');
             }
           });
        }

      }
    }else{
      req.flash('Message', 'mật khẩu phải nhiều hơn 7 ký tự');
      res.redirect('/admin/account/add');
    }
  })


  router.get('/account/edit/:id',function(req,res){
    var name = req.session.passport.user.name;
    var img = req.session.passport.user.img;
    var role = req.session.passport.user.role;
    var hotelId = req.session.passport.user.id_hotel;
    var id = req.params.id;
    var user;
    qr.checkAccount(hotelId,id)
      .then(function(results){
        if(results.length>0 && results[0].role!='root'){
          user = results[0];
          if(role=='root'){
            return qr.findListHotel();
          }else{
            return qr.catchResolve('hotel');
          }
        }else{
          return qr.catchReject('auth')
        }
    }).then(function(results){
      if(results=='hotel'){
        res.render('./user/views/account/editAccount',{
          data:user,
          role:role,
          name:name,
          img:img,
          message: req.flash('Message')})
      }else{
        var hotelName;
        results.forEach(function(e){
          if(user.id_hotel ==  e.id){
            hotelName =  e.name;
          }
        })
        res.render('./user/views/account/editAccount',{
          data:user,
          list:results,
          role:role,
          name:name,
          img:img,
          hotel:hotelName,
          message: req.flash('Message')})
      }
    }).catch(function(err){
        if(err=='auth'){
          res.send('bạn không thể truy cập vào trang này');
        }else{
          res.send('sorry! some thing happended');
        }
    });
  })

  router.post('/account/edit/:id',upload,function(req,res){
    var role = req.session.passport.user.role;
    var name = req.body.name;
    var password = req.body.password;
    var updateRole = req.body.role;
    var idAdmin = req.params.id;
    if(password.length>7){
      if(role == 'root'){
        var hotel = req.body.hotel;
        var hotelId = hotel.slice(0,hotel.indexOf("."));
        if(req.file){
          var path =`/user/upload/${req.file.filename}`;
          var arr = [name,qr.encode(password),updateRole,hotelId,path,idAdmin];
        }else{
          var arr = [name,qr.encode(password),updateRole,hotelId,idAdmin];
        }
        qr.updateAccountForRoot(arr)
          .then(function(results){
          req.flash('Message', 'update thành công');
             res.redirect(`/admin/account`);
        }).catch(function(err){
             req.flash('Message','sorry! some thing happended');
             res.redirect(`/admin/account/edit/${idAdmin}`);
        })

      }else{
        if(updateRole=='root'){
          res.send('bạn không thể truy cập vào trang này');
        }else{
          var hotelId = req.session.passport.user.id_hotel;
          if(req.file){
            var path =`/user/upload/${req.file.filename}`;
            var arr = [name,qr.encode(password),updateRole,hotelId,path,idAdmin];
          }else{
            var arr = [name,qr.encode(password),updateRole,hotelId,idAdmin];
          }
          qr.updateAccountForHotel(arr)
            .then(function(results){
              req.flash('Message', 'update thành công');
               res.redirect(`/admin/account`);
          }).catch(function(err){
               req.flash('Message','sorry! some thing happended');
               res.redirect(`/admin/account/edit/${idAdmin}`);
          })
        }
      }
    }else{
      req.flash('Message', 'mật khẩu phải nhiều hơn 7 ký tự');
      res.redirect(`/admin/account/edit/${idAdmin}`);
    }
  })

  router.get('/account/delete/:id',function(req,res){
    var id = req.params.id;
    qr.deleteAccount(id)
      .then(function(){
        res.redirect(`/admin/account`);
    }).catch(function(err){
        res.send('sorry! some thing happended');
    })
  })

  app.use('/admin', router);

}
