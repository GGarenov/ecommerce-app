const {
  createPayPalOrder,
  capturePayPalPayment,
} = require("../../helpers/paypal");
const Order = require("../../models/Order");
const Cart = require("../../models/Cart");

const createOrder = async (req, res) => {
  try {
    const {
      userId,
      cartItems,
      addressInfo,
      orderStatus,
      paymentMethod,
      paymentStatus,
      totalAmount,
      orderDate,
      orderUpdateDate,
      cartId,
    } = req.body;

    // Step 1: Create PayPal order
    const paypalOrder = await createPayPalOrder(totalAmount);

    // Step 2: Save your order in DB with PayPal order ID
    const newOrder = new Order({
      userId,
      cartItems,
      addressInfo,
      orderStatus,
      paymentMethod,
      paymentStatus,
      totalAmount,
      orderDate,
      orderUpdateDate,
      paymentId: paypalOrder.id, // Store PayPal order ID here
      cartId,
    });

    await newOrder.save();

    // Step 3: Return approval URL
    const approvalUrl = paypalOrder.links.find(
      (link) => link.rel === "approve"
    ).href;

    res.status(201).json({
      success: true,
      approvalURL: approvalUrl,
      orderId: newOrder._id,
      paypalOrderId: paypalOrder.id,
    });
  } catch (error) {
    console.error("PayPal Create Order Error:", error);
    res.status(500).json({
      success: false,
      message: "Error creating PayPal order",
      error: error.message,
    });
  }
};

const capturePayment = async (req, res) => {
  try {
    const { paymentId, payerId, orderId } = req.body;

    let order = await Order.findById(orderId);

    if (!order) {
      return res.status(404).json({
        success: false,
        message: "Order can not be found",
      });
    }

    order.paymentStatus = "paid";
    order.orderStatus = "confirmed";
    order.paymentId = paymentId;
    order.payerId = payerId;

    for (let item of order.cartItems) {
      let product = await Product.findById(item.productId);

      if (!product) {
        return res.status(404).json({
          success: false,
          message: `Not enough stock for this product ${product.title}`,
        });
      }

      product.totalStock -= item.quantity;

      await product.save();
    }

    const getCartId = order.cartId;
    await Cart.findByIdAndDelete(getCartId);

    await order.save();

    res.status(200).json({
      success: true,
      message: "Order confirmed",
      data: order,
    });
  } catch (e) {
    console.log(e);
    res.status(500).json({
      success: false,
      message: "Some error occured!",
    });
  }
};

module.exports = { createOrder, capturePayment };
