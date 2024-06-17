const AWS = require('aws-sdk');
const WebSocket = require('ws');
require('dotenv').config()

exports.handler = async (event) => {
    const websocketUrl = process.env.WEBSOCKET_URL;

    if (!websocketUrl) {
        console.error('WebSocket URL is not defined');
        return {
            statusCode: 500,
            body: JSON.stringify('WebSocket URL is not defined')
        };
    }

    const ws = new WebSocket(websocketUrl);

    const sendMessage = () => {
        ws.send(JSON.stringify({
            action: "sendmessage",
            message: "hello, everyone!"
        }));
    };

    ws.on('open', sendMessage);

    ws.on('error', (err) => {
        console.error('WebSocket error:', err);
    });

    return {
        statusCode: 200,
        body: JSON.stringify('Message sent successfully!')
    };
};
