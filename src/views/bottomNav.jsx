import "./bottomNav.css";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faHouse,
  faPlus,
  faComment,
  faThumbsUp,
  faChartSimple,
} from "@fortawesome/free-solid-svg-icons";
import { useView } from "../context/useView";

const BottomNav = () => {
  const { pushView } = useView();
  const handleClick = (view) => pushView(view);
  return (
    <div className="bottom-nav-container">
      <div className="bn-options-list">
        <div className="bn-option" onClick={() => handleClick("home")}>
          <FontAwesomeIcon
            icon={faHouse}
            size="2x"
            style={{
              fill: "transparent",
              stroke: "black",
              strokeWidth: "25px",
            }}
          />
        </div>
        <div className="bn-option" onClick={() => handleClick("create")}>
          <FontAwesomeIcon
            icon={faPlus}
            size="2x"
            style={{
              fill: "transparent",
              stroke: "black",
              strokeWidth: "25px",
            }}
          />
        </div>
        <div className="bn-option" onClick={() => handleClick("chat")}>
          <FontAwesomeIcon
            icon={faComment}
            size="2x"
            style={{
              fill: "transparent",
              stroke: "black",
              strokeWidth: "25px",
            }}
          />
        </div>
        <div className="bn-option" onClick={() => handleClick("verification")}>
          <FontAwesomeIcon
            icon={faThumbsUp}
            size="2x"
            style={{
              fill: "transparent",
              stroke: "black",
              strokeWidth: "25px",
            }}
          />
        </div>
        <div className="bn-option" onClick={() => handleClick("stats")}>
          <FontAwesomeIcon
            icon={faChartSimple}
            size="2x"
            style={{
              fill: "transparent",
              stroke: "black",
              strokeWidth: "25px",
            }}
          />
        </div>
      </div>
    </div>
  );
};
export default BottomNav;
