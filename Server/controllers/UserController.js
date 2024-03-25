import { isEmailExist, isEmailExistWithUserId } from '../libraries/isEmailExist.js';
import user from '../models/User.js';
import bcrypt from 'bcrypt';

const index = async (req, res) => {
  try {
    let find = {
      fullname: { $regex: `^${req.query.search}`, $options: 'i' },
    };

    let options = {
      page: req.query.page || 1,
      limit: req.query.limit || 10,
    };

    const users = await user.paginate(find, options);

    if (!users) {
      throw { code: 500, message: 'GET_USERS_FAILED' };
    }

    return res.status(200).json({
      status: true,
      total: users.length,
      users,
    });
  } catch (err) {
    if (!err.code) {
      err.code = 500;
    }
    return res.status(err.code).json({
      status: false,
      message: err.message,
    });
  }
};

const store = async (req, res) => {
  try {
    if (!req.body.fullname) {
      throw { code: 428, message: 'Fullname is Required!' };
    }
    if (!req.body.email) {
      throw { code: 428, message: 'Email is Required!' };
    }
    if (!req.body.password) {
      throw { code: 428, message: 'Password is Required!' };
    }
    if (!req.body.role) {
      throw { code: 428, message: 'Role is Required!' };
    }

    // existing email cheking
    const emailExist = await isEmailExist(req.body.email);
    if (emailExist) {
      throw { code: 409, message: 'EMAIL_EXIST' };
    }

    // check is password match
    if (req.body.password !== req.body.retype_password) {
      throw { code: 428, message: 'PASSWORD_MUST_MATCH' };
    }

    // hash password
    let salt = await bcrypt.genSalt(10);
    let hashPassword = await bcrypt.hash(req.body.password, salt);

    const newUser = new user({
      fullname: req.body.fullname,
      email: req.body.email,
      password: hashPassword,
      role: req.body.role,
    });

    const User = await newUser.save();

    if (!User) {
      throw { code: 500, message: 'USER_REGISTER_FAILED' };
    }

    return res.status(200).json({
      status: true,
      message: 'USER_REGISTER_SUCCESS',
      User,
    });
  } catch (err) {
    if (!err.code) {
      err.code = 500;
    }
    return res.status(err.code).json({
      status: false,
      message: err.message,
    });
  }
};

const update = async (req, res) => {
  try {
    if (!req.body.fullname) {
      throw { code: 428, message: 'Fullname is Required!' };
    }
    if (!req.body.email) {
      throw { code: 428, message: 'Email is Required!' };
    }
    if (!req.body.password) {
      throw { code: 428, message: 'Password is Required!' };
    }
    if (!req.body.role) {
      throw { code: 428, message: 'Role is Required!' };
    }

    // existing email cheking
    const emailExist = await isEmailExistWithUserId(req.params.id, req.body.email);
    if (emailExist) {
      throw { code: 409, message: 'EMAIL_EXIST' };
    }

    // check is password match
    if (req.body.password !== req.body.retype_password) {
      throw { code: 428, message: 'PASSWORD_MUST_MATCH' };
    }

    let field = {};
    field.fullname = req.body.fullname;
    field.email = req.body.email;
    field.role = req.body.role;
    if (req.body.password) {
      // hash password
      let salt = await bcrypt.genSalt(10);
      let hashPassword = await bcrypt.hash(req.body.password, salt);
      field.password = hashPassword;
    }

    const User = await user.findByIdAndUpdate(req.params.id, field, { new: true });

    if (!User) {
      throw { code: 500, message: 'USER_UPDATE_FAILED' };
    }

    return res.status(200).json({
      status: true,
      message: 'USER_UPDATE_SUCCESS',
      User,
    });
  } catch (err) {
    if (!err.code) {
      err.code = 500;
    }
    return res.status(err.code).json({
      status: false,
      message: err.message,
    });
  }
};

export { index, store, update };
