import "./chat.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faArrowLeft,
  faPaperPlane,
  faXmark,
} from "@fortawesome/free-solid-svg-icons";
import { useView } from "../context/useView";
import { useChat } from "../context/useChat";
import { useState, useEffect, useRef } from "react";
import { formatDate } from "../utils/formatDate";


const Chat = () => {
  const { chats, sendChat } = useChat();
  const [message, setMessage] = useState("");
  const messagesEndRef = useRef(null);
  const textareaRef = useRef(null);
  const [replyTarget, setReplyTarget] = useState(null);
  const pointerStartX = useRef(0);
  const [draggedId, setDraggedId] = useState(null);
  const [dragOffset, setDragOffset] = useState(0);
  const [scrollLocked, setScrollLocked] = useState(false);
  const REPLY_DRAG_THRESHOLD = 60;

  useEffect(() => {
    if (replyTarget) textareaRef.current?.focus();
  }, [replyTarget]);

  function handlePointerDown(e, id) {
    e.preventDefault();
    pointerStartX.current = e.clientX;
    setDraggedId(id);
    e.currentTarget.setPointerCapture(e.pointerId);
  }

  function isAndroid() {
    return /android/i.test(navigator.userAgent);
  }

  function handlePointerMove(e, id) {
    if (draggedId === id && pointerStartX.current && !scrollLocked) {
      const offset = Math.max(0, e.clientX - pointerStartX.current);
      setDragOffset(offset);
      if (offset > REPLY_DRAG_THRESHOLD && !scrollLocked) {
        setScrollLocked(true);
      }
      if (offset <= REPLY_DRAG_THRESHOLD && scrollLocked) {
        setScrollLocked(false);
      }
    }
  }

  function handlePointerUp(e, chat) {
    if (draggedId === chat.id) {
      if (dragOffset > 40) {
        setReplyTarget(chat);
      }
      setDraggedId(null);
      setDragOffset(0);
      pointerStartX.current = 0;
      setScrollLocked(false);
    }
  }

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [chats]);

  const handleSend = () => {
    if (message.trim()) {
      sendChat(message, userName, replyTarget);
      setMessage("");
      setReplyTarget(null);
      textareaRef.current?.focus();
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
      }}
    >
      <div className="chat-heading-container">
        <div className="chat-text">
          <div className="chat-name">
            <div className="chat-profile-container">
              <div
                className="chat-back-button"
                onClick={() => {
                  popView();
                  setReplyTarget(null);
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
                     {/* <div className="cm-reation-container"></div> */}
                    <div
                      className={`chat-message ${
                        chat.id === draggedId ? "dragging" : ""
                      } ${
                        chat.sender === userName
                          ? "sent-from-me"
                          : "sent-from-others"
                      } ${
                        index > 0 &&
                        (chats[index - 1].sender !== chat.sender ||
                          prev !== cur) &&
                        "start"
                      } ${index == 0 && "start"}`}
                      onPointerDown={(e) => handlePointerDown(e, chat.id)}
                      onPointerMove={(e) => handlePointerMove(e, chat.id)}
                      onPointerUp={(e) => handlePointerUp(e, chat)}
                      style={{
                        transform:
                          chat.id === draggedId
                            ? `translateX(${dragOffset}px)`
                            : "none",
                        transition:
                          chat.id === draggedId ? "none" : "transform 0.16s",
                        cursor: "grab",
                      }}
                      onPointerLeave={(e) => {
                        if (draggedId) handlePointerUp(e, chat);
                      }}
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
                      {chat.replyTo && (
                        <div className="cm-reply-section">
                          <div className="cmr-sender">
                            {chat.replyTo.sender}
                          </div>
                          <div className="cmr-text">{chat.replyTo.text}</div>
                        </div>
                      )}
                      <div className="cm-text">
                        {chat.text}
                      </div>
                      <div className="cm-timestamp">
                        {new Date(chat.timestamp)?.toLocaleTimeString([], {
                          hour: "numeric",
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
        <div
          className={`ct-reply-section ${replyTarget ? "active" : ""}`}
          style={
            replyTarget
              ? { maxHeight: "200px", padding: "32px 10px 5px 10px" }
              : { maxHeight: "0", padding: "0", minHeight: "0" }
          }
        >
          <div className="ctr-cross" onClick={() => setReplyTarget(null)}>
            <div className="ctr-cross-border">
              <FontAwesomeIcon
                icon={faXmark}
                style={{ color: "#fff", cursor: "pointer" }}
              />
            </div>
          </div>
          {replyTarget && (
            <div className="ctr-display">
              <div className="ctr-label">
                {replyTarget.sender === userName ? "You" : replyTarget.sender}
              </div>
              <div className="ctr-text">{replyTarget.text}</div>
            </div>
          )}
        </div>

        <div className="ct-container">
          <div className="ct-textbox">
            <textarea
              autoFocus
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              onInput={(e) => handleInputHeight(e.target)}
              rows={1}
              onKeyDown={(e) => {
                if (!isAndroid() && e.key === "Enter" && !e.shiftKey) {
                  e.preventDefault();
                  handleSend();
                }
              }}
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
