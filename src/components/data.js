import uuid from "uuid";

export const todos = [
  {
    id: uuid.v4(),
    isDone: false,
    label: "Finish components extraction"
  },
  {
    id: uuid.v4(),
    isDone: true,
    label: "a"
  },
  {
    id: uuid.v4(),
    isDone: true,
    label: "b"
  },
  {
    id: uuid.v4(),
    isDone: false,
    label: "Finish components extraction"
  }
];
