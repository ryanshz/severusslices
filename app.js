const express = require('express');
const morgan = require('morgan');

const itemRoutes = require('./routes/itemRoutes');
const newRoutes = require('./routes/newRoutes');

const app = express();
let port = 3000;
let hostname = 'localhost';
app.set('view engine', 'ejs');

app.use(morgan('tiny'));
app.use(express.static('public'));
app.use(express.urlencoded({ extended: true }));

app.get('/', (req, res) => {
    res.render('index', { title: 'Home' });
});

app.use('/items', itemRoutes);
app.use('/new', newRoutes);

app.listen(port, hostname, () => {
    console.log(`Server is running at http://${hostname}:${port}/`);
    }
);