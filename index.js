const express = require('express');

const app = express();

app.use(express.json());

app.get("/", (req, res) => {
    res.send("Hello");
});

app.post("/order", async (req, res) => {
    const amount = req.body.amount;

    const instance = new Razorpay({
        key_id: 'rzp_test_QMX7GdTUUoYyQ2',
        key_secret: 'JjLZxn3cALoJZIo6Dvz5x3qU'
    });

    const options = {
        amount: amount * 100, // amount in the smallest currency unit
        currency: "INR",
        receipt: "receipt#1",
        notes: {
            key1: "value3",
            key2: "value2"
        }
    };

    const myOrder = await instance.orders.create(options);

    res.status(200).json({
        success: true,
        amount,
        order: myOrder
    })
});

app.listen(4000, () => {
    console.log(`Server is running at PORT 4000`);
});