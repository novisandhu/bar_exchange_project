var express = require('express');
var router = express.Router();
var mysql = require('mysql')



router.post('/adminlogin',(req,res)=>{
    console.log(req.body);


    res.send('Success');
})

/* GET users listing. */
router.get('/', function(req, res, next) {
    res.send('respond with a resource');
});

module.exports = router;
