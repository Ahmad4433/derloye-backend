require("dotenv").config();
const stripe = require("stripe")(process.env.STRIPE_SECRET);

const orderPayment = async (req, res, next) => {
  const { number, cvc, expiry, name, amount } = req.body.paymentData;
  const [formatedMonth, formatedYear] = expiry.split("/");

  try {
    const paymentIntent = await stripe.paymentIntents.create({
      amount: parseFloat(amount) * 100,
      currency: "usd",
      payment_method_types: ["card"],
      payment_method_data: {
        type: "card",
        card: {
          number,
          exp_month: formatedMonth,
          exp_year: formatedYear,
          cvc,
        },
        billing_details: {
          name: name,
          email: req.userEmail,
        },
      },
    });

    const confirmedPaymentIntent = await stripe.paymentIntents.confirm(
      paymentIntent.id
    );
    req.paymentStatus = confirmedPaymentIntent.status;
    next();
  } catch (error) {
    next(error);
  }
};

module.exports = orderPayment;
