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
 * @param {any} projection
 * @param {(err: Error, result: mongo.Course<any>) => void} callback
 */
exports.searchMany = (collectionName, where, projection, callback) => {
    let options = {}
    if (projection) {
        options['projection'] = projection
    }
    db.collection(collectionName).find(where, options).limit(20).toArray((err, res) => {
        callback(null, res)
    })
}

/**
 * @param {String} collectionName
 * @param {any} where
 * @param {any} projection
 * @param {(err: Error, result: any) => void} callback
 */
exports.searchOne = (collectionName, where, projection, callback) => {
    let options = {}
    if (projection) {
        options['projection'] = projection
    }
    db.collection(collectionName).findOne(where, options, (err, result) => {
        callback(err, result)
    })
}

/**
 * @param {String} collectionName
 * @param {any} where
 * @param {any} projection
 */
exports.searchOneAwait = (collectionName, where, projection) => {
    let options = {}
    if (projection) {
        options['projection'] = projection
    }
    return db.collection(collectionName).findOne(where, options)
}