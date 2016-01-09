var route = require('koa-route');
var views = require('co-views');
var parse = require('co-body');
var session = require('koa-session');
var koa = require('koa');
var app = koa();

app.keys = ['secret1', 'secret2', 'secret3']
app.use(session(app));

var render = views(__dirname + '/views', {default: 'jade'});

app.use(route.get('/', function *() {
  this.body = yield render('index', {authenticated: this.session.authenticated});
}));

app.use(route.get('/login', function *() {
  this.body = yield render('login');
}));

app.use(route.post('/login', function *() {
  var body = yield parse.form(this);
  if (body.username === process.env.USERNAME && body.password === process.env.PASSWORD) {
    this.session.authenticated = true;
    this.status = 303;
    this.redirect('/');
  } else {
    this.throw(400, 'Username and password don\'t match');
  }
}));

app.use(route.get('/logout', function *() {
  this.session.authenticated = null
  this.status = 303;
  this.redirect('/');
}));

app.listen(process.env.PORT||8080);
