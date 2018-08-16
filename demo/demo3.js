// demo3.js
var llPromise = require('../src/promise3')

function getUserId () {
    console.log('getUserId promise')
    return new llPromise(function (resolve) {
        setTimeout(function () {
            let id = 'id:0'
            resolve(id)
        }, 2000)
    })
}

function getUserMobileById(id) {
    console.log('getUserMobileById promise')
    return new llPromise(function (resolve) {
        setTimeout(() => {
            let mobile = `${id}_mobile:110`
            resolve(mobile)
        }, 1000);
    })
}

getUserId()
    .then(getUserMobileById)
    .then(function (msg) {
        // do something
    }, function (error) {
        console.log(error)
    })