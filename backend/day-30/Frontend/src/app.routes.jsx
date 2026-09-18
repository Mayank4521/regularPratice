import {createBrowserRouter} from "react-router";
import Register from "./features/auth/Pages/Register";
import Login from "./features/auth/Pages/Login";
import FaceExpression from "./features/expression/components/FaceExpression";
import Protected from "./features/auth/components/protected";
import Home from "./features/home/pages/Home";

export const router = createBrowserRouter([
    {
        path: "/",
        element: <Protected><Home/></Protected>,
    },
    {
        path: "/register",
        element: <Register />,
    },
    {
        path: "/login",
        element: <Login />,
    },
    {
        path: "/expression",
        element: <FaceExpression />,
    },
]);