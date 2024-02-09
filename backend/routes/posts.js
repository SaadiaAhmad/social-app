const express = require('express');
const multer = require('multer');

const Post = require('./../models/post');
const checkAuth = require('../middleware/check-auth');

const MIME_TYPE_MAP = {
    'image/png': 'png',
    'image/jpeg': 'jpg',
    'image/jpg': 'jpg'
}

const router = express.Router();
const storage = multer.diskStorage({
    destination: (req, file, cb) => { 
        const isValid = MIME_TYPE_MAP[file.mimetype];
        let error = new Error("Invalid mime type for image file");
        if(isValid) error = null;
        cb(error, "backend/images"); 
    },
    filename: (req, file, cb) => {
        const name = file.originalname.toLowerCase().split(' ').join('-');
        const ext = MIME_TYPE_MAP[file.mimetype];
        cb(null, name + "-" + Date.now() + "." + ext);
    }
});

router.get('', (req, res, next) => {
    const pageSize = +req.query.pagesize;
    const currentPage = +req.query.page;
    let totalPosts = 0;
    const postQuery = Post.find();

    if(pageSize && currentPage) {
        postQuery
            .skip(pageSize * (currentPage - 1))
            .limit(pageSize);
    }

    Post.countDocuments()
        .then(count => {
            totalPosts = count;
            return postQuery;
        })
        .then((data) => {
            res.status(200).json({
                message: 'Get Posts Successful',
                posts: data,
                totalPosts: totalPosts
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
                    message: 'Get Post by Id Successful',
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

router.post('', checkAuth, multer({storage}).single("image"), (req, res, next) => {
    const url = req.protocol + "://" + req.get("host");
    const post = new Post({
        title: req.body.title,
        content: req.body.content,
        imagePath: req.file?.filename ? url + "/images/" + req.file?.filename : null,
        owner: req.userData.userId
    });

    post.save()
        .then((resp) => res.status(201).json({
            message: 'Post added!',
            post: {
                ...resp,
                id: resp._id,
            }
        }))
        .catch((err) => res.status(500).json({
            message: 'Error when trying to create post: ' + err
            })
        )
});

router.put('/:id', checkAuth, multer({storage}).single("image"), (req, res, next) => {
    const url = req.protocol + "://" + req.get("host");
    const post = new Post({
        _id: req.params.id,
        title: req.body.title,
        content: req.body.content,
        imagePath: req.file?.filename ? url + "/images/" + req.file?.filename : req.body.imagePath
    });

    Post.updateOne({ _id: req.params.id, owner: req.userData.userId }, post)
        .then((resp) => {
            if(resp.modifiedCount > 0) {
                res.status(200).json({
                    message: 'Post updated!'
                });
            } else {
                res.status(401).json({
                    message: 'User Unauthorized!'
                });
            }
        })
        .catch((err) => res.status(500).json({
            message: 'Error when trying to update post: ' + err
            })
        )
});

router.delete('/:id', checkAuth, (req, res) => {
    Post.deleteOne({ _id: req.params.id, owner: req.userData.userId })
        .then((resp) => {
            if(resp.deletedCount > 0) {
                res.status(200).json({
                    message: 'Post deleted!'
                });
            } else {
                res.status(401).json({
                    message: 'User Unauthorized!'
                });
            }
        })
        .catch((err) => res.status(500).json({
            message: 'Error when trying to delete: ' + err
            })
        );
});

module.exports = router;