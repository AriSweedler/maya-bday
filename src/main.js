import text_maya from "./twilio-maya.js";
import express from "express";

// Import express & create server
const server = express();

// respond with "hello world" when a GET request is made to the homepage
server.get("/", function (req, res) {
  res.send("hello world");
});

// Set up the spam callback. the '/stats' page will display the global state
let gs = { counter: 100, display_me: null };
const spam = () => {
  gs.display_me = text_maya(`Happy birthday lol (${++gs.counter}/200)`);
};

// Display stats to the admin
server.get("/stats", function (req, res) {
  res.send(`<h1>Texts sent: ${gs.counter}</h1>
<p>Most recent response:<pre>${JSON.stringify(gs.display_me, null, 2)}</pre></p>`
  );
});

// Invoke the spam callback every 2 minutes
const interval_in_ms = 1000 * 120;
setInterval(spam, interval_in_ms);

// Don't forget to do this or else Heroku will crash [like so](https://stackoverflow.com/questions/60603527/error-r10-boot-timeout-web-process-failed-to-bind-to-port-within-60-second)
server.listen(process.env.PORT || 5000);

// Lol keep awake
// var http = require("http");
/* go to sleep
 *
 * setInterval(() => { http.get("http://maya-bday.herokuapp.com"); }, 1000*60*3);
 */
