const Post = require('./../models/post');

exports.getPosts = (req, res, next) => {
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
            error: {
                message: 'Error when trying to fetch posts.',
                ...err
            }
            })
        );
}

exports.getPostById = (req, res, next) => {
    Post.findById(req.params.id)
        .then((data) => {
            if(data) {
                res.status(200).json({
                    message: 'Get Post by Id Successful',
                    post: data
                });
            } else {
                res.status(404).json({
                    error: {
                        message: 'Post not found!',
                    }
                });
            }

        })
        .catch((err) => res.status(500).json({
            error: {
                message: 'Error when trying to fetch post based on id.',
                ...err
            }
            })
        );
}

exports.createPost = (req, res, next) => {
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
            error: {
                message: 'Error when trying to create post.',
                ...err
            }
            })
        )
}

exports.updatePost = (req, res, next) => {
    const url = req.protocol + "://" + req.get("host");
    const post = new Post({
        _id: req.params.id,
        title: req.body.title,
        content: req.body.content,
        imagePath: req.file?.filename ? url + "/images/" + req.file?.filename : req.body.imagePath,
        owner: req.userData.userId
    });

    Post.updateOne({ _id: req.params.id, owner: req.userData.userId }, post)
        .then((resp) => {
            if(resp.modifiedCount > 0) {
                res.status(200).json({
                    message: 'Post updated!'
                });
            } else {
                res.status(401).json({
                    error: {
                        message: 'User Unauthorized!'
                    }
                });
            }
        })
        .catch((err) => res.status(500).json({
            error: {
                message: 'Error when trying to update post: ' + err
            }
            })
        )
}

exports.deletePost = (req, res) => {
    Post.deleteOne({ _id: req.params.id, owner: req.userData.userId })
        .then((resp) => {
            if(resp.deletedCount > 0) {
                res.status(200).json({
                    message: 'Post deleted!'
                });
            } else {
                res.status(401).json({
                    error: {
                        message: 'User Unauthorized!'
                    }
                });
            }
        })
        .catch((err) => res.status(500).json({
            error: {
                message: 'Error when trying to delete post.',
                ...err
            }
            })
        );
}