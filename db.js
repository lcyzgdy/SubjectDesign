let mongo = require('mongodb')
let dbClient = mongo.MongoClient

const DB_URI = 'mongodb://127.0.0.1:27017/'

dbClient.connect(DB_URI, (err, result) => {
    if (err) {
        console.log(err.message)
        return
    }
    var db = result.db('subject')
    var collect = db.collection('')
})

exports.insert = () => {

}