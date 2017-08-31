var mysql      = require('mysql');
var dbconfig = require('../../../config/database');
var connection = mysql.createConnection(dbconfig);
var Crypto = require("crypto-js");
var SECRET_KEY = require('../../../config/key');


var findEmail = function(email) {
  return new Promise((resolve, reject) => {
    var sql = `select email,password,id,id_hotel,role,name,img
               from admin
               where email = ?`;
    connection.query(sql,email,function (error, results) {
        if (error) {
          return reject(error)
        }
        return resolve(results)
      })
    })
}

var countTotalAccount = function(){
  return new Promise((resolve, reject) => {
    var sql = `SELECT COUNT(*) AS count FROM admin`;
    connection.query(sql,function (error, results) {
        if (error) {
          return reject(error)
        }
        return resolve(results)
      })
    })
}

var countHotelAccount = function(hotelId){
  return new Promise((resolve, reject) => {
    var sql = `SELECT COUNT(*) AS count FROM admin where id_hotel = ?`;
    connection.query(sql,hotelId,function (error, results) {
        if (error) {
          return reject(error)
        }
        return resolve(results)
      })
    })
}

var findTotalAccount = function(currentPage){

  return new Promise((resolve, reject) => {
    var limit = (currentPage-1)*10;
    var sql = `SELECT id_hotel,admin.id,admin.name,email,role,hotel.name as hotel FROM admin
               LEFT JOIN hotel on admin.id_hotel = hotel.id
               ORDER BY 'id' LIMIT 10  OFFSET ?`;
    connection.query(sql,limit,function (error, results) {
        if (error) {
          return reject(error)
        }
        return resolve(results)
      })
    })
}

var findHotelAccount = function(currentPage,hotelId){
  return new Promise((resolve, reject) => {
    var limit = (currentPage-1)*10;
    var sql = `select *
               from admin
               where id_hotel = ?
               ORDER BY 'id' LIMIT 10  OFFSET ?`;
    connection.query(sql,[hotelId,limit],function (error, results) {
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

var insertAccount = function(arr){
  return new Promise((resolve, reject) => {
    if(arr[3]=='root'){
      arr[4]=0;
    }
    var sql = `INSERT INTO admin (name,email,password,role,id_hotel,img) VALUES  (?,?,?,?,?,?)`;
    connection.query(sql,arr,function (error, results) {
        if (error) {
          return reject(error)
        }
        return resolve(results)
      })
    })
}



checkAccount = function(id_hotel,id_admin){
  return new Promise((resolve, reject) => {
    if(id_hotel==0){
      var arr = [id_admin];
      var sql = `select *
                 from admin
                 where id = ?`;
    }else{
      var arr = [id_hotel,id_admin];
      var sql = `select *
                 from admin
                 where id_hotel = ?
                 and id = ?`;
    }
    connection.query(sql,arr,function (error, results) {
        if (error) {
          return reject(error)
        }
        return resolve(results)
      })
    })
}

var updateAccountForHotel = function(arr){
  return new Promise((resolve, reject) => {
    var sql;
    if(arr.length==6){
      sql = `UPDATE admin set name = ?,
      password = ? ,
      role = ? ,
      id_hotel = ? ,
      img = ?
      WHERE id = ?`;
    }else{
      sql = `UPDATE admin set name = ?,
      password = ? ,
      role = ? ,
      id_hotel = ?
      WHERE id = ?`;
    }

    connection.query(sql,arr,function (error, results) {
        if (error) {
          return reject(error)
        }
        return resolve(results)
      })
    })
}

var updateAccountForRoot = function(arr){
  return new Promise((resolve, reject) => {
    if(arr[2]=='root'){
      arr[3]=0;
    }
    var sql;
    if(arr.length==6){
      sql = `UPDATE admin set name = ?,
      password = ? ,
      role = ? ,
      id_hotel = ? ,
      img = ?
      WHERE id = ?`;
    }else{
      sql = `UPDATE admin set name = ?,
      password = ? ,
      role = ? ,
      id_hotel = ?
      WHERE id = ?`;
    }
    connection.query(sql,arr,function (error, results) {
        if (error) {
          return reject(error)
        }
        return resolve(results)
      })
    })
}

var deleteAccount = function(id){
  return new Promise((resolve, reject) => {
    var sql = "DELETE FROM admin WHERE id = ?";

    connection.query(sql,id,function (error, results) {
        if (error) {
          return reject(error);
        }
        return resolve();
      })
    })
}


var catchReject = function(message){
  return new Promise((resolve, reject) => {
    return reject(message);
  });
}

var catchResolve = function(message){
  return new Promise((resolve, reject) => {
    return resolve(message);
  });
}

var decode = function(password){
  return Crypto.AES.decrypt(password, SECRET_KEY).toString(Crypto.enc.Utf8);
}
var encode = function(password){
  return Crypto.AES.encrypt(password, SECRET_KEY).toString();
}

module.exports  = {
  findEmail,
  catchReject,
  catchResolve,
  decode,
  encode,
  countTotalAccount,
  countHotelAccount,
  findTotalAccount,
  findHotelAccount,
  findListHotel,
  insertAccount,
  checkAccount,
  updateAccountForRoot,
  updateAccountForHotel,
  deleteAccount
}
