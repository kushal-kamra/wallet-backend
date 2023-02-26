const Wallet = require('../models/wallet');

exports.getWallet = async (req, res, next) => {
    try {
        const { id } = req.params;

        const wallet = await Wallet.find({
            "_id": id
        });

        if (wallet.length > 0) {
            return res.status(200).json({
                balance: wallet[0]["balance"].toString(),
                id: wallet[0]["_id"],
                name: wallet[0]["name"],
                date: wallet[0]["date"],
            });
        }
        
        return res.status(200).send("No wallet found");
    } catch(err) {
        return res.status(500).json({
            success: false,
            message: "Unable to fetch wallet"
        });
    }
}