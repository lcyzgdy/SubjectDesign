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

//let i = 0
function updateMovies() {
    var ins = fs.createReadStream('C:/Users/PC/Documents/Code/ml-latest/contents6.csv')
    readline.createInterface(ins).on('line', (str) => {
        if (!str || str.length == 0) return
        //if (i > 0) return
        //i++
        let i0 = str.indexOf(',')
        let i1 = str.lastIndexOf(',')
        let movieId = str.substring(0, i0) >> 0
        let content = str.substring(i0 + 1, i1)
        let imgurl = str.substr(i1 + 1)
        if (content[0] === '"' && content[content.length - 1] === '"') {
            content = content.substr(1, content.length - 2)
        }

        let where = {
            movieid: movieId
        }

        let update
        if (content.length > 0 && imgurl.length > 0) {
            update = {
                $set: {
                    overview: content,
                    imgurl: imgurl
                }
            }
        }
        else if (content.length > 0) {
            update = {
                $set: {
                    overview: content
                }
            }
        }
        else if (imgurl.length > 0) {
            update = {
                $set: {
                    imgurl: imgurl
                }
            }
        }
        else return
        db.collection('movies').updateOne(where, update, (err, res) => {
            if (err) {
                console.log(err)
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