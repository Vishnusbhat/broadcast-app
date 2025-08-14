import "./chat.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowLeft, faPaperPlane } from "@fortawesome/free-solid-svg-icons";
import { useView } from "../context/useView";
import { useChat } from "../context/useChat";

import { getDatabase, ref, onValue } from "firebase/database";
import { useState, useEffect, useRef } from "react";
import { ChartArea } from "lucide-react";

const Chat = () => {
  const { chats, sendChat } = useChat();
  const [users, setUsers] = useState([]);
  const [message, setMessage] = useState("");
  const db = getDatabase();
  const messagesEndRef = useRef(null);
  const textareaRef = useRef(null);

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

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [chats]);

  const handleSend = () => {
    if (message.trim()) {
      sendChat(message, userName);
      setMessage("");
      textareaRef.current.style.height = "30px";
    }
  };

  const handleInputHeight = (component) => {
    component.style.height = "30px";
    const newHeight = component.scrollHeight;
    component.style.height = newHeight < 150 ? `${newHeight}px` : "150px";
  };

  const { popView, userName } = useView();

  return (
    <div className="chat-container">
      {/* Header */}
      <div className="chat-heading-container">
        <div className="chat-text">
          <div className="chat-name">
            <div className="chat-profile-container">
              <div className="chat-back-button" onClick={() => popView()}>
                <FontAwesomeIcon icon={faArrowLeft} />
              </div>
              <div className="chat-profile"></div>
            </div>
          </div>
          <span className="chat-label">Group Chat</span>
        </div>
      </div>

      {/* Messages */}
      <div className="chat-message-area">
        <div className="cm-chat-container">
          <div className="cm-chats">
            {chats.length > 0 ? (
              chats.map((chat, index) => (
                <div key={chat.id} className={"chat-block"}>
                  <div
                    className={`chat-message  ${
                      chat.sender === userName
                        ? "sent-from-me"
                        : "sent-from-others"
                    } ${
                      index > 0 &&
                      chats[index - 1].sender !== chat.sender &&
                      "start"
                    } ${index == 0 && "start"}`}
                  >
                    {/* <div className="cm-text">
                      Lorem Ipsum is simply dummy text of the printing and
                      typesetting industry. Lorem Ipsum has been the industry's
                      standard dummy text ever since the 1500s, when an unknown
                      printer took a galley of type and scrambled it to make a
                      type specimen book. It has survived not only five
                      centuries, but also the leap into electronic typesetting,
                      remaining essentially unchanged.
                    </div> */}
                    <div className="cm-text">{chat.text}</div>
                    <div className="cm-timestamp">
                      {chat.timestamp?.toDate().toLocaleTimeString([], {
                        hour: "2-digit",
                        minute: "2-digit",
                      })}
                    </div>
                  </div>
                </div>
              ))
            ) : (
              <p>No messages yet</p>
            )}
            <div ref={messagesEndRef} />
            {/* <div className="chat-users-status">
              {users.map((u) => (
                <div key={u.id}>
                  {u.userName} — {u.status}
                </div>
              ))}
            </div> */}
          </div>
        </div>
      </div>

      {/* Input */}
      <div className="chat-text-area">
        <div className="ct-container">
          <div className="ct-textbox">
            <textarea
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              onInput={(e) => handleInputHeight(e.target)}
              rows={1}
              className="ct-textbox"
              placeholder="Type here"
              ref={textareaRef}
            ></textarea>
          </div>
          <div className="ct-send-button" onClick={handleSend}>
            <FontAwesomeIcon
              icon={faPaperPlane}
              size="2x"
              className="ct-icon"
              style={{ color: "#003679", cursor: "pointer" }}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Chat;
