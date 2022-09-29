const { model, Schema, Types: { ObjectId } } = require("mongoose");


const Images = new Schema({ name: String })
const schema = new Schema({
    cakeName: {
        type: String,
        required: [true, 'Cake name is required'],
        minlength: [4, 'Cake name must contain atleast 4 characters']
    },
    desc: { type: String, required: true, maxlength: [300, 'Description must be 300 characters at most'] },
    price: {
        type: Number,
        required: true
    },
    type: {
        type: String,
        required: true
    },
    img: {
        type: [Images],
        default: undefined,
        required: true
    },
    likes:
        [{ type: ObjectId, ref: "User" }]
    ,
    owner: { type: ObjectId, ref: "User" },
    onOffer: { type: Boolean, default: false },
    discount: {
        type: Number,
        enum: [10, 15, 20, 25, 50]
    }
});

const Cake = model('Cake', schema);

module.exports = Cake;