var express = require('express');
var router = express.Router();
const conn = require('../connection');

router.get('/',function (req,res){
res.send('admin route')
});
/* signup request */
router.post('/adminsignupaction', function(req, res, next) {
  // console.log(req.body);
  // res.send("recieved");
   let username = req.body.username;
   let email = req.body.email;
   let password = req.body.password;
   let fullname = req.body.fullname;
   let mobileno = req.body.mobileno;
   let insertQuery = "INSERT INTO `admin`(`username`, `email`, `password`, `fullname`, `mobileno`) VALUES ('"+username+"','"+email+"','"+password+"','"+fullname+"','"+mobileno+"')";
   let response ='';
   conn.query(insertQuery,function (error) {
      if(error){
         response = {msg: 'failed'}
         res.send(response)
      }else{
         response = {msg: 'success'}
         res.send(response)
      }

   })
});

//email check
router.post('/checkemail',function (req,res){
   let email = req.body.email;
   selectQuery = "SELECT `email` FROM `admin` WHERE email='"+email+"' ";
   let response ='';
   conn.query(selectQuery, function (err,rows){
if(err) throw err;
if(rows.length === 0){
   response = {msg: 'email not registered'};
   res.send(response);
}else {
   response = {msg: ''};
   res.send(response);
}
   })
})
// login request
router.post('/adminloginaction', function (req,res){
   let email = req.body.email;
   let password = req.body.password;
   selectQuery = "SELECT `email`, `password` FROM `admin` WHERE email='"+email+"' AND password='"+password+"'";
   let response = '';
   conn.query(selectQuery, function (err,rows){
      if(err) throw err;
      if(rows.length === 0){
         response = {msg: 'failed'};
         res.send(response);
      }else {
         response = {msg: 'success'};
         res.send(response);
      }

   })

})

// view admin table request
router.get('/showtable',function (req,res){
   selectQuery = "SELECT * FROM `admin`"
   conn.query(selectQuery, function (err,rows){
      if(err) throw err;
      res.send(rows);
   })
})

router.post('/deletefromtable',function (req,res){
   // console.log(req.body);
   let username = req.body.name;
   console.log(username);
      deleteQuery ="DELETE FROM `admin` WHERE username='"+username+"'";
      conn.query(deleteQuery, function (err){
         if(err) throw err;
         // console.log(rows);
         res.send({status:"adminDeleted"});
      })
   })

router.post('/updateintable',function (req,res){
   console.log(req.body);
})
module.exports = router;
