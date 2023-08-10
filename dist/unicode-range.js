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
function compactRanges(arr) {
    var sortedData = arr.slice().sort(function (a, b) { return a - b; });
    var result = [];
    var start = sortedData[0];
    var end = sortedData[0];
    for (var i = 1; i < sortedData.length; i++) {
        if (sortedData[i] === end + 1) {
            end = sortedData[i];
        }
        else {
            if (start === end) {
                result.push(start);
            }
            else {
                result.push([start, end]);
            }
            start = end = sortedData[i];
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
    function toUnicode(value, prefix) {
        if (prefix === void 0) { prefix = 'U+'; }
        return "".concat(prefix).concat(value.toString(16).toUpperCase().padStart(4, '0'));
    }
    return compactRanges.map(function (item) {
        if (Array.isArray(item)) {
            return "".concat(toUnicode(item[0]), "-").concat(toUnicode(item[1], ''));
        }
        else {
            return toUnicode(item);
        }
    }).join(', ');
}
function convertStringToCompactRanges(unicodeString) {
    var ranges = unicodeString.split(', ');
    function parseHex(hexString, s) {
        if (s === void 0) { s = 0; }
        return hexString ? parseInt(hexString.slice(s), 16) : undefined;
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
    return array1.filter(function (value) { return array2.includes(value); });
}
function getMissingValues(array1, array2) {
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
