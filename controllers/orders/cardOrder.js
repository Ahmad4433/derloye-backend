require("dotenv").config();
const stripe = require("stripe")(process.env.STRIPE_SECRET);
const joi = require("joi");

const cardOrder = async (req, res, next) => {
  const { error: validationError } = validateCard(req.body.paymentData);
  const { number, cvc, expiry, name, amount } = req.body.paymentData;
  const [formatedMonth, formatedYear] = expiry.split("/");

  try {
    if (validationError) {
      const error = new Error(validationError.details[0].message);
      error.statusCode = 400;
      throw error;
    }

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

module.exports = cardOrder;

function validateCard(data) {
  const cardSchema = joi.object({
    cvc: joi.string().trim().max(4).min(3).required(),
    name: joi.string().required(),
    number: joi.string().max(19).min(12).required(),
    expiry: joi.string().max(5).min(5).required(),
    data: joi.any().allow(),
    userId: joi.any().allow(),
    amount: joi.number().required(),
  });
  return cardSchema.validate(data);
}
