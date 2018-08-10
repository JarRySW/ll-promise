var llPromise = require('../src/promise1')

function getUserId () {
    return new llPromise(function (resolve) {
        setTimeout(function () {
            resolve('用户数据')
        }, 2000)
    })
}

getUserId().then(function (msg) {
    // do something
    console.log(msg)
})