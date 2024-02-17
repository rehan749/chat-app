import express from 'express'
const { createServer } = require('node:http');
import { Server } from ('socket.io');


const app = express();
const server = createServer(app);
const io = new Server(server);
