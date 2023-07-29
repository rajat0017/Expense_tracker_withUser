const path = require('path');

const userdetails = require('../models/user');

exports.adduser = async (req, res, next)=>{
    const email = req.body.email;
    const userexist= await userdetails.findAll({where:{email:email}})
    if(!userexist){
        console.log('user exist')
    }
    else{
     try{
        const name = req.body.name;       
        const phone = req.body.phone;
        const password = req.body.password;
        const data = await userdetails.create({
         name:name,
         email:email,
         phone:phone,
         password:password
        })
      }
      catch(err){
          console.log(err);
      }
    }
}