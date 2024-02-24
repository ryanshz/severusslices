const model = require('../models/items');

//open item catalog
exports.index = (req, res) => {
    let items = model.find({ active: 'true' });
    console.log(items);
    if (items) {
        let activeItems = items.filter(item => item.active === 'true');
        res.render('browse/index.ejs', { items: activeItems });
    } else {
        res.status(404).send('No items found.');
    }
}

//open specific item page
exports.show = (req, res) => {
    let id = req.params.id;
    let items = model.find();
    let item = model.findById(id);
    if (item) {
        res.render('browse/item.ejs', {item, items});
    }else{
        res.status(404).send('Item not found with id ' + id);
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
exports.edit = (req, res) => {
    let id = req.params.id;
    let item = model.findById(id);
    if (item) {
        res.render('browse/edit.ejs', {item});
    }else{
        res.status(404).send('Item not found with id ' + id);
    }
}

//update current item with edited one
exports.update = (req, res) => {
    let newItem = req.body;
    let id = req.params.id;
    console.log(newItem)
    if(model.updateById(id, newItem)){
        res.redirect('/items/' + id);
    }else{
        res.status(404).send('Item not found with id ' + id);
    }
}

//delete item
exports.delete = (req, res) => {
    let id = req.params.id;
    if(model.deleteById(id)){
        res.redirect('/items');
    }else{
        res.status(404).send('Item not found with id ' + id);
    }
}