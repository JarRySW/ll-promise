// demo1.js
var llPromise = require('../src/promise1')

function getUserId () {
    return new llPromise(function (resolve) {
        setTimeout(function () {
            resolve('id:0')
        }, 2000)
    })
}

getUserId().then(function (msg) {
    // do something
    console.log(msg)
})