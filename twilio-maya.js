// Twilio stuff
import twilio from "twilio";

// Credentials
const accountSid = process.env.TWILIO_ACCOUNT_SID;
const authToken = process.env.TWILIO_AUTH_TOKEN;
const from = process.env.TWILIO_NUMBER;
const to = process.env.MAYA_NUMBER;

// require the Twilio module and create a REST client
const client = twilio(accountSid, authToken);

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

export default text_maya;