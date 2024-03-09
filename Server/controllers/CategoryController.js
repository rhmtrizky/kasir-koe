import category from '../models/Category.js';

const index = async (req, res) => {
  try {
    const categories = await category.find({ status: 'active' });

    if (!categories) {
      throw { code: 500, message: 'get category failed' };
    }

    return res.status(200).json({
      status: true,
      total: categories.length,
      categories,
    });
  } catch (err) {
    return res.status(err.code).json({
      status: false,
      message: err.message,
    });
  }
};

const store = async (req, res) => {
  try {
    if (!req.body.title) {
      throw { code: 428, message: 'Title is Required!' };
    }

    // existing category cheking
    const categotyExist = await category.findOne({ title: req.body.title });
    if (categotyExist) {
      throw { code: 409, message: 'Category Already Exist!' };
    }

    const title = req.body.title;

    const newCategory = new category({
      title: title,
    });

    const Category = await newCategory.save();

    if (!Category) {
      throw { code: 500, message: 'store category failed' };
    }

    return res.status(200).json({
      status: true,
      Category,
    });
  } catch (err) {
    return res.status(err.code).json({
      status: false,
      message: err.message,
    });
  }
};

export { index, store };
