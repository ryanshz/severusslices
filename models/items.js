const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const itemSchema = new Schema({
    name: { type: String, required: [true, 'Name is required'] },
    image: { type: String, required: [true, 'Image is required'] },
    details: { type: String, required: [true, 'Details is required'] },
    alt: { type: String, required: [true, 'Alt is required'] },
    condition: { type: String, required: [true, 'Condition is required'] },
    price: { type: Number, required: [true, 'Price is required'] },
    seller: { type: Schema.Types.ObjectId, ref: 'User'},
    offer: { type: Number },
    active: { type: String }
},
    { timestamps: true }
);

module.exports = mongoose.model('Item', itemSchema);