require('dotenv').config()

const express = require("express");
const app = express();
const path = require("path");

const cors = require("cors");

const shortid = require("shortid");
const Razorpay = require("razorpay");
const { stringify } = require('querystring');
const index = 0;
const razorpay = new Razorpay({
  key_id: 'rzp_test_DBxMXJZHQxYcmc',
  key_secret: 'TxgWLcfFZmOLLfsB2N9GC0Eb',
});

app.use(cors());
app.use(express.json());

// Serving company logo
app.get("/logo.png", (req, res) => {
  res.sendFile(path.join(__dirname, "logo.png"));
});

app.post("/razorpay", async (req, res) => {
  // const payment_capture = 1;
  // const amount = 499;
  // const currency = "INR";

  // const options = {
  //   amount: amount * 100,
  //   currency,
  //   receipt: shortid.generate(),
  //   payment_capture,
  // };

  // try {
  //   const response = await razorpay.orders.create(options);
  //   console.log(response);
  //   res.json({
  //     id: response.id,
  //     currency: response.currency,
  //     amount: response.amount,
  //   });
  // } catch (error) {
  //   console.log(error);
  // }
 
  console.log(req.body);
  const options ={
    amount: req.body.amount,
    currency: "INR",
    accept_partial: true,
    first_min_partial_amount: 0,
    expire_by: 1691097057,
    reference_id: req.body.reference_id,
    description: "For XYZ purpose",
    customer: {
      name: "OTSI",
      email: "otsi1123@gmail.com",
      contact: req.body.contact
    },
    notify: {
      sms: true,
      email: true
    },
    reminder_enable: true,
    notes: {
      policy_name: "Billing"
    },
    callback_url: "https://example-callback-url.com/",
    callback_method: "get"
  }

  console.log(options);
try {
  const response = await razorpay.paymentLink.create(options)
  console.log(response)
  res.json(response);
 } catch (error) {
    console.log(error);
  }

});

app.listen(1337, () => {
  console.log("Backend running at localhost:1337");
});
