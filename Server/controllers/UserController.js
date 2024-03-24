import user from '../models/User.js';

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

export { index };
