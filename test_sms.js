const { Auth } = require("@vonage/auth");
const { Messages } = require("@vonage/messages");
const { SMS } = require("@vonage/messages");

PRIVATE_KEY_PATH = "private.key";

const messagesClient = new Messages(
  new Auth({
    apiKey: "7ba90928",
    apiSecret: "1daKAeaTFCBpXOKL",
    applicationId: "2ac0d24b-bd1b-4c88-8f47-1b359748ca8f",
    privateKey: PRIVATE_KEY_PATH,
  })
  // options
);

// const resp = messagesClient.send(
//   new SMS({
//     to: TO_NUMBER,
//     from: FROM_NUMBER,
//     text: MESSAGE,
//   })
// );

messagesClient
  .send(
    new SMS({
      to: "13128487404",
      from: "Vonage APIs",
      text: "Hi from Python Code Nemesis",
    })
  )
  .then((resp) => console.log(resp))
  .catch((err) => console.error(err));
