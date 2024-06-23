import TodoList from "../../components/todos/TodoList/TodoList.tsx";
import classes from "./style.module.css";

const MainPage = () => {


    return (
        <div className={classes.page}>
            <TodoList />
        </div>
    );
};

export default MainPage;