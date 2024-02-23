const model = require('../models/items');

exports.index = (req, res) => {
    let items = model.find();
    res.render('new/index.ejs', {items});
}