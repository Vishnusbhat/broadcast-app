import "./output.css";
import CopyButton from "../copy";
import Whatsapp from "../whatsapp";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBars, faTimes } from "@fortawesome/free-solid-svg-icons";
import { useState } from "react";
import { db, collection, addDoc } from "../firebase";
import { useView } from "../context/useView";

const Output = ({ broadcast, initForm }) => {
  const { userName, pushView } = useView();
  const [open, setOpen] = useState(false);
  const [pressed, setPressed] = useState(false);
  const [urgent, setUrgent] = useState(false);
  const handleUrgentSelect = () => {
    setUrgent((prev) => !prev);
  };
  const handleCreateBroadcast = async () => {
    setPressed(true);
    setTimeout(() => {
      setPressed(false);
    }, 300);
    try {
      await addDoc(collection(db, "broadcasts"), {
        createdBy: userName,
        createdAt: Date.now(),
        broadcast: broadcast,
        label: initForm.category,
        company: initForm.company,
        urgent: urgent,
      });
      pushView("broadcast");
    } catch (error) {
      console.error("Error creating broadcast:", error);
    }
  };
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
          {/* </>
          )} */}
        </div>
      </div>
      <div className="heading">SwiftCast</div>
      {broadcast === "" ? (
        <></>
      ) : (
        <div className="o-broadcast-text">
          {broadcast}
          <div
            className={`o-create-broadcast-button ${pressed ? "pressed" : ""}`}
            onClick={() => {
              handleCreateBroadcast();
            }}
          >
            Create Broadcast
          </div>
          <div
            className={`o-urgent-button ${urgent ? "true" : ""}`}
            onClick={() => {
              handleUrgentSelect();
            }}
          >
            Urgent?
          </div>
        </div>
      )}
    </div>
  );
};

export default Output;
