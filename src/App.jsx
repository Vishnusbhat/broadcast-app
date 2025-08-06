import 'react-toastify/dist/ReactToastify.css';
import './App.css';
import Common from './common';
import { ToastContainer } from 'react-toastify';
import Login from './views/login';
import { useEffect, useState } from 'react';

export default function App() {
  const [loggedIn, setLoggedIn] = useState(false);
  useEffect(() => {
  if (localStorage.getItem('userName') && localStorage.getItem('phoneNumber')) setLoggedIn(true);
}, [])
  return (
    <div className="app-container">
      {loggedIn ? <Common /> : <Login />}
      {/* <Common />
      <Login /> */}
      <ToastContainer position="top-right" autoClose="3000"/>
    </div>
  );
}