var llPromise = require('../index.js')

function async_fn1 (resolve, reject) {
    setTimeout(function() {
        console.log('第一步')
        resolve(1)
    }, 500)
}

function async_fn2 (resolve, reject) {
    setTimeout(function () {
        console.log('第二步')
    })
}

new Promise(fn1).then(function (val) {
    console.log(val)
    return new Promise(fn2)
}).then(function (val) {
    console.log(val)
    return 33
}).then(function (val) {
    console.log(val)
})