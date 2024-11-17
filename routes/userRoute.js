const express = require('express');
const router = express.Router();


const verifyToken = require('../middleware/authMiddleware');
const authorizeRoles = require('../middleware/roleMiddleware');
// Only admin can access this route
router.get('/admin', verifyToken, authorizeRoles("admin"), (req, res) => {
    res.json({message : 'Well come admin'})
})
// both admin & manager can access this route

router.get('/manager', verifyToken, authorizeRoles("manager, admin, user "), (req, res) => {
    res.json({message : 'Well come managr'})
})

// all can access this route

router.get('/user',verifyToken, authorizeRoles("manager", "admin", "user"), (req, res) => {
    res.json({message : 'Well come user'})
})


module.exports = router