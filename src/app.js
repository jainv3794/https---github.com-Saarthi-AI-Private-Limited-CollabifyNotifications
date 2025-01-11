const express = require('express');
const bodyParser = require('body-parser');
const notificationController = require('./notificationController');

const app = express();
const port = process.env.PORT || 3000;

// Middleware
app.use(bodyParser.json());

// Routes
app.post('/notifications/send', notificationController.sendNotification);
app.post('/notifications/broadcast', notificationController.broadcastNotification);

// Start the server
app.listen(port, () => {
    console.log(`Notification service running on port ${port}`);
});
