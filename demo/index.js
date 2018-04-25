var llPromise = require('../index.js')

function getUserId () {
    return new llPromise(function (resolve) {
        setTimeout(function () {
            console.log('第一步')
            resolve('第一步')
        }, 5000)
    })
}

getUserId().then(function (id) {
    // do something
})