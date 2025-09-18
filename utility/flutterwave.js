const axios = require("axios");
const { getWebsiteSettings } = require("./general");


async function createPaymentLink(paymentData) {
  if (!paymentData?.amount || !paymentData?.email || !paymentData?.name) {
    throw new Error("Missing required paymentData fields: amount, email, name");
  }

  const settingsArray = await getWebsiteSettings();
  if (!settingsArray || !settingsArray.length) {
    throw new Error("No website settings found for Flutterwave configuration");
  }

  const settings = settingsArray[0];
  if (!settings.secret_key_FLW || !settings.FLW_base_url) {
    throw new Error("Flutterwave keys not configured");
  }

  const FLW_SECRET_KEY = settings.secret_key_FLW;
  const FLW_BASE_URL = settings.FLW_base_url;

  const tx_ref = paymentData.reference;

  try {
    const response = await axios.post(
      `${FLW_BASE_URL}/payments`,
      {
        tx_ref,
        amount: paymentData.amount,
        currency: paymentData.currency || "NGN",
        redirect_url: paymentData.redirectUrl || "",
        payment_options: "card,banktransfer,ussd",
        customer: {
          email: paymentData.email,
          name: paymentData.name,
          phone_number: paymentData.phone,
        },
        customizations: {
          title: paymentData.title,
          description: paymentData.description,
        },
        meta: paymentData.meta || {},
      },
      {
        headers: {
          Authorization: `Bearer ${FLW_SECRET_KEY}`,
          "Content-Type": "application/json",
        },
      }
    );

    return response.data.data;
  } catch (err) {
    console.error("Error creating Flutterwave payment link:", err.response?.data || err.message);
    throw err;
  }
}

module.exports = { createPaymentLink };
