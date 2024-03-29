import express from 'express';
import cors from 'cors';
import { Server } from 'socket.io';
import http from 'http';


const app = express();
app.use(cors());
const port = 5000;
const domain = 'https://chat-app-ruby-six.vercel.app/';

const server = http.createServer(app);
const io = new Server(server,{
  
  cors:{
    origin:"https://chat-app-ruby-six.vercel.app",
    methods: ["GET", "PUT"]
  }
  
});



io.on('connection', (socket) => {
  console.log('a user connected', socket.id);
  
  socket.on("join_room",(data)=>{
      socket.join(data);
      console.log(`User ID: ${socket.id} room ID: ${data}`);
  });

  socket.on("send_message", (data) => {
      console.log("send_message:", data);
      // Handle the message data as needed
      socket.to(data.roomId).emit("receive_message", data);
  });

  socket.on('disconnect', () => {
      console.log('user disconnected', socket.id);
  });
});

  
  app.get('/', (req, res) => {
  res.send('Hello World!')
})

  server.listen(port, () => {
  console.log(`Server is running on http://${domain}:${port}`);
})
