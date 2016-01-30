var parse = require('co-body');
var views = require('co-views');

var render = views('views', {default: 'jade'});

module.exports = {
  get: function *() {
    this.body = yield render('login', {csrf: this.csrf});
  },

  login: function *() {
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
  },

  logout: function *() {
    this.session.authenticated = null;
    this.status = 303;
    this.redirect('/');
  }
}
