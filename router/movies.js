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
        _id: 0
    }
    db.searchMany(DB_COLLECTION_NAME, where, projection, (err, res) => {
        if (err) {
            callback(err, null)
            return
        }
        callback(null, res)
    })
}