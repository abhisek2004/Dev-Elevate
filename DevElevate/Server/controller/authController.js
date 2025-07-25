import userModel from "../model/userModel.js";

const authController = {
  register: async (req, res) => {
    const { username, password, email, role } = req.body;
    //make sure to validate the input data
    try{
      await userModel.create({
        username,
        password,
        email,
        role,
        createdAt: new Date()
      });
      res.json({
        message: 'Registration successful',
        user: { username, email, role }
      });
    }catch(err){
      res.json({
        message: 'Registration failed',
        error: err.message
      })
    }
  },
  login: (req, res) => {
    res.json({ message: 'Login successful' });
  }
};

export default authController;