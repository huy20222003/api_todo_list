import dotenv from 'dotenv';
dotenv.config();
import Roles from '../app/models/Roles.mjs';

const authorizeRoles = (requiredRoles) => {
    return async (req, res, next) => {
      try {
        const userRoles = await Roles.find({ userId: req._id });
  
        const hasRequiredRole = userRoles.some((role) =>
          requiredRoles.includes(role.name)
        );
  
        if (!hasRequiredRole) {
          return res.status(403).json({success: false, message: 'Access denied' });
        }
  
        next();
      } catch (error) {
        res.status(500).json({ success: false, message: 'Internal server' });
      }
    };
  };
  

export default authorizeRoles;
