var mysql      = require('mysql');
var dbconfig = require('../../../config/database');
var connection = mysql.createConnection(dbconfig);

var findListHotel = function(){
  return new Promise((resolve, reject) => {
    var sql = `select name,id
               from hotel`;
    connection.query(sql,function (error, results) {
        if (error) {
          return reject(error)
        }
        return resolve(results)
      })
    })
}


var catchReject = function(message){
  return new Promise((resolve, reject) => {
    return reject(message);
  });
}



var findCheckIn = function(id_hotel){
  return new Promise((resolve, reject) => {
    var sql = `select reservation.id,date_in,date_out,reservation.status,name,phone
               from reservation
               inner join customer on reservation.customer_id = customer.id
               where  id_hotel = ?
               and reservation.status = ?`;
    connection.query(sql,[id_hotel,'checkin'],function (error, results) {
        if (error) {
          return reject(error)
        }
        return resolve(results)
      })
    })
}

var findHotelCheckIn = function(arr){
  return new Promise((resolve, reject) => {
    var sql = `select reservation.id,date_in,date_out,reservation.status,customer.name,phone,hotel.name as hotel
               from reservation
               inner join customer on reservation.customer_id = customer.id
               inner join hotel on reservation.id_hotel = hotel.id
               where ((date_in <= ? and  date_out  >= ?)
                  or (date_in <= ? and  date_out  >= ?)
                  or (date_in >= ? and  date_out  <= ?))
                  and id_hotel = ?
                  and reservation.status = ?`;
    connection.query(sql,arr,function (error, results) {
        if (error) {
          return reject(error)
        }
        return resolve(results)
      })
    })
}


var findCheckOut = function(id_hotel){
  return new Promise((resolve, reject) => {
    var sql = `select reservation.id,date_in,date_out,reservation.status,name,phone
               from reservation
               inner join customer on reservation.customer_id = customer.id
               where  id_hotel = ?
               and reservation.status = ?`;
    connection.query(sql,[id_hotel,'checkout'],function (error, results) {
        if (error) {
          return reject(error)
        }
        return resolve(results)
      })
    })
}

var findHotelCheckOut = function(arr){
  return new Promise((resolve, reject) => {
    var sql = `select reservation.id,date_in,date_out,reservation.status,customer.name,phone,hotel.name as hotel
               from reservation
               inner join customer on reservation.customer_id = customer.id
               inner join hotel on reservation.id_hotel = hotel.id
               where ((date_in <= ? and  date_out  >= ?)
                  or (date_in <= ? and  date_out  >= ?)
                  or (date_in >= ? and  date_out  <= ?))
                  and id_hotel = ?
                  and reservation.status = ?`;
    connection.query(sql,arr,function (error, results) {
        if (error) {
          return reject(error)
        }
        return resolve(results)
      })
    })
}

var checkCheckIn = function(hotelId,id){
  return new Promise((resolve, reject) => {
    var sql = `select id from reservation
                where id_hotel = ?
                and id = ?
                and status = ?`;
    connection.query(sql,[hotelId,id,'checkin'],function (error, results) {
        if (error) {
          return reject(error)
        }
        return resolve(results)
      })
    })
}

var updateCheckIn = function(id){
  return new Promise((resolve, reject) => {
    var sql = `UPDATE reservation set status = ?
               WHERE id = ?`;
    connection.query(sql,['checkout',id],function (error, results) {
        if (error) {
          return reject(error)
        }
        return resolve(results)
      })
    })
}



module.exports  = {
  findListHotel,
  findCheckIn,
  findHotelCheckIn,
  findCheckOut,
  findHotelCheckOut,
  checkCheckIn,
  updateCheckIn,
  catchReject
}
