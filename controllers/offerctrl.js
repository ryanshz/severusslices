const offerModel = require('../models/offers');
const itemModel = require('../models/items');

exports.index = (req, res, next) => {
    let id = req.params.id;
    console.log('item id: ' + id);
    Promise.all([
        itemModel.findById(id).populate('seller', 'firstName lastName'),
        offerModel.find({ item: id }).populate('buyer', 'firstName lastName')
    ])
        .then(([item, offers]) => {
            if (item) {
                res.render('browse/offers.ejs', { item, offers: offers });
            } else {
                let err = new Error('Item not found with id ' + id);
                err.status = 404;
                next(err); 
            }
        })
        .catch(err => next(err));
}

exports.new = (req, res, next) => {
    let id = req.params.id;
    console.log('item id: ' + id)
    Promise.all([
        itemModel.findById(id).populate('seller', 'firstName lastName'),
        offerModel.find({ itemId: id }).populate('buyer', 'firstName lastName')
    ])
        .then(([item, offers]) => {
            if (item) {
                res.render('browse/newOffer.ejs', { item, offers });
            } else {
                let err = new Error('Item not found with id ' + id);
                err.status = 404;
                next(err);
            }
        })
        .catch(err => next(err));
}

exports.create = (req, res, next) => {
    let id = req.params.id;
    let offer = new offerModel({
        item: id,
        buyer: req.session.user,
        amount: req.body.amount,
    });
    console.log(req.body);
    offer.save(offer)
        .then(newOffer => {
            req.flash('success', 'offer made');
            console.log(newOffer);
            itemModel.findByIdAndUpdate(id, {
                $inc: { offer: 1 },
                $max: { highestOffer: newOffer.amount }
            }, { new: true })
                .then(() => {
                    res.redirect('/items/' + id);
                })
                .catch(err => {
                    if (err.name === 'ValidationError') {
                        err.status = 400;
                    }
                    console.log('error creating offer:', err);
                    next(err);
                });
        })
        .catch(err => {
            if (err.name === 'ValidationError') {
                err.status = 400;
            }
            console.log('could not make offer,', err);
            next(err);
        });
}

exports.accept = (req, res, next) => {
    let offerId = req.params.offerId;
    let id = req.params.id;
    offerModel.findByIdAndUpdate(offerId, { status: 'accepted' })
        .then(() => {
            offerModel.updateMany({ item: id, status: 'pending' }, { status: 'rejected' })
                .then(() => {
                    itemModel.findByIdAndUpdate(id, { active: false })
                        .then(() => {
                            req.flash('success', 'offer accepted');
                            res.redirect('/');
                        })
                        .catch(err => {
                            if(err.name === 'ValidationError') {
                                err.status = 400;
                            }
                            console.log('could not update item:', err);
                            next(err);
                        });
                })
                .catch(err => {
                    if(err.name === 'ValidationError') {
                        err.status = 400;
                    }
                    console.log('could not find items:', err);
                    next(err);
                });
        })
        .catch(err => next(err));
}