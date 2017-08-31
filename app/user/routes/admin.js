var qr = require('../models/admin')
var express = require('express');
var router = express.Router();

module.exports = function(app,passport){



  router.get('/cancel',function(req,res){
    qr.getCancelReservation(function(data){
      if(data===0){
            res.send('error')
          }else{
            res.json(data);
          }
    })
  })

  router.get('/refund/total/:id',function(req,res){
    qr.refundTotal(req.params.id,function(data){
      if(data===0){
            res.send('error')
          }else{
            qr.updateRefund(req.params.id,function(result){
              if(data === 0){
                res.send('error')
              }else{
                res.json('success');
              }
            })
          }
    });
  })

  router.get('/refund/half/:id',function(req,res){
    qr.refundHalf(req.params.id,function(data){
      if(data===0){
            res.send('error')
          }else{
            qr.updateRefund(req.params.id,function(result){
              if(data === 0){
                res.send('error')
              }else{
                res.json('success');
              }
            })
          }
    });
  })

  router.get('/customer/:id',function(req,res){
    var id = req.params.id;
    qr.getCustomerHistory(id,function(data){
      if(data===0){
        res.json('error')
      }else{
        res.json(data);
      }
    })
  })

  router.post('/hotel/add',function(req,res){
    var name = req.body.name;
    var location = req.body.location;
    // var address = req.body.address;
    var arr = [name,location];
    qr.addHotel(arr).then(function(results){
      res.json('success')
    }).catch(function(err){
      res.json('error')
    })
  })

  router.post('/hotel/update',function(req,res){
    var id = req.body.id;
    var name = req.body.name;
    var location = req.body.location;
    // var address = req.body.address;
    var arr = [name,location,id];
    qr.updateHotel(arr).then(function(results){
      res.json('success')
    }).catch(function(err){
      res.json('error')
    })
  })

  router.get('/hotel/delete/:id',function(req,res){
    qr.deleteHotel(req.params.id).then(function(results){
      res.json('success')
    }).catch(function(err){
      res.json('error')
    })
  })


  //

  router.post('/room/add',function(req,res){
    var idHotel = req.body.idHotel;
    var roomNumber = req.body.roomNumber;
    var roomType = req.body.roomType;
    var arr = [idHotel,roomNumber,roomType];
    qr.addRoom(arr).then(function(results){
      res.json('success')
    }).catch(function(err){
      res.json('error')
    })
  })

  router.post('/room/update',function(req,res){
    var id = req.body.id;
    var idHotel = req.body.idHotel;
    var roomNumber = req.body.roomNumber;
    var roomType = req.body.roomType;
    var arr = [idHotel,roomNumber,roomType,id];
    qr.updateRoom(arr).then(function(results){
      res.json('success')
    }).catch(function(err){
      res.json('error')
    })
  })

  router.get('/room/delete/:id',function(req,res){
    qr.deleteRoom(req.params.id).then(function(results){
      res.json('success')
    }).catch(function(err){
      res.json('error')
    })
  })

  app.use('/admin', router);

}
