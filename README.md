## 这是 NodeJS 写的后端的分支

# API Reference

## 注册
* 类型：POST
### 格式
URI
```
http://hostname:port/register
```
Header
```
无
```
Content
``` JSON
{
    "username": "test1",
    "password": "123456"
}
```
### 返回值
#### Header

返回值包含 set-cookie 字段，既 sessionId，表示注册完成自动登录成功，之后的 Header 需包含 cookie 字段，格式参考下面。
```
set-cookie -> connect.sid=s%3AUk-30sTqFvl4lLp2DvqFhRFDtv6rKzJV.4LV2XhCom2v%2Fza6Hz7H5Xb0eQNKFQrYBXlJFl2s2Oj4; Path=/; Expires=Mon, 10 Dec 2018 15:21:54 GMT; HttpOnly
```
#### Content
``` JSON
{
    "status": 0,
    "uuid": "5c0e7a64b075b842f4f5a9c4"
}
```
##### 含义
* status：操作状态。

|status||
|------|------
|0|成功|
|1|用户名已存在|
|2|用户名非法|
|3|其它错误（一般为服务器错误）|

* uuid：表示当前用户的uuid，在其它操作中做参数

注：使用 Session 足以标记用户，这里是多此一举，但会省很多事情







## 登录
* 类型：POST
### 格式
URI
``` 
http://hostname:port/login
```
Header
```
无
```
Content
``` JSON
{
    "username": "test1",
    "password": "123456"
}
```
### 返回值
#### Header
返回值包含 set-cookie 字段，既 sessionId，表示注册完成自动登录成功，之后的 Header 需包含 cookie 字段，格式参考下面。
```
set-cookie -> connect.sid=s%3AUk-30sTqFvl4lLp2DvqFhRFDtv6rKzJV.4LV2XhCom2v%2Fza6Hz7H5Xb0eQNKFQrYBXlJFl2s2Oj4; Path=/; Expires=Mon, 10 Dec 2018 15:21:54 GMT; HttpOnly
```
#### Content
``` JSON
{
    "status": 0,
    "uuid": "5c0e7a64b075b842f4f5a9c4"
}
```
##### 含义
* status：操作状态。

|status||
|------|------
|0|成功|
|1|用户名或密码错误|
|2|其它错误（一般为服务器错误）|

* uuid：表示当前用户的uuid，在其它操作中做参数








## 登录测试
* 类型：GET
### 格式
URI
``` 
http://hostname:port/logintest
```
Header
``` JSON
{
    "cookie": "connect.sid=s%3AUk-30sTqFvl4lLp2DvqFhRFDtv6rKzJV.4LV2XhCom2v%2Fza6Hz7H5Xb0eQNKFQrYBXlJFl2s2Oj4"
}
```
Content
``` JSON
无
```
### 返回值
#### Header
``` JSON
无
```
#### Content
``` Text
Logged in
```
##### 含义
返回值仅一串文本，用以验证是否登录成功。








## 注销登录
* 类型：POST
### 格式
URI
``` 
http://hostname:port/logout
```
Header
``` JSON
{
    "cookie": "connect.sid=s%3AUk-30sTqFvl4lLp2DvqFhRFDtv6rKzJV.4LV2XhCom2v%2Fza6Hz7H5Xb0eQNKFQrYBXlJFl2s2Oj4"
}
```
Content
``` JSON
无
```
### 返回值
#### Header
```
无
```
#### Content
``` JSON
{
    "status": 0
}
```
##### 含义
* status：操作状态。

|status||
|------|------
|0|成功|
|5|该用户未登录|
|2|其它错误（一般为服务器错误）|








