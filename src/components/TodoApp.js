import React, { Fragment } from "react";
import styles from "./TodoApp.module.css";
import { todos } from "./data";
import uuid from "uuid";

const Counter = props => {
  const { itemsLeft } = props;

  return (
    <span className={styles.todoCount}>
      <b>{itemsLeft}</b> item{itemsLeft !== 1 && "s"} left
    </span>
  );
};

const Clear = props => {
  return (
    props.isClearVisible && (
      <button className={styles.clearCompleted} onClick={() => {
        props.onDeleteCompleted();
      }}>Clear completed</button>
    )
  );
};

const Filters = () => {
  return (
    <ul className={styles.filters}>
      <li>
        <a className={styles.selected} href="#/">
          All
        </a>
      </li>
      <li>
        <a href="#/active">Active</a>
      </li>
      <li>
        <a href="#/completed">Completed</a>
      </li>
    </ul>
  );
};

const Controls = props => {
  const { itemsLeft, isClearVisible, onDeleteCompleted } = props;

  return (
    <footer className={styles.footer}>
      <Counter itemsLeft={itemsLeft} />
      <Clear isClearVisible={isClearVisible} onDeleteCompleted={onDeleteCompleted} />
      <Filters />      
    </footer>
  );
};

const TodoItem = props => {
  const { isDone, label, id } = props;

  return (
    <li className={isDone ? styles.completed : ""}>
      <div className={styles.view}>
        <input
          readOnly
          className={styles.toggle}
          type="checkbox"
          checked={isDone}
          onClick={() => {
            props.onChangeStateTodo(id);
          }}
        />
        <label>{label}</label>
        <button
          className={styles.destroy}
          onClick={() => {
            props.onDeleteTodo(id);
          }}
        ></button>
      </div>
      <input
        readOnly
        className={styles.edit}
        value="Create a TodoMVC template"
      />
    </li>
  );
};

const TodoList = props => {
  return (
    <ul className={styles.todoList}>
      {props.todos.map(todo => (
        <TodoItem
          onDeleteTodo={props.onDeleteTodo}
          onChangeStateTodo={props.onChangeStateTodo}
          key={todo.id}
          id={todo.id}
          isDone={todo.isDone}
          label={todo.label}
        />
      ))}
    </ul>
  );
};

const TodoInput = props => {
  return (
    <input
      className={styles.newTodo}
      placeholder="What needs to be done?"
      value={props.value}
      onKeyPress={event => {
        if (event.key === "Enter" && props.value.length >= 1) {
          props.onTodoAdd();
        }
      }}
      onChange={event => {
        props.onValueChange(event.target.value);
      }}
      autoFocus
    />
  );
};

const ToggleAll = props => {
  return (
    <Fragment>
      <input id="toggle-all" className={styles.toggleAll} type="checkbox" onClick={() => {
        props.onToggleAllTodos()
      }}/>
      <label htmlFor="toggle-all">Mark all as complete</label>
    </Fragment>
  );
};

class TodoApp extends React.Component {
  state = {
    todos,
    selectedFilter: "all",
    newTodoValue: "Buy milk"
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
    return this.state.todos.some(todo => todo.isDone === true);
  }

  changeStateTodo = (id)  => {
    const newTodos = [...this.state.todos];
    console.log(newTodos)
    const newTodo = newTodos.filter(todo => todo.id === id)[0]
    newTodo.isDone = newTodo.isDone ? false : true;

    this.setState({
      todos: newTodos,
    });
  };

  toggleAllTodos = () => {
    const newTodos = [...this.state.todos];
    const change = newTodos[0].isDone ? false : true;

    newTodos.map(todo => todo.isDone = change);

    this.setState({
      todos: newTodos,
    });
    // console.log(newTodos2)
  }


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
  }

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
      <div>
        <section className={styles.todoapp}>
          <header className={styles.header}>
            <h1>todos</h1>
            <TodoInput
              value={this.state.newTodoValue}
              onTodoAdd={this.addTodo}
              onValueChange={this.handleChange}
            />
          </header>
          <section className={styles.main}>
            <ToggleAll onToggleAllTodos={this.toggleAllTodos} />
            <TodoList
              todos={this.state.todos}
              onDeleteTodo={this.deleteTodo}
              onChangeStateTodo={this.changeStateTodo}
            />
          </section>
          <Controls
            itemsLeft={this.todosLeft}
            isClearVisible={this.isClearVisible}
            onDeleteCompleted={this.deleteCompleted}
          />
        </section>
        <footer className={styles.info}>
          <p>Double-click to edit a todo</p>
          <p>
            Template by <a href="http://sindresorhus.com">Sindre Sorhus</a>
          </p>
          <p>
            Created by <a href="http://todomvc.com">you</a>
          </p>
          <p>
            Part of <a href="http://todomvc.com">TodoMVC</a>
          </p>
        </footer>
      </div>
    );
  }
}

export default TodoApp;
