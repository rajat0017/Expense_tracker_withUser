const path = require('path');

const expenseDetails = require('../models/expense')

const User = require('../models/user');

const sequelize = require('../utils/database');
const expense = require('../models/expense');
const UserServices = require('../services/userservices');
const S3Services = require('../services/S3services');

exports.addExpense = async (req, res, next)=>{
    const t= await sequelize.transaction();
    const {expense, catagory,description} = req.body;
    const totalExpense = req.user.totalExpense+expense;
    console.log(totalExpense)
    try {
      await req.user.createExpense({expense,catagory,description},{transaction:t});
      await User.update({totalExpense:totalExpense}, {where:{id: req.user.id}, transaction:t})
      await t.commit();
      res.status(200).json({expense:expense})
    }
    catch (err) {
        await t.rollback();
console.log(err);
    }
}

exports.getExpenses = async (req, res, next) => {
    try {
        const Users = await req.user.getExpenses({where:{userId:req.user.id}});
        res.status(200).json({ allExpense: Users });
    } catch (err) {
        console.log(err);
        res.status(500).json({ error: err })
    }
}

exports.deleteExpense = async (req, res, next)=> {
    const id = req.params.id;
   try{
          const expenses = await expenseDetails.findOne({expense:expense}, {where: {id:id}});
          const deleteExpense = req.user.totalExpense - expenses.expense
          await expenseDetails.destroy({where:{id:id,userId:req.user.id}});
          await User.update({totalExpense:deleteExpense}, {where: {id:req.user.id}})
   }
   catch(err){
     console.log(err);
   }
}

exports.downloadExpense= async(req,res)=> {
    try{
        const expenses= await UserServices.getExpenses(req);
        const stringifiedExpense= JSON.stringify(expenses);
    
        const userId= req.user.id
    
        const filename = `Expenses${userId}/${new Date()}.txt`;
        const fileURL=  await S3Services.uploadToS3(stringifiedExpense,filename);
    
        res.status(200).json({fileURL ,success:true});
    }
    catch(err){
        console.log(err);
        res.status(500).json({fileURL:'',success:false,err:err})
    }
    
}

