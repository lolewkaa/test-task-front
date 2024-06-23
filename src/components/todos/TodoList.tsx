import {FC} from 'react';
import ITodo from "../../types/types.ts";

import TodoListItem from "./TodoListItem.tsx";

type TodoListProps = {
    todos: Array<ITodo>
}

const TodoList: FC<TodoListProps> = ({todos}) => {
    return (
        <div>
            List:
            {todos.map(todo => {
                return (
                    <TodoListItem todo={todo}/>
                )
            })}
        </div>
    );
};

export default TodoList;