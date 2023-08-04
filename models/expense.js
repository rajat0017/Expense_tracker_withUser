const Sequelize = require('sequelize');

const sequelize = require('../utils/database');

const expense = sequelize.define('expense',{
    id:{
       type: Sequelize.INTEGER,
       autoIncrement: true,
       allowNull:false,
       primaryKey:true
    },
    expense:{
        type: Sequelize.INTEGER,
        allowNull:false
    },
    catagory:{
       type: Sequelize.STRING,
       allowNull:false,
    },
    description:{
       type : Sequelize.STRING,
       allowNull:false
    }
   
})

module.exports = expense;