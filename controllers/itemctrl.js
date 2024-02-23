const model = require('../models/items');

exports.index = (req, res) => {
    let items = model.find();
    res.render('browse/index.ejs', {items});
}

exports.view = (req, res) => {
    res.send('item with id: ' + req.params.id)
}