import React from 'react';
import {MantineProvider} from "@mantine/core";
import {createBrowserRouter, RouterProvider} from "react-router-dom";
import RegistrationForm from "./forms/RegistrationForm.jsx";
import {useAuthStore} from "./store/index.js";
import LoginForm from "./pages/Login/LoginForm.jsx";
import {Notifications} from "@mantine/notifications";
import {useShallow} from "zustand/react/shallow";
import Home from "./pages/Home/Home.jsx";

const App = () => {
    const isAuth = useAuthStore(useShallow(state => state.isAuth));

    const unauthRouter = [
        {path: "/login", element: <LoginForm/>},
        {path: "/registration", element: <RegistrationForm/>},
        {path: '*', element: <Home/>},
    ]

    const authRouter = [
        {path: "/home", element: <div>HomePage</div>},
        {path: '*', element: <center>
                                <Home/>
                            </center>},
                ]

    const router = createBrowserRouter(isAuth ? authRouter : unauthRouter);

    return (
        <MantineProvider theme={{}}>
             <Notifications />
            <RouterProvider router={router}/>
        </MantineProvider>
    );
};

export default App;