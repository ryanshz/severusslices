const model = require('../models/items');

exports.index = (req, res) => {
    res.render('new/index.ejs', { title: 'New' });
}