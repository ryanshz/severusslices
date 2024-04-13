const model = require('../models/users');

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
                err.status = 400;
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
    model.findOne({ email: email })
        .then(user => {
            if (user) {
                user.comparePassword(password)
                    .then(result => {
                        if (result) {
                            req.session.user = user._id;
                            res.redirect('/users/profile');
                        } else {
                            console.log('wrong password');
                            res.redirect('/users/login');
                        }
                    })
                    .catch(err => next(err));    
            } else {
                console.log('wrong email');
                res.redirect('/users/login');
            }
        })
        .catch(err => next(err));
}

exports.profile = (req, res) => {
    let id = req.session.user;
    model.findById(id)
        .then(user => {
            res.render('users/profile.ejs', { user: user });
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