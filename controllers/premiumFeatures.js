const User = require('../models/user');

const Expense = require('../models/expense');

const sequelize = require('../utils/database');

exports.getUserLeaderboard = async (req,res)=> {
    try {
      const leaderboardofUser = await User.findAll({
        attributes: ['id','name',[sequelize.fn('sum',sequelize.col('expenses.expense')),'total_Expense']],
        include: [
            {
                model: Expense,
                attributes:[]
            }
        ],
        group:['user.id'],
        order:[['total_Expense','DESC']]
      })
      
      res.status(200).json(leaderboardofUser);
    }
    catch(err){
        console.log(err);
        res.status(500).json(err);
    }
}
