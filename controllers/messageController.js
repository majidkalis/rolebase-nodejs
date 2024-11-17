const Message = require('../model/messageModel');


const sendMessage = async (req, res) => {
    try {
        const { content } = req.body;

        const newMessage = new Message({ content });
        await newMessage.save();

        res.status(201).json({
            success: true,
            message: 'Message sent successfully',
            data: newMessage,
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({
            success: false,
            message: 'Server error',
        });
    }
};


const getMessage = async (req, res) => {
    try {
        const messages = await Message.find({}).sort({ createdAt: -1 });

        res.status(200).json({
            success: true,
            data: messages,
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({
            success: false,
            message: 'Server error',
        });
    }
};

module.exports = { sendMessage, getMessage };
