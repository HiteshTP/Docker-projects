const express = require('express');
const http = require('http');
const socketIo = require('socket.io');
const mongoose = require('mongoose');
const chatRoutes = require('./routes/chat');

const app = express();
const server = http.createServer(app);
const io = socketIo(server);

mongoose.connect('mongodb://mongo:27017/chat', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

const Message = mongoose.model('Message', {
  content: String,
});

io.on('connection', (socket) => {
  console.log('New client connected');

  Message.find().then((messages) => {
    messages.forEach((msg) => socket.emit('message', msg.content));
  });

  socket.on('message', (msg) => {
    const message = new Message({ content: msg });
    message.save().then(() => {
      io.emit('message', msg);
    });
  });

  socket.on('disconnect', () => {
    console.log('Client disconnected');
  });
});

app.use('/chat', chatRoutes);

const PORT = 4000;
server.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
