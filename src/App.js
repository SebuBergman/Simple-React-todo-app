import React, {useState, useEffect} from 'react';
import { BrowserRouter as Router} from 'react-router-dom';
import {Routes, Route} from 'react-router-dom';
import TodoList from './components/pages/todoList/TodoList';
import Signup from './components/pages/register/Signup';
import Login from './components/pages/login/Login';

import './App.css';

export default function App() {
  return (
    <Router>
      <div>
        <section>
          <Routes>
            <Route path="/" element={<TodoList />} />
            <Route path="/signup" element={<Signup />} />
            <Route path="/login" element={<Login />} />
          </Routes>
        </section>
      </div>
    </Router>
  );
}