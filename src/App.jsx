import "react-toastify/dist/ReactToastify.css";
import "./App.css";
import Common from "./common";
import { ToastContainer } from "react-toastify";
import Login from "./views/login";
import { useView } from "./context/useView";
import { ViewProvider } from "./context/viewcontext";
import { useEffect } from "react";

function AppContent() {
  const { currentView, pushView } = useView();

  useEffect(() => {
    if (localStorage.getItem('userName') && localStorage.getItem('phoneNumber')){
      pushView('broadcast');
    } else {
      pushView('login');
    }
  }, []);

  return (
    <>
      {currentView === "broadcast" && <Common />}
      {currentView === "login" && <Login />}
    </>
  );
}

export default function App() {
  return (
    <ViewProvider>
      <div className="app-container">
        <AppContent />
      </div>
    </ViewProvider>
  );
}
