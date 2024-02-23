const model = require('../models/items');

exports.index = (req, res) => {
    let items = model.find();
    res.render('browse/index.ejs', {items}); 
}

exports.show = (req, res) => {
    let items = model.find();
    let item = model.findById(req.params.id);
    res.render('browse/item.ejs', {item, items});
}