const request = require('./request');
// if in other file depper in that file we can use two dot instead of one '../request.js'
// require look for js files so dont need request.js
const response = require('./response');
// {read} is can call this way because that how in understand the passing of response request
function makeRequest(url, data){
    request.send(url, data);
    return response.read();
}

const respondData = makeRequest('https://google.com', 'hello')
console.log(respondData)

// Use ECMASripts Module change file to .mjs to use
// import { send } from './request.js';
// import { read } from './response.js';

// function makeRequest(url, data){
//     send(url, data);
//     return read();
// }

// const respondData = makeRequest('https://google.com', 'hello')
// console.log(respondData)

// console.log(require.cache);
// send = function() {
//     console.log('MVP101');
// }

// send()