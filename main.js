const path = require("path");
const { text_maya } = require(path.resolve(__dirname, "./spam.js"));

// Import express & create server
const express = require("express");
const server = express();

// respond with "hello world" when a GET request is made to the homepage
server.get("/", function (req, res) {
  res.send("hello world");
});

// Set up the spam callback. the '/stats' page will track this.
const interval_in_ms = 1000 * 120;
let counter = 0;
const spam = () => text_maya(`Happy birthday lol (${++counter}/200)`);

// Display stats to the admin
server.get("/stats", function (req, res) {
  res.send(`Texts sent: ${counter}`);
});

// Invoke the spam callback every 2 minutes
//setInterval(spam, interval_in_ms);
setInterval(() => console.log("intent to send", ++counter), 1000);
