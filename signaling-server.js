const express = require("express");
const WebSocket = require("ws");
const http = require("http");
const { v4: uuidv4 } = require('uuid');
const app = express();

const port = process.env.PORT || 9000;

//initialize a http server
const server = http.createServer(app);

//initialize the WebSocket server instance
const wss = new WebSocket.Server({ server });

// create an object to store users and rooms
let users = {};
let rooms = {};

// utility to send message to one user
const sendTo = (connection, message) => {
  connection.send(JSON.stringify(message));
};

// utility to send message to all users in a room
const sendToRoom = (roomName, message) => {
  const room = rooms[roomName];
  if (room) {
    room.forEach(clientName => {
      const client = users[clientName];
      if (client && client.readyState === WebSocket.OPEN) {
        client.send(JSON.stringify(message));
      }
    });
  }
};

wss.on("connection", ws => {
  // Log when a client connects
  console.log("Client connected");

  ws.on("message", msg => {
    let data;
    //accepting only JSON messages
    try {
      data = JSON.parse(msg);
    } catch (e) {
      console.log("Invalid JSON");
      data = {};
    }
    const { type, name, offer, answer, candidate, room, message } = data;
    //Handle message by type
    switch (type) {
      //when a user tries to login
      case "login":
        //Check if username is available
        if (users[name]) {
          sendTo(ws, {
            type: "login",
            success: false,
            message: "Username is unavailable"
          });
        } else {
          const id = uuidv4();
          const loggedIn = Object.values(
            users
          ).map(({ id, name: userName }) => ({ id, userName }));
          users[name] = ws;
          ws.name = name;
          ws.id = id;
          ws.room = room;

          // Add user to room
          if (!rooms[room]) {
            rooms[room] = [];
          }
          rooms[room].push(name);

          sendTo(ws, {
            type: "login",
            success: true,
            users: loggedIn
          });
          sendToRoom(room, {
            type: "updateUsers",
            user: { id, name }
          });
        }
        break;
      //when a user sends an offer to connect with another user
      case "offer":
        //Check if user to send offer to exists
        const offerRecipient = users[name];
        if (!!offerRecipient) {
          sendTo(offerRecipient, {
            type: "offer",
            offer,
            name: ws.name
          });
        } else {
          sendTo(ws, {
            type: "error",
            message: `User ${name} does not exist!`
          });
        }
        break;
      //when a user sends an answer to an offer
      case "answer":
        //Check if user to send answer to exists
        const answerRecipient = users[name];
        if (!!answerRecipient) {
          sendTo(answerRecipient, {
            type: "answer",
            answer,
          });
        } else {
          sendTo(ws, {
            type: "error",
            message: `User ${name} does not exist!`
          });
        }
        break;
      //when a user sends a candidate
      case "candidate":
        //Check if user to send candidate to exists
        const candidateRecipient = users[name];
        if (!!candidateRecipient) {
          sendTo(candidateRecipient, {
            type: "candidate",
            candidate
          });
        } else {
          sendTo(ws, {
            type: "error",
            message: `User ${name} does not exist!`
          });
        }
        break;
      //when a user sends a message
      case "message":
        sendToRoom(ws.room, {
          type: "message",
          message
        });
        break;
      //when a user leaves
      case "leave":
        // Notify all users that this user has left
        sendToRoom(ws.room, "leave", { id: ws.id, name: ws.name });
        // Remove the user from the list
        delete users[ws.name];

        // Remove the user from the room
        rooms[ws.room] = rooms[ws.room].filter(userName => userName !== ws.name);
        if (rooms[ws.room].length === 0) {
          delete rooms[ws.room];
        }
        break;
      default:
        sendTo(ws, {
          type: "error",
          message: "Command not found: " + type
        });
        break;
    }
  });

  // Handle client disconnection
  ws.on("close", () => {
    // Log when a client disconnects
    console.log("Client disconnected");

    // Notify all users that this user has left
    if (ws.name) {
      sendToRoom(ws.room, {
        type: "leave",
        id: ws.id,
        name: ws.name
      });

      // Remove the user from the users object
      delete users[ws.name];

      // Remove the user from the room
      if (rooms[ws.room]) {
        rooms[ws.room] = rooms[ws.room].filter(userName => userName !== ws.name);
        if (rooms[ws.room].length === 0) {
          delete rooms[ws.room];
        }
      }
    }
  });

  //send immediate a feedback to the incoming connection
  ws.send(
    JSON.stringify({
      type: "connect",
      message: "Well hello there, I am a WebSocket server"
    })
  );
});

//start our server
server.listen(port, () => {
  console.log(`Signaling Server running on port: ${port}`);
});
