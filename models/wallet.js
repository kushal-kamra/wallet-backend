const mongoose = require('mongoose');

const schema = mongoose.Schema;

const walletSchema = new schema(
    {
        name: {
            type: String,
            required: true,
            immutable: true,
            unique: true,
        },
        balance: {
            type: mongoose.Decimal128,
            default: new mongoose.Types.Decimal128('0.0000'),
            get: value => parseFloat(value.toString()).toFixed(4),
            set: value => new mongoose.Types.Decimal128(parseFloat(value).toFixed(4)),
        },
        transactionId: {
            type: String,
        },
        date: {
            type: Date,
            default: Date.now
        },
    },
    { timestamps: true },
);

const wallet = mongoose.model('Wallets', walletSchema);

module.exports = wallet;