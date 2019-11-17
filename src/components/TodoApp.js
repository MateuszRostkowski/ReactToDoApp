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
      <button
        className={styles.clearCompleted}
        onClick={() => {
          props.onDeleteCompleted();
        }}
      >
        Clear completed
      </button>
    )
  );
};

const Filters = props => {
  const { onChangeFilter, selectedFilter } = props;

  return (
    <ul className={styles.filters}>
      <li
        className={selectedFilter === "all" ? styles.selected : null}
        onClick={() => {
          onChangeFilter("all");
        }}
      >
        All
      </li>
      <li
        className={selectedFilter === "active" ? styles.selected : null}
        onClick={() => {
          onChangeFilter("active");
        }}
      >
        Active
      </li>
      <li
        className={selectedFilter === "completed" ? styles.selected : null}
        onClick={() => {
          onChangeFilter("completed");
        }}
      >
        Completed
      </li>
    </ul>
  );
};

const Controls = props => {
  const {
    itemsLeft,
    isClearVisible,
    onDeleteCompleted,
    onChangeFilter,
    selectedFilter
  } = props;

  return (
    <footer className={styles.footer}>
      <Counter itemsLeft={itemsLeft} />
      <Clear
        isClearVisible={isClearVisible}
        onDeleteCompleted={onDeleteCompleted}
      />
      <Filters
        onChangeFilter={onChangeFilter}
        selectedFilter={selectedFilter}
      />
    </footer>
  );
};

const TodoItem = props => {
  const { isDone, label, id, onChangeStateTodo, onDeleteTodo } = props;

  return (
    <li className={isDone ? styles.completed : ""}>
      <div className={styles.view}>
        <input
          readOnly
          className={styles.toggle}
          type="checkbox"
          checked={isDone}
          onClick={() => {
            onChangeStateTodo(id);
          }}
        />
        <label
        >
          {label}
        </label>
        <button
          className={styles.destroy}
          onClick={() => {
            onDeleteTodo(id);
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
  const { onDeleteTodo, onChangeStateTodo } = props;

  return (
    <ul className={styles.todoList}>
      {props.todos.map(todo => (
        <TodoItem
          onDeleteTodo={onDeleteTodo}
          onChangeStateTodo={onChangeStateTodo}
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
      <input
        id="toggle-all"
        className={styles.toggleAll}
        type="checkbox"
        onClick={() => {
          props.onToggleAllTodos();
        }}
      />
      <label htmlFor="toggle-all">Mark all as complete</label>
    </Fragment>
  );
};

class TodoApp extends React.Component {
  state = {
    todos,
    displayTodos: JSON.parse(localStorage.getItem("todos")),
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

  get activeTodos() {
    return this.state.todos.filter(todo => todo.isDone === false);
  }

  get completedTodos() {
    return this.state.todos.filter(todo => todo.isDone === true);
  }

  get todosToDisplay() {
    return this.state.todos;
  }

  displayTodos = filter => {
    switch (filter) {
      case "active":
        this.setState({
          displayTodos: this.activeTodos
        });
        break;
      case "completed":
        this.setState({
          displayTodos: this.completedTodos
        });
        break;
      default:
        this.setState({
          displayTodos: this.state.todos
        });
    }
  };

  changeStateTodo = id => {
    const newTodos = [...this.state.todos];
    const newTodo = newTodos.filter(todo => todo.id === id)[0];
    newTodo.isDone = newTodo.isDone ? false : true;

    this.setState({
      todos: newTodos,
      displayTodos: newTodos
    });
    this.displayTodos(this.state.selectedFilter);
  };

  changeFilter = filter => {
    this.setState(
      {
        selectedFilter: filter
      },
      () => {
        this.displayTodos(this.state.selectedFilter);
      }
    );
  };

  toggleAllTodos = () => {
    const change = this.state.todos.some(todo => !todo.isDone);
    const newTodos = this.state.todos.map(todo => ({
      ...todo,
      isDone: change
    }));

    this.setState(
      {
        todos: newTodos,
        displayTodos: newTodos
      },
      () => {
        this.displayTodos(this.state.selectedFilter);
      }
    );
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

    this.setState(
      {
        todos: newTodos,
        newTodoValue: "",
        displayTodos: newTodos
      },
      () => {
        this.displayTodos(this.state.selectedFilter);
      }
    );
  };

  deleteTodo = id => {
    console.log(id);
    // [1, 2, 3, 4, 5] -> [1, 2, 4, 5]
    const newTodos = this.state.todos.filter(todo => todo.id !== id);
    this.setState(
      {
        todos: newTodos,
        displayTodos: newTodos
      },
      () => {
        this.displayTodos(this.state.selectedFilter);
      }
    );
  };

  deleteCompleted = () => {
    const newTodos = this.state.todos.filter(todo => todo.isDone !== true);
    this.setState(
      {
        todos: newTodos,
        displayTodos: newTodos
      },
      () => {
        this.displayTodos(this.state.selectedFilter);
      }
    );
  };

  handleChange = newValue => {
    if (newValue.length > 40) {
      return;
    }

    this.setState({
      newTodoValue: newValue
    });
    this.displayTodos(this.state.selectedFilter);
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
              todos={this.state.displayTodos}
              onDeleteTodo={this.deleteTodo}
              onChangeStateTodo={this.changeStateTodo}
            />
          </section>
          <Controls
            itemsLeft={this.todosLeft}
            isClearVisible={this.isClearVisible}
            onDeleteCompleted={this.deleteCompleted}
            onChangeFilter={this.changeFilter}
            selectedFilter={this.state.selectedFilter}
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
