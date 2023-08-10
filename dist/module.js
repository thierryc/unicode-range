/**
 * @ap.cx/unicode-range
 *
 * @description A collection of utility functions for generating and manipulating Unicode values.
 * @license MIT
 * @author Thierry Charbonnel
 * 
 **/ function $149c1bd638913645$export$d02631cccf789723(start, end) {
    return Array.from({
        length: end - start + 1
    }, (_, index)=>start + index);
}
function $149c1bd638913645$export$c1cbde3b9a81df42(arr) {
    const result = [];
    let start = arr[0];
    let end = arr[0];
    for(let i = 1; i < arr.length; i++)if (arr[i] === end + 1) end = arr[i];
    else {
        if (start === end) result.push(start);
        else result.push([
            start,
            end
        ]);
        start = end = arr[i];
    }
    if (start === end) result.push(start);
    else result.push([
        start,
        end
    ]);
    return result;
}
function $149c1bd638913645$export$87732bced001ab01(compactRanges) {
    function toHex(value) {
        return `0x${value.toString(16).toUpperCase().padStart(4, "0")}`;
    }
    return compactRanges.map((item)=>{
        if (Array.isArray(item)) return [
            toHex(item[0]),
            toHex(item[1])
        ];
        else return toHex(item);
    });
}
function $149c1bd638913645$export$2a0c427c4a4ee968(compactRanges) {
    function toUnicode(value, prefix = "U+") {
        return `${prefix}${value.toString(16).toUpperCase().padStart(4, "0")}`;
    }
    return compactRanges.map((item)=>{
        if (Array.isArray(item)) return `${toUnicode(item[0])}-${toUnicode(item[1], "")}`;
        else return toUnicode(item);
    }).join(", ");
}
function $149c1bd638913645$export$27185defe89c0341(unicodeString) {
    const ranges = unicodeString.split(", ");
    function parseHex(hexString, s = 0) {
        return hexString ? parseInt(hexString.slice(s), 16) : undefined;
    }
    return ranges.map((range)=>{
        const parts = range.split("-");
        if (parts.length === 1) return parseHex(parts[0], 2);
        else return [
            parseHex(parts[0], 2),
            parseHex(parts[1])
        ];
    });
}
function $149c1bd638913645$export$6d985c97f88681cf(input) {
    const flattenedArray = [];
    function isArrayWithRange(item) {
        return Array.isArray(item) && item.length === 2;
    }
    input.forEach((item)=>{
        if (isArrayWithRange(item)) for(let i = item[0]; i <= item[1]; i++)flattenedArray.push(i);
        else flattenedArray.push(item);
    });
    return flattenedArray;
}
function $149c1bd638913645$export$1aeed9bfafa6d98f(array1, array2) {
    return array1.filter((value)=>array2.includes(value));
}
function $149c1bd638913645$export$e0995d6cdc25e6cf(array1, array2) {
    return array1.filter((value)=>!array2.includes(value));
}


export {$149c1bd638913645$export$d02631cccf789723 as range, $149c1bd638913645$export$c1cbde3b9a81df42 as compactRanges, $149c1bd638913645$export$87732bced001ab01 as convertToHexValues, $149c1bd638913645$export$2a0c427c4a4ee968 as convertToUnicodeString, $149c1bd638913645$export$27185defe89c0341 as convertStringToCompactRanges, $149c1bd638913645$export$6d985c97f88681cf as flattenNestedArray, $149c1bd638913645$export$1aeed9bfafa6d98f as getArrayIntersection, $149c1bd638913645$export$e0995d6cdc25e6cf as getMissingValues};
//# sourceMappingURL=module.js.map
