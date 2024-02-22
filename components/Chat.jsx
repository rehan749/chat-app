import React, { useState, useEffect } from "react";
import "./chat.css";

const Chat = ({ socket, name, roomId }) => {
  const [msg, setMsg] = useState("");
  const [msgList, setMsgList] = useState([]);

  const sendMessage = async () => {
    if (msg !== "") {
      const now = new Date();
      const messageData = {
        id: Math.random(),
        roomId: roomId,
        author: name,
        message: msg,
        time: `${now.getHours()}:${now.getMinutes()}`,
      };

      await socket.emit("send_message", messageData);
      console.log("send_message", messageData);

      setMsgList((list) => [...list, messageData]);
    }
  };

  useEffect(() => {
    const handleRecMsg = (data) => {
      setMsgList((list) => [...list, data]);
    };
    socket.on("receive_message", handleRecMsg);

    return () => {
      socket.off("receive_message");
    };
  }, [socket]);

  const handleChange = (e) => {
    setMsg(e.target.value);
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    sendMessage();
    setMsg("");
  };
  return (
    <div className="container">

  
    <section className="msger">
      <h1 className="font-black text-center text-3xl py-4">
        Welcome to {name}
      </h1>

      <header className="msger-header">
        <div className="msger-header-title">
          <i className="fas fa-comment-alt"></i> create by rehan
        </div>
        <div className="msger-header-options">
          <span>
            <i className="fas fa-cog"></i>
          </span>
        </div>
      </header>

      <main className="msger-chat">


        {/* <div className="msg left-msg">
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
        </div> */}

          {msgList.map((data) => (
             <div key={data.id} className="msg" id={name === data.author ? "right-msg" : "left-msg"}>

            <>
              <div className="flex flex-row-reverse">
                <div
                  className="msg-img"
                  style={{ backgroundImage: `url('../user.png')` }}
                ></div>
                <div  className="msg-bubble">
                  <div className="msg-info">
                    <div className="msg-info-name">{data.author}</div>
                    <div className="msg-info-time">{data.time}</div>
                  </div>
                  <div className="msg-text">{data.message}</div>
                </div>
              </div>
            </>
        </div>
          ))}
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
    </div>
  );
};

export default Chat;
