// Twilio stuff

// Credentials
const accountSid = process.env.TWILIO_ACCOUNT_SID;
const authToken = process.env.TWILIO_AUTH_TOKEN;
const from = process.env.TWILIO_NUMBER;
const to = process.env.MAYA_NUMBER;

// require the Twilio module and create a REST client
const client = require("twilio")(accountSid, authToken);

// Set up the generic ability to send a text from Twilio
const text_maya = (body) => {
  message_obj = { to, from, body };
  console.log("Texting maya:", message_obj);
  client.messages
    .create(message_obj)
    .then((response) => console.log(response.sid))
    .catch((reason) => {
      console.log(reason);
    });
  return message_obj
};

/******************************************************************************/

// Import express & create server
const express = require("express");
const server = express();

// respond with "hello world" when a GET request is made to the homepage
server.get("/", function (req, res) {
  res.send("hello world");
});

// Set up the spam callback. the '/stats' page will display the global state
let gs = {counter: 0, display_me: null}
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
