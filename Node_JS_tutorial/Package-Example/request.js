const axios = require('axios');

axios.get('https://www.google.com')
    .then((respone) => {
        console.log(respone);
    })
    .catch((err) => {
        console.log(`Lỗi code là: ${err}`);
    })
    .then(() => {
        console.log('All done!');
    });
