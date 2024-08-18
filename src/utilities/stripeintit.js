const stripe = require("stripe")(
  "sk_test_51PgQfgFkhb9tzNw0FI6EmkkY8yfupNBcnrsk1PA7l0aupJGIUqRbdI9g6Sq5rScWeYQn4jK6zCjkzSGHw2Qd4K0800sN6G439T"
);

// 2. Create Stripe client
const stripeClient = stripe;

async function createPaymentIntent(food) {
  try {

    console.log( "The passed food is: " ,food);

    const session = await stripe.checkout.sessions.create({
      line_items: [
        {
          price_data: {
            currency: "usd",
            product_data: {
              name: food.dname,
              description: food.discription,
              images: [food.photo],
            },
            unit_amount: parseInt(food.dprice),
          },
          quantity: 1,
        },
      ],
      mode: "payment",
      success_url: "http://localhost:5656/foods/1",
      cancel_url: "http://localhost:5656/foods/1",
    });

    return session.url;
  } catch (error) {
    console.error("Error creating payment intent:", error);
    throw error;
  }
}

// 4. Function to handle webhooks
async function handleWebhook(event) {
  switch (event.type) {
    case "payment_intent.succeeded":
      const paymentIntent = event.data.object;
      console.log("PaymentIntent was successful!");
      // Add your business logic here
      break;
    case "payment_intent.payment_failed":
      const failedPaymentIntent = event.data.object;
      console.log("PaymentIntent failed.");
      // Add your business logic here
      break;
    default:
      console.log(`Unhandled event type ${event.type}`);
  }
}

module.exports = {
  createPaymentIntent,
  handleWebhook,
};
