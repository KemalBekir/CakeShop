const express = require('express');
const mongoose = require('mongoose');
const dotenv = require("dotenv");

const cors = require("../middleware/cors");
dotenv.config();
const PORT = process.env.PORT || 5000;

start();

async function start() {
    try {
        await mongoose.connect(process.env.DB_URI, {
            useUnifiedTopology: true,
            useNewUrlParser: true
        });
        console.log("Database ready");
    } catch (error) {
        console.log(error.message);
        console.error("Database conection failed");
    }

    mongoose.connection.on("disconnected", ()=> {
        console.log("mongoDB disconnected");
    });

    mongoose.connection.on("connected", ()=> {
        console.log("mongoDB connected");
    });

    const app = express();
    app.use(express.json());
    app.use(cors());

    app.get('/', (req,res) => {
        res.json({message: 'REST service operational'});
    })

    app.listen(PORT, () => console.log(`REST service started on ${PORT}`));

}


