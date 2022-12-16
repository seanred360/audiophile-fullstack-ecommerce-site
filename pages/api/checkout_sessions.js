const stripe = require("stripe")(process.env.STRIPE_SECRET_KEY);

export default async function handler(req, res) {
  if (req.method === "POST") {
    try {
      // Create Checkout Sessions from body params.
      const session = await stripe.checkout.sessions.create({
        line_items: req.body.lineItems,
        mode: "payment",
        success_url: `${req.headers.origin}/order-success`,
        cancel_url: `${req.headers.origin}/order-cancelled`,
        // success_url: `http://localhost:3000/order-success`,
        // cancel_url: `http://localhost:3000/?canceled=true`,
        currency: "cad",
      });

      res.status(201).json({ session });
    } catch (err) {
      res.status(err.statusCode || 500).json(err.message);
    }
  } else {
    res.setHeader("Allow", "POST");
    res.status(405).end("Method Not Allowed");
  }
}
