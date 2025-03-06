const express = require('express');
const router = express.Router();
const { registerUser, getUsers, loginUser } = require('../controllers/usercontroller');

router.post('/register', registerUser);

router.post('/login', loginUser);

router.get('/users', getUsers);

module.exports = router;
