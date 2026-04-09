const express = require('express');
const router  = express.Router();
const ctrl    = require('../controllers/authController');

router.post('/login',    ctrl.postLogin);
router.post('/register', ctrl.postRegister);
router.post('/logout',   ctrl.logout);
router.get('/me',        ctrl.getMe);

module.exports = router;