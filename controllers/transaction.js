const mongoose = require('mongoose');

const Wallet = require('../models/wallet');
const Transaction = require('../models/transaction');

exports.createTransaction = async (req, res, next) => {

    const session = await mongoose.startSession();

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

            if (new_balance < 0) {
                return res.status(200).send(`Insufficient balance, add ${-new_balance} in wallet and try again`);
            }

            await session.startTransaction();

            const updated_wallet = await Wallet.findOneAndUpdate(
                {
                    "_id": walletId,
                },
                {
                    balance: new_balance.toString(),
                },
                {
                    returnOriginal: false,
                    session: session,
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
                    },
                    {
                        session: session,
                    }
                );

                const transaction_result = await transaction.save();

                if (transaction_result !== null) {
                    await session.commitTransaction();

                    return res.status(200).json({
                        balance: updated_wallet["balance"].toString(),
                        transactionId: transaction_result["_id"],
                    });
                }
            }
        }

        await session.abortTransaction();

        return res.status(500).json({
            success: false,
            message: "Error in creating new transaction, wallet not found"
        });
    } catch(err) {
        await session.abortTransaction();

        return res.status(500).json({
            success: false,
            message: "Unable to create a transaction"
        });
    } finally {
        await session.endSession();
    }
}