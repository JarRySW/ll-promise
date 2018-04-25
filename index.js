module.exports = function Promise (fn) {
    var value = null,
        state = 'pending',
        deferreds = []

    this.then = function (onFulfilled, onRejected) {
        return new Promise(function (resolve, reject) {
            handle({
                onFulfilled: onFulfilled || null,
                onRejected: onRejected || null,
                resolve: resolve,
                reject: reject
            })
        })
    }

    function handle (deferred) {
        if (state === 'pending') {
            deferreds.push(deferred)
            return
        }

        var cb = state === 'fulfilled' ? deferred.onFulfilled : deferred.onRejected,
            ret;
        if (cb === null) {
            cb = state === 'fulfilled' ? deferred.resolve : deferred.reject
            cb(value)
            return
        }
        try {
            ret = cb(value)
            deferred.resolve(ret)
        } catch (e) {
            deferred.reject(e)
        }
    }

    function resolve (newValue) {
        if (newValue && (typeof newValue === 'object' || typeof newValue === 'function')) {
            var then = newValue.then
            if (typeof then === 'function') {
                then.call(newValue, resolve, reject)
                return
            }
        }
        value = newValue
        state = 'fulfilled'
        finale()
    }

    function reject (reason) {
        state = 'rejected'
        value = reason
        finale()
    }

    function finale () {
        setTimeout(function () {
            deferreds.forEach(function (deferred) {
                handle(deferred)
            })
        }, 0)
    }

    fn(resolve, reject)
}

