import "react-toastify/dist/ReactToastify.css";
import "./App.css";
import Common from "./common";
import { ToastContainer } from "react-toastify";
import Login from "./views/login";
import { useView } from "./context/useView";
import { ViewProvider } from "./context/viewcontext";
import Home from "./views/home";
import BottomNav from "./views/bottomNav";
import Chat from "./views/chat";
import { ChatProvider } from "./context/chatcontext";
import { useEffect } from "react";
import MyBroadcasts from "./views/mybroadcasts";
import axios from "axios";

function AppContent() {
  const { popView } = useView();
  const wakeUpCronService = async () => {
    try {
      const cronServiceResponse = await axios.get(
        "https://cron-service-3343.onrender.com/wakeup"
      );
      console.log(cronServiceResponse);
    } catch {
      console.log("Cron service not responded.");
    }
  };
  const { currentView } = useView();
  useEffect(() => {
    wakeUpCronService();
  }, []);

  useEffect(() => {
    const handlePopState = (event) => {
      event.preventDefault();
      window.history.pushState(null, document.title, window.location.href);
      popView();
    };
    window.history.pushState(null, document.title, window.location.href);
    window.addEventListener("popstate", handlePopState);

    return () => {
      window.removeEventListener("popstate", handlePopState);
    };
  }, []);

  return (
    <>
      <ToastContainer />
      {currentView !== "chat" && currentView !== "login" && <BottomNav />}
      {currentView === "login" && <Login />}
      {currentView === "home" && <Home />}
      {currentView === "create" && <Common />}
      {currentView === "broadcast" && <MyBroadcasts />}
      <Chat />
    </>
  );
}

export default function App() {
  return (
    <ViewProvider>
      <ChatProvider>
        <div className="app-container">
          <AppContent />
        </div>
      </ChatProvider>
    </ViewProvider>
  );
}
