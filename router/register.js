var db = require('../db')
var funcs = require('../funcs')
var session = require('../session')

const DB_COLLECTION_NAME = 'users'
/**
 * @param {Express.Request} request
 * @param {String} _username 
 * @param {String} _password 
 * @param {String} remoteIp
 * @param {(err : Error, status: number, session: String) => void} callback 
 */
exports.register = (request, _username, _password, remoteIp, callback) => {
    // var token = md5sum(_username + _password)
    // db.users.insert token
    let registerDate = Date.now()
    let doc = {
        username: _username,
        password: _password,
        latestLogin: registerDate,
        registerDate: registerDate,
        userid: registerDate
    }
    db.findAny(DB_COLLECTION_NAME, { username: _username }, (err, result) => {
        if (err) {
            console.log(err.message)
            callback(err)
            return
        }
        if (result) {
            callback(null, 1, null)
            return
        }
        db.insertOne(DB_COLLECTION_NAME, doc, (err, result) => {
            if (err) {
                // console.log(err.message)
                callback(err, 2, null)
                return
            }
            //console.log(result.result)
            request.session.user = result.insertedId
            let sessDoc = {
                username: _username,
                password: _password,
                movieid: result.insertedId
            }
            db.updateOne(DB_COLLECTION_NAME, sessDoc, {
                $set: {
                    latestLogin: Date.now(),
                    sid: request.sessionID
                }
            })
            callback(null, 0, result.insertedId)
        })
    })
}

/**
 * 错误类型：
 * 0：成功
 * 1：该用户已存在
 * 2：用户名非法
 * 3：其它错误
 */