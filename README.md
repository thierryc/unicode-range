

# Unicode Range Conversion Functions

`@ap.cx/unicode-range` is a collection of utility functions for generating and manipulating Unicode values.

## Installation

```bash
npm install @ap.cx/unicode-range
```

## Usage

Import the functions you need from the package:

```javascript
import { 
    range, 
    compactRanges, 
    convertToHexValues, 
    convertToUnicodeString, 
    convertStringToCompactRanges, 
    flattenNestedArray, 
    getArrayIntersection,
    getMissingValues,
} from '@ap.cx/unicode-range';
```

## Functions

### `range(start: number, end: number): number[]`

Generates a range of numbers from `start` to `end`.

### `compactRanges(arr: number[]): (number | [number, number])[]`

Generates compact ranges from an array of numbers.

### `convertToHexValues(compactRanges: (number | [number, number])[]): (string | [string, string])[]`

Converts compact ranges to hex values.

### `convertToUnicodeString(compactRanges: (number | [number, number])[]): string`

Converts compact ranges to a Unicode string.

### `convertStringToCompactRanges(unicodeString: string): (number | [number, number])[]`

Converts a Unicode string to compact ranges.

### `flattenNestedArray(input: (number | [number, number])[]): number[]`

Flattens a nested array of numbers and ranges into a flat array of numbers.

### `getArrayIntersection(array1, array2)`

A utility function that returns the intersection of two arrays.

Returns an array containing the common elements between `array1` and `array2`.

- `array1` (Array): The first input array.
- `array2` (Array): The second input array.

Returns: An array containing the common elements.

### `getMissingValues(array1, array2)`

The `getMissingValues` function returns an array containing all the values from the first array that are not present in the second array.

- `array1` (Array): The array from which missing values will be extracted.
- `array2` (Array): The array against which the values will be compared to find the missing values.

Returns (Array): An array containing all the values from `array1` that are not present in `array2`.

## Examples

```javascript
const result = range(1, 5);
// Output: [1, 2, 3, 4, 5]

const compactRanges = [1, 2, 3, 6, 7, 8, 9, 11, 15];
const result = compactRanges(compactRanges);
// Output: [[1, 3], [6, 9], 11, 15]

const compactRanges = [[1, 3], [6, 9], 11, 15];
const result = convertToHexValues(compactRanges);
// Output: [['0x0001', '0x0003'], ['0x0006', '0x0009'], '0x000B', '0x000F']

const compactRanges = [[1, 3], [6, 9], 11, 15];
const result = convertToUnicodeString(compactRanges);
// Output: 'U+0001-0003, U+0006-0009, U+000B, U+000F'

const unicodeString = 'U+0001-0003, U+0006-0009, U+000B, U+000F';
const result = convertStringToCompactRanges(unicodeString);
// Output: [[1, 3], [6, 9], 11, 15]

const nestedArray = [[1, 3], [6, 9], 11, 15];
const flattenedArray = flattenNestedArray(nestedArray);
// Output: [1, 2, 3, 6, 7, 8, 9, 11, 15]

const array1 = [1, 2, 3, 4, 5];
const array2 = [3, 4, 5, 6, 7];

const intersection = getArrayIntersection(array1, array2);
// Output: [3, 4, 5]

const array1 = [1, 2, 3, 4, 5];
const array2 = [2, 4, 6, 8];
const missingValues = getMissingValues(array1, array2);
// Output: [1, 3, 5]


```

## Running Tests

Make sure you have Jest installed, and run the tests:

```bash
npm test
```

## License

This package is licensed under the [MIT License](LICENSE).


