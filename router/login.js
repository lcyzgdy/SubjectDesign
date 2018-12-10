var db = require('../db')
var session = require('../session')

const DB_COLLECTION_NAME = 'users'
/**
 * @param {Express.Session} reqSess
 * @param {String} _username
 * @param {String} _password
 * @param {(err: Error, status: number, uuid: String) => void} callback
 */
exports.login = (reqSess, _username, _password, callback) => {
    let where = {
        username: _username,
        password: _password
    }

    let update = {
        $set: {
            latestLogin: Date.now()
        }
    }
    db.findOneAndUpdate(DB_COLLECTION_NAME, where, update, (err, result) => {
        if (err) {
            callback(err, 2, null)
            return
        }
        //console.log(result.value)
        if (result.ok === 1 && result.value) {
            let uuid = String(result.value['_id'])
            let sid = String(result.value['sid'])
            session.destory(sid)
            reqSess.user = uuid
            let saveSid = {
                $set: {
                    sid: reqSess.id
                }
            }
            db.updateOne(DB_COLLECTION_NAME, where, saveSid, () => {
                callback(null, 0, uuid)
            })
        }
        else {
            callback(null, 1, null)
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

/**
 * @param {Express.Session} reqSess
 * @param {(err: Error) => void} callback
 */
exports.logout = (reqSess, callback) => {
    reqSess.destroy((err) => {
        callback(err)
    })
}

/**
 * @param {Express.Session} reqSess
 */
exports.loggedin = (reqSess) => {
    if (reqSess.user) {
        return true
    }
    return false
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