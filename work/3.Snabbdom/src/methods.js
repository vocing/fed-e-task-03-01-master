var snabbdom = require('snabbdom/snabbdom.js');
var patch = snabbdom.init([
    require('snabbdom/modules/class').default,
    require('snabbdom/modules/props').default,
    require('snabbdom/modules/style').default,
    require('snabbdom/modules/eventlisteners').default,
]);

function changeSort(data, prop) {
    return data.sort((a, b) => {
        if (a[prop] > b[prop]) {
            return 1;
        }
        if (a[prop] < b[prop]) {
            return -1;
        }
        return 0;
    });
}

function add(data, arr) {
    const a = arr.concat(data)
    return a;
}

function remove(data, movie) {
    return data.filter(m => m !== movie);
}
module.exports = {
    changeSort,
    add,
    remove,
    patch
}