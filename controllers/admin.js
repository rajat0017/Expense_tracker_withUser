const path = require('path');

const userdetails = require('../models/user');

const expenseDetails = require('../models/expense')

const bcrypt = require('bcrypt');

function validstring(string) {
    if (string == undefined || string.length === 0) {
        return true;
    }
    else {
        return false;
    }
}

exports.adduser = async (req, res, next) => {
    try {
        const { name, email, password } = req.body;

        if (validstring(name) || validstring(email) || validstring(password)) {
            return res.status(400).json({ err: "bad parameters" })
        }
        bcrypt.hash(password, 10, async (err, hash) => {

            await userdetails.create({ name, email, password: hash })
            res.status(201).json({ meessage: 'User created succesfully' })
        })
    }
    catch (err) {
        return res.status(409).json({ err: "user already exist" });
    }
}

exports.login = async (req, res, next) => {
    const { email, password } = req.body;
    const user = await userdetails.findAll({ where: { email: email } });
    try {
        if (user.length > 0) {
            bcrypt.compare(password, user[0].password, (err, result) => {
                if (err) {
                    res.status(500).json({ success: false, message: 'something went wrong' })
                }
                if (result == true) {
                    res.status(200).json({ success: true, meessage: 'user logged in' })
                }
                else {
                    return res.status(400).json({ success: false, meessage: 'Password is Incorrect' })
                }
            })
        }
        else {
            return res.status(404).json({ error: "User not found" });
        }
    }
    catch (err) {
        console.log(err);
    }
}

exports.addExpense = async (req, res, next)=>{
    const {expense, catagory,description,totalexpense} = req.body;
    try {
      await expenseDetails.create({expense,catagory,description,totalexpense});
    }
    catch (err) {
console.log(err);
    }
}

exports.getExpenses = async (req, res, next) => {
    try {
        const Users = await expenseDetails.findAll();

        res.status(200).json({ allUsers: Users });
    } catch (err) {
        console.log(err);
        res.status(500).json({ error: err })
    }
}

exports.deleteExpense = async (req, res, next)=> {
    const id = req.params.id;
   try{
          await expenseDetails.destroy({where:{id:id}})
   }
   catch(err){
     console.log(err);
   }
}