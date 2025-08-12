import "./chat.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowLeft, faPaperPlane } from "@fortawesome/free-solid-svg-icons";
import { useView } from "../context/useView";

import {
  getDatabase,
  ref,
  onValue,
} from "firebase/database";
import { useState, useEffect } from "react";

const Chat = () => {
  const [users, setUsers] = useState([{}]);
  const db = getDatabase();

  useEffect(() => {
    const statusRef = ref(db, "status");
    const usersRef = ref(db, "users");

    const unsubscribe = onValue(statusRef, (snapshot) => {
      const statusData = snapshot.val();
      if (statusData) {
        const userIds = Object.keys(statusData);

        onValue(
          usersRef,
          (userSnapshot) => {
            const usersData = userSnapshot.val();

            const combinedUsers = userIds.map((uid) => {
              const userStatus = statusData[uid];
              const userDetails = usersData ? usersData[uid] : null;

              return {
                id: uid,
                userName: userDetails?.userName || "Unknown User",
                status:
                  userStatus.state === "online"
                    ? "Online"
                    : `Last active: ${new Date(
                        userStatus.last_changed
                      ).toLocaleString()}`,
              };
            });

            setUsers(combinedUsers);
          },
          { onlyOnce: true }
        );
      } else {
        setUsers([]);
      }
    });

    return () => unsubscribe();
  }, [db]);

  const handleInputHeight = (component) => {
    component.style.height = "30px";
    const newHeight = component.scrollHeight;

    if (newHeight < 150) {
      component.style.height = newHeight + "px";
    } else {
      component.style.height = "150px";
    }
  };

  const { popView } = useView();

  return (
    <div className="chat-container">
      <div className="chat-heading-container">
        <div className="chat-text">
          <div className="chat-name">
            {/* Hello Vishnu! */}
            <div className="chat-profile-container">
              <div
                className="chat-back-button"
                onClick={() => {
                  popView();
                }}
              >
                <FontAwesomeIcon icon={faArrowLeft} />
              </div>
              <div className="chat-profile"></div>
            </div>
          </div>
          <span className="chat-label">Group Chat</span>
        </div>
      </div>
      <div className="chat-message-area">
        {users.length > 0 ? (
          users.map((user) => (
            <div key={user.id}>
              {user.userName}: {user.status}
            </div>
          ))
        ) : (
          <p>No users found</p>
        )}
      </div>
      <div className="chat-text-area">
        <div className="ct-container">
          <div className="ct-textbox">
            <textarea
              onInput={(e) => handleInputHeight(e.target)}
              name="message"
              id="message"
              rows={1}
              className="ct-textbox"
              placeholder="Type here"
            ></textarea>
          </div>
          <div className="ct-send-button">
            <FontAwesomeIcon
              icon={faPaperPlane}
              size="2x"
              className="ct-icon"
              style={{ color: "#003679" }}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Chat;
