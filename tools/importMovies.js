var fs = require('fs')
var readline = require('readline')

var csv = require('csv')

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

const DB_COLLECTION_NAME = 'movies'

var ins = fs.createReadStream('C:/Users/PC/Documents/Code/ml-latest/movies.csv')

function instertMovieId() {
    readline.createInterface(ins).on('line', (str) => {
        if (!str || str.length == 0) return
        let i0 = str.indexOf(',')
        let i1 = str.lastIndexOf(',')
        let movieid = str.substring(0, i0)
        let title = str.substring(i0 + 1, i1)
        let genres = str.substr(i1 + 1)
        try {
            if (title[0] == '"') {
                title = title.substr(1)
                if (title[title.length - 1] == '"') {
                    title = title.substr(0, title.length - 1)
                }
            }
            let info;
            if (genres.includes('(no genres listed)')) {
                info = {
                    movieid: movieid >> 0,
                    title: title
                }
            }
            else {
                info = {
                    movieid: movieid >> 0,
                    title: title,
                    genres: genres.split('|')
                }
            }
            db.collection(DB_COLLECTION_NAME).insertOne(info, (err, res) => {
                if (err) {
                    console.log(err.message)
                }
            })
        }
        catch (err) {
            console.log(err);
        }
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
    instertMovieId()
})


//db.release()