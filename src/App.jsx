import React from "react";
import {BrowserRouter, Link} from "react-router-dom";
import {Bounce, ToastContainer} from "react-toastify";
import AppRoutes from './AppRoutes.jsx';
import ScrollToTop from "./components/ScrollToTop.jsx";
import {useSelector} from "react-redux";
import {RiAdminFill} from "react-icons/ri";

const App = () => {

    const user = useSelector((state) => state.auth.user);

    return (
        <BrowserRouter>
            <AppRoutes/>
            <ScrollToTop/>
            <ToastContainer
                position="top-right"
                autoClose={5000}
                hideProgressBar={false}
                newestOnTop={false}
                closeOnClick={false}
                rtl={false}
                pauseOnFocusLoss
                draggable
                pauseOnHover
                theme="colored"
                transition={Bounce}
            />
            {
                (user && user.isAdmin) && (
                    <Link to={'/admin'} className={`fixed bottom-5 right-5 p-5 rounded-lg bg-secondary text-primary`}>
                        <RiAdminFill size={32}/>
                    </Link>)
            }
        </BrowserRouter>
    );
};

export default App;
