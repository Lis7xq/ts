function add(num) {
    var sum = num;
    function innerAdd(nextNum) {
        if (nextNum === undefined) {
            return sum;
        }
        sum += nextNum;
        return innerAdd;
    }
    var result = (function (nextNum) { return innerAdd(nextNum); });
    return result;
}
console.log(add(2)(5)(7)(1)(6)(5)(10)()); // Output: 36
//2
function isAnagram(str1, str2) {
    var arr1 = str1.replace(/\s/g, "").split("");
    var arr2 = str2.replace(/\s/g, "").split("");
    if (arr1.length !== arr2.length) {
        return false;
    }
    var freq1 = arr1.reduce(function (acc, curr) {
        acc[curr] = (acc[curr] || 0) + 1;
        return acc;
    }, {});
    var freq2 = arr2.reduce(function (acc, curr) {
        acc[curr] = (acc[curr] || 0) + 1;
        return acc;
    }, {});
    for (var key in freq1) {
        if (freq1[key] !== freq2[key]) {
            return false;
        }
    }
    return true;
}
console.log(isAnagram("listen", "silent"));
console.log(isAnagram("hello", "world"));
//3
function deepClone(obj) {
    var clone = {};
    for (var key in obj) {
        if (typeof obj[key] === "object" && obj[key] !== null) {
            clone[key] = deepClone(obj[key]);
        }
        else {
            clone[key] = obj[key];
        }
    }
    return clone;
}
var original = {
    a: 1,
    b: {
        c: 2,
    },
};
var cloned = deepClone(original);
cloned.b.c = 7;
console.log(original.b.c); // 2
//4
var cacheFunctionResult = function (fn) {
    var cache = new Map();
    return function () {
        var args = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            args[_i] = arguments[_i];
        }
        var key = args.join("|");
        var cachedResult = cache.get(key);
        if (cachedResult) {
            return cachedResult;
        }
        var result = fn.apply(void 0, args);
        cache.set(key, result);
        return result;
    };
};
var calc = function (a, b, c) { return a + b + c; };
var cachedCalc = cacheFunctionResult(calc);
console.log(cachedCalc(2, 2, 3)); // 7 calculated
console.log(cachedCalc(5, 8, 1)); // 14 calculated
console.log(cachedCalc(2, 2, 3)); // 7 from cache
