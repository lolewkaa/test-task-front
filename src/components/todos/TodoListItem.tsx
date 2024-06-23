import {FC} from 'react';
import ITodo from "../../types/types.ts";

type TodoItemListProps = {
    todo: ITodo
}

const TodoListItem: FC<TodoItemListProps> = ({todo}) => {
    return (
        <div>
            Item title: {todo.title}
        </div>
    );
};

export default TodoListItem;