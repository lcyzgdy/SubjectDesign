let crypto = require('crypto')

/**
 * 
 * @param {string} username 
 * @param {string} password 
 * @param {(err : Error, userUuid: string) => void} callback 
 */
exports.register = (username, password, callback) => {
    var token = md5sum(username + password)
    // db.users.insert token
    var id = '000'
    callback(null, id, null)
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