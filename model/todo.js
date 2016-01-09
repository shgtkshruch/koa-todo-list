'use strict';

var Mongorito = require('mongorito');
var Model = Mongorito.Model;

Mongorito.connect('localhost/todo');

class Todo extends Model {}

module.exports = {
  find: function *() {
    return yield Todo.all();
  },

  save: function *(title) {
    var todo = new Todo({
      title: title
    });

    yield todo.save();
  },

  remove: function *(id) {
    return yield Todo.remove({_id: new Mongorito.ObjectID(id)});
  }
}
