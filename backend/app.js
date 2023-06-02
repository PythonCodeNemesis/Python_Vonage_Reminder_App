const express = require("express");
const app = express();
const cors = require("cors");
const { SMS } = require("@vonage/messages");
const schedule = require("node-schedule");
const { Auth } = require("@vonage/auth");
const { Messages } = require("@vonage/messages");

PRIVATE_KEY_PATH = "private.key";

// A list to store phone numbers and frequency of reminders

const subscribers = [];

const messagesClient = new Messages(
  new Auth({
    apiKey: API_KEY,
    apiSecret: API_SECRET,
    applicationId: APPLICATION_ID,
    privateKey: PRIVATE_KEY_PATH,
  })
  // options
);

function sendReminders(phoneNumber) {
  const from = "Reminder App";
  const to = phoneNumber;
  const text = "This is your reminder to have a glass of water!";

  messagesClient
    .send(
      new SMS({
        message_type: "text",
        to: to,
        from: from,
        text: text,
      })
    )
    .then((resp) => console.log(resp))
    .catch((err) => console.error(err));
}

app.use(cors());
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.post("/sign-up", (req, res) => {
  const phoneNumber = req.body.phoneNumber;
  const frequency = req.body.frequency;

  // Add the phone number and frequency to the subscribers list
  subscribers.push({ phone_number: phoneNumber, frequency: frequency });

  const from = "Reminder App";
  const to = phoneNumber;
  const text =
    "Welcome to the Drinking Water Reminder App! You will receive reminders as per your selected frequency.";

  messagesClient
    .send(
      new SMS({
        message_type: "text",
        to: phoneNumber,
        from: from,
        text: text,
      })
    )
    .then((resp) => console.log(resp))
    .catch((err) => console.error(err));

  schedule.scheduleJob(`*/${frequency} * * * *`, () => {
    sendReminders(phoneNumber);
  });

  console.log(
    `Send message to ${phoneNumber} with frequency ${frequency} minute`
  );

  res.status(200).json({ status: "ok" });
});

app.listen(5000, () => {
  console.log("Server started on port 5000");
});
