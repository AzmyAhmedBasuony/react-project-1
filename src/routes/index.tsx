import { createBrowserRouter, type RouteObject } from "react-router-dom"
import Main from "../layouts/main/Main"
import Login from "../core/auth/features/pages/Login"
import Signup from "../core/auth/features/pages/Signup"

export const routes: RouteObject[] = [
    {
        path: '/',
        element: <Main />,
        children: [
            {
                path: 'login',
                element: <Login />
            },
            {
                path: 'register',
                element: <Signup />
            }
        ]
    }
]
export const router = createBrowserRouter(routes);