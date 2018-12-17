var express = require("express");
var request = require("superagent");

var app = express();
var HOST = "http://api.douban.com/v2";

/**
 * CORS support.
 */

app.all("*", function(req, res, next) {
  if (!req.get("Origin")) return next();
  // use "*" here to accept any origin
  res.set("Access-Control-Allow-Origin", "*");
  res.set("Access-Control-Allow-Methods", "GET");
  res.set("Access-Control-Allow-Headers", "X-Requested-With, Content-Type");
  // res.set('Access-Control-Allow-Max-Age', 3600);
  if ("OPTIONS" === req.method) return res.send(200);
  next();
});

app.get("/movie/:type", function(req, res) {
  var sreq = request.get(HOST + req.originalUrl);
  sreq.pipe(res);
  sreq.on("end", function(error, res) {
    console.log("end");
  });
});

app.post("/signup", function(req, res) {
  res.send(200);
});

app.post("/signin", function(req, res) {
  res.send({
    status: 0,
    uuid: 123,
  });
});

app.get("/getUserProperty", function(req, res) {
  console.log(req.query)
  res.send({
    status: req.query.status
  });
});

app.get("/getRecommendList", function(req, res) {
  var data = [];
  for (var i = 0; i < 20; ++i) {
    data.push({
      "movieid": 1,
      "title": "Toy Story (1995)",
      "genres": [
        "Adventure",
        "Animation",
        "Children",
        "Comedy",
        "Fantasy"
      ],
      "imurl": "http://www.imdb.com/title/tt0114709",
      "tmurl": "https://www.themoviedb.org/movie/862/zh",
      "imgurl": "https://image.tmdb.org/t/p/w300_and_h450_bestv2/uMZqKhT4YA6mqo2yczoznv7IDmv.jpg",
      "overview": "胡迪是小主人安弟最喜欢的传统牛仔玩偶，他和其他玩具趁主人不在时，便会＂活＂起来一起玩闹。可是好景不常，最新奇的热门玩具巴斯光年来了，他让胡迪备受冷落。失宠的胡迪为了巩固自己的地位，只好处心积虑地想要赶走巴斯。在一次意外中，胡迪和巴斯不幸陷入一个玩具虐待狂的邻居家中而命在旦夕。两个冤家路窄互不相容的对手，是否能够化敌为友、发挥机智，顺利地通过这场冒险之旅，回到小主的身边呢？"
    });
  }

  res.send({
    "status": 0,
    "result": data,
  });
});

// app.get("/movie/subject/:id", function(req, res) {
//   var sreq = request.get(HOST + req.originalUrl);
//   sreq.pipe(res);
//   sreq.on("end", function(error, res) {
//     console.log("end");
//   });
// });

// app.get("/movie/search", function(req, res) {
//   var sreq = request.get(HOST + req.originalUrl);
//   sreq.pipe(res);
//   sreq.on("end", function(error, res) {
//     console.log("end");
//   });
// });

app.listen(4000, function() {
  console.log("HTTP Server is running in http://127.0.0.1:4000");
});
