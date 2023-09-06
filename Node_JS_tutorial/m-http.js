const http = require('https');

const req = http.request('https://www.gooogle.com', (res) => {
    res.on('data', (chunk) => {
        console.log(`Data chunk: ${chunk}`);
    });
    res.on('end', () => {
        console.log('No more data');
    });
});

req.end();

// const {request} = require('https');
// request('https://www.gooogle.com', (res) => {
//
//     res.on('data', (chunk) => {
//         console.log(`Data chunk: ${chunk}`);
//     });
//     res.on('end', () => {
//         console.log('No more data');
//     });
// });

// tạo ra các modules sẽ giúp việc sử dụng lại code viết sẵn, hay module này không cần lấy toàn bộ code của module kia trong việc sắp xếp. VD: http.js module được tạo nên từ request.js and respond.js nhưung trong request.js cũng có nhiều thứ nên http chỉ lấy phần nào cần thiết trong request thôi nên đó không phải viết hết toàn bộ code