const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const bcrypt = require('bcrypt');

const userSchema = new Schema({
    firstName: { type: String, required: [true, 'first name required'] },
    lastName: { type: String, required: [true, 'last name required'] },
    email: { type: String, required: [true, 'email required'], unique: [true, 'email already exists']},
    password: { type: String, required: [true, 'password required'] },
});

userSchema.pre('save', function(next) {
    let user = this;
    if(!user.isModified('password')) return next();
    bcrypt.hash(user.password, 10)
    .then(hash => {
        user.password = hash;
        next();
    })
    .catch(err => next(err));
});

userSchema.methods.comparePassword = function(loginPassword) {
    let user = this;
    return bcrypt.compare(loginPassword, user.password);
}

module.exports = mongoose.model('User', userSchema);