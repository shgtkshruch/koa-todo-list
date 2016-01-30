var parse = require('co-body');
var views = require('co-views');
var model = require('../model/todo');

var render = views('views', {default: 'jade'});

module.exports = {
  home: function *() {
    this.body = yield render('index', {
      authenticated: this.session.authenticated,
      todos: yield model.find()
    });
  },

  add: function *() {
    var body = yield parse.form(this);
    yield model.save(body.title);
    this.status = 303;
    this.redirect('/');
  },

  del: function *() {
    if (this.session.authenticated) {
      var body = yield parse(this);
      yield model.remove(body.id);
      this.status = 200;
    } else {
      this.throw(400);
    }
  },

  update: function *() {
    if (this.session.authenticated) {
      var todo = yield parse(this);

      if (todo.title) {
        yield model.update(todo);
        this.status = 200;
      } else if (todo.completion) {
        yield model.changeCompletion(todo);
        this.status = 200;
      }

    } else {
      this.throw(400);
    }
  }
}
