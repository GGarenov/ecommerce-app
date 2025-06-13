const {
  createPayPalOrder,
  capturePayPalPayment,
} = require("../../helpers/paypal");
const Order = require("../../models/Order");

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
    const { orderId } = req.body; // This is the PayPal Order ID returned earlier

    // Step 1: Capture the PayPal payment
    const captureResult = await capturePayPalPayment(orderId);

    // Step 2: Get capture ID
    const captureId = captureResult.purchase_units[0].payments.captures[0].id;

    // Step 3: Update your Order model in MongoDB to mark as paid
    await Order.findOneAndUpdate(
      { paymentId: orderId },
      {
        paymentStatus: "paid",
        payerId: captureResult.payer.payer_id,
        orderUpdateDate: new Date(),
      }
    );

    res.status(200).json({
      success: true,
      message: "Payment captured successfully",
      captureId,
      paymentDetails: captureResult,
    });
  } catch (error) {
    console.error("PayPal Capture Error:", error);
    res.status(500).json({
      success: false,
      message: "Error capturing PayPal payment",
      error: error.message,
    });
  }
};

module.exports = { createOrder, capturePayment };
