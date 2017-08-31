var mysql      = require('mysql');
var dbconfig = require('../../../config/database');
var connection = mysql.createConnection(dbconfig);
var paypal_api = require('paypal-rest-sdk');

var config_opts = {
    'host': 'api.sandbox.paypal.com',
    'port': '',
    'client_id': 'ATEk11ib9Qp290VqN340NlzvbpZmCxkkAq5Wz8EHRF0biLfqKBD8YZWVNbsSjz6l2peyDFUsGma-rjgf',
    'client_secret': 'EHEkkhUXCjnzg8l6c8kDcZ7o3pC895EdmqUR3hhTRbltfwRRa5Rc7ujTH3C48f54gpreruYtR_NkZlvN'
};

var getCancelReservation = function(cb){
  var sql = "select * from reservation where status = ?";
  connection.query(sql,'cancel',function (err, result, fields) {
      if(err){
        cb(0);
      }else{
        cb(result);
      }
  })
}

var getCost = function(id,cb){
  var sql = "select cost,paypal_id from payment where id = ?";
  connection.query(sql,id,function (err, result, fields) {
      if(err){
        cb(0);
      }else{
        cb(result);
      }
  })
}

var getRefundId = function(paypal_id,cb){
  paypal_api.payment.get(paypal_id, config_opts, function (get_err, get_res) {
      if (get_err) {
          cb(0);
      }
      if (get_res) {
          cb(get_res.transactions[0].related_resources[0].sale.id);
      }
  });
}


var refundTotal = function(id,cb){
  getCost(id,function(result){
    if(result === 0){
      cb(0)
    }else{
      getRefundId(result[0].paypal_id,function(refundId){
        if(refundId === 0){
          cb(0)
        }else{
          var total = result[0].cost-(result[0].cost*0.1);
           total = parseFloat(total).toFixed(2);
          var data = {
              "amount": {
                  "currency": "USD",
                  "total": total
              }
          };
          paypal_api.sale.refund(refundId, data, config_opts, function (get_err, get_res) {
              if (get_err) {
                  cb(0)
              }
              if (get_res) {
                  cb(1);
              }

          });
        }
      })

    }
  })
}

var updateRefund = function(id,cb){
  var sql = "DELETE FROM reservation WHERE payment_id = ?";
  connection.query(sql,id,function (err, result, fields) {
      if(err){
        cb(0);
      }else{
        cb(1);
      }
  })
}

var refundHalf = function(id,cb){
  getCost(id,function(result){
    if(data === 0){
      cb(0)
    }else{
      getRefundId(paymentid,function(refundId){
        if(refundId === 0){
          cb(0)
        }else{
          var total = parseFloat(result[0].cost/2).toFixed(2);
          var data = {
              "amount": {
                  "currency": "USD",
                  "total": total
              }
          };
          var saleId = refundId;
          paypal_api.sale.refund(saleId, data, config_opts, function (get_err, get_res) {
              if (get_err) {
                  cb(0)
              }

              if (get_res) {
                  cb(1);
              }

          });
        }
      })

    }
  })
}

var getCustomerHistory = function(id,cb){
  var sql = `select customer.id,name,id_hotel,date_in,date_out
             from customer,reservation,reserved_room
             where customer.id = ?
             and customer.id = reservation.customer_id
             and reservation.id = reserved_room.reservation_id`;
  connection.query(sql,id,function (error, results, fields) {
      if(error){
        cb(0);
      }else{
        cb(results);
      }
  })
}

  var addHotel = function(arr){
    return new Promise((resolve, reject) => {
      var sql = `INSERT INTO hotel (name,location) VALUES  (?,?)`;
      connection.query(sql,arr,function (error, results) {
          if (error) {
            return reject(error)
          }
          return resolve(results)
        })
      })
  }

  var updateHotel = function(arr){
    return new Promise((resolve, reject) => {
      var sql = "UPDATE hotel set name =? , location =?   WHERE id = ?";
      connection.query(sql,arr,function (error, results) {
          if (error) {
            return reject(error)
          }
          return resolve(results)
        })
      })
  }

  var deleteHotel = function(id){
    return new Promise((resolve, reject) => {
      var sql = `DELETE FROM hotel WHERE id = ?`;
      connection.query(sql,id,function (error, results) {
          if (error) {
            return reject(error)
          }
          return resolve(results)
        })
      })
  }

  ////////

  var addRoom = function(arr){
    return new Promise((resolve, reject) => {
      var sql = `INSERT INTO room (id_hotel,room_number,roomtype_id) VALUES  (?,?,?)`;
      connection.query(sql,arr,function (error, results) {
          if (error) {
            return reject(error)
          }
          return resolve(results)
        })
      })
  }

  var updateRoom = function(arr){
    return new Promise((resolve, reject) => {
      var sql = "UPDATE room set id_hotel =?, room_number =?, roomtype_id =? WHERE id =?";
      connection.query(sql,arr,function (error, results) {
          if (error) {
            return reject(error)
          }
          return resolve(results)
        })
      })
  }

  var deleteRoom = function(id){
    return new Promise((resolve, reject) => {
      var sql = `DELETE FROM room WHERE id = ?`;
      connection.query(sql,id,function (error, results) {
          if (error) {
            return reject(error)
          }
          return resolve(results)
        })
      })
  }


module.exports  = {
  getCancelReservation,
  refundTotal,
  updateRefund,
  getCustomerHistory,
  addHotel,
  updateHotel,
  deleteHotel,
  addRoom,
  updateRoom,
  deleteRoom
}
