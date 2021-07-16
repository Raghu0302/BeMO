require("dotenv").config();
const bodyParser = require('body-parser');
const { check } = require("express-validator");
const mongoose = require("mongoose");
const express = require("express");
const app = express();
const cors = require('cors');
const {createColumn, deleteColumn, getAllColumns} = require("./controller/columnController");
const {getAllCardsById, createCard, editCard, cardAction} = require("./controller/cardController");


//Middleware
app.use(express.json());
app.use(cors());
app.get("/", (req,res) => {
    res.json({"message": "Hi"})
});

// column control
app.get("/api/getAllColumns", getAllColumns)
app.post("/api/createColumn",  createColumn);

app.delete("/api/deleteColumn", [
    check("title").isLength({min: 3}).withMessage("title should be min 3 char"),
], deleteColumn);

// card control

app.post("/api/getCardById", getAllCardsById);

app.post("/api/createCard", [
    check("title").isLength({min: 3}).withMessage("Title must be min 3 char"),
    check("description").isLength({min: 3}).withMessage("Description must be min 3 char")
], createCard);

app.put("/api/editCard", [
    check("title").isLength({min: 3}).withMessage("Title must be min 3 char"),
    check("description").isLength({min: 3}).withMessage("Description must be min 3 char")
], editCard)

app.post("/api/cardAction", cardAction)

app.use((error, req, res, next) => {
    res.status(error.statusCode).json({
        message: error.message
    });
    return res;
})
// DB connection
mongoose.connect(process.env.DATABASE, {
    useNewUrlParser: true,
    useCreateIndex: true,
    useUnifiedTopology: true
})
.then(() => {
    console.log("DB CONNECTED");
});

// PORT
const port = process.env.PORT || 8001;

// Starting a Server
app.listen(port, () => {
    console.log(`app is running at ${port}`);
})