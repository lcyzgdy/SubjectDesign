//var request = require('request')
//var cheerio = require('cheerio')
var util = require('util')
var funcs = require('../funcs')
var mongo = require('mongodb')
var fs = require('fs')
var readline = require('readline')

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

/**
 * 
 * @param {number} movieId 
 * @param {number} imdbId 
 * @param {number} tmdbId 
 */
function getContent(movieId, imdbId, tmdbId) {
    //let url = 'https://www.themoviedb.org/movie/31357/zh'
    let tmurl = util.format('https://www.themoviedb.org/movie/%d/zh', tmdbId)
    let imurl = util.format('http://www.imdb.com/title/tt%s', funcs.fill(imdbId, 7))
    /*request.get(url, (err, res, body) => {
        if (err) {
            console.log(err)
            failedMovieId.push(movieId)
            failedTmdbId.push(tmdbId)
            return
        }
        if (res.statusCode != 200) {
            failedMovieId.push(movieId)
            failedTmdbId.push(tmdbId)
            return
        }
        let dom
        let chl
        let jpg
        try {
            dom = cheerio.load(body)
            chl = dom('.overview').children()[0].firstChild.data
            jpg = dom('.poster')[2].attribs['src']
        }
        catch (err) {
            console.log(err)
            return
        }
    })*/
}
function updateMovies() {
    var ins = fs.createReadStream('C:/Users/PC/Documents/Code/ml-latest/links.csv')
    readline.createInterface(ins).on('line', (str) => {
        let temp = str.split(',')
        let movieId = temp[0] >> 0
        let imdbId = temp[1] >> 0
        let tmdbId = temp[2] >> 0

        let tmUrl = util.format('https://www.themoviedb.org/movie/%d/zh', tmdbId)
        let imUrl = util.format('http://www.imdb.com/title/tt%s', funcs.fill(imdbId, 7))

        let where = {
            movieid: movieId
        }

        let value;
        if (imdbId !== 0 && tmdbId !== 0) {
            value = {
                $set: {
                    tmurl: tmUrl,
                    imurl: imUrl
                }
            }
        }
        else if (imdbId === 0) {
            if (tmdbId !== 0) {
                value = {
                    $set: {
                        tmurl: tmUrl
                    }
                }
            }
            else return
        }
        else {
            value = {
                $set: {
                    imurl: imUrl
                }
            }
        }

        db.collection('movies').updateOne(where, value, (err, res) => {
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
        console.log(err.message)
    }
    dbClient = client
    db = dbClient.db(DB_NAME)
    updateMovies()
})