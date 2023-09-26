const express = require('express');
// const cluster =  require('cluster');
// const os = require('os');

const app = express();

function delay(duration){
    const startTime = Date.now();
    while(Date.now() - startTime < duration){
    }
}
app.get('/', (req, res) => {
    res.send(`Performance example: ${process.pid}`);
});

app.get('/timer', (req, res) => {
    delay(5000);
    res.send(`Beep beep beep! ${process.pid}`);
});
//if you change code restart it still use the same code but if you use pm2 reload server it will work, change it one by one not all
// it call zero downtime restart
console.log('Running server js ...');
console.log('Worker process started ...');
app.listen(3000);


