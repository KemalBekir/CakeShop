import React, { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCommentDots } from "@fortawesome/free-solid-svg-icons";

const ChatPopup = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div>
      <button onClick={() => setIsOpen(!isOpen)} style={{
          padding: '12px',
          position: "fixed", 
          bottom: "20px", 
          right: "20px"
        }}>
        <FontAwesomeIcon icon={faCommentDots} />
      </button>
      {isOpen ? (
        <div style={{
          position: "fixed",
          bottom: "70px",
          right: "30px",
          width: "300px",
          height: "400px",
          background: "#f2f2f2",
          border: "1px solid #ccc",
          padding: "16px"
        }}>
          <div style={{ float: "right" }}>
            <button onClick={() => setIsOpen(false)}>X</button>
          </div>
          {/* Your chat content goes here */}
        </div>
      ) : null}
    </div>
  );
};

export default ChatPopup;
