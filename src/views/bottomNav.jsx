import "./bottomNav.css";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faHouse,
  faPlus,
  faComment,
  faThumbsUp,
  faChartSimple,
} from "@fortawesome/free-solid-svg-icons";

const BottomNav = () => {
  return (
    <div className="bottom-nav-container">
      <div className="bn-options-list">
        <div className="bn-option">
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
        <div className="bn-option">
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
        <div className="bn-option">
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
        <div className="bn-option">
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
        <div className="bn-option">
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
