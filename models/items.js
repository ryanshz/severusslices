const {DateTime} = require('luxon');
const {v4: uuidv4} = require('uuid');
const items = [
    { 
        id: '1', 
        name: 'The Roman Pizza Banquet',
        image: 'images/pizzabanquet.JPG',
        alt: 'Roman soldiers eating pizzas in a dining hall.',
        condition: 'perfect condition',
        price: '$1000.00',
        seller: 'The Roman Empire',
        offer: '3',
        active: 'true'
    },
    { 
        id: '2', 
        name: 'The Bath of Pizza',
        image: 'images/pizzabath.JPG',
        alt: 'A roman soldier bathing in pizza.',
        condition: 'good condition',
        price: '$300.00',
        seller: 'Emperor Nero',
        offer: '0',
        active: 'true'
    },
    { 
        id: '3', 
        name: 'Free Conquest',
        image: 'images/freeconquest.JPG',
        alt: 'Roman soldiers conquering a local Dominos.',
        condition: 'poor condition',
        price: 'Free with any purchase',
        seller: 'The Third Gallica',
        offer: '6',
        active: 'true'
    },
    {
        id: '4',
        name: 'Pizza Hit',
        image: 'images/pizzahit.jpg',
        alt: 'A shirtless man, and a man with a hood holding a pizza.',
        condition: 'great condition',
        price: 'Negotiable',
        seller: 'Cicero Caesar',
        offer: '1',
        active: 'true'
    },
    {
        id: '5',
        name: 'The Faceless Pie',
        image: 'images/facelesspie.jpg',
        alt: 'Faceless Roman soldiers standing behind a pizza.',
        condition: 'perfect condition',
        price: '$20.00',
        seller: 'The Ghost of Augustus',
        offer: '17',
        active: 'true'
    },
    {
        id: '6',
        name: 'Social Hour',
        image: 'images/socialhour.jpg',
        alt: 'Two roman soldiers conversing in a black and white photo.',
        condition: 'priceless',
        price: '$5.00 entry',
        seller: 'severus slices',
        offer: '1364',
        active: 'true'
    }
];

exports.find = () => {
    return items;
}

exports.findById = (id) => {
    return items.find(item => item.id === id);
}

exports.findByName = (name) => {
    return items.find(item => item.name === name);
}

exports.save = (item) => {
    item.id = uuidv4();
    item.active = 'true';
    item.offer = '0';
    items.push(item);
}