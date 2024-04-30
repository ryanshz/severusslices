const itemModel = require('../models/items');
const offerModel = require('../models/offers');

//open item catalog
exports.index = (req, res, next) => {
    itemModel.find({ active: true }).populate('seller', 'firstName lastName')
        .then(items => {
            items.sort((a, b) => a.price - b.price);
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
    itemModel.findById(id).populate('seller', 'firstName lastName')
        .then(item => {
            if (item) {
                itemModel.find({ active: true }).populate('seller', 'firstName lastName')
                    .then(allItems => {
                        res.render('browse/item.ejs', { item, items: allItems });
                    })
                    .catch(err => next(err));
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
    let item = new itemModel(req.body);
    if (req.file) {
        item.image = '/images/uploads/' + req.file.filename;
    }
    item.seller = req.session.user;
    item.save(item)
        .then(newItem => {
            req.flash('success', 'item created');
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
    itemModel.findById(id)
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
    if (req.file) {
        newItem.image = '/images/uploads/' + req.file.filename;
    }
    console.log(newItem)
    itemModel.findByIdAndUpdate(id, newItem, { useFindAndModify: false, runValidators: true })
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
    console.log('item id: ' + id);
    itemModel.findByIdAndDelete(id, { useFindAndModify: false })
        .then(item => {
            if (item) {
                offerModel.deleteMany({ item: id })
                    .then(() => {
                        res.redirect('/items');
                    })
                    .catch(err => next(err));
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
    if (search.length === 0) {
        res.render('browse/search.ejs', { items: [] });
    } else {
        itemModel.find({ active: true }).populate('seller details', 'firstName lastName')
            .then(items => {
                let activeItems = items.filter(item => item.active === true);
                let searchItems = activeItems.filter(item => item.name.toLowerCase().includes(search.toLowerCase()) || item.details.toLowerCase().includes(search.toLowerCase()));
                searchItems.sort((a, b) => a.price - b.price);
                res.render('browse/search.ejs', { items: searchItems });
            })
            .catch(err => {
                err = new Error('No items found!');
                err.status = 404;
                next(err);
            });
    }
}