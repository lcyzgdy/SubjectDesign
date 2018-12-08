let crypto = require('crypto')

/**
 * @param {String} token
 * @param {(err: Error, status: int, uuid: String, userInfo: any) => void} callback
 */
exports.login = (token, callback) => {
    //db.find(token)
    
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