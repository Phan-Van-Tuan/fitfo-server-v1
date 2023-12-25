const express = require('express');
const userRouter = require('./UserRoute');
const chatRouter = require('./ChatRoute');
const messageRouter = require('./MessageRoute');
const storyRouter = require('./StoryRoute');
const PostRouter = require('./PostRoute');
const CommentRouter = require('./CommentRoute');


const router = express.Router();

// Define routes
router.use('/chat/', chatRouter);
router.use('/chat/', (req, res) => { res.status(200).json("hello! this is chat router") });

router.use('/message/', messageRouter);
router.use('/message/', (req, res) => { res.status(200).json("hello! this is message router") });

router.use('/user/', userRouter);
router.use('/user/', (req, res) => { res.status(200).json("hello! this is user router") });

router.use('/story/', storyRouter);
router.use('/story/', (req, res) => { res.status(200).json("hello! this is story router") });

router.use('/post/', PostRouter);
router.use('/post/', (req, res) => { res.status(200).json("hello! this is post router") });

router.use('/comment/', CommentRouter);
router.use('/comment/', (req, res) => { res.status(200).json("hello! this is comment router") });

router.use('/', (req, res) => { res.status(200).send('Welcome to fitfo API') });

module.exports = router;
