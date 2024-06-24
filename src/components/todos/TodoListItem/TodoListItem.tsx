import { FC, ReactNode, useState } from "react";
import styles from "./TodoListItem.module.css";
import ITodo from "../../types/types.ts";
import { Button, Input } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { addTodos } from "../../../store/slices/todosSlice.ts";

type TodoItemListProps = {
  item: string;
  onDelete: (item: ReactNode) => void;
};

const TodoListItem: FC<TodoItemListProps> = ({ item, onDelete }) => {
  const [newTodo, setIsNewTodo] = useState({
    id: item.id,
    title: item.title,
    description: item.description,
    subTasks: item.subTasks,
  });
  const useAppSelector = useSelector.withTypes<RootState>();
  const [isActiveInput, setIsActiveInput] = useState(false);
  const todos = useAppSelector((state) => state.todos.value);

  const dispatch = useDispatch();

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
    const index = todos.findIndex((el) => el.id === item.id);
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
          <Input 
          value={newTodo.title}
          onChange={handleChangeTitle} />
          <Input
            value={newTodo.description}
            onChange={handleChangeDescription}
          />
        </>
      )}
      {isActiveInput === false && (
        <div className={styles.item__textContainer}>
          <p className={styles.item__text}>{item.title}</p>
          <p className={styles.item__text}>{item.description}</p>
        </div>
      )}
      {isActiveInput && (
        <Button onClick={saveTodo} variant="contained">
          Save
        </Button>
      )}
      {isActiveInput === false && (
        <Button variant="contained" onClick={() => setIsActiveInput(true)}>
          Change
        </Button>
      )}
      <Button onClick={() => onDelete(item)} variant="contained">
        Delete
      </Button>
    </div>
  );
};

export default TodoListItem;
