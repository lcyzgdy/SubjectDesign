var crypto = require('crypto')

exports.md5sum = function (str) {
    return crypto.createHash('md5').update(str).digest('hex')
}
