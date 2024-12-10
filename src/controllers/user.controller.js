import { User } from "../models/user.model.js";


export const getUserProfile = async (req, res ,next) => {
    try {
      const userId = req.userId;
  
      const user = await User.findById(userId).select("username email role");

      if (!user) {
        const error = new Error("User not found");
        error.statusCode = 404;
        throw error;
      }   
  
      res.status(200).json(user);
    } catch (error) {
      next(error);
    }
  };

  export const makeAdmin = async (req, res, next) => {
    const { id } = req.params;
    const userId = req.userId;
  
    try {
      const user = await User.findById(id);
  
      if (!user) {
        const error = new Error("User not found");
        error.statusCode = 404;
        throw error;
      }

      const requestingUser = await User.findById(userId);
  
      if (!requestingUser || requestingUser.role !== 'admin') {
        const error = new Error("You do not have permission to make someone an admin");
        error.statusCode = 403; 
        throw error;
      }
  
      user.role = 'admin';
      await user.save();
  
      res.status(200).json({ message: 'User role updated to admin' });
  
    } catch (error) {
      next(error); 
    }
  };
  