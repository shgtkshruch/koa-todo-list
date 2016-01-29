var account = require('./controller/account');
var todo = require('./controller/todo');
var route = require('koa-route');

module.exports = function (app) {
  app.use(route.get('/', todo.home));
  app.use(route.post('/todo', todo.add));
  app.use(route.del('/todo', todo.del));
  app.use(route.put('/todo', todo.update));

  app.use(route.get('/login', account.get));
  app.use(route.post('/login', account.login));
  app.use(route.get('/logout', account.logout));
}
