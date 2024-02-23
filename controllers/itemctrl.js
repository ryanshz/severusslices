exports.index = (req, res) => {
    res.send('items home')
}

exports.view = (req, res) => {
    res.send('item with id: ' + req.params.id)
}