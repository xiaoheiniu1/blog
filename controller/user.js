// 导入moment
const moment = require('moment')

// 导入db中的index.js
const conn = require('../db/index.js')

// 展示注册页面
const showRegisterPage = (req, res) => {
    res.render('./user/register.ejs', {})
}

// 展示登录页面
const showLoginPage = (req, res) => {
    res.render('./user/login.ejs', {})
}

// 注册新用户的请求处理函数
const reg = (req, res) => {
    const body = req.body;
    // console.log(body);
    // res.send({ status: 200, msg: "ok" })
    // 完成用户注册的业务逻辑
    if (body.username.trim().length <= 0 || body.password.trim().length <= 0 || body.nickname.trim().length <= 0) {
        return res.send({ msg: '请输入完整的注册信息', status: 501 })
    }

    // 查看用户名是否重复
    const sql1 = 'select count(*) as count from users where username=?'

    conn.query(sql1, body.username, (err, result) => {
        if (err) return res.send({ msg: '用户名查重失败', status: 502 })

        if (result[0].count !== 0) return res.send({ msg: "用户名已存在", status: 503 })

        // 全都符合后执行注册的业务逻辑
        body.ctime = moment().format('YYYY-MM-DD HH:mm:ss')
        const sql2 = 'insert into users set ?'
        conn.query(sql2, body, (err, result) => {

            if (err) return res.send({ msg: '注册失败', status: 504 })

            if (result.affectedRows !== 1) return res.send({ msg: '注册新用户失败', status: 505 })

            res.send({ msg: '注册成功', status: 200 })
                // console.log(body);

        })
    })
}

// 登录的请求处理函数
const login = (req, res) => {
    const body = req.body
    const sql1 = 'select *from users where username=? and password=?'

    conn.query(sql1, [body.username, body.password], (err, result) => {
        if (err) return res.send({ msg: '登录失败', status: 501 })
        if (result.length !== 1) return res.send({ msg: '用户登录失败', status: 502 })
        res.send({ msg: '登录成功', status: 200 })
    })
}

module.exports = {
    showRegisterPage,
    showLoginPage,
    reg,
    login
}