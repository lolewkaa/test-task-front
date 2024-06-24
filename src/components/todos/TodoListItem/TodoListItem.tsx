import {FC} from 'react';
import styles from './TodoListItem.module.css'
import ITodo from "../../types/types.ts";

type TodoItemListProps = {
    item: string
}

const TodoListItem: FC<TodoItemListProps> = ({ item }) => {
    return (
        <div className={styles.item}>
          <p className={styles.item__text}>{item.todo}</p>
        </div>
    );
};

export default TodoListItem;