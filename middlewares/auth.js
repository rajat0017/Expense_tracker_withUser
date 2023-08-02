const jwt = require('jsonwebtoken');

const User = require('../models/user');

 exports.authentication = (req, res, next) => {

    try{
          const token = req.header('Authorization');
          const user = jwt.verify(token,'serdtfgyhujmk,lnuh85962fcds94545456dcuhcdyucdgcf5wf656f56f')
          User.findByPk(user.userId).then(user=> {
            req.user=user;
            next();
          })
          .catch(err=>{
            console.log(err);
          })
        }
        catch(err){
           console.log(err);
           return res.status(401).json({success: false});
        }
}
