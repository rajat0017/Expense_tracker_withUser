const path = require('path');

const expenseDetails = require('../models/expense')

exports.addExpense = async (req, res, next)=>{
    const {expense, catagory,description} = req.body;
    try {
      await req.user.createExpense({expense,catagory,description});
    }
    catch (err) {
console.log(err);
    }
}

exports.getExpenses = async (req, res, next) => {
    try {
        const Users = await req.user.getExpenses({where:{userId:req.user.id}});

        res.status(200).json({ allUsers: Users });
    } catch (err) {
        console.log(err);
        res.status(500).json({ error: err })
    }
}

exports.deleteExpense = async (req, res, next)=> {
    const id = req.params.id;
   try{
          await expenseDetails.destroy({where:{id:id,userId:req.user.id}})
   }
   catch(err){
     console.log(err);
   }
}