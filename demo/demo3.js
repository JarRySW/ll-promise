// demo3.js
var llPromise = require('../src/promise3')

function getUserId () {
    return new llPromise(function (resolve) {
        setTimeout(function () {
            let id = 'id:0'
            console.log('debug', id)
            resolve(id)
        }, 2000)
    })
}

function getUserMobileById(id) {
    return new llPromise(function (resolve) {
        setTimeout(() => {
            let mobile = `${id}_mobile:110`
            console.log('debug', mobile)
            resolve(mobile)
        }, 1000);
    })
}

getUserId()
    .then(getUserMobileById)
    .then(function (msg) {
        // do something
        console.log(msg)
    }, function (error) {
        console.log(error)
    })