const express = require('express');
const Post = require('./../models/post');

const router = express.Router();

router.get('', (req, res, next) => {
    Post.find()
        .then((data) => {
            res.status(200).json({
                message: 'Get Posts Successful',
                posts: data
            });
        })
        .catch((err) => res.status(500).json({
            message: 'Error when trying to fetch posts: ' + err
            })
        );
});

router.get('/:id', (req, res, next) => {
    Post.findById(req.params.id)
        .then((data) => {
            if(data) {
                res.status(200).json({
                    message: 'Get Posts Successful',
                    post: data
                });
            } else {
                res.status(404).json({
                    message: 'Post not found!',
                });
            }

        })
        .catch((err) => res.status(500).json({
            message: 'Error when trying to fetch post based on id: ' + err
            })
        );
});

router.post('', (req, res, next) => {
    const post = new Post({
        title: req.body.title,
        content: req.body.content
    });

    post.save()
        .then((resp) => res.status(201).json({
            message: 'Post added!',
            id: resp._id
            })
        )
        .catch((err) => res.status(500).json({
            message: 'Error when trying to create post: ' + err
            })
        )
});

router.put('/:id', (req, res, next) => {
    const post = new Post({
        _id: req.params.id,
        title: req.body.title,
        content: req.body.content
    });

    Post.updateOne({ _id: req.params.id }, post)
        .then((resp) => res.status(200).json({
            message: 'Post updated!'
            })
        )
        .catch((err) => res.status(500).json({
            message: 'Error when trying to update post: ' + err
            })
        )
});

router.delete('/:id', (req, res) => {
    Post.deleteOne({ _id: req.params.id })
        .then((resp) => res.status(200).json({
                message: 'Post deleted!'
            })
        )
        .catch((err) => res.status(500).json({
            message: 'Error when trying to delete: ' + err
            })
        );
});

module.exports = router;