var jwt = require('jsonwebtoken');

const { ACCESS_TOKEN_EXPIRE, ACCESS_TOKEN_SECRET } = process.env

// console.log(ACCESS_TOKEN_EXPIRE, ACCESS_TOKEN_SECRET)

const generateAccessToken = (data) => {
    return jwt.sign({
        data: data,

    },
        ACCESS_TOKEN_SECRET,
        { expiresIn: ACCESS_TOKEN_EXPIRE }
    )
}

const decodeAccessToken = (token) => {
    return jwt.verify(token, ACCESS_TOKEN_SECRET);
}

module.exports = { generateAccessToken, decodeAccessToken };