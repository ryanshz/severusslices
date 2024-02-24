const model = require('../models/items');

//open item catalog
exports.index = (req, res, next) => {
    let items = model.find({ active: 'true' });
    if (items) {
        let activeItems = items.filter(item => item.active === 'true');
        activeItems.sort((a, b) => a.price - b.price); // Sort items by price
        res.render('browse/index.ejs', { items: activeItems });
    } else {
        let err = new Error('No items found!');
        err.status = 404;
        next(err);
    }
}

//open specific item page
exports.show = (req, res, next) => {
    let id = req.params.id;
    let items = model.find();
    let item = model.findById(id);
    if (item) {
        res.render('browse/item.ejs', {item, items});
    }else{
        let err = new Error('Item not found with id ' + id);
        err.status = 404;
        next(err);
    }
}

//make new item
exports.create = (req, res) => { 
    let item = req.body;
    console.log(item);
    model.save(item);
    res.redirect('/items');
}

//edit item
exports.edit = (req, res, next) => {
    let id = req.params.id;
    let item = model.findById(id);
    if (item) {
        res.render('browse/edit.ejs', {item});
    }else{
        let err = new Error('Item not found with id ' + id);
        err.status = 404;
        next(err);
    }
}

//update current item with edited one
exports.update = (req, res, next) => {
    let newItem = req.body;
    let id = req.params.id;
    console.log(newItem)
    if(model.updateById(id, newItem)){
        res.redirect('/items/' + id);
    }else{
        let err = new Error('Item not found with id ' + id);
        err.status = 404;
        next(err);
    }
}

//delete item
exports.delete = (req, res, next) => {
    let id = req.params.id;
    if(model.deleteById(id)){
        res.redirect('/items');
    }else{
        let err = new Error('Item not found with id ' + id);
        err.status = 404;
        next(err);
    }
}