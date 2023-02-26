const mongoose = require('mongoose');

const schema = mongoose.Schema;

const transactionSchema = new schema(
    {
        walletId: {
            type: String,
            required: true,
        },
        amount: {
            type: mongoose.Decimal128,
            get: value => parseFloat(value.toString()).toFixed(4),
            set: value => new mongoose.Types.Decimal128(parseFloat(value).toFixed(4)),
            required: true,
            immutable: true,
        },
        balance: {
            type: mongoose.Decimal128,
            get: value => parseFloat(value.toString()).toFixed(4),
            set: value => new mongoose.Types.Decimal128(parseFloat(value).toFixed(4)),
            required: true,
            immutable: true,
        },
        description: {
            type: String,
        },
        date: {
            type: Date,
            default: Date.now,
        },
        type: {
            type: String,
            enum: ['CREDIT', 'DEBIT'],
            required: true,
        },
    },
    { timestamps: true },
);

const transaction = mongoose.model('Transactions', transactionSchema);

module.exports = transaction;