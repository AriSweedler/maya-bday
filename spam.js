// Twilio Credentials
// To set up environmental variables, see http://twil.io/secure
const accountSid = process.env.TWILIO_ACCOUNT_SID;
const authToken = process.env.TWILIO_AUTH_TOKEN;
const from = process.env.TWILIO_NUMBER;
const to = process.env.MAYA_NUMBER;

// require the Twilio module and create a REST client
const client = require("twilio")(accountSid, authToken);

// Set up the generic ability to send a text from Twilio
const text_maya = (body) => {
  message_obj = { to, from, body };
  console.log(message_obj);
  client.messages
    .create(message_obj)
    .then((response) => console.log(response.sid))
    .catch((reason) => {
      console.log(reason);
    });
};

// Set up the spam callback
counter = 0;
const spam = () => text_maya(`Happy birthday lol (${++counter}/200)`);

// Invoke the spam callback every 2 minutes
interval_in_ms = 1000 * 120;
setInterval(spam, interval_in_ms);
