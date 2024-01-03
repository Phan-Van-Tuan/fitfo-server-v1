const UserModel = require('../models/UserModel');
const { generateAccessToken, decodeAccessToken } = require('../helpers/jwt');
const validator = require('validator');
const bcrypt = require('bcrypt');

class UserController {
  async register(req, res) {
    try {
      const { name, phoneNumber, email, password } = req.body;

      let user = await UserModel.findOne({ phoneNumber });

      // Validate
      if (user)
        return res.status(400).json({ error: "The user with the given phone number already exist..." });

      if (!name || !password || !phoneNumber)
        return res.status(400).json({ error: "All fields are required..." });

      if (!validator.isMobilePhone(phoneNumber, 'vi-VN', { strictMode: false }))
        return res.status(400).json({ error: "Phone number must be a valid phone number..." });

      if (!validator.isEmail(email))
        return res.status(400).json({ error: "Email must be a valid email..." });

      if (!validator.isStrongPassword(password))
        return res.status(400).json({ error: "Password must be a strong password..." });

      user = new UserModel({ name, phoneNumber, email, password });

      const salt = await bcrypt.genSalt(10);
      user.password = await bcrypt.hash(user.password, salt);

      await user.save();
      res.status(200).json({ message: "Registered successfully!" });

    } catch (error) {
      // console.log(error);
      res.status(500).json({ error: "Registration failed!" });
    }
  }

  async login(req, res) {
    try {
      const { phoneNumber, password } = req.body;

      const user = await UserModel.findOne({ phoneNumber });

      if (!user)
        return res.status(400).json({ error: "Account does not exist..." });

      const isValidPassword = await bcrypt.compare(password, user.password);

      if (!isValidPassword)
        return res.status(400).json({ error: "Invalid email or password..." });

      const token = generateAccessToken(user._id)

      res.status(200).json({ id: user._id, name: user.name, phoneNumber: user.phoneNumber, token });

    } catch (error) {
      // console.log(error)
      res.status(500).json({ error: "Login failed!" });
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
      res.status(200).json({ message: 'Updated user successfully' });
    } catch (error) {
      // console.error(error);
      res.status(500).json({ error: 'Internal Server Error' });
    }
  }

  async updateAvatar(req, res) {
    try {
      const userId = req.params.id;
      const newAvatar = req.body.avatar;

      // Sử dụng findByIdAndUpdate để cập nhật avatar của người dùng
      await UserModel.findByIdAndUpdate(userId, { avatar: newAvatar }, { new: true });

      res.status(200).json({ message: 'Updated avatar successfully' });
    } catch (error) {
      console.error('Lỗi khi cập nhật avatar:', error);
      res.status(500).json({ error: 'Internal Server Error' });
    }
  }

  async delete(req, res) {
    try {
      await UserModel.findByIdAndDelete(req.params.id);
      res.status(200).json({ message: 'Deleted user successfully' });
    } catch (error) {
      // console.error(error);
      res.status(500).json({ error: 'Internal Server Error' });
    }
  }

  async getUserById(req, res) {
    try {
      const userId = req.params.id;
      const user = await UserModel.findById(userId);
      res.status(200).json({ id: user._id, name: user.name, phoneNumber: user.phoneNumber });
    } catch (error) {
      // console.error(error);
      res.status(500).json({ error: 'Internal Server Error' });
    }
  }

  async getUserByPhoneNumber(req, res) {
    try {
      const phoneNumber = req.params.phoneNumber;
      const user = await UserModel.findOne({ phoneNumber: phoneNumber });
      res.status(200).json({ id: user._id, name: user.name, phoneNumber: user.phoneNumber });
    } catch (error) {
      // console.error(error);
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
      // console.error(error);
      res.status(500).json({ error: 'Internal Server Error' });
    }
  }

};

module.exports = new UserController;
