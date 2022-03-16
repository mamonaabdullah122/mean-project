
 express = require('express');
 userModel = require('../models/user');
 router = express.Router();

const bcrypt = require('bcrypt');
/* GET users listing. */

function checkEmail(req,res,next){
   email=req.body.Email;
   checkexitemail=findOne({email:email});
  checkexitemail.exec((err,data)=>{
 if(err) throw err;
 if(data){
  return res.status(200).json({
    msg:"Email Already Exits",
    results:data
});
 }
 next();
  });
}

router.get('/', function(req, res, next) {

    res.render('index', { title: 'User Data Inserted' });

  })


  router.post('/register', checkEmail,function(req, res, next) {

    _hash(req.body.Password, 10, function(err, hash) {

      if(err){
        res.status(400).json({
              msg:"Something Wrong, Try Later!",
              results:err
          });
      }else{
    var userDetails = new userModel({
      name: req.body.Name,
      email: req.body.Email,
      password: hash,
      role:'Author'

    });

    userDetails.save().then(resResult=>{
      res.status(201).json({
          msg:"User Created Successfully",
          results:resResult
      });


  })
  .catch(err=>{
      res.json(err);
    });
   }
 });
});


  router.post('/register', checkEmail,function(req, res, next) {

    bcrypt.hash(req.body.Password, 10, function(err, hash) {

      if(err){
        res.status(400).json({
              msg:"Something Wrong, Try Later!",
              results:err
          });
      }else{
    var userDetails = new userModel({
      name: req.body.Name,
      email: req.body.Email,
      password: hash,

    });

    userDetails.save().then(resResult=>{
      res.status(201).json({
          msg:"Inserted Successfully",
          results:resResult
      });


  })
  .catch(err=>{
      res.json(err);
     });
    }
  });
});
  module.exports = router;
