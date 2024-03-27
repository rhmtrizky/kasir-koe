import jsonwebtoken from 'jsonwebtoken';
import dotenv from 'dotenv';

const env = dotenv.config().parsed;

const role = (whoCanAccess) => {
  return function (req, res, next) {
    try {
      if (whoCanAccess.includes(req.jwt.role)) {
        next();
      } else {
        throw { message: 'UNAUTHORIZED_ROLE' };
      }
    } catch (err) {
      return res.status(401).json({
        status: false,
        message: err.message,
      });
    }
  };
};

export default role;
