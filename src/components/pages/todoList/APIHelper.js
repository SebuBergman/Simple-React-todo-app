import axios from "axios";

const API_URL = "http://127.0.0.1:5000/todos/"

async function createTodo(task, date) {
    console.log(task);
    console.log(date);

    const { data: newTodo } = await axios.post(API_URL, {
        task,
        date,
    })
    console.log(newTodo);
    
    return newTodo
}

async function updateTodo(id, payload) {
    const { data: newTodo } = await axios.put(`${API_URL}${id}`, payload)
    return newTodo
}

async function deleteTodo(id) {
    const message = await axios.delete(`${API_URL}${id}`)
    return message
}

async function getAllTodos() {
    const { data: todos } = await axios.get(API_URL)
    return todos
}

export default { createTodo, updateTodo, deleteTodo, getAllTodos };