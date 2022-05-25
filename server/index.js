const express = require('express')
const app = express()
const cors = require('cors')
const mongoose = require('mongoose')
const User = require('./models/user.model')
const Stock = require('./models/stock.model')
const OwnStock = require('./models/ownStock.model')

const jwt = require('jsonwebtoken')


app.use(cors())
app.use(express.json())

//connecting to mongodb before sending data
mongoose.connect('mongodb://localhost:27017/stock-data')
    // mongoose.connect('mongodb+srv://upshot:ggupshot%237881@cluster0.jejma.mongodb.net/?retryWrites=true&w=majority')

//route for registering users
app.post('/api/register', async(req, res) => {
    let errors = [];
    const { name, email, password, new_password } = req.body;

    if (
        name === "" ||
        email === "" ||
        password === "" ||
        new_password === ""
    ) {
        errors.push({ msg: "Some details are missing." });
    }
    if (password !== new_password) {
        errors.push({ msg: "Passwords do not match" });
    }
    if (password.length <= 5) {
        errors.push({ msg: "Password should be atleast 6 characters long " });
    }
    if (errors.length > 0) {
        return res.status(500).json({
            success: false,
            errors: errors,
        });
    } else {
        try {
            await User.create({
                name: req.body.name,
                email: req.body.email,
                password: req.body.password,
                new_password: req.body.new_password,
            })
            res.json({ status: 'ok' })
        } catch (err) {
            console.log(err);
            errors.push({ msg: "Email Adress already registered." });
            res.status(500).json({
                success: false,
                errors: errors,
            });

        }

    }

    try {
        await User.create({
            name: req.body.name,
            email: req.body.email,
            password: req.body.password,
            new_password: req.body.new_password,
        })
        res.json({ status: 'ok' })
    } catch (error) {
        res.json({ status: 'error', error: ' Duplicate Email' })

    }

})


//route for login in users
app.post('/api/login', async(req, res) => {
    const user = await User.findOne({
        email: req.body.email,
        password: req.body.password,
    })
    if (user) {
        console.log(user);
        const newUser = {
            name: user.name,
            email: user.email,
            id: user._id,

        }
        return res.json({ status: 'ok', user: newUser })
    } else {
        return res.json({ status: 'error', user: false })
    }



})

app.get("/api/stocks", async(req, res) => {
    try {
        const result = await Stock.find();
        res.status(200).send(result);
    } catch (err) {
        res.send("Error");
    }
});

app.get("/api/ownStocks", async(req, res) => {
    try {
        const result = await OwnStock.find();
        res.status(200).send(result);
    } catch (err) {
        res.send("Error");
    }
});

app.post("/api/sendStocks", async(req, res) => {
    try {
        const { user, stockId, stock_name, stock_price, stock_amount } = req.body;
        const order = await OwnStock.create({
            user: user,
            stockId: stockId,
            stock_name: stock_name,
            stock_price: stock_price,
            stock_amount: stock_amount,
        });
        console.log(order)
        res.status(200).send(order);
    } catch (err) {
        console.log(err)
        res.send("Error");
    }
});

app.delete("/api/deleteStocks/:id", async(req, res) => {
    const id = req.params.id;
    console.log(id)
    OwnStock.remove({ _id: id })
        .then(result => {
            res.status(200).json({
                message: 'deleted sucessfully',
                deletedData: result,
            })
        })
        .catch(err => {
            res.status(500).json({
                message: 'sorry failed to delete',
                error: err,
            })
        })

    // try {
    //     const { stockId, user } = req.body;
    //     const order = await OwnStock.remove({
    //         stockId: stockId,
    //         user: user,

    //     });
    //     console.log(order)
    //     res.status(200).send(order);
    // } catch (err) {
    //     console.log(err)
    //     res.send("Error");
    // }
});




app.get("/api/user", async(req, res) => {
    try {
        const user = await User.find();
        res.json({ status: 'ok' })
    } catch (err) {
        res.send("err");
    }


})




app.listen(1337, () => {
    console.log('listening to server on 1337')
})