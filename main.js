// Twilio Credentials
// To set up environmental variables, see http://twil.io/secure
const accountSid = process.env.TWILIO_ACCOUNT_SID;
const authToken = process.env.TWILIO_AUTH_TOKEN;
const from = process.env.TWILIO_NUMBER;
const ARI = process.env.ARI_NUMBER;
const MAYA = process.env.MAYA_NUMBER;

// require the Twilio module and create a REST client
const client = require("twilio")(accountSid, authToken);

const send_text = ({ to, body }) => {
  message_obj = { to, from, body, };
  console.log(message_obj);
  client.messages
    .create(message_obj)
    .then((response) => console.log(response.sid));
};

send_text({to: ARI, body: "hello test"});
