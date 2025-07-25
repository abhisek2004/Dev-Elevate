import userModel from "../model/userModel.js";
import bcrypt from 'bcrypt';

const authController = {
  register: async (req, res) => {
    const { username, password, email, role } = req.body;
    try{
      await userModel.create({
        username,
        password : await bcrypt.hash(password, 10), // Hash the password
        email,
        role,
        createdAt: new Date()
      });
      res.status(201).json({
        message: 'Registration successful',
        user: { username, email, role }
      });
    }catch(err){
      res.status(500).json({
        message: 'Registration failed',
        error: err.message
      })
    }
  },
  login: async (req, res) => {
      const {email , password} = req.body;
      try{
        const foundUser = await userModel.findOne({ email });
        if(!foundUser) {
          return res.status(404).json({ message: 'User not found' });
        }
        const isPasswordValid = await bcrypt.compare(password, foundUser.password);
        if(!isPasswordValid) {
          return res.status(401).json({ message: 'Invalid password' });
        }
        res.status(200).json({
          message: 'Login successful'
        });
      }catch(err){
        res.status(500).json({
          message: 'Login failed',
          error: err.message
        });
      }
  }
};

export default authController;