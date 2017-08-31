var mysql      = require('mysql');
var dbconfig = require('../../../config/database');
var connection = mysql.createConnection(dbconfig);


var getRoomsPrice = function(rooms,cb){
  var query = '';
  var first = true;
  rooms.forEach(function(e){
    if(first == false){
      query+=' or room.id = ?';
    }
    first = false;
  })

  var sql = `select room_number,capacity,price from room,room_type
                      where room.roomtype_id = room_type.id
                      and (room.id = ? ${query})`;
  connection.query(sql,rooms,function (error, results, fields) {
      if(error){

        cb(0);
      }else{
        cb(results);
      }
  })
}

  var insertPaymentOnline = function(payment,cb){
    var sql = `INSERT INTO payment (cost,detail,paypal_id) VALUES  (?,?,?)`;
    connection.query(sql,payment,function (error, results, fields) {
        if(error){

          cb(0);
        }else{
          cb(results);
        }
    })
  }

  insertReservation = function(data,rooms,cb){
    var sqlReservation = `INSERT INTO reservation (id_hotel,customer_id,date,date_in,date_out,payment_id,payment_method,status) VALUES  (?,?,?,?,?,?,?,?)`;
    connection.query(sqlReservation,data,function (error, results, fields) {
        if(error){
          cb(0);
        }else{
          var reserved = [];
          rooms.forEach(function(e){
            var data = [];
            data.push(e);
            data.push(results.insertId);
            reserved.push(data);
          })
          var sqlReserved = `INSERT INTO reserved_room (room_id,reservation_id) VALUES  ?`;
          connection.query(sqlReserved,[reserved],function (errorReserved, resultsReserved, fieldsReserved) {
              if(errorReserved){
                cb(0);
              }else{
                cb(resultsReserved);
              }
          })
        }
    })
  }

  var insertPaymentOffline = function(data,rooms,cb){
    var sqlReservation = "INSERT INTO reservation (id_hotel, customer_id,date_in,date_out,status) VALUES (?,?,?,?,?)";
    connection.query(sqlReservation,data,function (error, results, fields) {
        if(error){

          cb(0);
        }else{
          var reserved = [];
          rooms.forEach(function(e){
            var data = [];
            data.push(e);
            data.push(results.insertId);
            reserved.push(data);
          })
          var sqlReserved = `INSERT INTO reserved_room (room_id,reservation_id) VALUES  ?`;
          connection.query(sqlReserved,[reserved],function (errorReserved, resultsReserved, fieldsReserved) {
              if(errorReserved){
                cb(0);
              }else{
                cb(resultsReserved);
              }
          })
        }
    })
  }

  var updateReservation = function(arr,cb){
    var sql = "UPDATE reservation set status = ?  WHERE payment_id = ?";
    connection.query(sql,arr,function (err, result, fields) {
        if(err){
          cb(0);
        }else{
          cb(1);
        }
    })

  }


module.exports  = {
  getRoomsPrice,
  insertPaymentOnline,
  insertReservation,
  insertPaymentOffline,
  updateReservation
}
