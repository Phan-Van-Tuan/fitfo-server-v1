const express = require('express');
const userRouter = require('./UserRoute');
const chatRouter = require('./ChatRoute');
const messageRouter = require('./MessageRoute');

const router = express.Router();

// Define routes
router.use('/chats/', chatRouter);
router.use('/chats/', (req, res) => { res.status(200).json("hello! this is chat router") });

router.use('/messages/', messageRouter);
router.use('/messages/', (req, res) => { res.status(200).json("hello! this is message router") });

router.use('/users/', userRouter);
router.use('/users/', (req, res) => { res.status(200).json("hello! this is user router") });

router.use('/', (req, res) => { res.status(200).send('Welcome to fitfo API') });

module.exports = router;
