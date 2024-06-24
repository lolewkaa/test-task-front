import { FC, ReactNode } from "react";
import styles from "./TodoListItem.module.css";
import ITodo from "../../types/types.ts";
import { Button } from "@mui/material";

type TodoItemListProps = {
  item: string;
  onDelete: (item: ReactNode) => void;
};

const TodoListItem: FC<TodoItemListProps> = ({ item, onDelete }) => {
  return (
    <div className={styles.item}>
      <p className={styles.item__text}>{item.todo}</p>
      <Button onClick={() => onDelete(item)} variant="contained">Delete</Button>
    </div>
  );
};

export default TodoListItem;
