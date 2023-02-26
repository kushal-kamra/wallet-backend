const Wallet = require('../models/wallet');
const uuid = require('uuid');

exports.walletSetup = async (req, res, next) => {
    try {
        const { name, balance } = req.body;

        const wallet = new Wallet({
            name: name,
            balance: Number(balance),
        });
    
        const result = await wallet.save();

        if (result !== null) {
            return res.status(200).json({
                id: result["_id"],
                balance: result["balance"].toString(),
                transactionId: result["_id"],
                name: result["name"],
                date: result["date"],
            });
        }

        return res.status(500).json({
            success: false,
            message: "Unable to create a wallet"
        });
    } catch(err) {
        return res.status(500).json({
            success: false,
            message: "Unable to create a wallet"
        });
    }
}