const path = require('path');

const userdetails = require('../models/user');

function validstring(string){
    if(string==undefined||string.length===0){
        return true;
    }
    else{
        return false;
    }
}

exports.adduser = async (req, res, next) => {
    try {
    const{name, email, password} = req.body;

    if(validstring(name)|| validstring(email)||validstring(password)){
        return res.status(400).json({err:"bad parameters"})
    }
        await userdetails.create({ name,email,password})
    }
    catch (err) {
        return res.status(409).json({err: "user already exist"});
     }
}

exports.login= async (req, res, next) => {
    const{email,password}= req.body;
    const user = await userdetails.findAll({where :{email:email}});
    try{
        if(user.length>0) {
            const userdetail = await userdetails.findAll({where:{email:email,password:password}})
            if(userdetail.length>0){
                return res.status(200).json({ success: true, message: "Login successful"});
            }
            else{
                return res.status(401).json({ error: "User not authorized" });
            }
        }
        else{
            return res.status(404).json({ error: "User not found" });
        }   
    }
    catch(err){
       console.log(err);
    }
}