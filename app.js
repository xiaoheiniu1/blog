const express = require('express')
const app = express()

const path = require('path')
const fs = require('fs')


const bodyParser = require('body-parser')
    //  创建中间件
app.use(bodyParser.urlencoded({ extended: false }))

// 设置 默认采用的模板引擎名称
app.set('view engine', 'ejs')
    // 设置模板页面的存放路径
app.set('views', './views')
    // 托管为静态资源
app.use('/node_modules', express.static('node_modules'))



// // 导入index.js文件
// const index1 = require('./router/index.js')
// app.use(index1)

// // 导入用户相关的文件
// const index2 = require('./router/user.js')
// app.use(index2)


// 利用循环来拼接和挂载文件
fs.readdir(path.join(__dirname, './router'), (err, filenames) => {
    if (err) return console.log('读取router目录中的路由失败')
    filenames.forEach(fname => {
        const router = require(path.join(__dirname, './router', fname))
        app.use(router)
    })
})


// 启动服务器
app.listen(3000, () => {
    console.log("服务器运行成功……")
})