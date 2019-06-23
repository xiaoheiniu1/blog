const express = require('express')
const router = express.Router()

// 导入controller里的user.js
const ctrl = require('../controller/user.js')


// 注册
router.get('/register', ctrl.showRegisterPage)

// 登录
router.get('/login', ctrl.showLoginPage)

// 注册事件
router.post('/register', ctrl.reg)

// 登录事件
router.post('/login', ctrl.login)


module.exports = router