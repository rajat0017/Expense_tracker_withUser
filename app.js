const express = require('express');

const path = require('path');

const bodyParser = require('body-parser');

const app = express();

const cors = require('cors');

app.use(cors());

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended:false}));

const sequelize = require('./utils/database');

const userRoutes = require('./routes/userRoute');

app.use(userRoutes);

const expenseRoute = require('./routes/expenseRoute');

app.use(expenseRoute);

const Expense = require('./models/expense');
const User = require('./models/user');

User.hasMany(Expense);
Expense.belongsTo(User);

sequelize
  .sync()
  .then(result => {
    app.listen(3000);
  })
  .catch(err => {
    console.log(err);
  })