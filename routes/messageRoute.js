const express = require('express');
const router = express.Router();

const { sendMessage, getMessage} = require('../controllers/messageController');

router.post('/sendmsg', sendMessage);
router.get('/receive', getMessage);

module.exports = router