import { NavLink, useNavigate } from "react-router-dom";
import { useState } from "react";

const NavBar = () => {
    const [showLogoutModal, setShowLogoutModal] = useState(false);
    const navigate = useNavigate();
    const isLoggedIn = Boolean(localStorage.getItem("token"));
    const user = localStorage.getItem("user");
    let username = "";
    if (user) {
        try {
            username = JSON.parse(user)?.username || "";
        } catch (e) {
            username = "";
        }
    }

    const handleLogout = () => {
        localStorage.removeItem("token");
        localStorage.removeItem("user");
        setShowLogoutModal(false);
        navigate("/login");
    };

    return (
        <nav className="bg-white shadow-md px-8 py-4 rounded-lg flex justify-between items-center mb-4">
            <div className="flex items-center space-x-3">
                {/* Home link at the start */}
                <NavLink
                    to="/home"
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
                {/* Todos link after Home, shown only when logged in */}
                {isLoggedIn && (
                    <NavLink
                        to="/todos"
                        className={({ isActive }) =>
                            `text-xl font-bold px-3 py-2 rounded-lg transition-colors duration-200 ${
                                isActive
                                    ? "bg-green-600 text-white shadow"
                                    : "text-green-700 hover:bg-green-100"
                            }`
                        }
                    >
                        Todos
                    </NavLink>
                )}
            </div>
            <div className="flex items-center space-x-8">
                {!isLoggedIn ? (
                    <>
                        {/* Login and Register links when logged out */}
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
                    </>
                ) : (
                    <>
                        {/* Profile and Logout links when logged in */}
                        <NavLink
                            to="/profile"
                            className={({ isActive }) =>
                                `text-xl font-bold px-3 py-2 rounded-lg transition-colors duration-200 ${
                                    isActive
                                        ? "bg-purple-600 text-white shadow"
                                        : "text-purple-700 hover:bg-purple-100"
                                }`
                            }
                        >
                            {username ? `Profile (${username})` : "Profile"}
                        </NavLink>
                        <button
                            onClick={() => setShowLogoutModal(true)}
                            className="text-xl font-bold px-3 py-2 rounded-lg transition-colors duration-200 bg-red-500 text-white hover:bg-red-600 shadow"
                        >
                            Logout
                        </button>
                    </>
                )}
            </div>
            {/* Logout Confirmation Modal */}
            {showLogoutModal && (
                <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-30 z-50">
                    <div className="bg-white p-6 rounded-lg shadow-lg flex flex-col items-center gap-4">
                        <div className="text-lg font-semibold">Are you sure you want to logout?</div>
                        <div className="flex space-x-4">
                            <button
                                className="bg-red-600 text-white font-semibold py-2 px-4 rounded hover:bg-red-700 transition"
                                onClick={handleLogout}
                            >
                                Logout
                            </button>
                            <button
                                className="bg-gray-300 text-gray-800 font-semibold py-2 px-4 rounded hover:bg-gray-400 transition"
                                onClick={() => setShowLogoutModal(false)}
                            >
                                Cancel
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </nav>
    );
};

export default NavBar;