var mysql      = require('mysql');
var dbconfig = require('../../../config/database');
var nexmoConfig = require('../../../config/nexmo')
const Nexmo = require('nexmo');
var Crypto = require("crypto-js");
var connection = mysql.createConnection(dbconfig);

var SECRET_KEY ="adfgpoiufkjhgfmbvcx!@#$%^&*()";

const nexmo = new Nexmo(nexmoConfig);

var findCustomerPhone = function(phone){
  return new Promise((resolve, reject) => {
    var sql = `SELECT * FROM customer where phone = ?`;
    var arr = [phone];
    connection.query(sql, arr,function (error, results, fields) {
        if (error) {
          return reject(error)
        }
        return resolve(results[0])
      })
    })
}

var insertCustomerPhone = function(user){
  return new Promise((resolve, reject) => {
    var sql = `INSERT INTO customer (phone,date_created,status,code) VALUES (?,?,?,?)`;
    connection.query(sql,user,function (error, results, fields) {
        if (error) {
          return reject(error)
        }
        var arr = [user[0],user[3],results.insertId];
        return resolve(arr)
      })
    })
}

var catchReject = function(message){
  return new Promise((resolve, reject) => {
    return reject(message);
  });
}

var registerResolve = function(receiver,val){
  return new Promise((resolve, reject) => {
    return resolve(receiver,val);
  });
}


var sendSms = function(receiver,val){
  return new Promise((resolve, reject) => {
    nexmo.message.sendSms('0111111111',receiver,val, function(err, results){
      if(err || results.messages[0].status != 0){
        return reject('sms error');
      }
      return resolve();
    });
  });
}

var findPhone = function(id){
  return new Promise((resolve, reject) => {
    var sql = `SELECT * FROM customer where id = ?`;
    connection.query(sql,id,function (error, results, fields) {
        if (error) {
          return reject(error)
        }
        return resolve(results[0])
      })
    })
}



var updateCode = function(arr){
  return new Promise((resolve, reject) => {
    var sql = `UPDATE customer
               SET code = ?
               WHERE  id = ?`;
    connection.query(sql,arr,function (error, results, fields) {
        if (error) {
          return reject(error);
        }
        return resolve();
      })
    })
}

var updateInfo = function(arr){
  return new Promise((resolve, reject) => {
    var sql = `UPDATE customer
               SET name = ? ,
               email = ? ,
               gender = ? ,
               country = ? ,
               status = ?
               WHERE  id = ?`;
    connection.query(sql,arr,function (error, results, fields) {
        if (error) {
          return reject(error);
        }
        return resolve();
      })
    })
}

var updateProfile = function(arr){
  return new Promise((resolve, reject) => {
    var sql = `UPDATE customer
               SET name = ? ,
               email = ? ,
               gender = ? ,
               country = ?
               WHERE  id = ?`;
    connection.query(sql,arr,function (error, results, fields) {
        if (error) {
          return reject(error);
        }
        return resolve(0);
      })
    })
}

var updateProfilePhone = function(arr){
  return new Promise((resolve, reject) => {
    var sql = `UPDATE customer
               SET name = ? ,
               email = ? ,
               gender = ? ,
               country = ? ,
               updated_phone = ?,
               code = ?
               WHERE  id = ?`;
    connection.query(sql,arr,function (error, results, fields) {
        if (error) {
          return reject(error);
        }
        return resolve(1);
      })
    })
}

var updatePhone = function(arr){
  return new Promise((resolve, reject) => {
    var sql = `UPDATE customer
               SET phone = ?
               WHERE  id = ?`;
    connection.query(sql,arr,function (error, results, fields) {
        if (error) {
          return reject(error);
        }
        return resolve();
      })
    })
}


var encode = function(password){
  return Crypto.AES.encrypt(password, SECRET_KEY).toString();
}
var decode = function(password){
  return Crypto.AES.decrypt(password, SECRET_KEY).toString(Crypto.enc.Utf8);
}




module.exports  = {
  findCustomerPhone,
  insertCustomerPhone,
  sendSms,
  catchReject,
  registerResolve,
  findPhone,
  updateCode,
  updateInfo,
  updatePhone,
  updateProfile,
  updateProfilePhone,
  encode,
  decode,

}
