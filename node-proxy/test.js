var request = require("superagent");
var sreq = request.get("172.24.12.188:444/");
sreq.on("end", function(error, res) {
console.log("end");
});