'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

/**
 * @ap.cx/unicode-range
 *
 * @description A collection of utility functions for generating and manipulating Unicode values.
 * @license MIT
 * @author Thierry Charbonnel
 *
 **/
function range(start, end) {
    return Array.from({ length: end - start + 1 }, function (_, index) { return start + index; });
}
function compactRanges(numbers) {
    if (numbers === void 0) { numbers = []; }
    if (numbers.length === 0) {
        return [];
    }
    var sortedNumbers = Array.from(new Set(numbers)).slice().sort(function (a, b) { return a - b; });
    var result = [];
    var start = sortedNumbers[0];
    var end = sortedNumbers[0];
    for (var i = 1; i < sortedNumbers.length; i++) {
        if (sortedNumbers[i] === end + 1) {
            end = sortedNumbers[i];
        }
        else {
            if (start === end) {
                result.push(start);
            }
            else {
                result.push([start, end]);
            }
            start = end = sortedNumbers[i];
        }
    }
    if (start === end) {
        result.push(start);
    }
    else {
        result.push([start, end]);
    }
    return result;
}
function convertToHexValues(compactRanges) {
    if (compactRanges === void 0) { compactRanges = []; }
    function toHex(value) {
        return "0x".concat(value.toString(16).toUpperCase().padStart(4, '0'));
    }
    return compactRanges.map(function (item) {
        if (Array.isArray(item)) {
            return [toHex(item[0]), toHex(item[1])];
        }
        else {
            return toHex(item);
        }
    });
}
function convertToUnicodeString(compactRanges) {
    if (compactRanges === void 0) { compactRanges = []; }
    function toUnicode(value, prefix) {
        if (prefix === void 0) { prefix = 'U+'; }
        return "".concat(prefix).concat(value.toString(16).toUpperCase().padStart(4, '0'));
    }
    return compactRanges.map(function (item) {
        if (Array.isArray(item)) {
            if (typeof item[0] !== 'number' || typeof item[1] !== 'number') {
                throw new Error('Invalid Unicode range');
            }
            return "".concat(toUnicode(item[0]), "-").concat(toUnicode(item[1], ''));
        }
        else {
            if (typeof item !== 'number') {
                throw new Error('Invalid Unicode value');
            }
            return toUnicode(item);
        }
    }).join(', ');
}
function convertStringToCompactRanges(unicodeString) {
    var ranges = unicodeString.split(', ');
    function parseHex(hexString, s) {
        if (s === void 0) { s = 0; }
        if (!Number.isNaN(parseInt(hexString.slice(s), 16))) {
            return parseInt(hexString.slice(s), 16);
        }
    }
    return ranges.map(function (range) {
        var parts = range.split('-');
        if (parts.length === 1) {
            return parseHex(parts[0], 2);
        }
        else {
            return [parseHex(parts[0], 2), parseHex(parts[1])];
        }
    });
}
function flattenNestedArray(input) {
    var flattenedArray = [];
    function isArrayWithRange(item) {
        return Array.isArray(item) && item.length === 2;
    }
    input.forEach(function (item) {
        if (isArrayWithRange(item)) {
            for (var i = item[0]; i <= item[1]; i++) {
                flattenedArray.push(i);
            }
        }
        else {
            flattenedArray.push(item);
        }
    });
    return flattenedArray;
}
function getArrayIntersection(array1, array2) {
    if (array1 === void 0) { array1 = []; }
    if (array2 === void 0) { array2 = []; }
    return array1.filter(function (value) { return array2.includes(value); });
}
function getMissingValues(array1, array2) {
    if (array1 === void 0) { array1 = []; }
    if (array2 === void 0) { array2 = []; }
    return array1.filter(function (value) { return !array2.includes(value); });
}

exports.compactRanges = compactRanges;
exports.convertStringToCompactRanges = convertStringToCompactRanges;
exports.convertToHexValues = convertToHexValues;
exports.convertToUnicodeString = convertToUnicodeString;
exports.flattenNestedArray = flattenNestedArray;
exports.getArrayIntersection = getArrayIntersection;
exports.getMissingValues = getMissingValues;
exports.range = range;
//# sourceMappingURL=unicode-range.js.map
