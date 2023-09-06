const REQUEST_TIME = 500;

function encrypt(data){
    return 'encrypted data'
}

function send(url, data){
    const  encryptedData = encrypt(data);
    console.log(`send: ${encryptedData} to ${url}`)
}

module.exports = {
    REQUEST_TIME,
    send
}
