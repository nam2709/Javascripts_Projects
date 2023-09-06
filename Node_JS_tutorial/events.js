const EventEmitter = require('events');
const celebrity = new EventEmitter();

// Subscribe to celebrity observer 1
celebrity.on('race', (result) => {
    if (result === 'win'){
        console.log('Congratulations ! You are the best');
    }
})

// Subscribe to celebrity observer 2
celebrity.on('race', (result) => {
    if (result === 'lost'){
        console.log('Boo i can do better');
    }
})

process.on('exit', (code) => {
    console.log('hello', code);
});

celebrity.emit('race', 'win');
celebrity.emit('race', 'lost');