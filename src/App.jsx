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

function AppContent() {
  const { currentView } = useView();

  return (
    <>
      <ToastContainer />
      {currentView !== "chat" && currentView !== "login" && <BottomNav />}
      {currentView === "login" && <Login />}
      {currentView === "home" && <Home />}
      {currentView === "create" && <Common />}
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
