const mongoose = require('mongoose');
const uuid = require('uuid');

const Wallet = require('../models/wallet');
const Transaction = require('../models/transaction');

exports.walletSetup = async (req, res, next) => {

    const session = await mongoose.startSession();

    try {
        const { name, balance } = req.body;

        if (Number(balance) < 0) {
            return res.status(200).send("Cannot create wallet with negative balance. Try again with positive balance");
        }
        
        await session.startTransaction();

        const wallet = new Wallet({
            name: name,
            balance: Number(balance),
        });
    
        const result = await wallet.save({ session });

        if (result !== null) {
            const transaction = new Transaction(
                {
                    walletId: result["_id"],
                    amount: Number(balance),
                    balance: Number(balance),
                    description: "Setup",
                    type: "CREDIT",
                },
                {
                    session: session,
                }
            );

            const transaction_result = await transaction.save({ session });

            if (transaction_result !== null) {
                await session.commitTransaction();

                return res.status(200).json({
                    id: result["_id"],
                    balance: result["balance"].toString(),
                    name: result["name"],
                    date: result["date"],
                });
            }
        }

        await session.abortTransaction();

        return res.status(500).json({
            success: false,
            message: "Unable to create a wallet"
        });
    } catch(err) {
        await session.abortTransaction();

        console.log("Error in Setup : ", err);

        return res.status(500).json({
            success: false,
            message: "Unable to create a wallet"
        });
    } finally {
        await session.endSession();
    }
}