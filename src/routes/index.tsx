import { createBrowserRouter, Navigate, type RouteObject } from "react-router-dom"
import Main from "../layouts/main/Main"
import Login from "../core/auth/features/pages/Login"
import Signup from "../core/auth/features/pages/Signup"
import Home from "../features/pages/home/Home"
import ProtectedRoute from "../core/auth/guards/ProtectedRoute"
import { Link } from "react-router-dom"
import Todos from "../features/pages/todos/todos"

const NotFound = () => (
    <div className="flex flex-col items-center justify-center min-h-screen">
        <h1 className="text-4xl font-bold mb-4">404</h1>
        <p className="text-lg mb-6">Page Not Found</p>
        <Link to="/home" className="text-blue-600 hover:underline text-lg">
            Go back to Home
        </Link>
    </div>
);

export const routes: RouteObject[] = [
    {
        path: '/',
        element: <Main />,
        errorElement: <Navigate to="/not-found" replace />,
        children: [
            {
                index: true,
                element: <Navigate to="/login" replace />
            },
            {
                path: 'login',
                element: <Login />
            },
            {
                path: 'register',
                element: <Signup />
            },
            {
                path: 'home',
                element: (
                    <ProtectedRoute>
                        <Home />
                    </ProtectedRoute>
                )
            },
            {
                path: 'todos',
                element: (
                    <ProtectedRoute>
                        <Todos />
                    </ProtectedRoute>
                )
            },
            {
                path: '*',
                element: <Navigate to="/not-found" replace />
            },
        ]
    },
    {
        path: '/not-found',
        element: <NotFound />
    }
]
export const router = createBrowserRouter(routes);