import React, { Fragment } from "react";
import styles from "./TodoApp.module.css";

const Counter = () => {
  return (
    <span className={styles.todoCount}>
      <strong>0</strong> item left
    </span>
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

const Clear = () => {
  return <button className={styles.clearCompleted}>Clear completed</button>;
};

const Controls = () => {
  return (
    <footer className={styles.footer}>
      <Counter />
      <Filters />
      <Clear />
    </footer>
  );
};

const TodoInput = () => {
  return (
    <input className={styles.newTodo} placeholder="What needs to be done?" />
  );
};

const ToggleAll = () => {
  return (
    <Fragment>
      <input id="toggle-all" className={styles.toggleAll} type="checkbox" />
      <label htmlFor="toggle-all">Mark all as complete</label>
    </Fragment>
  );
};

const TodoItem = props => {
  const { isDone, label } = props;

  return (
    <li className={isDone ? styles.completed : ""}>
      <div className={styles.view}>
        <input className={styles.toggle} type="checkbox" checked={isDone} />
        <label>{label}</label>
        <button className={styles.destroy}></button>
      </div>
      <input className={styles.edit} value="Create a TodoMVC template" />
    </li>
  );
};

const TodoList = () => {
  return (
    <ul className={styles.todoList}>
      <TodoItem isDone={true} label={"Finish comonents extraction"} />
      <TodoItem isDone={false} label={"Attach logic"} />
    </ul>
  );
};

const MoreInfo = () => {
  return (
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
  );
};

const TodoApp = () => (
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
    <MoreInfo />
  </div>
);

export default TodoApp;
