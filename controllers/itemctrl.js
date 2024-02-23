const model = require('../models/items');

exports.index = (req, res) => {
    let items = model.find();
    res.render('browse/index.ejs', {items}); 
}

exports.show = (req, res) => {
    let items = model.find();
    let item = model.findById(req.params.id);
    if (item) {
        res.render('browse/item.ejs', {item, items});
    }
    res.status(404).send('Item not found with id ' + req.params.id);
}

exports.create = (req, res) => { 
    let item = req.body;
    console.log(item);
    model.save(item);
    res.redirect('/items');
}