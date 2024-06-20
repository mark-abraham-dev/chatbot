import React, { useState } from "react";
import TextareaAutosize from "react-textarea-autosize";
import { ArrowUp } from "react-feather";
import Dropdown from "./components/Dropdown/Dropdown";
import "./App.css";

const App: React.FC = () => {
  const [userRole, setUserRole] = useState<string>("Admin");
  const [text, setText] = useState<string>("");

  const handleChange = (newUserRole: string) => {
    setUserRole(newUserRole);
  };

  const sendText = (value: string) => {
    if (value.length > 0) {
      fetch(process.env.REACT_APP_SERVER_URL || "", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          question: value,
        }),
      })
        .then((response) => response.json())
        .then((data) => {
          alert(`Question: ${value}, Answer: ${data.answer}`);
        });
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
        <div
          className={`send-button${text.length > 0 ? " typing" : ""}`}
          onClick={() => sendText(text)}
        >
          <ArrowUp color="white" strokeWidth={3} />
        </div>
      </div>
    </div>
  );
};

export default App;
