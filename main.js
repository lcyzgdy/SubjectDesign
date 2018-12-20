var express = require('express')
var db = require('./db')
var register = require('./router/register')
var login = require('./router/login')
var movies = require('./router/movies')
var util = require('util')
var session = require('./session')
var app = express()
var request = require('superagent')
var path = require('path')


session.init((sess) => {
    app.use(sess)
})

app.all('*', function (req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Content-Type,XFILENAME,XFILECATEGORY,XFILESIZE");
    res.header("Access-Control-Allow-Methods", "PUT,POST,GET,DELETE,OPTIONS");
    res.header("X-Powered-By", 'Express')
    //res.header("Content-Type", "application/json;charset=utf-8");
    //res.header("Access-Control-Allow-Credentials", )
    next();
});

app.get('/', (req, res) => {
    //res.setHeader('Access-Control-Allow-Origin', '*')
    res.end('test')
})

app.post('/register', (req, res) => {
    console.log('Register')
    //res.setHeader('Access-Control-Allow-Origin', '*')
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
        register.register(req, infoJson['username'], infoJson['password'], req.ip, (err, status, session) => {
            if (err) {
                console.log('Register err' + err.message)
                res.end(util.format('{"status": 2, "message": "%s"}', err.message))
                return
            }
            console.log('Register: ' + status)
            res.end(util.format('{"status": %d, "session": "%s"}', status, session))
        })
    })
}).post('/signup', (req, res) => {
    console.log('Register')
    //res.setHeader('Access-Control-Allow-Origin', '*')
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
        register.register(req, infoJson['username'], infoJson['password'], req.ip, (err, status, session) => {
            if (err) {
                console.log('Register err' + err.message)
                res.end(util.format('{"status": 2, "message": "%s"}', err.message))
                return
            }
            console.log('Register: ' + status)
            res.end(util.format('{"status": %d, "session": "%s"}', status, session))
        })
    })
}).post('/login', (req, res) => {
    console.log('Login')
    //res.setHeader('Access-Control-Allow-Origin', '*')
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
        login.login(req.session, infoJson['username'], infoJson['password'], (err, status, uuid) => {
            if (err) {
                console.log('Login err' + err.message)
                res.end(util.format('{"status": 4, "message": "%s"}', err.message))
                return
            }
            //console.log('Login: ' + status)
            res.end(util.format('{"status": %d, "uuid": "%s"}', status, uuid))
        })
    })
}).post('/logout', (req, res) => {
    console.log('Logout')
    //res.setHeader('Access-Control-Allow-Origin', '*')
    login.logout(req.session, (err) => {
        if (err) {
            console.log(err)
            res.end('{"status": 5')
            return
        }
        res.end('{"status": 0}')
    })
}).post('/searchMovieByName', (req, res) => {
    console.log('Search Movie By Name')
    //res.setHeader('Access-Control-Allow-Origin', '*')
    /*if (!login.loggedin(req.session)) {
        res.end('{"status": 5}')
        return
    }*/
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
        movies.getMovieByName(infoJson['title'], infoJson['fuzzy'], (err, result) => {
            if (err) {
                res.end('{"status": 6}')
                return
            }
            let r = JSON.parse('{"status": 0}')
            r['result'] = result
            res.end(JSON.stringify(r))
        })
    })
}).post('/getUserProperty', (req, res) => {
    console.log('Get User Property')
    //res.setHeader('Access-Control-Allow-Origin', '*')
    /*if (!login.loggedin(req.session)) {
        res.end('{"status": 5}')
        return
    }*/
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
        login.userProperty(infoJson['uuid'], (err, status, result) => {
            if (err) {
                res.end('{"status": 6}')
                return
            }
            let r = JSON.parse(util.format('{"status": %d}', status))
            r['result'] = result
            res.end(JSON.stringify(r))
        })
    })
}).post('/getUserRatings', (req, res) => {
    console.log('Get User Ratings')
    //res.setHeader('Access-Control-Allow-Origin', '*')
    /*if (!login.loggedin(req.session)) {
        res.end('{"status": 5}')
        return
    }*/
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
        login.userRatings(infoJson['uuid'], (err, status, result) => {
            if (err) {
                res.end('{"status": 6}')
                return
            }
            let r = JSON.parse(util.format('{"status": %d}', status))
            r['result'] = result
            res.end(JSON.stringify(r))
        })
    })
}).post('/getMovieById', (req, res) => {
    //res.setHeader('Access-Control-Allow-Origin', '*')
    /*if (!login.loggedin(req.session)) {
        res.end('{"status": 5}')
        return
    }*/
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
        movies.getMovieById(infoJson['movieid'], (err, status, result) => {
            if (err) {
                res.end('{"status": 6}')
                return
            }
            let r = JSON.parse(util.format('{"status": %d}', status))
            r['result'] = result
            res.end(JSON.stringify(r))
        })
    })
}).post('/getRecommend', (req, res) => {
    console.log('Get Recommend')
    //res.setHeader('Access-Control-Allow-Origin', '*')
    /*if (!login.loggedin(req.session)) {
        res.end('{"status": 5}')
        return
    }*/
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
        login.getRecommend(infoJson['uuid'], (err, status, result) => {
            if (err) {
                res.end('{"status": 6}')
                return
            }
            let r = JSON.parse(util.format('{"status": %d}', status))
            r['result'] = result
            res.end(JSON.stringify(r))
        })
    })
})

app.get('/logintest', (req, res) => {
    res.setHeader('Access-Control-Allow-Origin', '*')
    if (login.loggedin(req.session)) {
        res.end("Logged in")
    }
    else {
        res.end('Not logged in')
    }
}).get("/movie/:type", function (req, res) {
    var sreq = request.get('http://api.douban.com/v2' + req.originalUrl);
    sreq.pipe(res)
    sreq.on("end", function (err, res) {
        console.log("Douban")
    })
})

app.use(express.static('./web'))

db.init(() => {
    app.listen(8086)
})

console.log('OK');




/* status返回值代表的错误
 * 0：没有错误
 * 2: 注册失败
 * 3：Json格式错误
 * 4：登录错误（程序错误或数据库错误引起，定义为网络错误）
 * 5：未登录错误
 * 6：服务器错误
 * 7：没有找到
 */