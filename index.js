module.exports = function Promise (fn) {
    var value = null,
        state = 'pending',
        deferreds = []

    this.then = function (onFulfilled) {
        return new Promise(function (resolve) {
            handle({
                onFulfilled: onFulfilled || null,
                resolve: resolve
            })
        })
    }

    function handle (deferred) {
        if (state === 'pending') {
            deferreds.push(deferred)
            return
        }
        var ret = deferred.onFulfilled(value)
        deferred.resolve(ret)
    }

    function resolve (newValue) {
        if (newValue && (typeof newValue === 'object' || typeof newValue === 'function')) {
            var then = newValue.then
            if (typeof then === 'function') {
                then.call(newValue, resolve)
                return
            }
        }
        value = newValue
        state = 'fulfilled'
        setTimeout(function () {
            deferreds.forEach(function (deferred) {
                handle(value)
            })
        }, 0)
    }

    fn(resolve)
}

