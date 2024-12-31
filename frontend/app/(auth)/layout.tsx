import React from 'react';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const AuthLayout = ({ children }: { children: React.ReactNode }) => {
    return (
        <div>
            <ToastContainer position="top-right" autoClose={3000} />
            <div className=" flex min-h-screen flex-col items-center justify-center text-black dark:text-white-dark">{children} </div>;
        </div>
    );
};

export default AuthLayout;
