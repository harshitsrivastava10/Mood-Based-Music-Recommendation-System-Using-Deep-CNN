// handle or create all Routes
import { createBrowserRouter } from "react-router-dom"
import Register from "./features/auth/pages/Register"
import Login from "./features/auth/pages/Login"
import Protected from "./features/auth/components/Protected"
import Home from "./features/home/pages/Home"

export const router = createBrowserRouter([
    {
        path: "/",
        /// wrap the protected routes
        element: <Protected> <Home /> </Protected>
    },

    {
        path: "/login",
        element: <Login />
    },

    {
        path: "/register",
        element: <Register />
    }
])