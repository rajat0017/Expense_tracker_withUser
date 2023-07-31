const Sequelize = require('sequelize');

const sequelize = new Sequelize('expense_tracker', 'root', 'Rajat@7208',{
    dialect : 'mysql',
    host : 'localhost'
})
module.exports= sequelize;