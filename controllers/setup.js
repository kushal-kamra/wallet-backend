const Wallet = require('../models/wallet');
const uuid = require('uuid');

exports.walletSetup = async (req, res, next) => {
    try {
        const { name, balance } = req.body;

        const wallet = new Wallet({
            name: name,
            balance: Number(balance),
            transactionId: uuid.v4(),
        });
    
        const result = await wallet.save();

        return res.status(200).json({
            id: result["_id"],
            balance: result["balance"].toString(),
            transactionId: result['transactionId'],
            name: result["name"],
            date: result["date"],
        });
    } catch(err) {

        console.log("Error in creating new wallet, ", err);

        return res.status(500).json({
            success: false,
            message: "Unable to create a wallet"
        });
    }
}