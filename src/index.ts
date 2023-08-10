/**
 * @ap.cx/unicode-range
 *
 * @description A collection of utility functions for generating and manipulating Unicode values.
 * @license MIT
 * @author Thierry Charbonnel
 * 
 **/


export function range(start: number, end: number): number[] {
    return Array.from({ length: end - start + 1 }, (_, index) => start + index);
}

export function compactRanges(numbers: number[] = []): (number | [number, number])[] {
    if (numbers.length === 0) {
        return [];
    }
    const sortedNumbers = Array.from(new Set(numbers)).slice().sort((a, b) => a - b);
    const result: (number | [number, number])[] = [];
    let start = sortedNumbers[0];
    let end = sortedNumbers[0];
    for (let i = 1; i < sortedNumbers.length; i++) {
        if (sortedNumbers[i] === end + 1) {
            end = sortedNumbers[i];
        } else {
            if (start === end) {
                result.push(start);
            } else {
                result.push([start, end]);
            }
            start = end = sortedNumbers[i];
        }
    }
    if (start === end) {
        result.push(start);
    } else {
        result.push([start, end]);
    }
    return result;
}

export function convertToHexValues(compactRanges: (number | [number, number])[] = []): (string | [string, string])[] {
    function toHex(value: number): string {
        return `0x${value.toString(16).toUpperCase().padStart(4, '0')}`;
    }
    return compactRanges.map(item => {
        if (Array.isArray(item)) {
            return [toHex(item[0]), toHex(item[1])];
        } else {
            return toHex(item);
        }
    });
}


export function convertToUnicodeString(compactRanges: (number | [number, number])[] = []): string {
    function toUnicode(value: number, prefix: string = 'U+'): string {
        return `${prefix}${value.toString(16).toUpperCase().padStart(4, '0')}`;
    }
    return compactRanges.map(item => {
        if (Array.isArray(item)) {
            if (typeof item[0] !== 'number' || typeof item[1] !== 'number') {
                throw new Error('Invalid Unicode range');
            }
            // add 1 to the end of the range to include the last character
            return `${toUnicode(item[0])}-${toUnicode(item[1] + 1, '')}`;
        } else {
            if (typeof item !== 'number') {
                throw new Error('Invalid Unicode value');
            }
            return toUnicode(item);
        }
    }).join(', ');
}

export function convertStringToCompactRanges(unicodeString: string): (number | [number, number])[] {
    const ranges = unicodeString.split(', ');
    function parseHex(hexString: string, s: number = 0): number {
        if (!Number.isNaN(parseInt(hexString.slice(s), 16))) {
            return parseInt(hexString.slice(s), 16);
        }
    }
    return ranges.map(range => {
        const parts = range.split('-');
        if (parts.length === 1) {
            return parseHex(parts[0], 2);
        } else {
            return [parseHex(parts[0], 2), parseHex(parts[1])];
        }
    });
}

export function flattenNestedArray(input: (number | [number, number])[]): number[] {
    const flattenedArray: number[] = [];
    function isArrayWithRange(item: number | [number, number]): item is [number, number] {
        return Array.isArray(item) && item.length === 2;
    }
    input.forEach(item => {
        if (isArrayWithRange(item)) {
            for (let i = item[0]; i <= item[1]; i++) {
                flattenedArray.push(i);
            }
        } else {
            flattenedArray.push(item);
        }
    });
    return flattenedArray;
}

export function getArrayIntersection(array1 = [], array2 = []): number[] {
    return array1.filter(value => array2.includes(value));
}

export function getMissingValues(array1 = [], array2 = []): number[] {
    return array1.filter(value => !array2.includes(value));
}
