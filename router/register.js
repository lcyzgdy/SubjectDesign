var crypto = require('crypto')
var db = require('../db')

const DB_COLLECTION_NAME = 'users'
/**
 * 
 * @param {string} _username 
 * @param {string} _password 
 * @param {(err : Error, status: number, userUuid: string) => void} callback 
 */
exports.register = (_username, _password, callback) => {
    // var token = md5sum(_username + _password)
    // db.users.insert token
    var doc = {
        username: _username,
        password: _password,
        logined: true,
        latestLogin: Date.now()
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
            console.log(result.result)
            callback(null, 0, result.insertedId)
        })
    })
}

function md5sum(str) {
    return crypto.createHash('md5').update(str).digest('hex')
}


/**
 * 错误类型：
 * 0：成功
 * 1：该用户已存在
 * 2：用户名非法
 * 3：其它错误
 */