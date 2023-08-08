const Sib = require('sib-api-v3-sdk');
const forgotPass = require('../models/forgotPassword')
const User = require('../models/user');
const bcrypt = require('bcrypt');

require('dotenv').config();

exports.forgotPassword = async (req, res, next) => {
    const id = await User.findOne({ where: { email: req.body.email } })
    console.log(id.id)
    const uuid = await forgotPass.findOne({ where: { userId: id.id } })
    try {
        const client = Sib.ApiClient.instance
        const apiKey = client.authentications['api-key']

        apiKey.apiKey = process.env.API_KEY

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
            subject: 'Reset Password',
            htmlContent: `<p>Your reset password link is <a href="http://localhost:3000/password/resetpassword/${uuid.id}">here</a> </p>`
        })
        res.status(200).json({ message: 'Email Sent Succesfully' })
    }
    catch (err) {
        console.log(err);
    }
}

exports.requests = async (req, res, next) => {
    try {
        const user = await User.findOne({ where: { email: req.body.email } })
        console.log(user.id);
        await forgotPass.create({ userId: user.id });
        next();
    }
    catch (err) {
        console.log(err);
    }
}

exports.resetpassword = async (req, res, next) => {
    const id = req.params.id;
    const forgotpasswordreq = await forgotPass.findOne({ where: { id } })
    forgotpasswordreq.update({ isactive: false }, { where: { id: id } })
    res.status(200).send(`<html>
    <script>
        function formsubmitted(e){
            e.preventDefault();
            console.log('called')
        }
    </script>

    <form action="/password/updatepassword/${id}" method="get">
        <label for="newpassword">Enter New password</label>
        <input name="newpassword" type="password" required></input>
        <button>reset password</button>
    </form>
</html>`
    )
    res.end();
}

exports.updatepassword = (req, res) => {

    try {
        const { newpassword } = req.query;
        const { resetpasswordid } = req.params;
        console.log('hi');;
        forgotPass.findOne({ where: { id: resetpasswordid } }).then(resetpasswordrequest => {
            User.findOne({ where: { id: resetpasswordrequest.userId } }).then(user => {
                
                if (user) {
                    const saltRounds = 10;
                    bcrypt.genSalt(saltRounds, function (err, salt) {
                        if (err) {
                            console.log(err);
                            throw new Error(err);
                        }
                        bcrypt.hash(newpassword, salt, function (err, hash) {
                
                            if (err) {
                                console.log(err);
                                throw new Error(err);
                            }
                            console.log(User)
                            User.update(
                                { password: hash },
                                { where: { id: user.id } }
                            ).then(() => {
                                res.status(201).json({ message: 'Successfuly update the new password' })
                            })
                        });
                    });
                } else {
                    return res.status(404).json({ error: 'No user Exists', success: false })
                }
            })
        })
    } catch (error) {
        return res.status(403).json({ error, success: false })
    }

}