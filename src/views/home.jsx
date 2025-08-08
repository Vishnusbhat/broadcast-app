import "./home.css";
import { useView } from "../context/useView";
import Stars from "./generateStars";
import Navbar from "../components/navbar";

const Home = () => {
  const { user, role } = useView();
  return (
    <div className="home-container">
      <Navbar />
      <Stars />
      <div className="home-heading">Number of broadcasts generated </div>
      <div className="home-overlay"></div>
    </div>
  );
};

export default Home;
