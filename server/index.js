const express = require('express');
const mongoose = require('mongoose');
const dotenv = require("dotenv");

const cors = require("../middleware/cors");
dotenv.config();

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
}

 mongoose.connection.on("disconnected", ()=> {
        console.log("mongoDB disconnected");
    });

    const app = express();
    app.use(express.json());
    app.use(cors());

    app.get('/', (req,res) => {
        res.json({message: 'REST service operational'});
    })

    app.listen(process.env.PORT, () => console.log(`REST service started on ${process.env.PORT}`));

