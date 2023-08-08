const express = require('express');
const Sequelize = require('sequelize');
const { v4: uuidv4 } = require('uuid');

const sequelize = require('../utils/database');

const forgotpasswordreq = sequelize.define('forgotpasswordrequest',{
    id:{
       type: Sequelize.UUID,
       defaultValue:Sequelize.UUIDV4,
       primaryKey:true
    },
    isactive: {
        type:Sequelize.BOOLEAN,
        defaultValue:true
    }
    
})

module.exports = forgotpasswordreq;