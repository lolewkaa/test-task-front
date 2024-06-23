import {Suspense} from 'react';
import {Outlet} from "react-router-dom";
import classes from "./style.module.css";
import Header from "./header/Header.tsx";


const Layout = () => {
    return (
        <div className={classes['layoutS']}>
            <div className={classes['page_wrapper']}>
                <Header/>
                <div className={classes['page']}>
                    <Suspense fallback={<h1>Loading...</h1>}>
                        <Outlet/>
                    </Suspense>
                </div>

                {/*<Footer/>*/}
            </div>

        </div>
    );
};

export default Layout;