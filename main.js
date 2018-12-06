var express = require('express')

var app = express()
app.get('/', (res, req) => {
    req.end('test')
}).listen(8086)
console.log('OK');

