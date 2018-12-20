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
            let uuid = String(result.value['userid'])
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
 * @param {String} uuid
 * @param {(err: Error, status: number, result: any) => void} callback
 */
exports.userProperty = (uuid, callback) => {
    let where = {
        userid: parseInt(uuid)
    }
    let projection = {
        _id: 0,
        userid: 0,
        password: 0,
        ratings: 0,
        sid: 0,
        recommend: 0
    }
    db.searchOne(DB_COLLECTION_NAME, where, projection, (err, res) => {
        if (err) {
            callback(err)
            return
        }
        let status = 0
        if (!res) status = 2
        callback(null, status, res)
    })
}

/**
 * @param {String} uuid
 * @param {(err: Error, status: number, result: any) => void} callback
 */
exports.userRatings = (uuid, callback) => {
    let where = {
        userid: parseInt(uuid) //uuid >> 0
    }
    let projection = {
        _id: 0,
        userid: 0,
        username: 0,
        password: 0,
        latestLogin: 0,
        registerDate: 0,
        sid: 0,
        recommend: 0
    }
    db.searchOne(DB_COLLECTION_NAME, where, projection, async (err, res) => {
        if (err) {
            callback(err)
            return
        }
        let status = 0
        let resf = []
        if (!res || !res['ratings']) {
            resf.push({
                title: '您还没为任一电影打分',
                overview: '请查看热映电影',
                imgurl: 'http://172.24.12.188:444/1.png',
                rating: 0.0
            })
            callback(null, status, resf)
            return
        }
        for (let i = 0; i < res['ratings'].length; i++) {
            let where = {
                movieid: res['ratings'][i]['movieid']
            }
            let r = await db.searchOneAwait('movies', where)
            let one = {
                movieid: where.movieid,
                title: r['title'],
                overview: r['overview'],
                genres: r['genres'],
                imgurl: r['imgurl'],
                rating: res['ratings'][i]['rating']
            }
            resf.push(one)
        }
        if (resf.length == 0) status = 2
        callback(null, status, resf)
    })
}

/**
 * @param {String} uuid
 * @param {(err: Error, status: number, result: any) => void} callback
 */
exports.getRecommend = async (uuid, callback) => {
    let where = {
        userid: uuid >> 0
    }
    let projection = {
        _id: 0,
        userid: 0,
        username: 0,
        password: 0,
        latestLogin: 0,
        registerDate: 0,
        sid: 0,
        ratings: 0
    }
    db.searchOne(DB_COLLECTION_NAME, where, projection, async (err, res) => {
        if (err) {
            callback(err)
            return
        }
        let status = 0
        let resf = []
        if (!res || !res['recommend']) {
            resf.push({
                title: '无推荐，请查看热映电影',
                overview: '您还没给任一电影打分，请查看热映电影',
                imgurl: 'http://172.24.12.188:444/2.png',
                rating: 0.0
            })
            callback(null, 0, resf)
            return
        }

        for (let i = 0; i < res['recommend'].length; i++) {
            let where = {
                movieid: res['recommend'][i]['movieid']
            }
            let r = await db.searchOneAwait('movies', where)
            let one = {
                movieid: where.movieid,
                title: r['title'],
                overview: r['overview'],
                genres: r['genres'],
                imgurl: r['imgurl'],
                rating: res['recommend'][i]['rating']
            }
            resf.push(one)
        }
        if (resf.length == 0) status = 2
        callback(null, status, resf)
    })
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