var express = require('express')
// var session = require('express-session')
var db = require('./db')
var register = require('./router/register')
var login = require('./router/login')
var util = require('util')

var app = express()

app.get('/', (res, req) => {
    req.end('test')
})

app.post('/register', (req, res) => {
    let data = ''
    req.on('data', (chunk) => {
        data += chunk
    }).on('end', () => {
        let infoJson;
        try {
            infoJson = JSON.parse(data)
        }
        catch (err) {
            res.end('{"status": 3}')    // JSON 格式错误
            return
        }
        register.register(infoJson['username'], infoJson['password'], (err, status, uuid) => {
            if (err) {
                console.log('Register err' + err.message)
                res.end(util.format('{"status": 2, "message": "%s"}', err.message))
                return
            }
            console.log('Register: ' + status)
            res.end(util.format('{"status": %d, "uuid": "%s"}', status, uuid))
        })
    })
}).post('/login', (req, res) => {
    let data = ''
    req.on('data', (chunk) => {
        data += chunk
    }).on('end', () => {
        let infoJson;
        try {
            infoJson = JSON.parse(data)
        }
        catch (err) {
            res.end('{"status": 3}')    // JSON 格式错误
            return
        }
        login.login(infoJson['username'], infoJson['password'], (err, status, uuid) => {
            if (err) {
                console.log('Login err' + err.message)
                res.end(util.format('{"status": 4, "message": "%s"}', err.message))
                return
            }
            console.log('Login: ' + status)
            res.end(util.format('{"status": %d, "uuid": "%s"}', status, uuid))
        })
    })
})

db.init(() => {
    app.listen(8086)
})

console.log('OK');




/* status返回值代表的错误
 * 0：没有错误
 * 2: 注册失败
 * 3：Json格式错误
 * 4：登录错误（程序错误或数据库错误引起，定义为网络错误）
 */