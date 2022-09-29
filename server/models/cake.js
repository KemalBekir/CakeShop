const { model, Schema, Types: { ObjectId } } = require("mongoose");


const Images = new Schema({ name: String })
const schema = new Schema({
    cakeName: {
        type: String,
        required: [true, 'Cake name is required'],
        minlength: [4, 'Cake name must contain atleast 4 characters']
    },
    desc: { type: String },
    price: {
        type: Number,
        required: true
    },
    img: {
        type: [Images],
        default: undefined,
        required: true
    },
    owner: { type: ObjectId, ref: "User" },
    onOffer: { type: Boolean, default: false },
    discount: {
        type: Number,
        enum: [10, 15, 20, 25, 50]
    }
});

const Cake = model('Cake', schema);

module.exports = Cake;