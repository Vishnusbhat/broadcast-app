import "./output.css";
import CopyButton from "../copy";
import Whatsapp from "../whatsapp";
import DBButton from "../dbwrite";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBars, faTimes } from "@fortawesome/free-solid-svg-icons";
import { useState } from "react";
const Output = ({ broadcast, setOpenForm }) => {
  const [open, setOpen] = useState(false);
  return (
    <div className="output-container">
      <div className="drawer-container">
        <div
          className="menu-icon"
          onClick={() => {
            setOpen((prev) => !prev);
          }}
        >
          <FontAwesomeIcon
            icon={open ? faTimes : faBars}
            className={`output-icon ${open ? "rotate" : ""}`}
          />
        </div>
        <div className={`drawer ${open ? "open" : ""}`}>
          {/* {open && (
            <> */}
              <CopyButton broadcast={broadcast} />
              <Whatsapp broadcast={broadcast} />
              <DBButton setOpenForm={setOpenForm} />
            {/* </>
          )} */}
        </div>
      </div>

      {/* <CopyButton broadcast={broadcast} />
      <Whatsapp broadcast={broadcast} />
      <DBButton setOpenForm={setOpenForm} /> */}
      <div className="heading">SwiftCast</div>
      {broadcast === "" ? (
        <></>
      ) : (
        <>
          <pre>{broadcast}</pre>
        </>
      )}
    </div>
  );
};

export default Output;
