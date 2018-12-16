var fs = require('fs')
var readline = require('readline')
var util = require('util')
var mongo = require('mongodb')

const DB_URI = 'mongodb://127.0.0.1:27017/'
const DB_NAME = 'subject'
/**
 * @type {mongo.MongoClient} 
 */
let dbClient;
/**
 * @type {mongo.Db}
 */
let db;
var options = {
    useNewUrlParser: true
}

const DB_COLLECTION_NAME = 'users'
var ins = fs.createReadStream('C:/Users/PC/Documents/Code/ml-latest/ratings.csv')
let i = 0
function insertRel() {
    readline.createInterface(ins).on('line', (str) => {
        if (!str || str.length == 0) return
        //if (i > 5) return
        //i++
        let temp = str.split(',')
        let userId = temp[0] >> 0
        //if (userId == last) return
        //last = userId
        let movieId = temp[1] >> 0
        let rating = parseFloat(temp[2])

        let where = {
            userid: userId,
        }
        let j = {}
        j[movieId] = rating
        let update = {
            $push: {
                ratings: j
            }
        }
        db.collection(DB_COLLECTION_NAME).updateOne(where, update, (err, res) => {
            if (err) {
                console.log(err.message)
            }
        })
    }).on('close', () => {
        dbClient.close()
    })
}

function aveRating() {
    for (let i = 0; i < 193886; i++) {
        let rat = util.format('rating.%d', i)
        let where = {}
        where[rat] = { $exists: true }
        let options = {
            projection: rat
        }
        let num = 0
        let sum = 0.0
        db.collection('users').find(where, options)
    }
}

mongo.MongoClient.connect(DB_URI, options, (err, client) => {
    if (err) {
        throw err
    }
    dbClient = client
    db = dbClient.db(DB_NAME)
    insertRel()
})


//db.release()