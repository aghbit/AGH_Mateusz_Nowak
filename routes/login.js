const express = require('express');
const router = express.Router();
const loginController = require('../controllers/loginController');
const {isNotLoggedIn, isLoggedIn} = require('../middleware/sessionMiddleware')

router.post('/login', isNotLoggedIn, loginController.loginPost);
router.get('/logout', isLoggedIn, loginController.logout);
module.exports = router;