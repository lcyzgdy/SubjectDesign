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

