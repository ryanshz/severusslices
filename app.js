const express = require('express');
const morgan = require('morgan');
const methodOverride = require('method-override');

//routes
const itemRoutes = require('./routes/itemRoutes');
const newRoutes = require('./routes/newRoutes');

//base stuff
const app = express();
let port = 3000;
let hostname = 'localhost';
app.set('view engine', 'ejs');

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

app.listen(port, hostname, () => {
    console.log(`Server is running at http://${hostname}:${port}/`);
});