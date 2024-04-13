const model = require('../models/users');
const Items = require('../models/items');

exports.signup = (req, res) => {
    res.render('./users/signup.ejs');
}

exports.create = (req, res, next) => {
    let user = new model(req.body);
    user.save()
        .then(user => {
            console.log(user);
            res.redirect('./users/login');
        })
        .catch(err => {
            if (err.name === 'ValidationError') {
                req.flash('error', err.message);
                res.redirect('/users/signup');
            }
            if(err.code === 11000){
                req.flash('error', 'email already exists');
                res.redirect('/users/signup');
            }
            next(err);
        });
}

exports.login = (req, res) => {
    res.render('./users/login.ejs');
}

exports.authenticate = (req, res, next) => {
    let email = req.body.email;
    let password = req.body.password;
    console.log(req.flash());
    model.findOne({ email: email })
        .then(user => {
            if (user) {
                user.comparePassword(password)
                    .then(result => {
                        if (result) {
                            req.session.user = user._id;
                            req.flash('success', 'logged in successfully');
                            res.redirect('/users/profile');
                        } else {
                            req.flash('error', 'wrong password');
                            res.redirect('/users/login');
                        }
                    })
                    .catch(err => next(err));    
            } else {
                req.flash('error', 'wrong email');
                res.redirect('/users/login');
            }
        })
        .catch(err => next(err));
}

exports.profile = (req, res) => {
    let id = req.session.user;
    Promise.all([model.findById(id), Items.find({seller:id})])
        .then(results => {
            const [user, items] = results;
            res.render('users/profile.ejs', { user, items });
        })
        .catch(err => next(err));
}

exports.logout = (req, res) => {
    req.session.destroy(err => {
        if (err) {
            return next(err);
        }else{
            res.redirect('/');
        }
    });
}