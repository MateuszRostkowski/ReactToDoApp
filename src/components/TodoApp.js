import React from "react";
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

const Footer = () => {
  return (
    <footer className={styles.footer}>
      <Counter />
      <Filters />
      <Clear />
    </footer>
  );
};

const Header = () => {
  return (
    <header className={styles.header}>
      <h1>todos</h1>
      <input className={styles.newTodo} placeholder="What needs to be done?" />
    </header>
  );
};

const ToggleAll = () => {
  return (
    <div>
      <input id="toggle-all" className={styles.toggleAll} type="checkbox" />
      <label htmlFor="toggle-all">Mark all as complete</label>
    </div>
  );
};

const ToggleItem = props => {
  return <input className={styles.toggle} type="checkbox" checked={true} />;
};

const TodoEdit = () => {
  return <input className={styles.edit} value="Create a TodoMVC template" />;
};

const TodoRemove = () => {
  return <button className={styles.destroy}></button>;
};

const TodoView = props => {
  console.log(props);
  return (
    <div className={styles.view}>
      <ToggleItem isCompleted={props.isCompleted} />
      <label>Taste JavaScript</label>
      <TodoRemove />
    </div>
  );
};

const TodoItem = props => {
  return (
    <li className={props.isCompleted ? styles.completed : null}>
      <TodoView isChompleted={props.isCompleted} />
      <TodoEdit />
    </li>
  );
};

const TodoList = () => {
  return (
    <section className={styles.main}>
      <ToggleAll />
      <ul className={styles.todoList}>
        <TodoItem isCompleted={true} />
        <TodoItem isCompleted={false} />
      </ul>
    </section>
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
      <Header />
      <TodoList />
      <Footer />
    </section>
    <MoreInfo />
  </div>
);

export default TodoApp;
