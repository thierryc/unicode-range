/**
 * @ap.cx/unicode-range
 *
 * @description A collection of utility functions for generating and manipulating Unicode values.
 * @license MIT
 * @author Thierry Charbonnel
 *
 **/
declare function range(start: number, end: number): number[];
declare function compactRanges(arr: number[]): (number | [
    number,
    number
])[];
declare function convertToHexValues(compactRanges: (number | [
    number,
    number
])[]): (string | [
    string,
    string
])[];
declare function convertToUnicodeString(compactRanges: (number | [
    number,
    number
])[]): string;
declare function convertStringToCompactRanges(unicodeString: string): (number | [
    number | undefined,
    number | undefined
] | undefined)[];
declare function flattenNestedArray(input: (number | [
    number,
    number
])[]): number[];
declare function getArrayIntersection(array1: any, array2: any): any;
declare function getMissingValues(array1: any, array2: any): any;
export { range, compactRanges, convertToHexValues, convertToUnicodeString, convertStringToCompactRanges, flattenNestedArray, getArrayIntersection, getMissingValues };
