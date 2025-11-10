import { useEffect, useState } from "react";
import axiosInstance from "../../../config/axios.config";
import { urls } from "../../../config/urls";

interface Todo {
    id: number;
    title: string;
    // add other fields as needed
}

const Modal = ({
    open,
    onClose,
    children,
}: {
    open: boolean;
    onClose: () => void;
    children: React.ReactNode;
}) => {
    if (!open) return null;
    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center  bg-opacity-40">
            <div className="bg-white rounded-lg shadow-lg p-6 min-w-[300px] min-h-[80px] relative">
                <button
                    onClick={onClose}
                    className="absolute top-2 right-2 text-lg font-bold text-gray-500 hover:text-gray-700"
                    aria-label="Close"
                >
                    ×
                </button>
                {children}
            </div>
        </div>
    );
};

const Todos = () => {
    const [todos, setTodos] = useState<Todo[]>([]);
    const [loading, setLoading] = useState(false);

    // Modal state for edits and deletes
    const [editTodo, setEditTodo] = useState<Todo | null>(null);
    const [editTitle, setEditTitle] = useState("");
    const [deleteTodoObj, setDeleteTodoObj] = useState<Todo | null>(null);

    const getTodos = async () => {
        setLoading(true);
        try {
            const response = await axiosInstance.get(urls.todos.get);
            const todosData =
                response.data?.todos || response.data?.data?.todos || [];
            setTodos(Array.isArray(todosData) ? todosData : []);
        } catch (error) {
            console.error("Error fetching todos", error);
            setTodos([]);
        } finally {
            setLoading(false);
        }
    };

    const addTodo = async (todo: any) => {
        try {
            // Get current user from localStorage to associate the todo with the user
            const userStr = localStorage.getItem("user");
            let userId = null;
            if (userStr) {
                try {
                    const user = JSON.parse(userStr);
                    userId = user.id;
                    console.log("Current user ID:", userId);
                } catch (e) {
                    console.error("Error parsing user", e);
                }
            } else {
                console.warn("No user found in localStorage");
            }

            // Strapi v4+ requires data to be wrapped in a 'data' object
            // Create the todo first without the relation field
            const createPayload = { 
                data: { 
                    title: todo.title 
                } 
            };

            console.log("Creating todo with payload:", JSON.stringify(createPayload, null, 2));
            const createResponse = await axiosInstance.post(urls.todos.add, createPayload);
            console.log("Todo created successfully:", createResponse.data);
            
            // If user is logged in, update the todo to associate it with the user
            // Some Strapi configurations don't allow setting relation fields during creation
            if (userId && createResponse.data?.data?.id) {
                const todoId = createResponse.data.data.id;
                try {
                    // Try updating with the user relation
                    // The relation field might need to be set via update, not create
                    const updatePayload = {
                        data: {
                            user: userId
                        }
                    };
                    console.log("Updating todo with user relation:", JSON.stringify(updatePayload, null, 2));
                    await axiosInstance.put(`${urls.todos.update}/${todoId}`, updatePayload);
                    console.log("Todo updated with user relation successfully");
                } catch (updateError: any) {
                    console.warn("Could not set user relation on todo:", updateError.response?.data || updateError.message);
                    // The todo was created successfully, just without the user relation
                    // This might be a permissions issue or the relation field might be read-only
                }
            }
            
            getTodos();
        } catch (error: any) {
            console.error("Error adding todo", error);
            if (error.response) {
                console.error("Error response data:", error.response.data);
                console.error("Error response status:", error.response.status);
            }
        }
    };

    const confirmDeleteTodo = async () => {
        if (!deleteTodoObj) return;
        setLoading(true);
        try {
            await axiosInstance.delete(urls.todos.delete + "/" + deleteTodoObj.id, {
                data: { id: deleteTodoObj.id },
            });
            setDeleteTodoObj(null);
            getTodos();
        } catch (error) {
            console.error("Error deleting todo", error);
        }
    };

    const handleUpdateTodo = async () => {
        if (!editTodo) return;
        setLoading(true);
        try {
            await axiosInstance.put(urls.todos.update + "/" + editTodo.id, { data: { title: editTitle } });
            setEditTodo(null);
            setEditTitle("");
            getTodos();
        } catch (error) {
            console.error("Error updating todo", error);
        }
    };

    useEffect(() => {
        getTodos();
    }, []);

    const [newTodo, setNewTodo] = useState("");

    return (
        <div>
            {/* Edit Modal */}
            <Modal open={!!editTodo} onClose={() => { setEditTodo(null); setEditTitle(""); }}>
                <h2 className="text-lg font-semibold mb-4">Edit Todo</h2>
                <input
                    type="text"
                    className="border border-gray-300 px-3 py-2 rounded w-full mb-4"
                    value={editTitle}
                    onChange={e => setEditTitle(e.target.value)}
                    autoFocus
                />
                <div className="flex justify-end gap-2">
                    <button
                        className="bg-gray-200 text-gray-700 px-4 py-2 rounded"
                        onClick={() => { setEditTodo(null); setEditTitle(""); }}
                    >
                        Cancel
                    </button>
                    <button
                        className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 transition"
                        onClick={handleUpdateTodo}
                        disabled={editTitle.trim() === "" || editTitle === editTodo?.title || loading}
                    >
                        Save
                    </button>
                </div>
            </Modal>
            {/* Delete Modal */}
            <Modal open={!!deleteTodoObj} onClose={() => setDeleteTodoObj(null)}>
                <h2 className="text-lg font-semibold mb-4">Delete Todo</h2>
                <p className="mb-4">
                    Are you sure you want to delete <span className="font-semibold">"{deleteTodoObj?.title}"</span>?
                </p>
                <div className="flex justify-end gap-2">
                    <button
                        className="bg-gray-200 text-gray-700 px-4 py-2 rounded"
                        onClick={() => setDeleteTodoObj(null)}
                    >
                        Cancel
                    </button>
                    <button
                        className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600 transition"
                        onClick={confirmDeleteTodo}
                        disabled={loading}
                    >
                        Delete
                    </button>
                </div>
            </Modal>

            {/* Add Todo - simple input and button */}
            <div className="mb-4 flex gap-2">
                <input
                    type="text"
                    placeholder="Add a new todo"
                    className="border border-gray-300 px-3 py-2 rounded flex-1"
                    value={newTodo}
                    onChange={(e) => setNewTodo(e.target.value)}
                />
                <button
                    className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600 transition"
                    onClick={() => {
                        if (newTodo.trim() !== "") {
                            addTodo({ title: newTodo });
                            setNewTodo("");
                        }
                    }}
                >
                    Add
                </button>
            </div>
            {/* List Todos */}
            {loading ? (
                <div>Loading...</div>
            ) : (
                <div className="flex flex-col gap-4">
                    {Array.isArray(todos) && todos.length > 0 ? (
                        todos.map((todo: Todo) => (
                            <div key={todo.id} className="flex items-center gap-4 p-2 border rounded">
                                <span className="flex-1">{todo.title}</span>
                                <button
                                    onClick={() => {
                                        setEditTodo(todo);
                                        setEditTitle(todo.title);
                                    }}
                                    className="px-3 py-1 bg-blue-500 text-white rounded hover:bg-blue-600 transition"
                                    title="Edit"
                                >
                                    Edit
                                </button>
                                <button
                                    onClick={() => setDeleteTodoObj(todo)}
                                    className="px-3 py-1 bg-red-500 text-white rounded hover:bg-red-600 transition"
                                    title="Delete"
                                >
                                    Delete
                                </button>
                            </div>
                        ))
                    ) : (
                        <div>No todos found.</div>
                    )}
                </div>
            )}
        </div>
    );
};
export default Todos;