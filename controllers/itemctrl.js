exports.index = (req, res) => {
    res.render('items', { title: 'Items' });
}

exports.view = (req, res) => {
    res.send('item with id: ' + req.params.id)
}