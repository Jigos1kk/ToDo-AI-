'use strict'

require('dotenv').config()

const express = require('express')
const router = express.Router();
const Auth = require('./middleware/Auth');

const UserController = require('./controller/UserController');

router.get('/health', (req, res) => {
    return res.status(200).json({ message: "Подключение к API работает коректно" })
})

router.post('/user/create', UserController.create)

module.exports = router;