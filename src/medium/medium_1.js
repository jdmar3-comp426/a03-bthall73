import {variance} from "./data/stats_helpers.js";

/**
 * Gets the sum of an array of numbers.
 * @param array
 * @returns {*}
 * see https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array
 * prototype functions. Very useful
 */
export function getSum(array) {
    let sum = 0;
    for (let i = 0; i < array.length; i++) {
        sum += array[i];
    }
    return sum;
}


/**
 * Calculates the median of an array of numbers.
 * @param {number[]} array
 * @returns {number|*}
 *
 * example:
 * let array = [3,2,5,6,2,7,4,2,7,5];
 * console.log(getMedian(array)); // 4.5
 */
export function getMedian(array) {
    let median = 0;
    array.sort((a, b) => a - b);
    console.log(array);
    let size = array.length;
    if (size % 2 == 0) {
        let middleSum = array[size / 2] + array[(size / 2) - 1];
        median = middleSum / 2;
    } else {
        median = array[(size / 2) - .5];
    }
    return median;
}

console.log(getMedian([3, 3, 5, 9, 11]));


/**
 * Calculates statistics (see below) on an array of numbers.
 * Look at the stats_helper.js file. It does variance which is used to calculate std deviation.
 * @param {number[]} array
 * @returns {{min: *, median: *, max: *, variance: *, mean: *, length: *, sum: *, standard_deviation: *}}
 *
 * example:
 * getStatistics([3,2,4,5,5,5,2,6,7])
 * {
  length: 9,
  sum: 39,
  mean: 4.333333333333333,
  median: 5,
  min: 2,
  max: 7,
  variance: 2.6666666666666665,
  standard_deviation: 1.632993161855452
 }
 */
export function getStatistics(array) {
    let total = 0;
    for (let i = 0; i < array.length; i++) {
        total += array[i];
    }
    let mean = total / array.length;
    return {
        length: array.length,
        sum: total,
        mean: mean,
        median: getMedian(array),
        min: Math.min(...array), 
        max: Math.max(...array),
        variance: variance(array, mean),  
        standard_deviation: Math.sqrt(variance(array, mean))
    }
}

