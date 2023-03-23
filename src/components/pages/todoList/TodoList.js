import React, { useState, useRef, useEffect } from 'react';
import APIHelper from "./APIHelper.js"
import Button from'@mui/material/Button';
import AddIcon from '@mui/icons-material/Add';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import IconButton from '@mui/material/IconButton';
import Stack from'@mui/material/Stack';
import { onAuthStateChanged } from "firebase/auth";
import { UserAuth } from '../../../context/AuthContext';
import { auth } from '../../firebase/Firebase';
import NavBar from '../../../navbar/Navbar';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';

import '../../../App.css';
import '../../../Todo.css';
import '../../../../node_modules/bootstrap/dist/css/bootstrap.min.css';

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  bgcolor: 'background.paper',
  border: '2px solid #000',
  boxShadow: 24,
  p: 4,
};

function TodoList() {
    const [checked, setChecked] = useState(false);
    const [todos, setTodos] = useState([]);
    const [todo, setTodo] = useState("");
    const [updateData, setUpdateData] = useState('');

    const [open, setOpen] = React.useState(false);
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);
    
    const gridRef = useRef();

    useEffect(() => {
        const fetchTodoAndSetTodos = async () => {
            const todos = await APIHelper.getAllTodos()
            setTodos(todos)
        }
        fetchTodoAndSetTodos();

        onAuthStateChanged(auth, (user) => {
            if (user) {
                // User is signed in.
                const uid = user.uid;
            } else {
                // User is signed out
                console.log("user is logged out");
            }
        });
    }, [])

    const createTodo = async e => {
        e.preventDefault()
        if (!todo) {
            alert("please enter something")
            return
        }
        if (todos.some(({ task }) => task === todo)) {
            alert(`Task: ${todo} already exists`)
            return
        }
        const newTodo = await APIHelper.createTodo(todo)
        setTodos([...todos, newTodo])
        setTodo("");
    }

    const updateTodoCompletion = async (e, id) => {
        e.stopPropagation();
        const payload = {completed: !todos.find(todo => todo._id === id).completed}
        const updatedTodo  = await APIHelper.updateTodo(id, payload);
        setTodos(todos.map((todo)=> todo._id === id ? updatedTodo: todo));
        setChecked(!checked);
    }

    //Check if the input is changed
    const inputChanged = (e) => {
        setUpdateData({ ...updateData, [e.target.name]: e.target.value });
    }

    const editTodo = async (e, id, task, completed) => {
        e.stopPropagation();
        setUpdateData({
            id: id,
            task: task,
            completed: completed
        })
        handleOpen();
    }

    const editTodoFunction = async (e, id, task) => {
        e.stopPropagation();
        const payload = {task}
        const editedTodo  = await APIHelper.editTodo(id, payload);
        setTodos(todos.map((todo)=> todo._id === id ? editedTodo: todo));
        handleClose();
    }

    const deleteTodo = async (e, id) => {
        try {
            e.stopPropagation()
            await APIHelper.deleteTodo(id)
            setTodos(todos.filter(({ _id: i }) => id !== i))
        } catch (err) {}
    }

    return (
      <div>
        <NavBar></NavBar>
        <div>
            <Stack direction="row" spacing={2} justifyContent="center" alignItems="center">
                <div className="todoInput">
                    <h4>Add todo:</h4>
                    <div className="addtodo">
                        <input
                            className="input"
                            type="type"
                            variant="standard"
                            name="task"
                            placeholder="New Todo"
                            value={todo}
                            onChange={({ target }) => setTodo(target.value)}
                        />
                    </div>
                    <div className="addbuttoncontainer">
                        <Button type="submit" onClick={createTodo} variant="contained" className="addbutton" startIcon={<AddIcon />}>Add new task</Button>
                    </div>
                </div>
            </Stack>
            <span id="animationAction"></span>
            <Stack direction="row" spacing={2} justifyContent="center" alignItems="center">
                <div>
                    <ul className="list-group my-5" id="todolist">
                        {todos.length ? todos.map(({ _id, task, date, completed }, i) => (
                        <li
                            key={i}
                            id="todos"
                            className="list-group-item d-flex justify-content-between my-2"
                        >
                            <h6 id="todotitle" className={`mt-1 mb-0 align-middle ${completed ? "completed" : ""}`}>{task}</h6>
                            <div className="todo-icon">
                                <input
                                    type="checkbox"
                                    //className={styles.checkbox}
                                    checked={completed}
                                    onChange={(e) => updateTodoCompletion(e, _id)}
                                />
                                <div>
                                    <IconButton aria-label="delete" className="mx-2 text-warning">
                                        <EditIcon onClick={ (e) => editTodo(e, _id, task, completed)}/>
                                    </IconButton>
                                    <Modal
                                        open={open}
                                        onClose={handleClose}
                                        aria-labelledby="modal-modal-title"
                                        aria-describedby="modal-modal-description"
                                    >
                                        <Box sx={style}>
                                        <Typography id="modal-modal-title" variant="h6" component="h2">
                                            Edit todo:
                                        </Typography>
                                        <div className="addtodo">
                                            <input
                                                className="input"
                                                type="type"
                                                variant="standard"
                                                name="task"
                                                placeholder="New Todo"
                                                value={updateData.task}
                                                onChange={inputChanged}
                                            />
                                        </div>
                                        <div className="addbuttoncontainer">
                                            <Button type="submit" onClick={e => editTodoFunction(e, _id, updateData.task)} variant="contained" className="addbutton" startIcon={<AddIcon />}>Add new task</Button>
                                        </div>
                                        </Box>
                                    </Modal>
                                </div>
                                <IconButton aria-label="delete" className="mx-2 text-danger">
                                    <DeleteIcon onClick={e => deleteTodo(e, _id)}/>
                                </IconButton>
                            </div>
                        </li>
                        )): <p>No Todos Yet</p>}
                    </ul>
                </div>
            </Stack>
          </div>
      </div>
    );
}

export default TodoList;