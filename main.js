let express = require('express')
let register = require('./router/register')
let login = require('./router/login')
let util = require('util')
let app = express()

app.get('/', (res, req) => {
    req.end('test')
}).listen(8086)

app.post('/register', (req, res) => {
    var data = ''
    req.on('data', (chunk) => {
        data += chunk
    }).on('end', () => {
        try {
            infoJson = JSON.parse(data)
        }
        catch (err) {
            res.end('{"status": 3}')
        }
        register.register(infoJson['username'], infoJson['password'], (err, uuid) => {
            if (err) {
                console.log('Register err' + err.message)
                res.end(util.format('{"status": 2, "message":%s}', err.message))
                return
            }
            console.log('Register: ' + infoJson['userName'])
            res.end('{"status": 0}')
        })
    })
})
console.log('OK');




/* status返回值代表的错误
 * 0：没有错误
 * 2: 注册失败
 * 3：Json格式错误
 */