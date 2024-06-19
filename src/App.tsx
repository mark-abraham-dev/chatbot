import React, { useState } from "react";
import TextareaAutosize from "react-textarea-autosize";
import Dropdown from "./components/Dropdown/Dropdown";
import SendButtonIcon from "./assets/icons/send-button.svg";
import "./App.css";

const App: React.FC = () => {
  const [userRole, setUserRole] = useState<string>("Admin");
  const [text, setText] = useState<string>("");

  const handleChange = (newUserRole: string) => {
    setUserRole(newUserRole);
  };

  const sendText = (value: string) => {
    if (value.length === 0) alert("Input text!");
    else {
      console.log(value);
      setText("");
    }
  };

  const handleEdit = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const newText = e.target.value;
    if (newText[newText.length - 1] === "\n") {
      sendText(newText.slice(0, -1));
    } else {
      setText(newText);
    }
  };

  return (
    <div className="app-container">
      <Dropdown userRole={userRole} onChange={handleChange} />
      <div className="welcome-box">
        <p className="welcome-top-message">Hello, Dani</p>
        <p className="welcome-bottom-message">Just a quick check in</p>
      </div>
      <div className="chat-box">
        <TextareaAutosize
          className="chat-input"
          minRows={1}
          maxRows={10}
          placeholder="Chat with CynchAI..."
          value={text}
          onChange={handleEdit}
        />
        <img
          className="send-button"
          src={SendButtonIcon}
          alt="send"
          onClick={() => sendText(text)}
        />
      </div>
    </div>
  );
};

export default App;
