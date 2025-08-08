import "react-toastify/dist/ReactToastify.css";
import "./App.css";
import Common from "./common";
import { ToastContainer } from "react-toastify";
import Login from "./views/login";
import { useView } from "./context/useView";
import { ViewProvider } from "./context/viewcontext";
import { useEffect } from "react";
import Home from "./views/home";

function AppContent() {
  const { currentView, pushView } = useView();

  useEffect(() => {
    if (
      localStorage.getItem("userName") &&
      localStorage.getItem("phoneNumber")
    ) {
      pushView("home");
    } else {
      pushView("login");
    }
  }, []);

  return (
    <>
      {currentView === "login" && <Login />}
      {currentView === "home" && <Home />}
      {currentView === "broadcast" && <Common />}
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
