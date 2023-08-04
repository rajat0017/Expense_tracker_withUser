const User = require('../models/user');

const Expense = require('../models/expense');

const sequelize = require('../utils/database');

exports.getUserLeaderboard = async (req,res)=> {
    try {
      const users = await User.findAll()
      const expenses = await Expense.findAll();
      const userAggregateExpenses = {}
      expenses.forEach((expense)=> {
        if(userAggregateExpenses[expense.userId]){
            userAggregateExpenses[expense.userId]=userAggregateExpenses[expense.userId]+expense.expense
        }
        else{
            userAggregateExpenses[expense.userId]=expense.expense
        }
      })
      var userLeaderboardDetails=[];
      users.forEach((user)=> {
        userLeaderboardDetails.push({name: user.name, total_Expense: userAggregateExpenses[user.id]||0})
      })
      userLeaderboardDetails.sort((a,b)=> b.total_Expense-a.total_Expense)
      res.status(200).json(userLeaderboardDetails);
    }
    catch(err){
        console.log(err);
        res.status(500).json(err);
    }
}
