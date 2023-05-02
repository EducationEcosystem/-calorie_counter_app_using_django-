import React from 'react';
import ReactDOM from 'react-dom/client';
import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";
import './index.css';
import App from './App';
import {Food} from './pages/Food';
import reportWebVitals from './reportWebVitals';
import { AddFood } from './pages/AddFood';
import { Login } from './pages/Login';
import { Register } from './pages/Register';
import { SelectFood } from './pages/SelectFood';
import { isLoggedIn, isLoggedOut } from './utils/checkAuth';


const router = createBrowserRouter([
  {
    path: "/food",
    loader: isLoggedIn,
    element: <Food />
  },
  {
    path: "/addfood",
    loader: isLoggedIn,
    element: <AddFood />
  },
  {
    path: "/selectfood",
    loader: isLoggedIn,
    element: <SelectFood />
  },
  {
    path: "/login",
    loader: isLoggedOut,
    element: <Login />
  },
  {
    path: "/register",
    loader: isLoggedOut,
    element: <Register />
  },
  {
    path: "/",
    loader: isLoggedIn,
    element: <App></App>,
  }
]);

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
