const model = require('../models/items');

//open create item page
exports.index = (req, res) => {
    let items = model.find();
    res.render('new/index.ejs', { items });
}