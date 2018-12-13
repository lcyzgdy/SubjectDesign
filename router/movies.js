var db = require('../db')

const DB_COLLECTION_NAME = 'movies'
/**
 * @param {String} name
 */
exports.getMovieByName = (name, callback) => {
    let where = {
        title: { $regex: name }
    }
    db.searchMany(DB_COLLECTION_NAME, where, (err, res) => {
        if (err) {
            callback(err, null)
            return
        }
        callback(null, res)
    })
}