var mysql      = require('mysql');
var dbconfig = require('../../../config/database');
var connection = mysql.createConnection(dbconfig);

var findHotelReservation = function(arr) {
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

var findReservation = function(id_hotel) {
  return new Promise((resolve, reject) => {
    var sql = `select reservation.id,date_in,date_out,reservation.status,name,phone
               from reservation
               inner join customer on reservation.customer_id = customer.id
               where  id_hotel = ?
               and reservation.status = ?`;
    connection.query(sql,[id_hotel,'no check'],function (error, results) {
        if (error) {
          return reject(error)
        }
        return resolve(results)
      })
    })
}

var findEmptyRoom = function(arr){
  return new Promise((resolve, reject) => {
    var sql = `SELECT  room.id,room_number,capacity,price,room_number
	FROM room
    inner join room_type on room.roomtype_id = room_type.id
    where room.id_hotel = ?
    and room.id NOT IN
    (select room.id
               from reservation
               inner join customer on reservation.customer_id = customer.id
               inner join reserved_room on reserved_room.reservation_id = reservation.id
               inner join room on reserved_room.room_id = room.id
               where ((date_in <= ? and  date_out  >= ?)
                  or  (date_in <= ? and  date_out  >= ?)
                  or  (date_in >= ? and  date_out  <= ?))
                  and reservation.id_hotel = ?)
    ORDER BY room_number ASC    `;
    connection.query(sql,arr,function (error, results) {
        if (error) {
          return reject(error)
        }
        return resolve(results)
      })
    })
}

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

var countAllEmptyRoom = function(arr){
  return new Promise((resolve, reject) => {
    var sql = `SELECT   room.id_hotel,name,COUNT(room.id_hotel) AS empty_room
	     FROM room
       inner join room_type on room.roomtype_id = room_type.id
       inner join hotel on room.id_hotel = hotel.id
       and room.id NOT IN
              (select room.id
               from reservation
               inner join customer on reservation.customer_id = customer.id
               inner join reserved_room on reserved_room.reservation_id = reservation.id
               inner join room on reserved_room.room_id = room.id
               where (date_in <= ? and  date_out  >= ?)
                  or (date_in <= ? and  date_out  >= ?)
                  or (date_in >= ? and  date_out  <= ?))
       GROUP BY room.id_hotel
       ORDER BY room.id_hotel ASC  `;
    connection.query(sql,arr,function (error, results) {
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

var checkReservation = function(hotelId,id){
  return new Promise((resolve, reject) => {
    var sql = `select id from reservation
                where id_hotel = ?
                and id = ?`;
    connection.query(sql,[hotelId,id],function (error, results) {
        if (error) {
          return reject(error)
        }
        return resolve(results)
      })
    })
}

var updateReservation = function(id){
  return new Promise((resolve, reject) => {
    var sql = `UPDATE reservation set status = ?
               WHERE id = ?`;
    connection.query(sql,['checkin',id],function (error, results) {
        if (error) {
          return reject(error)
        }
        return resolve(results)
      })
    })
}

var getRoomsPrice = function(rooms){
  return new Promise((resolve, reject) => {
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
    connection.query(sql,rooms,function (error, results) {
        if (error) {
          return reject(error)
        }
        return resolve(results)
      })
    })
}

var insertPayment = function(arr){
  return new Promise((resolve, reject) => {
    var sql = `INSERT INTO payment (cost,detail) VALUES (?,?)`;
    connection.query(sql,arr,function (error, results, fields) {
        if (error) {
          return reject(error)
        }
        return resolve(results.insertId)
      })
    })
}

var insertReservation = function(arr){
  return new Promise((resolve, reject) => {
    var sql = `INSERT INTO reservation (id_hotel,customer_id,date,date_in,date_out,payment_id,payment_method,status) VALUES (?,?,?,?,?,?,?,?)`;
    connection.query(sql,arr,function (error, results, fields) {
        if (error) {
          return reject(error)
        }
        return resolve(results.insertId)
      })

  })
}

var insertReserved = function(id,rooms){
  return new Promise((resolve, reject) => {
    var reserved = [];
    rooms.forEach(function(e){
      var data = [e,id];
      reserved.push(data);
    })
    var sql = `INSERT INTO reserved_room (room_id,reservation_id) VALUES  ?`;
    connection.query(sql,[reserved],function (error, results, fields) {
        if (error) {
          return reject(error)
        }
        return resolve()
      })

  })
}

module.exports  = {
  findReservation,
  findHotelReservation,
  findEmptyRoom,
  findListHotel,
  getRoomsPrice,
  insertPayment,
  insertReservation,
  insertReserved,
  countAllEmptyRoom,
  checkReservation,
  updateReservation,
}
