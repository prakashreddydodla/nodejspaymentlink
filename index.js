require('dotenv').config()

const app = require("express")();
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

// Serving company logo
app.get("/logo.png", (req, res) => {
  res.sendFile(path.join(__dirname, "logo.png"));
});

app.post("/razorpay", async (req, res) => {
  console.log(req);
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
 
  const options ={
    amount: 500,
    currency: "INR",
    accept_partial: true,
    first_min_partial_amount: 100,
    expire_by: 1691097057,
    reference_id: "kadali7878",
    description: "For XYZ purpose",
    customer: {
      name: " Kumar",
      email: "prasannakumar3333@gmail.com",
      contact: "+918328418471"
    },
    notify: {
      sms: true,
      email: true
    },
    reminder_enable: true,
    notes: {
      policy_name: "Jeevan Bima"
    },
    callback_url: "https://example-callback-url.com/",
    callback_method: "get"
  }
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
