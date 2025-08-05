import 'react-toastify/dist/ReactToastify.css';
import './App.css';
import Common from './common';
import { ToastContainer } from 'react-toastify';



export default function App() {
  return (
    <div className="app-container">
      <Common />
      <ToastContainer position="top-right" autoClose="3000"/>
    </div>
  );
}