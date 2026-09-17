import {createBrowserRouter} from "react-router";
import Register from "./features/auth/Pages/Register";
import Login from "./features/auth/Pages/Login";
import FaceExpression from "./features/expression/components/FaceExpression";
import Protected from "./features/auth/components/protected";

export const router = createBrowserRouter([
    {
        path: "/",
        element: <Protected><h1>Home</h1></Protected>,
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