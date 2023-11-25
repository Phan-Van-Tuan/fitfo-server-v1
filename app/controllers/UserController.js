const User = require("../modela/User");
const bcrypt = require('bcrypt');
const { generateAccessToken, decodeAccessToken } = require('../helpers/jwt')
const saltRounds = 3;

class UserController {
  async register(req, res) {
    const { name, email, password } = req.body;
    bcrypt.hash(password.toString(), saltRounds, async function(err, hash) {
      const response = await User.create({
        name,
        email,
        password: hash
      })
      res.json(response);
    });
    
    
  }
  async login(req, res) {
    const {email, password} = req.body;

    const user = await User.findOne({ email: email}).exec();
    if(!user) {
      res.status(401).json({
        message: "Login Failed"
      })
      return
    }

    const { password: hash} = user;
    bcrypt.compare(password, hash, function(err, result) {
      if(result) {
        const accessToken = generateAccessToken({
          email: user.email,
          name: user.name,
        });

        res.json({ status: result , accessToken: accessToken});
        return;
      }

      res.status(401).json({
        code: 401,
        message: "Login Failed"
      });

  });
  }

  async profile(req, res) {
    const bearerToken = req.get("Authorization");
    if (bearerToken) {
      const accessToken = bearerToken.replace("Bearer", "").trim();
      const decode = decodeAccessToken(accessToken)
      res.json({decode});
    }
  }
};

module.exports = new UserController;
