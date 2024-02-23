const {DateTime} = require('luxon');
const items = [
    { 
        id: 1, 
        name: 'item 1',
        created: DateTime.now().toLocaleString(DateTime.DATETIME_MED)
    },
    { 
        id: 2, 
        name: 'item 2',
        created: DateTime.now().toLocaleString(DateTime.DATETIME_MED)
    },
    { 
        id: 3, 
        name: 'item 3',
        created: DateTime.now().toLocaleString(DateTime.DATETIME_MED)
    },
    {
        id: 4,
        name: 'item 4',
        created: DateTime.now().toLocaleString(DateTime.DATETIME_MED)
    },
    {
        id: 5,
        name: 'item 5',
        created: DateTime.now().toLocaleString(DateTime.DATETIME_MED)
    },
    {
        id: 6,
        name: 'item 6',
        created: DateTime.now().toLocaleString(DateTime.DATETIME_MED)
    }
];