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
 * @param {() => void} callback
 */
exports.init = (callback) => {
    mongo.MongoClient.connect(DB_URI, options, (err, client) => {
        if (err) {
            // console.log(err.message)
            throw err
        }
        dbClient = client
        db = dbClient.db(DB_NAME)
        callback()
    })
}

/**
 * @param {String} collectionName
 * @param {any} docs
 * @param {(err: mongo.MongoError, result: mongo.InsertOneWriteOpResult) => void} callback
 */
exports.insertOne = (collectionName, docs, callback) => {
    db.collection(collectionName).insertOne(docs, callback)
}

/**
 * @param {String} collectionName
 * @param {any} conditions
 * @param {(err: mongo.MongoError, result: any) => void} callback
 */
exports.findAny = (collectionName, conditions, callback) => {
    //dbClient.db(DB_NAME)
    db.collection(collectionName).findOne(conditions, callback)
}

/**
 * @param {String} collectionName
 * @param {any} where
 * @param {any} newValue
 * @param {} callback
 */
exports.updateOne = (collectionName, where, newValue, callback) => {
    db.collection(collectionName).updateOne(where, newValue, callback)
}

/**
 * @param {String} collectionName
 * @param {any} where
 * @param {any} newValue
 * @param {(err: Error, result: mongo.FindAndModifyWriteOpResultObject<TSchema>) => void} callback
 */
exports.findOneAndUpdate = (collectionName, where, newValue, callback) => {
    db.collection(collectionName).findOneAndUpdate(where, newValue, callback)
}


/**
 * status含义：
 * 0：成功
 */

/**
 * @param {mongo.ObjectId} _id
 */
exports.objectId2Strig = (_id) => {
    return _id.toHexString()
}

/**
 * @param {String} _id
 */
exports.string2ObjectID = (_id) => {
    return new mongo.ObjectId(_id)
}

exports.release = () => {
    dbClient.close()
}

/**
 * @param {String} collectionName
 * @param {any} where
 * @param {(err: Error, result: mongo.Course<any>) => void} callback
 */
exports.searchMany = (collectionName, where, callback) => {
    let res = db.collection(collectionName).find(where).limit(50)
    console.log(res)
    callback(null, res)
}