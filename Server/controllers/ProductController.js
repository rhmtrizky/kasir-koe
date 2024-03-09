import category from '../models/Category.js';
import product from '../models/Product.js';
import mongoose from 'mongoose';

const index = async (req, res) => {
  try {
    const products = await product.find({ status: 'active' });
    if (!products) {
      throw { code: 500, message: 'get product failed' };
    }
    return res.status(200).json({
      status: true,
      total: products.length,
      products,
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
    // IS REQUIRED FIELDS
    if (!req.body.title) {
      throw { code: 428, message: 'Title is Required!' };
    }
    if (!req.body.thumbnail) {
      throw { code: 428, message: 'Thumbnail is Required!' };
    }
    if (!req.body.price) {
      throw { code: 428, message: 'Price is Required!' };
    }
    if (!req.body.categoryId) {
      throw { code: 428, message: 'CategoryId is Required!' };
    }

    // EXISTING PRODUCT CHEKING
    const productExist = await product.findOne({ title: req.body.title });
    if (productExist) {
      throw { code: 409, message: 'Product Already Exist!' };
    }

    // is objectId
    if (!mongoose.Types.ObjectId.isValid(req.body.categoryId)) {
      throw { code: 500, message: 'CategoryId invalid' };
    }

    // is category exist
    const categoryExist = await category.findOne({ _id: req.body.categoryId });
    if (!categoryExist) {
      throw { code: 404, message: 'Category Not Found!' };
    }

    const body = req.body;
    const newProduct = new product({
      title: body.title,
      thumbnail: body.thumbnail,
      price: body.price,
      categoryId: body.categoryId,
    });

    const Product = await newProduct.save();

    if (!Product) {
      throw { code: 500, message: 'store product failed' };
    }

    return res.status(200).json({
      status: true,
      Product,
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

export { index, store };