## 查询电影（通过名称）
* 类型：POST
### 格式
URI
``` 
http://hostname:port/searchMovieByName
```
Header
``` JSON
{
    "cookie": "connect.sid=s%3AUk-30sTqFvl4lLp2DvqFhRFDtv6rKzJV.4LV2XhCom2v%2Fza6Hz7H5Xb0eQNKFQrYBXlJFl2s2Oj4"
}
```
Content
``` JSON
{
    "title": "Toy",
    "fuzzy": true
}
```
##### 含义
* title：名称
* fuzzy：是否开启模糊查询，默认精准匹配
### 返回值
#### Header
```
set-cookie -> connect.sid=s%3AUk-30sTqFvl4lLp2DvqFhRFDtv6rKzJV.4LV2XhCom2v%2Fza6Hz7H5Xb0eQNKFQrYBXlJFl2s2Oj4; Path=/; Expires=Mon, 10 Dec 2018 15:21:54 GMT; HttpOnly
```
#### Content
``` JSON
{
  "status": 0,
  "result": [
    {
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
      "tmurl": "https://www.themoviedb.org/movie/862/zh"
    }
  ]
}
```
##### 含义
* status：操作状态。

|status||
|------|------|
|0|成功|
|5|该用户未登录|
|6|服务器错误|
* result：查询结果，默认最多20条








## 获取用户打分记录
* 类型：POST
### 格式
URI
``` 
http://hostname:port/getUserRatings
```
Header
``` JSON
{
    "cookie": "connect.sid=s%3AUk-30sTqFvl4lLp2DvqFhRFDtv6rKzJV.4LV2XhCom2v%2Fza6Hz7H5Xb0eQNKFQrYBXlJFl2s2Oj4"
}
```
Content
``` JSON
{
    "uuid": 1
}
```
##### 含义
* uuid：用户的 ID，登录后可获得
### 返回值
#### Header
```
set-cookie -> connect.sid=s%3AUk-30sTqFvl4lLp2DvqFhRFDtv6rKzJV.4LV2XhCom2v%2Fza6Hz7H5Xb0eQNKFQrYBXlJFl2s2Oj4; Path=/; Expires=Mon, 10 Dec 2018 15:21:54 GMT; HttpOnly
```
#### Content
``` JSON
{
  "status": 0,
  "result": [
    {
      "movieid": 481,
      "title": "Kalifornia (1993)",
      "overview": "两位当红的小生布拉德．皮特与大卫．杜楚尼首度合作。在这部另类的公路电影中撞击出火花，剧情描述雅痞型作家布莱恩正在写一本关于连续杀人狂的书，他决定偕同摄影师女友卡莉开车往加州找寻灵感。他们开车沿着犯罪地点一路进行资料搜集，中途因为经费不足而搭载了一对顺路到加州去的年轻夫妻，不料对方就是个连续杀人犯。 　　导演多米尼克．塞纳以稀奇古怪的非主流手法描述两对情侣开车横越美国的奇异旅程，将这部刻画人物内在心理对峙的影片拍得气氛十足，而且深具讽刺性，布莱德彼特与茱莉叶．路易丝饰演这对变态杀手有具震撼力的演出，暴力场面也相当血腥。好些片段令人紧张得不寒而栗。",
      "genres": [
        "Drama",
        "Thriller"
      ],
      "imgurl": "https://image.tmdb.org/t/p/w300_and_h450_bestv2/5KGQYEsJvQdWZQH6o1zIyzkZZRC.jpg",
      "rating": 3.5
    },
    {
      "movieid": 307,
      "title": "Three Colors: Blue (Trois couleurs: Bleu) (1993)",
      "overview": "这么多年来，朱莉（朱丽叶·比诺什 Juliette Binoche饰）一直默默支持丈夫的创作事业，照顾5岁的孩子，平静的生活由一场车祸打破。丈夫和女儿的过世，令刚刚在病床上醒来的朱莉大为悲痛。她曾经想一死了之，出院后又生归隐之心，她把丈夫的曲谱付之一炬，以明隔离过往的决心。人间生活对于万念俱灰的朱莉来说，已经无关紧要。然而，现实却防不胜防地进入她的生活，让她开始思考自己对待生活的态度。同时，丈夫的朋友把丈夫留下的残稿发表在媒体上，声称要为这首曲续完。这件事意外地让朱莉得知，曲子原来跟一个女人有关。这个女人，肚中已怀有丈夫的骨肉。朱莉终于获得了心灵的自由，有勇气迎接新的生活和新的感情，她的人生开始转变。",
      "genres": [
        "Drama"
      ],
      "imgurl": "https://image.tmdb.org/t/p/w300_and_h450_bestv2/iGMESjnRNhi2rPREuOoqX7O1LyG.jpg",
      "rating": 3.5
    }
  ]
}
```
##### 含义
* status：操作状态。

