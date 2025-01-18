import React from 'react';
import { createBrowserRouter, RouterProvider, redirect, Outlet } from "react-router-dom";
import Login from './pages/Login';
import Home from './pages/Home';
import Favorites from './pages/Favorites';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import './styles/global.scss';

const Layout = () => {
  return (
    <div className="app">
      <Navbar />
      <div className='main'>
        <Outlet />
      </div>
      <Footer />
    </div>
  );
};

const router = createBrowserRouter([
  {
    path: "/login",
    element: <Login />,
  },
  {
    path: "/",
    element: <Layout />,
    children: [
      {
        path: "/",
        element: <Home />,
      },
    ],
  }
]);

function App() {
  return (
    <div>
      <RouterProvider router={router} />
    </div>
  );
}

export default App;
