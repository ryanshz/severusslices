const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const offerSchema = new Schema({
    item: { type: Schema.Types.ObjectId, ref: 'Item', required: [true, 'item required'] },
    buyer: { type: Schema.Types.ObjectId, ref: 'User', required: [true, 'buyer required'] },
    amount: { type: Number, required: [true, 'amount required'], min: [.01, 'minimum amount must be 1 cent']},
    status: { type: String, required: [true, 'status required'], enum: ['pending','accepted','rejected'], default: 'pending' },
},
    { timestamps: true }
);

module.exports = mongoose.model('Offer', offerSchema);