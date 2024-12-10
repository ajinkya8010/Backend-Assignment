import jwt from "jsonwebtoken";
import { User } from "../models/user.model.js";
import bcrypt from "bcrypt";

export const register = async (req, res, next) => {
    try {

      const { username, email, password } = req.body;
  
      const existingUser = await User.findOne({ username });
      if (existingUser) {
        const error = new Error("User with this username already exists");
        error.statusCode = 400; 
        throw error;
      }

      const salt = await bcrypt.genSalt(10);
      const hashedPassword = await bcrypt.hash(password, salt);

      const newUser = new User({ username, email, password: hashedPassword });
      const savedUser = await newUser.save();
  
      console.log("New user has been saved!");
  
      const { password: userPassword, ...userInfo } = savedUser._doc;
  
      res.status(201).json({ message: "User registered successfully!", user: userInfo });

    } catch (error) {
      next(error);
    }
};


export const login = async (req, res,next) => {
  try {

    const { username, password } = req.body;

    const user = await User.findOne({ username });
    if (!user) {
      const error = new Error("Invalid username or password");
      error.statusCode = 400; 
      throw error;
    }

    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      const error = new Error("Invalid username or password");
      error.statusCode = 400; 
      throw error;
    }

    const age = 7 * 24 * 60 * 60;

    const token = jwt.sign(
      {
        id: user._id,
        isAdmin: user.role === "admin",
      },
      process.env.JWT_SECRET_KEY,
      { expiresIn: age }
    );

    const { password: userPassword, ...userInfo } = user._doc;

    res
      .cookie("token", token, {
        httpOnly: true, 
        maxAge: age * 1000,
      })
      .status(200)
      .json({ message: "Login successful", token });
      
  } catch (error) {
    next(error);
  }
};


export const logout = (req, res) => {
  res.clearCookie("token").status(200).json({ message: "Logout Successful" });
};
