const express = require('express');

const checkAuth = require('../middleware/check-auth');
const imageFile = require('../middleware/image-file');

const PostsController = require('../controllers/posts');

const router = express.Router();

router.get('', PostsController.getPosts);

router.get('/:id', PostsController.getPostById);

router.post('', checkAuth, imageFile, PostsController.createPost);

router.put('/:id', checkAuth, imageFile, PostsController.updatePost);

router.delete('/:id', checkAuth, PostsController.deletePost);

module.exports = router;