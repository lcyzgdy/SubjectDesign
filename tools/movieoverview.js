//var request = require('request')
//var cheerio = require('cheerio')
var util = require('util')
var funcs = require('../funcs')
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

mongo.MongoClient.connect(DB_URI, options, (err, client) => {
    if (err) {
        console.log(err.message)
    }
    dbClient = client
    db = dbClient.db(DB_NAME)
})