import React, { useState } from "react";
import "./chat.css";

const Chat = ({ socket, name, roomId }) => {
  const [msg, setMsg] = useState("");

  const sendMessage = async () => {
    if (msg !== "") {
      // Create a new Date object to get the current time
      const now = new Date();
  
      // Construct the message data object
      const messageData = {
        id: Math.random(), // Generate a random ID
        roomId: roomId, // Access roomId from props
        author: name, // Access name from props
        message: msg,
        time: `${now.getHours()}:${now.getMinutes()}` // Format the time as HH:MM
      };
  
      // Now you can send the messageData to the server or wherever it needs to be sent
      await socket.emit("send_message", messageData);
      console.log("send_message", messageData);
    }
  };
  
  

  const handleChange = (e) => {
    setMsg(e.target.value);
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    sendMessage();
    setMsg("");
  };
  return (
    <section className="msger">
      <h1>welcome to {name}</h1>

      <header className="msger-header">
        <div className="msger-header-title">
          <i className="fas fa-comment-alt"></i> SimpleChat
        </div>
        <div className="msger-header-options">
          <span>
            <i className="fas fa-cog"></i>
          </span>
        </div>
      </header>

      <main className="msger-chat">
        <div className="msg left-msg">
          <div
            className="msg-img"
            style={{ backgroundImage: `url('../user.png')` }}
          ></div>

          <div className="msg-bubble">
            <div className="msg-info">
              <div className="msg-info-name">BOT</div>
              <div className="msg-info-time">12:45</div>
            </div>

            <div className="msg-text">
              Hi, welcome to SimpleChat! Go ahead and send me a message. 😄
            </div>
          </div>
        </div>

        <div className="msg right-msg">
          <div
            className="msg-img"
            style={{ backgroundImage: `url('../user.png')` }}
          ></div>

          <div className="msg-bubble">
            <div className="msg-info">
              <div className="msg-info-name">Sajad</div>
              <div className="msg-info-time">12:46</div>
            </div>

            <div className="msg-text">
              You can change your name in JS section!
            </div>
          </div>
        </div>
      </main>

      <form className="msger-inputarea">
        <input
          type="text"
          value={msg}
          onChange={handleChange}
          className="msger-input"
          placeholder="Enter a message..."
        />
        <button type="submit" onClick={handleSubmit} className="msger-send-btn">
          Send
        </button>
      </form>
    </section>
  );
};

export default Chat;
