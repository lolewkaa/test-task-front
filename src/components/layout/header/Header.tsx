import classes from "./style.module.css";
import { CheckCircleOutline } from "@mui/icons-material";


const Header = () => {

    return (
        <header className={classes['header']}>
            <nav className={classes['header_nav']}>
                <CheckCircleOutline />
            </nav>
        </header>
    );
};

export default Header;