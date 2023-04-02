var express = require('express');
var router = express.Router();
/* GET users listing. */
// const express=require('express');
// const app=express()
var conn = require('../database');

router.get('/form', function (req, res, next) {
  // res.render('voter-registration.ejs');
  if (req.session.loggedinUser) {
    res.render('voter-registration.ejs')
  } else {
    res.redirect('/login');
  }
});


var getAge = require('get-age');


var nodemailer = require('nodemailer');
const { isExpressionWithTypeArguments } = require('typescript');
var rand = Math.floor((Math.random() * 10000) + 54);
console.log("OTP",rand);


var account_address;
var data;

// app.use(express.static('public'));
// //app.use('/css',express.static(__dirname+'public/css'));
// //app.use(express.json());
// app.use(express.urlencoded());

router.post('/registerdata', function (req, res) {
  let body = req.body;
  aadharno = req.body.aadharno;    //data stores aadhar no
  account_address = req.body.account_address;     //stores metamask acc address
  console.log(aadharno);
  // let sql  = "insert "
  // var sql="INSERT INTO aadhar_info SET ?";
  // let record = {};
  // conn.query(sql,record, function(err2,res2){

  // });
  let sql = "SELECT * FROM aadhar_info WHERE Aadharno = ?";
  conn.query(sql, aadharno, (error, results, fields) => {
    console.log(results, error);
    if (error) {
      return console.error(error.message);
    }
    if (!results || !results.length) {
      console.log("No user is found with this aadhar. Registring new user!");
      let newRegistration = {
        Email: body.Email,
        Aadharno: body.aadharno,
        Dob: body.Dob,
        Is_registered: true,
      }
      let insertUser = "INSERT INTO aadhar_info SET ?";
      console.log("newRegistration", JSON.stringify(newRegistration, null, 4));
      conn.query(insertUser, newRegistration, function (err2, registerdUser) {
        console.log("New User Registation", err2, registerdUser)
      })
     return  res.render('emailverify.ejs');
    } else {
      //console.log(results)
      dob = results[0].Dob;
      var email = results[0].Email;
      Is_registered = results[0].Is_registered;
      if (Is_registered) {
        res.render('voter-registration.ejs', { alertMsg: "You are already registered. You cannot register again" });
      }
    }
  });

  //console.log(dob);
  //console.log(age);
  //res.send("ok")
  //console.log(dob);
})

router.post('/otpverify', (req, res) => {
  var otp = req.body.otp;
  // if (otp == rand) {
    var record = { Account_address: account_address, Is_registered: 'Yes' };
    var sql = "INSERT INTO registered_users SET ?";
    conn.query(sql, record, function (err2, res2) {
      if (err2) {
        throw err2;
      }
      else {
        var sql1 = "Update aadhar_info set Is_registered=? Where Aadharno=?";
        var record1 = ['YES', data]
        console.log(data)
        conn.query(sql1, record1, function (err1, res1) {
          if (err1) {
            res.render('voter-registration.ejs');
          }
          else {
            console.log("1 record updated");
            var msg = "You are successfully registered";
            // res.send('You are successfully registered');
            res.render('voter-registration.ejs', { alertMsg: msg });
          }
        });

      }
    });
  // }
  // else {
  //   res.render('voter-registration.ejs', { alertMsg: "Session Expired! , You have entered wronge OTP " });
  // }
})



// router.get('/register',function(req,res){
//     res.sendFile(__dirname+'/views/index.html')
// });

/*app.get('/signin_signup',function(req,res){
    res.sendFile(__dirname+'/views/signup.html')
});

app.get('/signup',function(req,res){
    console.log(req.body);
    res.sendFile(__dirname+'/views/signup.html')
});*/

module.exports = router;