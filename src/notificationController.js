const AWS = require('aws-sdk');
require('dotenv').config();

// Configure AWS SDK
AWS.config.update({ region: process.env.AWS_REGION });
const sns = new AWS.SNS();

/**
 * Send a notification to a specific user.
 */
exports.sendNotification = async (req, res) => {
    const { message, subject, recipient } = req.body;

    if (!message || !recipient) {
        return res.status(400).json({ error: 'Message and recipient are required.' });
    }

    const params = {
        Message: message,
        Subject: subject || 'Notification Service',
        TopicArn: process.env.SNS_TOPIC_ARN,
    };

    try {
        await sns.publish(params).promise();
        res.status(200).json({ message: 'Notification sent successfully!' });
    } catch (error) {
        console.error('Error sending notification:', error);
        res.status(500).json({ error: 'Failed to send notification.' });
    }
};

/**
 * Broadcast a notification to all users.
 */
exports.broadcastNotification = async (req, res) => {
    const { message, subject } = req.body;

    if (!message) {
        return res.status(400).json({ error: 'Message is required.' });
    }

    const params = {
        Message: message,
        Subject: subject || 'Broadcast Notification',
        TopicArn: process.env.SNS_TOPIC_ARN,
    };

    try {
        await sns.publish(params).promise();
        res.status(200).json({ message: 'Broadcast notification sent successfully!' });
    } catch (error) {
        console.error('Error broadcasting notification:', error);
        res.status(500).json({ error: 'Failed to broadcast notification.' });
    }
};
