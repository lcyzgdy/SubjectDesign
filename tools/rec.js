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
//var ins = fs.createReadStream('C:/Users/PC/Documents/Code/ml-latest/result/part-00000-edbca6a8-0aea-4d8f-98d5-8a0e68380e76-c000.txt')
var i = 1
var j = 0
//var iii = 0
async function insertRel() {
    let buffer = fs.readFileSync('C:/Users/PC/Documents/Code/ml-latest/recommend_new.txt')
    let all = buffer.toString()
    let allSplit = all.split('\n')
    console.log('Begin')
    for (let kk = 0; kk < allSplit.length; kk++) {
        let str = allSplit[kk]
        let userId = str.substr(0, str.indexOf(',')) >> 0
        //if (userId <= 270000) continue
        let recArr = []
        let recs = str.substr(str.indexOf(','))
        recs = recs.substr(recs.indexOf('[') + 1)
        recs = recs.substr(0, recs.lastIndexOf(']'))
        let recss = recs.split('), ')
        for (let c = 0; c < recss.length; c++) {
            let one = recss[c]
            let rating = parseFloat(one.substr(one.lastIndexOf(',') + 1))
            let movieName = one.substring(3, one.length - 1)
            movieName = movieName.substring(0, movieName.lastIndexOf(', ') - 1)

            let ids = await db.collection('movies').findOne({ title: movieName })
            if (ids == null) {
                console.log('err')
                continue
            }
            let ppp = {
                movieid: ids['movieid'],
                rating: rating
            }
            recArr.push(ppp)
        }
        let where = {
            userid: userId
        }
        let update = {
            $set: { recommend: recArr }
        }
        await db.collection('users').updateOne(where, update)
    }
    console.log('End')
    await dbClient.close()
    //})
    /*readline.createInterface(ins).on('line', (str) => {
        if (!str || str.length == 0) return
        //if (iii > 10) return
        //iii++
        j++
        if (j > 10) {
            j = 0
            i++
        }
 
        let userId = i
 
        let sp = str.lastIndexOf(',')
        let movieName = str.substring(0, sp)
        //let temp111 = str.substr(sp + 1)
        let rating = parseFloat(str.substr(sp + 1))
 
        if (movieName[0] == '"') {
            movieName = movieName.substr(1)
            if (movieName[movieName.length - 1] == '"') {
                movieName = movieName.substr(0, movieName.length - 1)
            }
        }
 
        let where = {
            title: movieName
        }
        db.collection('movies').findOne(where, (err, res) => {
            if (err) {
                console.log(err)
                return
            }
 
            let where2 = {
                userid: userId
            }
            let k = {
                movieid: res['movieid'],
                rating: rating
            }
            let update = {
                $push: {
                    recommend: k
                }
            }
 
            db.collection(DB_COLLECTION_NAME).updateOne(where2, update, (err, res) => {
                if (err) {
                    console.log(err.message)
                }
            })
        })
    }).on('close', () => {
        //dbClient.close()
        console.log('Stop...')
    })*/
}

async function deleteAll() {
    let where = {
        recommend: {
            $exists: true
        }
    }
    let update = {
        $unset: {
            recommend: ''
        }
    }
    await db.collection('users').updateMany(where, update)
    await dbClient.close()
}

mongo.MongoClient.connect(DB_URI, options, (err, client) => {
    if (err) {
        throw err
    }
    dbClient = client
    db = dbClient.db(DB_NAME)
    //deleteAll()
    insertRel()
})


//db.release()