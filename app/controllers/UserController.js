const { generateAccessToken, decodeAccessToken } = require('../helpers/jwt');
const UserModel = require('../models/UserModel');
const validator = require('validator');
const bcrypt = require('bcrypt');

class UserController {
  async register(req, res) {
    try {
      const { name, phoneNumber, email, password } = req.body;

      let user = await UserModel.findOne({ phoneNumber });

      // Validate
      if (user)
        return res.status(400).json("The user with the given phone number already exist...");

      if (!name || !password || !phoneNumber)
        return res.status(400).json("All fields are required...");

      if (!validator.isMobilePhone(phoneNumber, 'any', { strictMode: false }))
        return res.status(400).json("Phone number must be a valid phone number...");

      if (!validator.isEmail(email))
        return res.status(400).json("Email must be a valid email...");

      if (!validator.isStrongPassword(password))
        return res.status(400).json("Password must be a strong password...");

      user = new UserModel({ name, phoneNumber, email, password });

      const salt = await bcrypt.genSalt(10);
      user.password = await bcrypt.hash(user.password, salt);

      await user.save();

      const token = generateAccessToken(user._id);

      res.status(200).json({ id: user._id, name, phoneNumber, email, token });

    } catch (error) {
      console.log(error);
      res.status(500).json('error');
    }
  }

  async login(req, res) {
    try {
      const { phoneNumber, password } = req.body;

      const user = await UserModel.findOne({ phoneNumber });

      if (!user)
        return res.status(401).json("Login Failed");

      const isValidPassword = await bcrypt.compare(password, user.password);

      if (!isValidPassword)
        return res.status(401).json("Invalid email or password");

      const token = generateAccessToken(user._id)

      res.status(200).json({ id: user._id, name: user.name, phoneNumber: user.phoneNumber, token });

    } catch (error) {
      console.log(error)
      res.status(500).json('error')
    }
  }

  async profile(req, res) {
    const bearerToken = req.get("Authorization");
    if (bearerToken) {
      const accessToken = bearerToken.replace("Bearer", "").trim();
      const decode = decodeAccessToken(accessToken)
      res.json({ decode });
    }
  }

  async update(req, res) {
    try {
      // Logic to update a user by ID in the database
      // Example using Mongoose:
      await UserModel.findByIdAndUpdate(req.params.id, req.body, { new: true });
      // res.json(updatedUser);
      // const userId = req.params.id;
      // res.send(`Update user with ID ${userId}`);
      res.status(200).json({ message: 'Update user succeed' });
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Internal Server Error' });
    }
  }

  async delete(req, res) {
    try {
      await UserModel.findByIdAndDelete(req.params.id);
      res.status(200).json({ message: 'Delete user succeed' });
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Internal Server Error' });
    }
  }

  async getUserById(req, res) {
    try {
      const userId = req.params.id;
      const user = await UserModel.findById(userId);
      res.status(200).json({ id: user._id, name: user.name, phoneNumber: user.phoneNumber });
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Internal Server Error' });
    }
  }

  async getAllUsers(req, res) {
    try {
      // Logic to get all users from the database
      // Example using Mongoose:
      const users = await UserModel.find();
      res.status(200).json(users);
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Internal Server Error' });
    }
  }

};

module.exports = new UserController;
