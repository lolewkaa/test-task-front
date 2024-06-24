import { FC, ReactNode } from "react";
import styles from "./TodoListItem.module.css";
import ITodo from "../../types/types.ts";
import { Button, Input } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";

type TodoItemListProps = {
  item: string;
  onDelete: (item: ReactNode) => void;
};

const TodoListItem: FC<TodoItemListProps> = ({ item, onDelete }) => {
  const dispatch = useDispatch();
  const useAppSelector = useSelector.withTypes<RootState>();

  return (
    <div className={styles.item}>
      <p className={styles.item__text}>{item.title}</p>
      <p className={styles.item__text}>{item.description}</p>
      <Button onClick={() => onDelete(item)} variant="contained">Delete</Button>
    </div>
  );
};

export default TodoListItem;
