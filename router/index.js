const express = require('express')
const router = express.Router()
const app = express()

// 引用controller里的index.js
const index1 = require('../controller/index.js')

// get方式监听，并渲染主页
router.get('/', index1.showIndexPage)


module.exports = router