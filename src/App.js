import React from 'react';
import { Route, Routes } from 'react-router-dom';
import { AuthContextProvider } from './context/AuthContext';
import ProtectedRoute from './components/ProtectedRoute';
import TodoList from './components/pages/todoList/TodoList';
import Settings from './components/pages/settings/Settings';
import Signup from './components/pages/register/Signup';
import Login from './components/pages/login/Login';

import './App.css';

export default function App() {
  return (
    <AuthContextProvider>
        <Routes>
          <Route path='/' element={<Login />} />
          <Route path='/signup' element={<Signup />} />
          <Route
            path='/todolist'
            element={
              <ProtectedRoute>
                <TodoList />
              </ProtectedRoute>
            }
          />
          <Route
            path='/settings'
            element={
                <Settings />
            }
          />
        </Routes>
      </AuthContextProvider>
  );
}