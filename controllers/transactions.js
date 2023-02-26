const Transaction = require('../models/transaction');

exports.getTransactions = async (req, res, next) => {
    try {
        const walletId = req.query["walletId"];
        const skip = parseInt(req.query["skip"]) || 0;
        const limit = parseInt(req.query["limit"]) || 25;

        const transactions_list = await Transaction.find({
            "walletId": walletId,
        })
        .sort({
            createdAt: 1,
        })
        .skip(skip)
        .limit(limit)
        .exec();

        return res.status(200).send(transactions_list.map(transaction => ({
            id: transaction._id,
            walletId: transaction.walletId,
            amount: Number(transaction.amount),
            balance: Number(transaction.balance),
            description: transaction.description,
            date: transaction.date,
            type: transaction.type,
        })));
    } catch(err) {
        return res.status(500).json({
            success: false,
            message: "Unable to fetch transactions"
        });
    }
}

