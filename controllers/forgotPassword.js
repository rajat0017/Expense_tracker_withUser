const { response } = require('express');
const Sib= require('sib-api-v3-sdk');

require('dotenv').config();

exports.forgotPassword= (req,res) =>{
    try{
        const client = Sib.ApiClient.instance
        const apiKey = client.authentications['api-key']
    
        apiKey.apiKey= process.env.API_KEY
    
        const tranEmailApi = new Sib.TransactionalEmailsApi()
    
        const sender = {
            email: 'rajatkalgaonkar67@gamil.com'
        }
    
        const receiver = [
            {
                email: req.body.email
            }
        ]
        tranEmailApi.sendTransacEmail({
            sender,
            to: receiver,
            subject:'Reset Password',
            htmlContent:`<p>Your reset password link is here</p>`
        })
        console.log('log')
        res.status(200).json({message:'Email Sent Succesfully'})
    }
      catch(err){
        console.log(err);
      }
}