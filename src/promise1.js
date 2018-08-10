// promise1.js
module.exports = function (fn) {
    var value= null,
        deferreds = [];

    this.then = function (onFulilled) {
        deferreds.push(onFulilled)
    }

    function resolve(value) {
        deferreds.forEach(function (deferred) {
            deferred(value)
        })
    }

    fn(resolve)
}