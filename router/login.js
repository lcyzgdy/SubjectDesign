var crypto = require('crypto')
var db = require('../db')

const DB_COLLECTION_NAME = 'users'
/**
 * @param {String} _username
 * @param {String} _password
 * @param {(err: Error, status: number, uuid: String) => void} callback
 */
exports.login = (_username, _password, callback) => {
    let where = {
        username: _username,
        password: _password
    }

    let update = {
        $set: {
            lastestLogin: Date.now(),
            logined: true
        }
    }
    db.findOneAndUpdate(DB_COLLECTION_NAME, where, update, (err, result) => {
        if (err) {
            callback(err, 2, null)
            return
        }
        console.log(result.value)
        if (result.ok === 1) {
            callback(null, 0)
        }
    })

    /*db.findAny(DB_COLLECTION_NAME, where, (err, result) => {
        if (err) {
            callback(err, 2, null)
            return
        }
        if (result) {
            let uuid = db.objectId2Strig(result['_id'])
            console.log(uuid)
            callback(null, 0, uuid)
        }
        else {
            callback(null, 1, null)
        }
    })*/
}

exports.logout = (_id) => {

}

function md5sum(str) {
    return crypto.createHash('md5').update(str).digest('hex')
}

/**
 * Login流程：token = md5sum(username+password)
 */

/**
 * 错误类型：
 * 0：成功
 * 1：用户名或密码错误
 * 2：其它错误
 */