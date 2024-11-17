const User = require('../model/userModel');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const register = async(req, res) => {
    const {name, email, password, role} = req.body;
    try {
     if(!name || !email || !password) {
         return res.status(400).json({
             message : 'All fields are required',
         });
     }
     const user = await User.findOne({email});
     if(user) {
         return res.status(400).json({
             message : 'User already exist with this email address',
         });
     }
     const hashedPassword = await bcrypt.hash(password, 10);
     const newUser = await User.create({
         name,
         email,
         password : hashedPassword,
         role
     });
     await newUser.save();
     return res.status(201).json({
         newUser,
         message : 'user registered successfully!',
     })
    } catch (error) {
      return res.status(500).json({
         message : 'Internal server error'
      });
    }
}

const login = async (req, res) => {
   try {
          const {email, password} = req.body;

          const user = await User.findOne({email});
          if(!user) {
            return res.status(404).json({
                message : 'user not found Register first',
            })
          }
          const matchPassword = await bcrypt.compare(password, user.password);
          if(!matchPassword) {
            return res.status(400).json({
                message : 'Invalid credentials'
            });
          }
         const token = jwt.sign({id : user._id, role : user.role}, process.env.JWT_SECRET, {expiresIn : '1h'})
        return res.status(200).json({
            token,
            user,
            message : 'user logged in successfully'
        });
   } catch (error) {
     return res.status(500).json({
        message : 'Internal server error'
     });
   }
}

module.exports = {register, login}