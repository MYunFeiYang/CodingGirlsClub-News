'use strict';
let express = require('express');
let orm = require('orm');
let app = express();
let bodyParser = require('body-parser');
let path = require('path');
let jsonParser = bodyParser.json;
let urlencodedParser = bodyParser.urlencoded({extended: true});
let appRoot = path.join(__dirname, '/');
//cookie的设置
let session = require("express-session");
let cookie = require("cookie-parser");
app.configure(function() {
    app.use(cookie());
    app.use(session({
        name: "final",
        secret: "1234567",
        cookie: {maxAge: 10000},   //过期时间 毫秒为单位
        resave: true,        //每次触发后保存时间
        rolling: true       // 最后一次触发后计时
    }));
});
app.all('*', function (req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "X-Requested-With");
    res.header("Access-Control-Allow-Methods", "PUT,POST,GET,DELETE,OPTIONS");
    res.header("Content-Type", "application/json;charset=utf-8");
    next();
});
app.use(orm.express(`sqlite:///home/zl/sqlites/manage`, {
    define: function (db, models, next) {
        models.Manage = db.define("manage", {
            id:Number,
            mangeName:String,
            password : String,
            email:String
        });
        models.News=db.define("news",{
            title:String,
            content:String,
            date:String
        });
        models.Blogs=db.define("blogs",{
            title:String,
            content:String,
            date:String
        });
        next();
    }
}));
app.get('/',urlencodedParser,function (req,res){

});
app.post('/manage',urlencodedParser,function (req,res) {
    let login = require('./login');
    login.findLogin(req,res);
});
app.get('/manage/news',urlencodedParser,function (req,res) {
    let news = require('./getAllNews');
    news.getAllNews(req,res);
});
app.get('/manage/blogs',urlencodedParser,function (req,res) {
    let blogs = require('./getAllBlogs');
    blogs.getAllBlogs(req,res);
});
app.post('/imageUplode', function (req, res) {

});
app.post('article', jsonParser, function (req, res) {
    
    if (req.query.type === 'new') {
        req.models.News.create({ title : req.body.title, content : req.body.content, date : })
    }
    if (req.query.type === 'blog') {

    }
})
var server = app.listen(8081, function () {
    var host = server.address().address;
    var port = server.address().port;
    console.log('Example app listening at http://%s:%s', host, port);
});