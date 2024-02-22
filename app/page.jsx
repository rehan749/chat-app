"use client";

import { useState } from "react";
import Chat from "@/components/Chat";
import { io } from "socket.io-client";

// const socket = io.connect("http://localhost:5000");
// Specify options for socket.io connection
const socket = io('http://localhost:5000', {
  transports: ['websocket'], // Use websocket transport
  withCredentials: true, // Send cookies with the request if needed
  extraHeaders: {
    'Access-Control-Allow-Origin': 'https://chat-app-ruby-six.vercel.app'
  }
});

export default function Home() {
  const [login, setLogin] = useState({ name: "", roomId: "" });

  const [showChat, setShowChat] = useState(false);
  // const [room, setRoom] = useState("");

  const joinRoom = () => {
    // Check if name and roomId are not empty strings
    if (login.name !== "" && login.roomId !== "") {
      socket.emit("join_room", login.roomId);

      setShowChat(true);
    }
  };
  const handleChange = (e) => {
    // Use the spread operator to merge the previous state with the new values
    setLogin({ ...login, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    joinRoom();
    // console.log(login);
    console.log("login state:", login);
    // Clear the input fields by resetting the state
    // setLogin({ name: "", roomId: "" });
  };

  return (
    // login page
    <section>
      {!showChat ? (
        <div className="flex min-h-full flex-col justify-center px-6 py-12 lg:px-8">
          <div className="m-auto max-w-full p-5 border bg-black">
            <div className="sm:mx-auto sm:w-full sm:max-w-sm">
              <img
                className="mx-auto h-10 w-auto"
                src="https://tailwindui.com/img/logos/mark.svg?color=indigo&shade=600"
                alt="Your Company"
              />
              <h2 className=" mt-10 text-center text-2xl font-bold leading-9 tracking-tight text-white">
                Join Room
              </h2>
            </div>

            <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
              <form className="space-y-6" action="#" method="POST">
                <div>
                  <label
                    htmlFor="name"
                    className="block text-sm font-medium leading-6 text-white"
                  >
                    full name
                  </label>
                  <div className="mt-2">
                    <input
                      onChange={handleChange}
                      value={login.name}
                      id="name"
                      name="name"
                      type="text"
                      autoComplete="name"
                      required
                      className="px-2 block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                    />
                  </div>
                </div>

                <div>
                  <div className="flex items-center justify-between">
                    <label
                      htmlFor="roomId"
                      className="block text-sm font-medium leading-6 text-white"
                    >
                      roomId
                    </label>
                  </div>
                  <div className="mt-2">
                    <input
                      onChange={handleChange}
                      value={login.roomId}
                      id="roomId"
                      name="roomId"
                      type="text"
                      autoComplete="current-roomId"
                      required
                      className="px-2 block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                    />
                  </div>
                </div>

                <div>
                  <button
                    onClick={handleSubmit}
                    type="submit"
                    className="flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                  >
                    Join Now
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      ) : (
        <Chat socket={socket} name={login.name} roomId={login.roomId} />
      )}
    </section>
  );
}
