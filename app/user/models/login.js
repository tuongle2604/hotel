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

var catchReject = function(message){
  return new Promise((resolve, reject) => {
    return reject(message);
  });
}

var decode = function(password){
  return Crypto.AES.decrypt(password, SECRET_KEY).toString(Crypto.enc.Utf8);
}
var encode = function(password){
  return Crypto.AES.encrypt(password, SECRET_KEY).toString();
}

var findUserDeserializer = function(id){
  return new Promise((resolve, reject) => {
    var sql = `select *
               from admin
               where id = ?`;
    connection.query(sql,id,function (error, results) {
        if (error) {
          return reject(error)
        }
        return resolve(results[0])
      })
    })
}


module.exports  = {
  findEmail,
  catchReject,
  decode,
  encode,
  findUserDeserializer,
}
