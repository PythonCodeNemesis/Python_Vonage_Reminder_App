const { Auth } = require("@vonage/auth");
const { Messages } = require("@vonage/messages");
const { SMS } = require("@vonage/messages");

PRIVATE_KEY_PATH = "private.key";

const resp = messagesClient
  .send(
    new SMS({
      to: TO_NUMBER,
      from: FROM_NUMBER,
      text: MESSAGE,
    })
  )
  .then((resp) => console.log(resp))
  .catch((err) => console.error(err));
