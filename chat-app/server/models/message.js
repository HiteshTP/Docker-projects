const mongoose = require('mongoose');

// Create a schema for chat messages
const messageSchema = new mongoose.Schema({
    content: {
        type: String,
        required: true,
    },
    createdAt: {
        type: Date,
        default: Date.now,
    },
});

// Create a model based on the schema
const Message = mongoose.model('Message', messageSchema);

module.exports = Message;
