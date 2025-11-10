export const urls = {
    register: "/auth/local/register",
    login: "/auth/local",
    todos: {
        get: "/users/me?populate=todos",
        add: "/todos",
        update: "/todos",
        delete: "/todos",
    },
};