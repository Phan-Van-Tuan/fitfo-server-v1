const express = require('express');
const userRouter = require('./UserRoute');

const router = express.Router();

// Define routes
router.use('/user', userRouter);
router.use('/user/', (req, res) => { res.status(200).json("hello! this is user router") });
router.use('/', (req, res) => { res.status(200).json("hello! this is respon message by API FITFO") });

module.exports = router;
