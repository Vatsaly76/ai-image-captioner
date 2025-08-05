const express = require('express');
const router = express.Router();
const authmiddleware = require('../middlewares/auth.middleware')


router.post('/', authmiddleware, createPostController);

module.exports = router;