const { model, Schema, Types: { ObjectId } } = require("mongoose");

const schema = new Schema({
    cakeName: {
        type: String,
        required: [true, 'Cake name is required'],
        minlength: [4, 'Cake name must contain atleast 4 characters']
    },
    desc: { type: String },
    price: {
        type: Number,
    },
    img: { type: String },
    owner: {type: ObjectId, ref: "User"},
    onOffer: { type: Boolean },
    discount: { 
        type: Number,
        enum: [10, 15,20,25,50]
    }
})