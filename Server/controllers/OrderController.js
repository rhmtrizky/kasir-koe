import Product from '../models/Product.js';
import mongoose from 'mongoose';
import Order from '../models/Order.js';

const generateUniqueId = () => {
  return Math.floor(Math.random() * 1000);
};

const index = async (req, res) => {
  try {
    const orders = await Order.find().populate('productIds');
    if (!orders) {
      throw { code: 500, message: 'Get order failed' };
    }
    return res.status(200).json({
      status: true,
      total: orders.length,
      orders,
    });
  } catch (err) {
    return res.status(err.code || 500).json({
      status: false,
      message: err.message,
    });
  }
};

// const index = async (req, res) => {
//   try {
//     let find = {
//       orderNumber: { $regex: `^${req.query.search}`, $options: 'i' },
//     };

//     let options = {
//       page: req.query.page || 1,
//       limit: req.query.limit || 10,
//     };

//     const orders = await Order.paginate(find, options);
//     console.log(orders);

//     if (!orders) {
//       throw { code: 500, message: 'GET_ORDERS_FAILED' };
//     }

//     return res.status(200).json({
//       status: true,
//       total: orders.totalDocs,
//       orders,
//     });
//   } catch (err) {
//     if (!err.code) {
//       err.code = 500;
//     }
//     return res.status(err.code).json({
//       status: false,
//       message: err.message,
//     });
//   }
// };

const store = async (req, res) => {
  try {
    const { productIds } = req.body;

    // Generate uniqueId if not provided
    const generatedUniqueId = generateUniqueId();

    // IS REQUIRED FIELDS
    if (!productIds || !Array.isArray(productIds) || productIds.length === 0) {
      throw { code: 428, message: 'ProductIds are required!' };
    }

    // Validate each productId
    for (const productId of productIds) {
      if (!mongoose.Types.ObjectId.isValid(productId)) {
        throw { code: 500, message: `ProductId ${productId} is invalid` };
      }

      // Check if product exists
      const productExist = await Product.findOne({ _id: productId });
      if (!productExist) {
        throw { code: 404, message: `Product with ID ${productId} not found!` };
      }
    }

    // Create new order
    const newOrder = new Order({
      orderNumber: generatedUniqueId,
      productIds,
    });

    const savedOrder = await newOrder.save();

    if (!savedOrder) {
      throw { code: 500, message: 'Store order failed' };
    }

    return res.status(200).json({
      status: true,
      order: savedOrder,
    });
  } catch (err) {
    return res.status(err.code || 500).json({
      status: false,
      message: err.message,
    });
  }
};

export { index, store };
