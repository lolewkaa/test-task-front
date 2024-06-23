import classes from "./style.module.css";
import {NavLink} from "react-router-dom";


const Header = () => {

    return (
        <header className={classes['header']}>
            <nav className={classes['header_nav']}>
                <h1>Logo</h1>
                <div className={classes["header_nav--links"]}>
                    <NavLink to={""}>Link</NavLink>
                    <NavLink to={""}>Link</NavLink>
                </div>

            </nav>
        </header>
    );
};

export default Header;