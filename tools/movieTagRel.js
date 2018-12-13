var fs = require('fs')
var readline = require('readline')

var mongo = require('mongodb')

const DB_URI = 'mongodb://172.24.12.188:8092'//127.0.0.1:27017/'
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

const DB_COLLECTION_NAME = 'moviestags'
var ins = fs.createReadStream('C:/Users/PC/Documents/Code/ml-latest/genome-scores.csv')

function insertRel() {
    readline.createInterface(ins).on('line', (str) => {
        if (!str || str.length == 0) return
        let temp = str.split(',')
        let movieId = temp[0] >> 0
        let tagId = temp[1] >> 0
        let relevance = parseFloat(temp[2])

        let update = {
            movieid: movieId,
            tagid: tagId,
            relevance: relevance
        }
        db.collection(DB_COLLECTION_NAME).insertOne(update, (err, res) => {
            if (err) {
                console.log(err.message)
            }
        })
    }).on('close', () => {
        dbClient.close()
    })
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