import React, { useState } from "react";
import Dropdown from "./components/Dropdown/Dropdown";
import SendButtonIcon from "./assets/icons/send-button.svg";
import "./App.css";

const App: React.FC = () => {
  const [userRole, setUserRole] = useState<string>("Admin");

  const handleChange = (newUserRole: string) => {
    setUserRole(newUserRole);
  };

  return (
    <div className="app-container">
      <Dropdown userRole={userRole} onChange={handleChange} />
      <div className="welcome-box">
        <p className="welcome-top-message">Hello, Dani</p>
        <p className="welcome-bottom-message">Just a quick check in</p>
      </div>
      <div className="chat-box">
        <input
          type="text"
          placeholder="Chat with CynchAI..."
          className="chat-input"
        />
        <img src={SendButtonIcon} />
      </div>
    </div>
  );
};

export default App;
