var route = require('koa-route');
var views = require('co-views');
var koa = require('koa');
var app = koa();

var render = views(__dirname + '/views', {default: 'jade'});

app.use(route.get('/', function *() {
  this.response.body = yield render('index');
}));

app.listen(process.env.PORT||8080);
