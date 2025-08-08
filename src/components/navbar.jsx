import "./navbar.css";
import { useView } from "../context/useView";
const Navbar = () => {
  const { pushView, currentView } = useView();
  const handleProfileClick = () => {
    if (currentView === 'home'){pushView('broadcast')}
    else pushView('home');
  }
  return (
    <div className="nav-container">
      <div className="profile" onClick={handleProfileClick}></div>
      <div className="options-container">
        <div className="navbar-options"></div>
        <div className="navbar-options"></div>
        <div className="navbar-options"></div>
      </div>
    </div>
  );
};

export default Navbar;
