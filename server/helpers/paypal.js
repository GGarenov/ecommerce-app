const axios = require("axios");

const PAYPAL_CLIENT_ID = process.env.PAYPAL_CLIENT_ID;
const PAYPAL_CLIENT_SECRET = process.env.PAYPAL_CLIENT_SECRET;
const PAYPAL_API_BASE = "https://api-m.sandbox.paypal.com";

const FRONTEND_URL =
  process.env.FRONTEND_DEPLOYED_URL || "http://localhost:5173";

const getAccessToken = async () => {
  try {
    const auth = Buffer.from(
      `${PAYPAL_CLIENT_ID}:${PAYPAL_CLIENT_SECRET}`
    ).toString("base64");

    const response = await axios.post(
      `${PAYPAL_API_BASE}/v1/oauth2/token`,
      "grant_type=client_credentials",
      {
        headers: {
          Authorization: `Basic ${auth}`,
          "Content-Type": "application/x-www-form-urlencoded",
        },
      }
    );

    return response.data.access_token;
  } catch (error) {
    console.error(
      "Error getting PayPal access token:",
      error.response?.data || error.message
    );
    throw error;
  }
};

const createPayPalOrder = async (totalAmount) => {
  try {
    const accessToken = await getAccessToken();

    const orderData = {
      intent: "CAPTURE",
      purchase_units: [
        {
          amount: {
            currency_code: "USD",
            value: totalAmount.toFixed(2),
          },
        },
      ],
      application_context: {
        return_url: `${FRONTEND_URL}/shop/paypal-return`,
        cancel_url: `${FRONTEND_URL}/shop/paypal-cancel`,
      },
    };

    const response = await axios.post(
      `${PAYPAL_API_BASE}/v2/checkout/orders`,
      orderData,
      {
        headers: {
          Authorization: `Bearer ${accessToken}`,
          "Content-Type": "application/json",
        },
      }
    );

    return response.data;
  } catch (error) {
    console.error(
      "Error creating PayPal order:",
      error.response?.data || error.message
    );
    throw error;
  }
};

const capturePayPalPayment = async (orderId) => {
  try {
    const accessToken = await getAccessToken();

    const response = await axios.post(
      `${PAYPAL_API_BASE}/v2/checkout/orders/${orderId}/capture`,
      {},
      {
        headers: {
          Authorization: `Bearer ${accessToken}`,
          "Content-Type": "application/json",
        },
      }
    );

    return response.data;
  } catch (error) {
    console.error(
      "Error capturing PayPal payment:",
      error.response?.data || error.message
    );
    throw error;
  }
};

module.exports = {
  createPayPalOrder,
  capturePayPalPayment,
};
