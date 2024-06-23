import TodoList from "../../components/todos/TodoList.tsx";
import {useState} from "react";
import ITodo from "../../types/types.ts";
import classes from "./style.module.css";

const MainPage = () => {
    const [arrOfTodos, setArrOfTodos] = useState<ITodo[]>([
        {
            title: "Посторить туду лист",
            description: ""
        }, {
            title: "Подключить ui kit",
            description: ""
        }
    ])
    return (
        <div className={classes['page']}>
            <TodoList todos={arrOfTodos}/>
        </div>
    );
};

export default MainPage;