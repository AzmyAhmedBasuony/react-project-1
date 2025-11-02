import { NavLink } from "react-router-dom"

const NavBar = () => {
    return (
        <nav className="bg-white shadow-md px-8 py-4 rounded-lg flex justify-between items-center mb-4">
            <div className="flex items-center">
                {/* Home link at the start */}
                <NavLink
                    to="/"
                    className={({ isActive }) =>
                        `text-xl font-bold px-3 py-2 rounded-lg transition-colors duration-200 ${
                            isActive
                                ? "bg-blue-600 text-white shadow"
                                : "text-blue-700 hover:bg-blue-100"
                        }`
                    }
                    end
                >
                    Home
                </NavLink>
            </div>
            <div className="flex items-center space-x-8">
                {/* Login and Register links at the end */}
                <NavLink
                    to="/login"
                    className={({ isActive }) =>
                        `text-xl font-bold px-3 py-2 rounded-lg transition-colors duration-200 ${
                            isActive
                                ? "bg-blue-600 text-white shadow"
                                : "text-blue-700 hover:bg-blue-100"
                        }`
                    }
                >
                    Login
                </NavLink>
                <NavLink
                    to="/register"
                    className={({ isActive }) =>
                        `text-xl font-bold px-3 py-2 rounded-lg transition-colors duration-200 ${
                            isActive
                                ? "bg-blue-600 text-white shadow"
                                : "text-blue-700 hover:bg-blue-100"
                        }`
                    }
                >
                    Register
                </NavLink>
            </div>
        </nav>
    )
}

export default NavBar