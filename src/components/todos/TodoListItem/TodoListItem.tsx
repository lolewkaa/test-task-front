import { FC, useState } from "react";
import styles from "./TodoListItem.module.css";
import ITodo from "../../../types/types.ts";
import { Button, Input } from "@mui/material";
import { addTodos } from "../../../store/slices/todosSlice.ts";
import { useAppSelector, useAppDispatch } from "../../../hooks/ReduxHooks.ts";

type TodoItemListProps = {
  item: ITodo;
  onDelete: (item: ITodo) => void;
};

const TodoListItem: FC<TodoItemListProps> = ({ item, onDelete }) => {
  const [newTodo, setIsNewTodo] = useState({
    id: item.id,
    title: item.title,
    description: item.description,
    subTasks: item.subTasks,
  });
  const [isActiveInput, setIsActiveInput] = useState(false);
  const todos = useAppSelector((state) => state.todos.value);

  const dispatch = useAppDispatch();
  console.log(item)

  function handleChangeTitle(e: React.ChangeEvent<HTMLInputElement>) {
    setIsNewTodo({
      id: item.id,
      title: e.target.value,
      description: newTodo.description,
      subTasks: item.subTasks,
    });
  }
  function handleChangeDescription(e: React.ChangeEvent<HTMLInputElement>) {
    setIsNewTodo({
      id: item.id,
      title: newTodo.title,
      description: e.target.value,
      subTasks: item.subTasks,
    });
  }

  function saveTodo() {
    const index = todos.findIndex((el: ITodo) => el.id === item.id);
    const newarr = todos.slice();
    newarr.splice(index, 1, {
      id: newTodo.id,
      title: newTodo.title,
      description: newTodo.description,
      subTasks: newTodo.subTasks,
    });
    dispatch(addTodos(newarr));
    setIsActiveInput(false);
  }

  return (
    <div className={styles.item}>
      {isActiveInput && (
        <>
          <div className={styles.item__inputContainer}>
            <Input
              value={newTodo.title}
              onChange={handleChangeTitle}
              placeholder="Title"
              fullWidth
            />
            <Input
              value={newTodo.description}
              onChange={handleChangeDescription}
              placeholder="Description"
              fullWidth
            />
          </div>
          <div className={styles.item__buttonContainer}>
            <Button
              style={{ width: "90px" }}
              onClick={saveTodo}
              variant="contained"
            >
              Save
            </Button>
            <Button
              style={{ width: "90px" }}
              onClick={() => onDelete(item)}
              variant="contained"
            >
              Delete
            </Button>
          </div>
        </>
      )}
      {isActiveInput === false && (
        <>
          <div className={styles.item__textContainer}>
            <p className={styles.item__title}>{item.title}</p>
            <p className={styles.item__description}>{item.description}</p>
          </div>
          <div className={styles.item__buttonContainer}>
            <Button
              style={{ width: "90px" }}
              variant="contained"
              onClick={() => setIsActiveInput(true)}
            >
              Change
            </Button>
            <Button
              style={{ width: "90px" }}
              onClick={() => onDelete(item)}
              variant="contained"
            >
              Delete
            </Button>
            <Button style={{ width: "90px" }} variant="contained">
              Subtask
            </Button>
          </div>
        </>
      )}
      {/* <TodoListItem item={sub} onDelete={onDelete}/> */}
    </div>
  );
};

export default TodoListItem;
