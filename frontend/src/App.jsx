import { useEffect, useState } from "react";
import axios from "axios";
import { MdModeEditOutline, MdOutlineDone } from "react-icons/md";
import { FaTrash } from "react-icons/fa6";
import { IoClose } from "react-icons/io5";
import { API_URL } from "./api.js";
import { main_door } from "../../shared.js";

function App() {
  // Holds the list of todos fetched from the backend
  const [todos, setTodos] = useState([]);

  // These are OnChange setters that track the state variable in the input fields
  // description is the input field for adding a new todo
  const [description, setDescription] = useState("");
  // editedText is the input field for editing an existing todo
  const [editedText, setEditedText] = useState("");

  // editingTodo is the id of the todo currently being edited, or null if no todo is being edited
  const [editingTodo, setEditingTodo] = useState(null);
  const [error, setError] = useState(null);

  const [loading, setLoading] = useState(false);

  const getTodos = async () => {
    try {
      setLoading(true);
      setError(null);
      // Mapped to router.get("/", async (req, res) => {}
      const res = await axios.get(`${API_URL}${main_door}`);
      setTodos(res.data);
      console.log(res.data);
    } catch (err) {
      console.error(err.message);
      setError("Failed to fetch todos. Please try again later.");
    } finally {
      setLoading(false);
    }
  };
  // Renders the todos when the page is loaded for the first time only.
  useEffect(() => {
    getTodos();
  }, []);

  // Function to handle form submission for adding a new todo
  // After pressing 'Add Task' button, the new todo is added to the database and displayed in the list
  const onSubmitForm = async (e) => {
    e.preventDefault();
    if (!description.trim()) return;
    try {
      setError(null);
      // Mapped to router.post("/", (req, res) => {
      const res = await axios.post(`${API_URL}${main_door}`, {
        description: description.trim(),
        completed: false,
      });
      setTodos([...todos, res.data]);
      setDescription("");
    } catch (err) {
      console.error(err.message);
      setError("Failed to add todo. Please try again.");
    }
  };

  const saveEdit = async (e, id) => {
    // 1. Get the button that triggered the submit
    const button = e.currentTarget;
    // 2. Extract the custom data attributes
    const my_editOperation = button?.dataset.editOperation || "UNDEFINED";
    console.log(`Edit operation, let me see it : ${my_editOperation}`);
    try {
      setError(null);

      const currentTodo = todos.find((todo) => todo.todo_id === id);
      const trimmedText = editedText.trim();

      if (currentTodo.description === trimmedText) {
        setEditingTodo(null);
        setEditedText("");
        return;
      }
      //UPDATE_SECTION : Mapped to router.put("/:id", async (req, res) => {
      await axios.put(`${API_URL}${main_door}/${id}`, {
        description: trimmedText,
        completed: currentTodo.completed,
        editOperation: my_editOperation,
      });
      setEditingTodo(null);
      setEditedText("");
      setTodos(
        todos.map((todo) =>
          todo.todo_id === id
            ? {
                ...todo,
                description: trimmedText,
                completed: false, // Reset completed status to false after editing
              }
            : todo,
        ),
      );
    } catch (err) {
      console.error(err.message);
      setError("Failed to update todo. Please try again.");
    }
  };

  const deleteTodo = async (id) => {
    try {
      setError(null);
      // UPDATE_SECTION : Mapped to router.put("/:id", async (req, res) => {
      await axios.delete(`${API_URL}${main_door}/${id}`);
      setTodos(todos.filter((todo) => todo.todo_id !== id));
    } catch (err) {
      console.error(err.message);
      setError("Failed to delete todo. Please try again.");
    }
  };

  const toggleCompleted = async (id) => {
    try {
      setError(null);
      const todo = todos.find((todo) => todo.todo_id === id);
      // UPDATE_SECTION : Mapped to router.put("/:id", async (req, res) => {
      await axios.put(`${API_URL}${main_door}/${id}`, {
        description: todo.description,
        completed: !todo.completed,
      });
      setTodos(
        todos.map((todo) =>
          todo.todo_id === id ? { ...todo, completed: !todo.completed } : todo,
        ),
      );
    } catch (err) {
      console.error(err.message);
      setError("Failed to update todo. Please try again.");
    }
  };

  return (
    <div className=" absolute-container">
      <div className="form-area">
        <h1 className="text-4xl font-bold text-gray-800 mb-8 text-center">
          MALCOLM'S TODO LIST
        </h1>
        {error && (
          <div className="bg-red-100 text-red-700 p-3 rounded mb-4">
            {error}
          </div>
        )}
        <form onSubmit={onSubmitForm} className="add-todo-form shadow-xl/30">
          <textarea
            className="main-input"
            type="text"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            placeholder="What needs to be done?"
            required
          />
          <button className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-md font-medium cursor-pointer">
            Add Task
          </button>
        </form>
        <div>
          {" "}
          {/* List all the todos in the database */}
          {loading ? (
            <div>
              <p className="text-gray-600">Loading tasks...</p>
            </div>
          ) : todos.length === 0 ? (
            <p className="text-gray-600">No tasks available. Add a new task!</p>
          ) : (
            <div className="flex flex-col gap-y-4">
              {todos.map((todo) => (
                <div key={todo.todo_id} className="pb-4">
                  {/* Conditional rendering: If the todo is being edited, show the input field and save/cancel buttons */}

                  {editingTodo === todo.todo_id ? (
                    <div className="flex items-center gap-x-3">
                      <input // This is the input field after clicking each edit (pencil) button
                        className="flex-1 p-3 border rounded-lg border-gray-200 outline-none focus:ring-2 focus:ring-blue-300 text-gray-700 shadow-inner"
                        type="text"
                        value={editedText}
                        onChange={(e) => setEditedText(e.target.value)}
                      />
                      <div>
                        <button
                          onClick={(e) => saveEdit(e, todo.todo_id)} // This is the save button after clicking each edit (pencil) button
                          className="px-4 py-2 bg-green-500 text-white rounded-lg mr-2 mt-2 hover:bg-green-600 duration-200"
                          data-edit-operation="UPDATE"
                        >
                          <MdOutlineDone />
                        </button>
                        <button
                          onClick={() => setEditingTodo(null)}
                          className="px-4 py-2 bg-gray-500 text-white rounded-lg mt-2 hover:bg-gray-600 duration-200"
                        >
                          <IoClose />
                        </button>
                      </div>
                    </div>
                  ) : (
                    //...otherwise, show the todo description with edit and delete buttons
                    <div className="flex justify-between items-center">
                      <div className="flex items-center gap-x-4 overflow-hidden">
                        <button
                          onClick={() => toggleCompleted(todo.todo_id)}
                          className={`radio-button flex-shrink-0 h-6 w-6 border-2 rounded-full flex items-center justify-center ${
                            todo.completed
                              ? "bg-green-500 border-green-500 text-white"
                              : "border-gray-300 hover:border-blue-400"
                          }`}
                          data-edit-operation="UPDATE"
                        >
                          {todo.completed && <MdOutlineDone size={16} />}
                        </button>
                        <span>{todo.description}</span>
                      </div>
                      <div className="flex gap-x-2">
                        <button
                          onClick={() => {
                            setEditingTodo(todo.todo_id);
                            setEditedText(todo.description);
                          }}
                          className="p-2 text-blue-500 hover:text-blue-700 rounded-lg hover:bg-blue-50 duration-200"
                          data-edit-operation="DELETE"
                        >
                          <MdModeEditOutline />
                        </button>
                        <button
                          onClick={() => deleteTodo(todo.todo_id)}
                          className="p-2 text-red-500 hover:text-red-700 rounded-lg hover:bg-red-50 duration-200"
                        >
                          <FaTrash />
                        </button>
                      </div>
                    </div>
                  )}
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default App;
