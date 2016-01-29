var session = require('koa-session');
var serve = require('koa-static');
var routes = require('./routes');
var csrf = require('koa-csrf');
var koa = require('koa');
var app = koa();

app.keys = ['secret1', 'secret2', 'secret3']
app.use(session(app));

csrf(app);

app.use(serve('public'));

routes(app);

app.listen(process.env.PORT||8080);
