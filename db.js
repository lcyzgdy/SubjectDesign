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
 * @param {String} docs
 * @param {(err: mongo.MongoError, result: mongo.InsertOneWriteOpResult) => void} callback
 */
exports.insertOne = (collectionName, docs, callback) => {
    db.collection(collectionName).insertOne(docs, callback)
}

/**
 * @param {String} collectionName
 * @param {String} conditions
 * @param {(err: mongo.MongoError, result: any) => void} callback
 */
exports.findAny = (collectionName, conditions, callback) => {
    //dbClient.db(DB_NAME)
    db.collection(collectionName).findOne(conditions, callback)
}

/**
 * @param {String} collectionName
 * @param {String} where
 * @param {String} newValue
 * @param {} callback
 */
exports.updateOne = (collectionName, where, newValue, callback) => {
    db.collection(collectionName).updateOne(where, newValue, callback)
}

/**
 * @param {String} collectionName
 * @param {String} where
 * @param {String} newValue
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
 * @param {mongo.ObjectID} _id
 */
exports.objectId2Strig = (_id) => {
    return _id.toHexString()
}

/**
 * @param {String} _id
 */
exports.string2ObjectID = (_id) => {
    return new mongo.ObjectID(_id)
}