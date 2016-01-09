var session = require('koa-session');
var serve = require('koa-static');
var route = require('koa-route');
var views = require('co-views');
var parse = require('co-body');
var csrf = require('koa-csrf');
var model = require('./model/todo');
var koa = require('koa');
var app = koa();

app.keys = ['secret1', 'secret2', 'secret3']
app.use(session(app));

csrf(app);

var render = views(__dirname + '/views', {default: 'jade'});

app.use(serve('public'));

app.use(route.get('/', function *() {
  this.body = yield render('index', {
    authenticated: this.session.authenticated,
    todos: yield model.find()
  });
}));

app.use(route.get('/login', function *() {
  this.body = yield render('login', {csrf: this.csrf});
}));

app.use(route.post('/login', function *() {
  var body = yield parse.form(this);
  try {
    this.assertCSRF(body);
  } catch (err) {
    this.throw(403, 'This CSRF token is invalid.');
  }
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

app.use(route.post('/todo', function *() {
  var body = yield parse.form(this);
  yield model.save(body.title);
  this.status = 303;
  this.redirect('/');
}));

app.use(route.del('/todo', function *() {
  if (this.session.authenticated) {
    var body = yield parse(this);
    yield model.remove(body.id);
    this.status = 200;
  } else {
    this.throw(400);
  }
}));

app.use(route.put('/todo', function *() {
  if (this.session.authenticated) {
    var body = yield parse(this);
    yield model.update(body)
    this.status = 200
  } else {
    this.throw(400);
  }
}));

app.listen(process.env.PORT||8080);
