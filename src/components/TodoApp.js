import React, { Fragment, useContext } from "react";
import styles from "./TodoApp.module.css";
import { todos } from "./data";
import uuid from "uuid";
import TodoContext, {
  TodoConsumer,
  TodoProvider
} from "../contexts/TodoContext";

const Counter = () => {
  const context = useContext(TodoContext);
  console.log(context);
  return (
    <span className={styles.todoCount}>
      <b>{context.todosLeft}</b> item{context.todosLeft !== 1 && "s"} left
    </span>
  );
};

const Clear = () => {
  const context = useContext(TodoContext);
  return (
    context.isClearVisible && (
      <button
        className={styles.clearCompleted}
        onClick={() => {
          context.deleteCompleted();
        }}
      >
        Clear completed
      </button>
    )
  );
};

const Filters = () => {
  const context = useContext(TodoContext);
  return (
    <ul className={styles.filters}>
      <li
        className={context.selectedFilter === "all" ? styles.selected : null}
        onClick={() => {
          context.changeFilter("all");
        }}
      >
        All
      </li>
      <li
        className={context.selectedFilter === "active" ? styles.selected : null}
        onClick={() => {
          context.changeFilter("active");
        }}
      >
        Active
      </li>
      <li
        className={
          context.selectedFilter === "completed" ? styles.selected : null
        }
        onClick={() => {
          context.changeFilter("completed");
        }}
      >
        Completed
      </li>
    </ul>
  );
};

const Controls = props => {
  const context = useContext(TodoContext);
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
  const { isDone, label, id } = props;
  const context = useContext(TodoContext);
  return (
    <li className={isDone ? styles.completed : ""}>
      <div className={styles.view}>
        <input
          readOnly
          className={styles.toggle}
          type="checkbox"
          checked={isDone}
          onClick={() => {
            context.changeStateTodo(id);
          }}
        />
        <label>{label}</label>
        <button
          className={styles.destroy}
          onClick={() => {
            context.deleteTodo(id);
          }}
        ></button>
      </div>
      <input readOnly className={styles.edit} value={label} />
    </li>
  );
};

const TodoList = () => {
  const context = useContext(TodoContext);
  return (
    <ul className={styles.todoList}>
      {context.visibleTodos.map(todo => (
        <TodoItem
          key={todo.id}
          id={todo.id}
          isDone={todo.isDone}
          label={todo.label}
        />
      ))}
    </ul>
  );
};

const TodoInput = () => {
  const context = useContext(TodoContext);
  return (
    <input
      className={styles.newTodo}
      placeholder="What needs to be done?"
      value={context.newTodoValue}
      onKeyPress={event => {
        if (event.key === "Enter" && context.newTodoValue.length >= 1) {
          context.addTodo();
        }
      }}
      onChange={event => {
        context.handleChange(event.target.value);
      }}
      autoFocus
    />
  );
};

const ToggleAll = () => {
  const context = useContext(TodoContext);
  return (
    <Fragment>
      <input
        id="toggle-all"
        className={styles.toggleAll}
        type="checkbox"
        onClick={() => {
          context.toggleAllTodos();
        }}
      />
      <label htmlFor="toggle-all">Mark all as complete</label>
    </Fragment>
  );
};

class TodoApp extends React.Component {
  
  render() {
    return (
      <TodoProvider>
        <div>
          <section className={styles.todoapp}>
            <header className={styles.header}>
              <h1>todos</h1>
              <TodoInput />
            </header>
            <section className={styles.main}>
              <ToggleAll />
              <TodoList />
            </section>
            <Controls />
          </section>
          <footer className={styles.info}>
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
      </TodoProvider>
    );
  }
}

export default TodoApp;
