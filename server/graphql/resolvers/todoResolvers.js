const { Todo } = require('../../models/Todo');
const { User } = require('../../models/User');

const todoResolvers = {
  Query: {
    todos: async (_obj, _args, context) => {
      if (!context.isLoggedIn) {
        throw new Error('Not Authenticated');
      }
      const TodoInfo = await User.findOne({ email: context.email }).populate(
        'todos'
      );
      const todos = TodoInfo.todos.map(todo => {
        return {
          id: todo._id,
          item: todo.item,
          createdAt: todo.createdAt
        };
      });
      return todos;
    }
  },
  Mutation: {
    createTodo: async (_obj, args, context) => {
      if (!context.isLoggedIn) {
        throw new Error('Not Authenticated');
      }
      const todo = new Todo({
        item: args.item
      });
      const savedTodo = await todo.save();
      const user = await User.findById(context.userId);

      user.todos.push(savedTodo._id);
      await user.save();

      return {
        id: savedTodo._id,
        item: savedTodo.item,
        createdAt: savedTodo.createdAt
      };
    },
    deleteTodo: async (_obj, args, context) => {
      if (!context.isLoggedIn) {
        throw new Error('Not Authenticated');
      }
      const todo = await Todo.findByIdAndDelete(args.id);
      const user = await User.findById(context.userId);

      const filteredTodos = user.todos.filter(
        todo => args.id !== todo._id.toString()
      );
      user.todos = filteredTodos;

      await user.save();

      return {
        id: todo._id,
        item: todo.item,
        createdAt: todo.createdAt
      };
    }
  }
};

module.exports = {
  todoResolvers
};
