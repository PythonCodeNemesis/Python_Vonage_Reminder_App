const { Auth } = require("@vonage/auth");
const { Messages } = require("@vonage/messages");
const { SMS } = require("@vonage/messages");

PRIVATE_KEY_PATH = "private.key";

const messagesClient = new Messages(
  new Auth({
    apiKey: API_KEY,
    apiSecret: API_SECRET,
    applicationId: APPLICATION_ID,
    privateKey: PRIVATE_KEY_PATH,
  })
  // options
);
messagesClient
  .send(
    new SMS({
      message_type: "text",
      to: "number",
      from: "Vonage APIs",
      text: "Hi from Python Code Nemesis",
    })
  )
  .then((resp) => console.log(resp))
  .catch((err) => console.error(err));
