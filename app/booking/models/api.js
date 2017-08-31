var mysql      = require('mysql');
var dbconfig = require('../../../config/database');
var connection = mysql.createConnection(dbconfig);


var getLocationHotel = function(location) {
  return new Promise((resolve, reject) => {
    var sql = `select  hotel.name
               from hotel
  				     where location = ?`;
    connection.query(sql,location,function (error, results) {
        if (error) {
          return reject(error)
        }
        return resolve(results)
      })
    })
}

var getReservedHotel = function(arr){
  return new Promise((resolve, reject) => {
    var sql = `select DISTINCT hotel.name
               from reservation
               inner join reserved_room on reserved_room.reservation_id = reservation.id
               inner join room on reserved_room.room_id = room.id
               inner join hotel on room.id_hotel = hotel.id
               where ((date_in <= ? and  date_out  >= ?)
                  or (date_in <= ? and  date_out  >= ?))
                  and location = ?`;
    connection.query(sql,location,function (error, results) {
        if (error) {
          return reject(error)
        }
        return resolve(results)
      })
    })
}


var getEmptyHotel = function(arr,cb){
  return new Promise((resolve, reject) => {
    var sql = `SELECT DISTINCT hotel.name
		FROM reservation
        inner join reserved_room on reserved_room.reservation_id = reservation.id
               inner join room on reserved_room.room_id = room.id
               inner join hotel on room.id_hotel = hotel.id
        WHERE location = ?
        and room.id NOT IN
        (select DISTINCT room.id
               from reservation
               inner join reserved_room on reserved_room.reservation_id = reservation.id
               inner join room on reserved_room.room_id = room.id
               inner join hotel on room.id_hotel = hotel.id
               where ((date_in <= ? and  date_out  >= ?)
                  or (date_in <= ? and  date_out  >= ?))
                  and location = ?);`;
    connection.query(sql,arr,function (error, results) {
        if (error) {
          return reject(error)
        }
        return resolve(results)
      })
    })
}



module.exports  = {
  getLocationHotel,
  getReservedHotel,
  getEmptyHotel,
}
