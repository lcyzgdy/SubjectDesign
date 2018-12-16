var db = require('../db')

const DB_COLLECTION_NAME = 'movies'

/**
 * @param {String} name
 * @param {boolean} fuzzy
 * @param {(err: Error, result: any) => void} callback
 */
exports.getMovieByName = (name, fuzzy, callback) => {
    let where;
    if (fuzzy) {
        where = {
            title: { $regex: name }
        }
    } else {
        where = {
            title: name
        }
    }
    let projection = {
        _id: 0,
        movieid: 0
    }
    db.searchMany(DB_COLLECTION_NAME, where, projection, (err, res) => {
        if (err) {
            callback(err, null)
            return
        }
        callback(null, res)
    })
}

/**
 * @param {String} movieId
 * @param {(err: Error, status: number, result: any) => void} callback
 */
exports.getMovieById = (movieId, callback) => {
    let where = {
        movieid: movieId
    }
    let projection = {
        _id: 0,
        movieid: 0
    }
    db.searchOne(DB_COLLECTION_NAME, where, projection, (err, res) => {
        if (err) {
            callback(err)
            return
        }
        let status = 7
        if (res) status = 0
        callback(null, status, res)
    })
}