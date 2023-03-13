import '../App.css';
import React, { useState, useRef, useEffect } from 'react';
import APIHelper from "./APIHelper.js"
import { AgGridReact } from 'ag-grid-react';
import Button from'@mui/material/Button';
import TextField from'@mui/material/TextField'
import AddIcon from '@mui/icons-material/Add';
import DeleteIcon from '@mui/icons-material/Delete';
import Stack from'@mui/material/Stack';
import AdapterDateFns from '@mui/lab/AdapterDateFns';
import LocalizationProvider from '@mui/lab/LocalizationProvider';
import DatePicker from '@mui/lab/DatePicker';
import { format } from 'date-fns';

import 'ag-grid-community/styles/ag-grid.css';
import 'ag-grid-community/styles/ag-theme-alpine.css';

function TodoList() {
    //const [todoss, setTodoss] = useState({task: "", date: "", completed: ""});
    const [rowData, setRowData] = useState([]);
    const [todos, setTodos] = useState([])
    const [todo, setTodo] = useState("")
    const gridRef = useRef();

    useEffect(() => {
        const fetchTodoAndSetTodos = async () => {
            const todos = await APIHelper.getAllTodos()
            setTodos(todos)
        }
        fetchTodoAndSetTodos()
    }, [])

    //Check if the input is changed
    const inputChanged = (e) => {
        setTodo({ ...todo, [e.target.name]: e.target.value });
    }

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
    }

    const updateTodo = async (e, id) => {
        e.stopPropagation()
        const payload = {
            completed: !todos.find(todo => todo.id === id).completed,
        }
        const updatedTodo = await APIHelper.updateTodo(id, payload)
        setTodos(todos.map(todo => (todo.id === id ? updatedTodo : todo)))
    }

    const deleteTodo = async (e, id) => {
        try {
            e.stopPropagation()
            await APIHelper.deleteTodo(id)
            setTodos(todos.filter(({ _id: i }) => id !== i))
        } catch (err) {}
    }

    const columns = [
        { field: "task", sortable: true, filter: true, floatingFilter: true },
        { field: "date", sortable: true, filter: true, floatingFilter: true, valueFormatter: params => format(params.value, 'dd.MM.yyyy') },
        { field: "completed", sortable: true, filter: true, floatingFilter: true },
    ];

    return (
      <div>
        <h1>Simple Todolist</h1>
        <h4>Add todo:</h4>
        <div>
          <div>
            <Stack direction="row" spacing={2} justifyContent="center" alingItems="centerg">
                <TextField
                    label="Description"
                    variant="standard"
                    name="task"
                    value={todo.task}
                    onChange={inputChanged}
                />
                <LocalizationProvider dateAdapter={AdapterDateFns} >
                    <DatePicker
                        label="Date"
                        value={todo.date}
                        inputFormat="dd.MM.yyyy"
                        mask="__.__.____"
                        onChange={(newValue) => {
                            setTodo({ ...todo, date: newValue });
                        }}
                        renderInput={(params) => <TextField variant="standard" {...params} />}
                    />
                </LocalizationProvider>
                <Button onClick={createTodo} variant="contained" className="buttonadd" startIcon={<AddIcon />}>Add</Button>
                <Button onClick={deleteTodo} variant="contained" startIcon={<DeleteIcon />}>Delete</Button>
                <Button onClick={updateTodo} variant="contained" >Not working</Button>
            </Stack>
            <span id="animationAction"></span>
            <div
              className="ag-theme-alpine"
              style={{ width: 600, height: 400, margin: "auto" }}
            >
              <AgGridReact
                ref={gridRef}
                onGridReady={(params) => (gridRef.current = params.api)}
                rowData={rowData}
                columnDefs={columns}
                rowSelection="single"
                animateRows={true}
              ></AgGridReact>
            </div>
          </div>
        </div>
      </div>
    );
}

export default TodoList;