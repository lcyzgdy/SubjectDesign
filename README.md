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
  "result": {
    "ratings": [
      {
        "307": 3.5
      },
      {
        "481": 3.5
      }
    ]
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
* result：查询结果，所有的打分记录。其中 ratings 是一个数组，包含所有对 key 电影的 value 评分，key 为 movieid。



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
|genres|类型|Array of string|
|imurl|URL|String|
|tmurl|URL|String|
|imgurl|主视觉图的 URL|String|
|overview|简介|String|
