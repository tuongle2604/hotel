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
          var data = {status:"success",results:results};
          res.json(data);
        }).catch(function(err){
          var data = {status:"error"};
          res.json(data);
        })

      }else{
        var arr = [location,datein,datein,dateout,dateout,location];

        qr.getEmptyHotel(arr).then(function(results){
          var data = {status:"success",results:results};
          res.json(data);
        }).catch(function(err){
          var data = {status:"error"};
          res.json(data);
        })
      }

    }else if(location){

        qr.getLocationHotel(location).then(function(results){
          var data = {status:"success",results:results};
          res.json(data);
        }).catch(function(err){
          var data = {status:"error"};
          res.json(data);
        })

    }else{
      var data = {status:"error"};
      res.json(data);
    }
  })

  app.use('/api', router);

}
