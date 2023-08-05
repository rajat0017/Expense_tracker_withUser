const User = require('../models/user');

const Expense = require('../models/expense');

const sequelize = require('../utils/database');

exports.getUserLeaderboard = async (req,res)=> {
    try {
      const leaderboardofUser = await User.findAll({
        order:[['totalExpense','DESC']]
      })
      
      res.status(200).json(leaderboardofUser);
    }
    catch(err){
        console.log(err);
        res.status(500).json(err);
    }
}
