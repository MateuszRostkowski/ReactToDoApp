import React from "react";
import uuid from "uuid";
import { createContext } from "react";
import { todos } from "../components/data" 

const TodoContext = createContext({
    todos: [],
    selectedFilter: "all",
    newTodoValue: ""
  });

  export const TodoConsumer = TodoContext.Consumer
  export class TodoProvider extends React.Component {
    state = {
        todos,
        selectedFilter: "all",
        newTodoValue: ""
      };
    
      componentDidMount() {
        const todos = JSON.parse(localStorage.getItem("todos")) || [];
        this.setState({
          todos
        });
      }
    
      componentDidUpdate() {
        localStorage.setItem("todos", JSON.stringify(this.state.todos));
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
          case "all":
            return todos;
          case "active":
            return todos.filter(todo => !todo.isDone);
          case "completed":
            return todos.filter(todo => todo.isDone);
        }
      }
    
      changeStateTodo = id => {
        const newTodos = [...this.state.todos];
        const newTodo = newTodos.filter(todo => todo.id === id)[0];
        newTodo.isDone = newTodo.isDone ? false : true;
    
        this.setState({
          todos: newTodos
        });
      };
    
      changeFilter = filter => {
        this.setState({
          selectedFilter: filter
        });
      };
    
      toggleAllTodos = () => {
        const change = this.state.todos.some(todo => !todo.isDone);
        const newTodos = this.state.todos.map(todo => ({
          ...todo,
          isDone: change
        }));
    
        this.setState({
          todos: newTodos
        });
      };
    
      addTodo = () => {
        // [1, 2, 3] -> [4, 1, 2, 3]
        if (this.state.newTodoValue.length < 2) {
          return;
        }
    
        const newTodo = {
          id: uuid.v4(),
          isDone: false,
          label: this.state.newTodoValue
        };
    
        const newTodos = [newTodo, ...this.state.todos];
    
        this.setState({
          todos: newTodos,
          newTodoValue: ""
        });
      };
    
      deleteTodo = id => {
        console.log(id);
        // [1, 2, 3, 4, 5] -> [1, 2, 4, 5]
        const newTodos = this.state.todos.filter(todo => todo.id !== id);
        this.setState({
          todos: newTodos
        });
      };
    
      deleteCompleted = () => {
        const newTodos = this.state.todos.filter(todo => todo.isDone !== true);
        this.setState({
          todos: newTodos
        });
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