var qr = require('../models/payment')
var paypal_api = require('paypal-rest-sdk');
var express = require('express');
var router = express.Router();
const Nexmo = require('nexmo');
var nexmoConfig = require('../../../config/nexmo')


const nexmo = new Nexmo(nexmoConfig);


var config_opts = {
    'host': 'api.sandbox.paypal.com',
    'port': '',
    'client_id': 'ATEk11ib9Qp290VqN340NlzvbpZmCxkkAq5Wz8EHRF0biLfqKBD8YZWVNbsSjz6l2peyDFUsGma-rjgf',
    'client_secret': 'EHEkkhUXCjnzg8l6c8kDcZ7o3pC895EdmqUR3hhTRbltfwRRa5Rc7ujTH3C48f54gpreruYtR_NkZlvN'
};

module.exports = function(app){

  router.post('/payonline',function(req,res){
    var data = JSON.parse(req.body.data);
    var hotelId= data.hotelId;
    var customerId = data.customerId;
    var dateIn = data.dateIn;
    var dateOut = data.dateOut;
    var rooms = data.rooms;

    qr.getRoomsPrice(rooms,function(results){
      if(results===0){
        res.send('error')
        }else{
          var total = 0;
          var arrRoom = [];
          results.forEach(function(e){
            var obj = {roomNoomber:e.room_number,capacity:e.capacity,price:e.price};
            arrRoom.push(obj);
            total += e.price;
          })
          var cardType = GetCardType(req.body.card_number);
          cardType = cardType.toLowerCase();
          var create_payment_json = {
            "intent": "sale",
            "payer": {
              "payment_method": "credit_card",
              "funding_instruments": [{
                "credit_card": {
                  "number": req.body.card_number,
                  "type": cardType,
                  "expire_month": req.body.expMM,
                  "expire_year": req.body.expYY,
                  "cvv2": req.body.card_cvv,
                  // "first_name": " ",
                  "last_name": req.body.card_holder
                }
              }]
            },
            "transactions": [{
              "amount": {
                "total": total,
                "currency": "USD",
              },
              "description": "paypal payment",
              "item_list": {
                      // "items": arrRoom
                  },
            }]
          };

          paypal_api.payment.create(create_payment_json, config_opts, function (err, response) {
              if (err) {
                  res.send('error')
              }
              if (response) {
                var payment = [];
                payment.push(total);
                payment.push(JSON.stringify(arrRoom));
                payment.push(response.id);
                qr.insertPaymentOnline(payment,function(insert){
                  if(insert===0){
                    res.send('erorr')
                  }else{
                    var reservation = [];
                    var d = new Date();
                    var date = d.toLocaleDateString();
                    reservation.push(hotelId,customerId,date,dateIn,dateOut,insert.insertId,'online','no check');
                    qr.insertReservation(reservation,rooms,function(insert1){
                      if(insert1===0){
                        res.send('erorr')
                      }else{
                        res.send('success')
                      }
                    })
                  }
                })

              }
          });

        }
    });
  });


  router.post('/payoffline',function(req,res){
    var data = JSON.parse(req.body.data);
    var hotelId= data.hotelId;
    var customerId = data.customerId;
    var dateIn = data.dateIn;
    var dateOut = data.dateOut;
    var rooms = data.rooms;
    var reservation = [];
    reservation.push(hotelId,customerId,dateIn,dateOut,'offline');
    qr.insertPaymentOffline(reservation,rooms,function(data){
      if(data===0){
        res.send('erorr')
      }else{
        res.send('success')
      }
    })
  })

  router.get('/cancel/:id',function(req,res){
    var id = req.params.id;
    var arr = [];
    arr.push('cancel',id);
    qr.updateReservation(arr,function(data){
      if(data===0){
        res.json('error');
      }else{
        res.json('success');
      }
    })
  })

  app.use('/api', router);


}

function GetCardType(number)
{
  // visa
  var re = new RegExp("^4");
  if (number.match(re) != null)
      return "Visa";

  // Mastercard
  re = new RegExp("^5[1-5]");
  if (number.match(re) != null)
      return "Mastercard";


  return "";
}
