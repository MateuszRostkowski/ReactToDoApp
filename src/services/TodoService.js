import firebase from "../firebase";

export const sendTodo = label => {
  firebase
    .database()
    .ref("/todos")
    .push({
      label,
      isDone: false,
      createdAt: new Date().toISOString()
    });
};

export const prepareTodos = data => {
  return Object.entries(data)
    .reverse()
    .map(arr => {
      const [id, value] = arr;
      return {
        id,
        ...value
      };
    });
};

export const watchTodos = onSuccess => {
  return firebase
    .database()
    .ref("/todos")
    .on("value", dataSnapshot => {
      const todos = dataSnapshot.val();
      onSuccess(prepareTodos(todos));
    });
};

export const changeTodo = (id, isDone) => {
  return firebase
    .database()
    .ref(`/todos/${id}`)
    .update({ isDone });
};

export const deleteTodo = id => {
  return firebase
    .database()
    .ref(`/todos/${id}`)
    .remove();
};
