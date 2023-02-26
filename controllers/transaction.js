const Wallet = require('../models/wallet');
const Transaction = require('../models/transaction');
const uuid = require('uuid');

exports.createTransaction = async (req, res, next) => {
    try {
        const { walletId } = req.params;
        const { amount, description } = req.body;
        let type;

        const wallet = await Wallet.find({
            "_id": walletId
        });

        if (wallet.length > 0) {
            if (amount >= 0) type = "CREDIT";
            else type = "DEBIT";

            const new_balance = Number(wallet[0].balance) + amount;

            const updated_wallet = await Wallet.findOneAndUpdate(
                {
                    "_id": walletId,
                },
                {
                    balance: new_balance.toString(),
                },
                {
                    returnOriginal: false,
                }
            );

            if (updated_wallet !== null) {
                const transaction = new Transaction(
                    {
                        walletId: walletId,
                        amount: Number(amount),
                        balance: Number(new_balance),
                        description: description,
                        type: type,
                    }
                );

                const transaction_result = await transaction.save();

                if (transaction_result !== null) {
                    return res.status(200).json({
                        balance: updated_wallet["balance"].toString(),
                        transactionId: transaction_result["_id"],
                    });
                }
            }
        }

        return res.status(500).json({
            success: false,
            message: "Error in creating new transaction, wallet not found"
        });
    } catch(err) {
        return res.status(500).json({
            success: false,
            message: "Unable to create a transaction"
        });
    }
}