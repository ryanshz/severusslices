const model = require('../models/items');

//open item catalog
exports.index = (req, res, next) => {
    model.find()
        .then(items => {
            items.sort((a, b) => a.price - b.price); //sort by price
            res.render('browse/index.ejs', { items });
        })
        .catch(err => {
            err = new Error('No items found!');
            err.status = 404;
            next(err);
        });
}

//open specific item page
exports.show = (req, res, next) => {
    let id = req.params.id;
    console.log('item id: ' + id)
    if (!id.match(/^[0-9a-fA-F]{24}$/)) {
        let err = new Error('Invalid item id');
        err.status = 400;
        return next(err);
    }
    model.findById(id)
        .then(item => {
            if (item) {
                let items = model.find();
                res.render('browse/item.ejs', { item, items });
            } else {
                let err = new Error('Item not found with id ' + id);
                err.status = 404;
                next(err);
            }
        })
        .catch(err => next(err));
}

//make new item
exports.create = (req, res) => {
    let item = new model(req.body);
    if (req.file) {
        item.image = '/images/uploads/' + req.file.filename;
    }
    item.active = 'true';
    item.offer = 0;
    item.save(item)
        .then(newItem => {

            console.log(newItem)
            res.redirect('/items');
        })
        .catch(err => {
            if (err.name === 'ValidationError') {
                err.status = 400;
            }
            console.log('could not make item,', err);
            next(err);
        });
}

//edit item
exports.edit = (req, res, next) => {
    let id = req.params.id;
    console.log('item id: ' + id)
    if (!id.match(/^[0-9a-fA-F]{24}$/)) {
        let err = new Error('Invalid item id');
        err.status = 400;
        return next(err);
    }
    model.findById(id)
        .then(item => {
            if (item) {
                res.render('browse/edit.ejs', { item });
            } else {
                let err = new Error('Item not found with id ' + id);
                err.status = 404;
                next(err);
            }
        })
        .catch(err => next(err));
}

//update current item with edited one
exports.update = (req, res, next) => {
    let newItem = req.body;
    let id = req.params.id;
    console.log('item id: ' + id)
    if (!id.match(/^[0-9a-fA-F]{24}$/)) {
        let err = new Error('Invalid item id');
        err.status = 400;
        return next(err);
    }
    if (req.file) {
        newItem.image = '/images/uploads/' + req.file.filename;
    }
    console.log(newItem)
    model.findByIdAndUpdate(id, newItem, { useFindAndModify: false, runValidators: true })
        .then(item => {
            if (item) {
                res.redirect('/items/' + id);
            } else {
                let err = new Error('Item not found with id ' + id);
                err.status = 404;
                next(err);
            }
        })
        .catch(err => {
            if (err.name === 'ValidationError') {
                err.status = 400;
            }
            next(err);
        });
}

//delete item
exports.delete = (req, res, next) => {
    let id = req.params.id;
    console.log('item id: ' + id)
    if (!id.match(/^[0-9a-fA-F]{24}$/)) {
        let err = new Error('Invalid item id');
        err.status = 400;
        return next(err);
    }
    model.findByIdAndDelete(id, { useFindAndModify: false })
        .then(item => {
            if (item) {
                res.redirect('/items');
            } else {
                let err = new Error('Item not found with id ' + id);
                err.status = 404;
                next(err);
            }
        })
        .catch(err => next(err));
}

//search items
exports.search = (req, res, next) => {
    let search = req.query.search;
    let items = model.find({ active: 'true' });
    if (items) {
        let activeItems = items.filter(item => item.active === 'true');
        let searchItems = activeItems.filter(item => item.name.toLowerCase().includes(search.toLowerCase())); //converts to lowercase and checks if search in name
        searchItems.sort((a, b) => a.price - b.price);
        res.render('browse/search.ejs', { items: searchItems });
    } else {
        let err = new Error('No items found!');
        err.status = 404;
        next(err);
    }
}