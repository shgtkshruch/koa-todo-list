var route = require('koa-route');
var views = require('co-views');
var parse = require('co-body');
var model = require('./model/todo');

var render = views(__dirname + '/views', {default: 'jade'});

module.exports = function (app) {
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
      var todo = yield parse(this);

      if (todo.title) {
        yield model.update(todo)
        this.status = 200
      } else if (todo.completion) {
        yield model.changeCompletion(todo)
        this.status = 200
      }

    } else {
      this.throw(400);
    }
  }));
}
