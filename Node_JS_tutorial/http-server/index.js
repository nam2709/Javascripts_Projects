// GET/friends/5 
// http reqeust 1: method (GET/POST/PUT/PATCH/DELETE/)  2: PATH collection or call resource  3: BODY mostly JSON 4: HEADERS: information like size,.. every header need host: www.facebook.com
// http response 1: Headers: like content-type:application/json 2: Body: data  3: Status code: 200 is goood.

// const http = require('http');

// const PORT = 3000;

// const server = http.createServer();

// const friends = [
//   {
//     id: 0,
//     name: 'Issac',
//   },
//   {
//     id: 1,
//     name: 'Cool',
//   },
//   {
//     id: 2,
//     name: 'Albert',
//   }
// ];

// server.on('request', (req, res) => {
//   const items = req.url.split('/'); // => ['','friends','2']
//   if (items[1] === 'friends'){
//     // res.writeHead(200, {
//     //   'Content-Type': 'application/json',
//     // });
//     res.statusCode = 200;
//     res.setHeader('Content-Type', 'application/json');
//     if (items.length === 3) {
//       const friendscode = Number(items[2]);
//       res.end(JSON.stringify(friends[friendscode]));
//     } else {
//       res.end(JSON.stringify(friends));
//     }
    
//   } else if (items[1] === 'messages') { //  /messages  this an endpoint
//     res.setHeader('Content-Type', 'text/html');
//     res.write('<html>');
//     res.write('<body>');
//     res.write('<ul>');
//     res.write('<li>Hello Issac</li>');
//     res.write('</ul>');
//     res.write('</body>');
//     res.write('</html>');
//     res.end();
//   } else {
//     res.statusCode = 404;
//     res.end()
//   }
//    // end expect an string so need JSON.stringify
// });

// server.listen(PORT, () => {
//   console.log(`listening on port ${PORT}...`);
// }); //127.0.0.1 => localhost








const http = require('http');

const PORT = 3000;

const server = http.createServer();

const friends = [
  {
    id: 0,
    name: 'Nikola Tesla',
  },
  {
    id: 1,
    name: 'Sir Isaac Newton',
  },
  {
    id: 2,
    name: 'Albert Einstein',
  }
];

server.on('request', (req, res) => {
  const items = req.url.split('/');
  // /friends/2 => ['', 'friends', '2']
  // /friends/
  if (req.method === 'POST' && items[1] === 'friends') {
    req.on('data', (data) => {
      const friend = data.toString();
      console.log('Request:', friend);
      friends.push(JSON.parse(friend));
    });
    req.pipe(res);
  } else if (req.method === 'GET' && items[1] === 'friends') {
    res.statusCode = 200;
    res.setHeader('Content-Type', 'application/json');
    if (items.length === 3) {
      const friendIndex = Number(items[2]);
      res.end(JSON.stringify(friends[friendIndex]));
    } else {
      res.end(JSON.stringify(friends));
    }
  } else if (req.method === 'GET' && items[1] === 'messages') {
    res.setHeader('Content-Type', 'text/html');
    res.write('<html>');
    res.write('<body>');
    res.write('<ul>');
    res.write('<li>Hello Isaac!</li>');
    res.write('<li>What are your thoughts on astronomy?</li>');
    res.write('</ul>');
    res.write('</body>');
    res.write('</html>');
    res.end();
  } else {
    res.statusCode = 404;
    res.end();
  }
});

server.listen(PORT, () => {
  console.log(`Listening on port ${PORT}...`);
}); //127.0.0.1 => localhost
