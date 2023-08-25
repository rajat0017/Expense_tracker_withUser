const express = require('express');

const path = require('path');

const fs = require('fs');

const bodyParser = require('body-parser');

const app = express();

const cors = require('cors');

const dotenv = require('dotenv');
dotenv.config();

const helmet = require('helmet');

const compression = require('compression');

const morgan = require('morgan');

app.use(cors());

const accessLogStream = fs.createWriteStream(
  path.join(__dirname,'access.log'),
  {flags:'a'}
  )
  
app.use(morgan('combined',{stream: accessLogStream}))
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

app.use((req, res)=> {
  res.sendFile(path.join(__dirname,`views/${req.url}`))
})

app.use(helmet());
app.use(compression());


const Expense = require('./models/expense');
const User = require('./models/user');
const Order = require('./models/orders');
const forgotPass= require('./models/forgotPassword');
const Downloads = require('./models/download')

User.hasMany(Expense);
Expense.belongsTo(User);

User.hasMany(Order);
Order.belongsTo(User);

User.hasMany(forgotPass);
forgotPass.belongsTo(User);

User.hasMany(Downloads);
Downloads.belongsTo(User);

sequelize
  .sync()
  .then(result => {
    app.listen(process.env.PORT ||3000);
  })
  .catch(err => {
    console.log(err);
  })