|status||
|------|------|
|0|成功|
|5|该用户未登录|
|6|服务器错误|
* result：查询结果，所有的打分记录。其中每条包含了电影的详细信息。









## 通过ID查看电影详情
* 类型：POST
### 格式
URI
``` 
http://hostname:port/getMovieById
```
Header
``` JSON
{
    "cookie": "connect.sid=s%3AUk-30sTqFvl4lLp2DvqFhRFDtv6rKzJV.4LV2XhCom2v%2Fza6Hz7H5Xb0eQNKFQrYBXlJFl2s2Oj4"
}
```
Content
``` JSON
{
    "movieid": 1
}
```
##### 含义
* movieid：电影的 ID。
### 返回值
#### Header
```
set-cookie -> connect.sid=s%3AUk-30sTqFvl4lLp2DvqFhRFDtv6rKzJV.4LV2XhCom2v%2Fza6Hz7H5Xb0eQNKFQrYBXlJFl2s2Oj4; Path=/; Expires=Mon, 10 Dec 2018 15:21:54 GMT; HttpOnly
```
#### Content
``` JSON
{
  "status": 0,
  "result": {
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
  }
}
```
##### 含义
* status：操作状态。

|status||
|------|------|
|0|成功|
|5|该用户未登录|
|6|服务器错误|
|7|未找到|
* result：查询结果。

|key|value||
|----|----|--|
|title|电影名称|String|
|genres|类型|Array of string，可能不存在|
|imurl|URL|String|
|tmurl|URL|String|
|imgurl|主视觉图的 URL|String|
|overview|简介|String|



## 获取推荐结果
* 类型：POST
### 格式
URI
``` 
http://hostname:port/getRecommend
```
Header
``` JSON
{
    "cookie": "connect.sid=s%3AUk-30sTqFvl4lLp2DvqFhRFDtv6rKzJV.4LV2XhCom2v%2Fza6Hz7H5Xb0eQNKFQrYBXlJFl2s2Oj4"
}
```
Content
``` JSON
{
    "uuid": 1
}
```
##### 含义
* uuid：用户的id
### 返回值
#### Header
```
set-cookie -> connect.sid=s%3AUk-30sTqFvl4lLp2DvqFhRFDtv6rKzJV.4LV2XhCom2v%2Fza6Hz7H5Xb0eQNKFQrYBXlJFl2s2Oj4; Path=/; Expires=Mon, 10 Dec 2018 15:21:54 GMT; HttpOnly
```
#### Content
``` JSON
{
  "status": 0,
  "result": [
    {
      "movieid": 189325,
      "title": "The Change",
      "overview": "Travel and Mental Practices through a hated memory of someone who has lost his life by his actions.",
      "genres": [
        "Drama"
      ],
      "imgurl": "https://image.tmdb.org/t/p/w300_and_h450_bestv2/mceMTaXMJHBjjgizAfLnYgyyqnI.jpg",
      "rating": 11.711558292307188
    },
    {
      "movieid": 159125,
      "title": "Anybody's Son Will Do",
      "overview": "All soldiers belong to the same profession, no matter what country they serve, and it makes them different from everybody else. They have to be different, for their job is ultimately about killing and dying, and those things are not a natural vocation for any human being. Yet all soldiers are born civilians. The method for turning young men into soldiers-people who kill other people and expose themselves to death-is basic training.",
      "rating": 10.151547034884914
    }
  ]
}
```
##### 含义
* status：操作状态。

|status||
|------|------|
|0|成功|
|5|该用户未登录|
|6|服务器错误|
|7|未找到|
* result：查询结果，是一个数组，包含推荐的所有结果。

|key|value||
|----|----|--|
|movieid|电影id|any|
|title|电影名称|String|
|genres|类型|Array of string，可能不存在|
|imgurl|主视觉图的 URL|String|
|overview|简介|String|
|rating|推荐度|float|
