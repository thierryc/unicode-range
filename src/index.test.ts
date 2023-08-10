import { 
    range, 
    compactRanges, 
    convertToHexValues, 
    convertToUnicodeString, 
    convertStringToCompactRanges, 
    flattenNestedArray, 
    getArrayIntersection,
    getMissingValues,
} from './index';

describe('range function', () => {
    it('should generate a range of numbers', () => {
        const result = range(1, 5);
        expect(result).toEqual([1, 2, 3, 4, 5]);
    });

    it('should generate a single number range', () => {
        const result = range(8, 8);
        expect(result).toEqual([8]);
    });

    it('should generate an empty range if end is less than start', () => {
        const result = range(10, 5);
        expect(result).toEqual([]);
    });
});

describe('compactRanges function', () => {
    it('should generate compact ranges', () => {
        const input = [1, 2, 3, 6, 7, 8, 9, 11, 15];
        const expectedOutput = [[1, 3], [6, 9], 11, 15];

        const result = compactRanges(input);
        expect(result).toEqual(expectedOutput);
    });

    it('should generate sorted compact ranges', () => {
        const input = [11, 3, 2, 7, 6, 8, 9, 1, 15];
        const expectedOutput = [[1, 3], [6, 9], 11, 15];

        const result = compactRanges(input);
        expect(result).toEqual(expectedOutput);
    });

    it('should handle single numbers', () => {
        const input = [5];
        const expectedOutput = [5];

        const result = compactRanges(input);
        expect(result).toEqual(expectedOutput);
    });

    it('should handle empty input array', () => {
        const input: number[] = [];
        const expectedOutput: (number | [number, number])[] = [];

        const result = compactRanges(input);
        expect(result).toEqual(expectedOutput);
    });
});

describe('convertToHexValues function', () => {
    it('should convert compact ranges to hex values', () => {
        const compactRanges: (number | [number, number])[] = [[1, 3], [6, 9], 11, 15];
        const expectedOutput: (string | [string, string])[] = [['0x0001', '0x0003'], ['0x0006', '0x0009'], '0x000B', '0x000F'];

        const result = convertToHexValues(compactRanges);
        expect(result).toEqual(expectedOutput);
    });

    it('should handle single numbers', () => {
        const compactRanges: (number | [number, number])[] = [5];
        const expectedOutput: (string | [string, string])[] = ['0x0005'];

        const result = convertToHexValues(compactRanges);
        expect(result).toEqual(expectedOutput);
    });
});

describe('convertToUnicodeString function', () => {
    it('should convert compact ranges to Unicode string', () => {
        const compactRanges: (number | [number, number])[] = [[1, 3], [6, 9], 11, 15];
        const expectedOutput = 'U+0001-0003, U+0006-0009, U+000B, U+000F';

        const result = convertToUnicodeString(compactRanges);
        expect(result).toEqual(expectedOutput);
    });

    it('should handle single numbers', () => {
        const compactRanges: (number | [number, number])[] = [5];
        const expectedOutput = 'U+0005';

        const result = convertToUnicodeString(compactRanges);
        expect(result).toEqual(expectedOutput);
    });

    it('should handle empty input array', () => {
        const compactRanges: (number | [number, number])[] = [];
        const expectedOutput = '';

        const result = convertToUnicodeString(compactRanges);
        expect(result).toEqual(expectedOutput);
    });
});

describe('convertStringToCompactRanges function', () => {
    it('should convert Unicode string to compact ranges', () => {
        const unicodeString = 'U+0001-0003, U+0006-0009, U+000B, U+000F';
        const expectedOutput: (number | [number, number])[] = [[1, 3], [6, 9], 11, 15];

        const result = convertStringToCompactRanges(unicodeString);
        expect(result).toEqual(expectedOutput);
    });

    it('should handle single numbers', () => {
        const unicodeString = 'U+0005';
        const expectedOutput: (number | [number, number])[] = [5];

        const result = convertStringToCompactRanges(unicodeString);
        expect(result).toEqual(expectedOutput);
    });

    it('should handle empty input string', () => {
        const unicodeString = '';
        const expectedOutput: (number | [number, number])[] = [];

        const result = convertStringToCompactRanges(unicodeString);
        expect(result).toEqual(expectedOutput);
    });
});

describe('flattenNestedArray function', () => {
    it('should flatten nested arrays', () => {
        const nestedArray: (number | [number, number])[] = [[1, 3], [6, 9], 11, 15];
        const expectedOutput: number[] = [1, 2, 3, 6, 7, 8, 9, 11, 15];

        const result = flattenNestedArray(nestedArray);
        expect(result).toEqual(expectedOutput);
    });

    it('should handle single numbers', () => {
        const nestedArray: (number | [number, number])[] = [5, 10, 20];
        const expectedOutput: number[] = [5, 10, 20];

        const result = flattenNestedArray(nestedArray);
        expect(result).toEqual(expectedOutput);
    });

    it('should handle empty input array', () => {
        const nestedArray: (number | [number, number])[] = [];
        const expectedOutput: number[] = [];

        const result = flattenNestedArray(nestedArray);
        expect(result).toEqual(expectedOutput);
    });
});

describe('getArrayIntersection', () => {
    it('should return the intersection of two arrays', () => {
        const array1 = [1, 2, 3, 4, 5];
        const array2 = [3, 4, 5, 6, 7];

        const intersection = getArrayIntersection(array1, array2);
        expect(intersection).toEqual([3, 4, 5]);
    });

    it('should handle empty arrays', () => {
        const array1 = [];
        const array2 = [1, 2, 3];

        const intersection = getArrayIntersection(array1, array2);
        expect(intersection).toEqual([]);
    });

    it('should return an empty array for arrays with no common elements', () => {
        const array1 = [1, 2, 3];
        const array2 = [4, 5, 6];

        const intersection = getArrayIntersection(array1, array2);
        expect(intersection).toEqual([]);
    });
});


describe('getMissingValues', () => {
    it('returns all missing values from array1 in array2', () => {
      const array1 = [1, 2, 3, 4, 5];
      const array2 = [2, 4, 6, 8];
      expect(getMissingValues(array1, array2)).toEqual([1, 3, 5]);
    });
  
    it('returns an empty array if no missing values are found', () => {
      const array1 = [1, 2, 3];
      const array2 = [1, 2, 3];
      expect(getMissingValues(array1, array2)).toEqual([]);
    });
  
    it('returns all values from array1 if array2 is empty', () => {
      const array1 = [1, 2, 3];
      const array2 = [];
      expect(getMissingValues(array1, array2)).toEqual([1, 2, 3]);
    });
  
    it('returns an empty array if array1 is empty', () => {
      const array1 = [];
      const array2 = [1, 2, 3];
      expect(getMissingValues(array1, array2)).toEqual([]);
    });
  });