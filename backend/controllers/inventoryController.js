const Inventory = require('../models/Inventory');

exports.addItem = async (req, res) => {
    const { itemName, quantity, price } = req.body;

    try {
        const newItem = new Inventory({ itemName, quantity, price });

        await newItem.save();
        res.json(newItem);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server error');
    }
};

exports.getItems = async (req, res) => {
    try {
        const items = await Inventory.find();
        res.json(items);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server error');
    }
};
