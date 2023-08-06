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
const expenseRoute = require('./routes/expenseRoute');
const purchaseRoute = require('./routes/purchase');
const premiumFeatureRoute = require('./routes/premiumFeatures');
const forgotPassRoute = require('./routes/forgotPassRoute');

app.use(userRoutes);
app.use(expenseRoute);
app.use(purchaseRoute);
app.use(premiumFeatureRoute);
app.use(forgotPassRoute);

const Expense = require('./models/expense');
const User = require('./models/user');
const Order = require('./models/orders');

User.hasMany(Expense);
Expense.belongsTo(User);

User.hasMany(Order);
Order.belongsTo(User);

sequelize
  .sync()
  .then(result => {
    app.listen(3000);
  })
  .catch(err => {
    console.log(err);
  })