'use strict';

var Mongorito = require('mongorito');
var Model = Mongorito.Model;

Mongorito.connect(process.env.MONGOLAB_URI || 'localhost/todo');

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
  },

  update: function *(todo) {
    var todoItem = yield Todo.findOne({_id: todo.id});
    todoItem.set({title: todo.title});
    yield todoItem.save();
  },

  changeCompletion: function *(todo) {
    var todoItem = yield Todo.findOne({_id: todo.id});
    todoItem.set({completion: todo.completion});
    yield todoItem.save();
  }
}
