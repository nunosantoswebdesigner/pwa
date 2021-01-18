const express = require("express");
const webpush = require("web-push");
// const vapidKeys = webpush.generateVAPIDKeys()
const bodyParser = require("body-parser");
const path = require("path");

const app = express();

// Set static path
app.use(express.static(path.join(__dirname, "client")));

app.use(bodyParser.json());

const publicVapidKey =
  "BL95UNKrl5k0MP-2QZllWYUV4JU4vzHXSr9GgKKwtS-PQ2Xw4sSciRHTl-0R-roUcUhcTzQ7RlssTeLH4wQv1yQ";
const privateVapidKey = "ZI42x3JL1TVyHfVUEm84SsxjIN2jBRQDvi5E-A02iJw";

webpush.setVapidDetails(
  "mailto:test@test.com",
  publicVapidKey,
  privateVapidKey
);

// Subscribe Route
app.post("/subscribe", (req, res) => {
  // Get pushSubscription object
  const subscription = req.body;

  // Send 201 - resource created
  res.status(201).json({});

  // Create payload
  const payload = JSON.stringify({ title: "Swiss Ski " });

  // Pass object into sendNotification
  webpush
    .sendNotification(subscription, payload)
    .catch(err => console.error(err));
});

const port = 1111;

app.listen(port, () => console.log(`Server started on port ${port}`));
