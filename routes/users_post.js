const express = require('express')
const router = express.Router()
const bcrypt = require('bycrypt')
const models = require('./models')

const SALT_ROUND = 10



module.exports