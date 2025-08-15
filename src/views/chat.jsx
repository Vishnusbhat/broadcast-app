import "./chat.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowLeft, faPaperPlane } from "@fortawesome/free-solid-svg-icons";
import { useView } from "../context/useView";
import { useChat } from "../context/useChat";
import { useState, useEffect, useRef } from "react";
import { formatDate } from "../utils/formatDate";

const Chat = () => {
  const { chats, sendChat, users } = useChat();
  const [message, setMessage] = useState("");
  const messagesEndRef = useRef(null);
  const textareaRef = useRef(null);

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

  const { popView, userName, currentView } = useView();

  return (
    <div
      className="chat-container"
      style={{
        opacity: currentView === "chat" ? 1 : 0,
        pointerEvents: currentView === "chat" ? "auto" : "none",
        // transition: "opacity 0.3s ease",
      }}
    >
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
              chats.map((chat, index) => {
                const currentDateOnly = new Date(chat.timestamp);
                const prevDateOnly = new Date(chats[index - 1]?.timestamp);
                const prev = prevDateOnly.setHours(0, 0, 0, 0);
                const cur = currentDateOnly.setHours(0, 0, 0, 0);
                return (
                  <div key={chat.id} className={"chat-block"}>
                    <div
                      className={`cm-date-container ${
                        index > 0 && prev !== cur ? "visible" : ""
                      }
                    ${index === 0 ? "visible" : ""}`}
                    >
                      <div className="cm-date">
                        {formatDate(chat.timestamp)}
                      </div>
                    </div>
                    <div
                      className={`chat-message  ${
                        chat.sender === userName
                          ? "sent-from-me"
                          : "sent-from-others"
                      } ${
                        index > 0 &&
                        (chats[index - 1].sender !== chat.sender ||
                          prev !== cur) &&
                        "start"
                      } ${index == 0 && "start"}`}
                    >
                      <div
                        className={`cm-profile-pic ${
                          chat.sender !== userName &&
                          index > 0 &&
                          (chats[index - 1].sender !== chat.sender ||
                            prev !== cur) &&
                          "show"
                        } ${chat.sender !== userName && index == 0 && "show"}`}
                      ></div>
                      <div
                        className={`cm-label ${
                          index === 0 || chats[index - 1].sender !== chat.sender
                            ? ""
                            : "off"
                        }`}
                      >
                        {chat.sender === userName ? "You" : chat.sender}
                      </div>
                      <div className="cm-text">{chat.text}</div>
                      <div className="cm-timestamp">
                        {new Date(chat.timestamp)?.toLocaleTimeString([], {
                          hour: "2-digit",
                          minute: "2-digit",
                        })}
                      </div>
                    </div>
                  </div>
                );
              })
            ) : (
              <p>No messages yet</p>
            )}
            <div ref={messagesEndRef} />
          </div>
        </div>
      </div>
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
