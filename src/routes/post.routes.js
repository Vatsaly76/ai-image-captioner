const express = require('express');
const router = express.Router();
const authmiddleware = require('../middlewares/auth.middleware');
const { createPostController } = require('../controllers/post.controller');
const multer = require('multer');

const upload = multer({storage: multer.memoryStorage()})

router.post('/', 
    authmiddleware,
    upload.single("image"),
    createPostController
)

module.exports = router;