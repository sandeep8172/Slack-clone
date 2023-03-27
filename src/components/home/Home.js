import Header from '../header/Header'
import Sidebar from '../sidebarSection/Sidebar';
import { Fragment } from "react";
import Welcome from '../welcomePage/Welcome';

const Home = () => {
    return (
        <Fragment>
            <Header />
            <Sidebar />
        </Fragment>
    );
};

export default Home;
