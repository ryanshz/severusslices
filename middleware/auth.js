const model = require('../models/items');

exports.isGuest = (req, res, next) => {
    if (!req.session.user) {
        return next();
    } else {
        req.flash('error', 'logged in already');
        return res.redirect('/users/profile');
    }
}

exports.isLoggedIn = (req, res, next) => {
    if (req.session.user) {
        return next();
    } else {
        req.flash('error', 'you must be logged in');
        return res.redirect('/users/login');
    }
}

exports.isAuthor = (req, res, next) => {
    let id = req.params.id;
    model.findById(id)
    .then(item => {
        if(item){
            if (item.seller == req.session.user) {
                return next();
            } else {
                let err = new Error('unauthorized, you did not list item');
                err.status = 401;
                return next(err);
            }
        }else{
            let err = new Error('item not found');
            err.status = 404;
            return next(err);
        }
    })
    .catch(err => next(err));
}

exports.validateId = (req, res, next) => {
    let id = req.params.id;
    if(!id.match(/^[0-9a-fA-F]{24}$/)) {
        let err = new Error('Invalid id');
        err.status = 400;
        return next(err);
    }
    return next();
}

exports.isSeller = (req, res, next) => {
    let id = req.params.id;
    model.findById(id)
    .then(item => {
        if(item){
            if (item.seller == req.session.user) {
                let err = new Error('you cannot make an offer on your own item');
                err.status = 401;
                return next(err);
            } else {
                return next();
            }
        }else{
            let err = new Error('item not found');
            err.status = 404;
            return next(err);
        }
    })
    .catch(err => next(err));
}