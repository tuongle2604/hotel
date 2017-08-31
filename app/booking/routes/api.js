var express = require('express');
var router = express.Router();
var qr = require('../models/api.js')

module.exports = function(app){

  router.get('/search',function(req,res){
    var location = req.query.location;
    var status = req.query.status;
    var datein = req.query.datein;
    var dateout = req.query.dateout;

    if(datein && dateout && location){
      if(status == 'reserved'){
        var arr = [datein,datein,dateout,dateout,location];

        qr.getReservedHotel(arr).then(function(results){
          res.json(results);
        }).catch(function(err){
          res.json('error');
        })

      }else{
        var arr = [location,datein,datein,dateout,dateout,location];

        qr.getEmptyHotel(arr).then(function(results){
          res.json(results);
        }).catch(function(err){
          res.json('error');
        })
      }

    }else if(location){

        qr.getLocationHotel(location).then(function(results){
          res.json(results);
        }).catch(function(err){
          res.json('error');
        })

    }else{
      res.json('error');
    }
  })

  app.use('/api', router);

}
