const express = require('express');
const morgan = require('morgan');
const methodOverride = require('method-override');
const mongoose = require('mongoose');

//routes
const itemRoutes = require('./routes/itemRoutes');
const newRoutes = require('./routes/newRoutes');

//base stuff
const app = express();
let port = 3000;
let hostname = 'localhost';
let url = 'mongodb://localhost:27017/severusslices';
app.set('view engine', 'ejs');

//db connection
mongoose.connect(url)
    .then(() => {
        app.listen(port, hostname, () => {
            console.log(`Server is running at http://${hostname}:${port}/`);
        });
    })
    .catch(err => {
        console.log(err.message);
    });

//middleware
app.use(morgan('tiny'));
app.use(express.static('public'));
app.use(express.urlencoded({ extended: true }));
app.use(methodOverride('_method'));

//routes
app.get('/', (req, res) => {
    res.render('index', { title: 'Home' });
});
app.use('/items', itemRoutes);
app.use('/new', newRoutes);

//error handlers
app.use((req, res, next) => {
    let err = new Error('Page not found!');
    err.status = 404;
    next(err);
});

app.use((err, req, res, next) => {
    console.log(err.stack);
    if(!err.status){
        err.status = 500;
        err.message = 'hey lol something broke on my end! my bad!';
    }
    res.status(err.status).render('error', { error: err });
});