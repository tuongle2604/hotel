var mysql      = require('mysql');
var dbconfig = require('../../../config/database');
var connection = mysql.createConnection(dbconfig);
var Crypto = require("crypto-js");
var SECRET_KEY = require('../../../config/key');


var findPhone = function(phone) {
  return new Promise((resolve, reject) => {
    var sql = `select id,name,phone,email,date_created,gender,country,status
               from customer
               where phone = ?`;
    connection.query(sql,phone,function (error, results) {
        if (error) {
          return reject(error)
        }
        return resolve(results)
      })
    })
}

var findName = function(name) {
  return new Promise((resolve, reject) => {
    var sql = `select id,name,phone,email,date_created,gender,country,status
               from customer
               where name = ?`;
    connection.query(sql,name,function (error, results) {
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

var insertCustomer = function(arr){
  return new Promise((resolve, reject) => {
    var sql = `INSERT INTO customer (name,phone,email,gender,country,date_created,status,code) VALUES  (?,?,?,?,?,?,?,?)`;
    connection.query(sql,arr,function (error, results) {
        if (error) {
          return reject(error)
        }
        return resolve(results)
      })
    })
}

module.exports  = {
  findPhone,
  findName,
  catchReject,
  insertCustomer
}
