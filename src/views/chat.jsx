import "./chat.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowLeft, faPaperPlane } from "@fortawesome/free-solid-svg-icons";
import { useView } from "../context/useView";

const Chat = () => {
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
      <div className="chat-message-area"></div>
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
              style={{ color: "#003679" }}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Chat;
