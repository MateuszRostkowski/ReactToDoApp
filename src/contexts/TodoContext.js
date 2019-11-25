import React from "react";
import uuid from "uuid";
import { createContext } from "react";
import { todos } from "../components/data";
import {
  sendTodo,
  prepareTodos,
  watchTodos,
  changeTodo,
  deleteTodo,
  toggleAll
} from "../services/TodoService";

const TodoContext = createContext({
  todos: [],
  selectedFilter: "all",
  newTodoValue: ""
});

export const TodoConsumer = TodoContext.Consumer;
export class TodoProvider extends React.Component {
  state = {
    todos: [],
    selectedFilter: "all",
    newTodoValue: ""
  };

  componentDidMount() {
    watchTodos(todos => {
      this.setState({
        todos
      });
    });
  }

  get todosLeft() {
    return this.state.todos.filter(todo => todo.isDone === false).length;
  }

  get isClearVisible() {
    return this.visibleTodos.some(todo => todo.isDone === true);
  }

  get activeTodos() {
    return this.state.todos.filter(todo => todo.isDone === false);
  }

  get completedTodos() {
    return this.state.todos.filter(todo => todo.isDone === true);
  }

  get visibleTodos() {
    const { todos, selectedFilter } = this.state;
    switch (selectedFilter) {
      case "active":
        return todos.filter(todo => !todo.isDone);
      case "completed":
        return todos.filter(todo => todo.isDone);
      default:
        return todos;
    }
  }

  changeStateTodo = id => {
    const newTodos = [...this.state.todos];
    const newTodo = newTodos.filter(todo => todo.id === id)[0];

    changeTodo(id, newTodo.isDone ? false : true);
  };

  changeFilter = filter => {
    this.setState({
      selectedFilter: filter
    });
  };

  toggleAllTodos = () => {
    const change = this.state.todos.some(todo => !todo.isDone);

    this.state.todos.forEach(todo => changeTodo(todo.id, change));
  };

  addTodo = () => {
    if (this.state.newTodoValue.length < 2) {
      return;
    }

    sendTodo(this.state.newTodoValue);
    watchTodos(todos => {
      this.setState({
        todos
      });
    });

    this.setState({
      newTodoValue: ""
    });
  };

  deleteTodo = id => {
    deleteTodo(id);
  };

  deleteCompleted = () => {
    const completedTodos = this.state.todos.filter(
      todo => todo.isDone === true
    );
    completedTodos.forEach(todo => deleteTodo(todo.id));
  };

  handleChange = newValue => {
    if (newValue.length > 40) {
      return;
    }

    this.setState({
      newTodoValue: newValue
    });
  };

  render() {
    return (
      <TodoContext.Provider
        value={{
          ...this.state,
          todosLeft: this.todosLeft,
          isClearVisible: this.isClearVisible,
          visibleTodos: this.visibleTodos,
          activeTodos: this.activeTodos,
          completedTodos: this.completedTodos,
          changeStateTodo: this.changeStateTodo,
          toggleAllTodos: this.toggleAllTodos,
          deleteCompleted: this.deleteCompleted,
          addTodo: this.addTodo,
          handleChange: this.handleChange,
          deleteTodo: this.deleteTodo,
          changeFilter: this.changeFilter
        }}
      >
        {this.props.children}
      </TodoContext.Provider>
    );
  }
}

export default TodoContext;
