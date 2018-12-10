var session = require('express-session')
var MongoStore = require('connect-mongo')(session)

var storeage = new MongoStore({
    url: 'mongodb://127.0.0.1:27017/subject',  //数据库的地址  shop是数据库名        
    touchAfter: 1 * 3600   // 设置touchAfter:24 * 3600，在24小时内只更新一次会话，不管有多少请求(除了在会话数据上更改某些内容的除外)
})

var config = {
    secret: 'session',                  // String 类型的字符串，作为服务器端生成 session 的签名    
    resave: false,                      // 强制保存 session 即使它并没有变化。
    saveUninitialized: false,           // 强制将未初始化的 session 存储。
    cookie: { maxAge: 1000 * 30 * 60 }, // secure:true  https这样的情况才可以访问cookie
    rolling: true,                      // 在每次请求时强行设置 cookie，这将重置 cookie 过期时间（默认：false）    
    store: storeage
}

/**
 * @param {(express.RequestHandler) => void} callback
 */
exports.init = (callback) => {
    callback(session(config))
}

/**
 * @param {String} sid
 */
exports.destory = (sid) => {
    storeage.destroy(sid, (err) => {
        if (err) {
            console.log(err)
        }
    })
}

/**
 * @param {String} sid
 */
exports.get = (sid) => {
    storeage.get(sid, (err, sess) => {
        if (err) {
            console.log(false)
            return false
        }
        if (sess) {
            return true
        }
        return false
    })
}