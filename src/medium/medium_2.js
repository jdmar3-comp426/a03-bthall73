import mpg_data from "./data/mpg_data.js";
import {getStatistics} from "./medium_1.js";

/*
This section can be done by using the array prototype functions.
https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array
see under the methods section
*/


/**
 * This object contains data that has to do with every car in the `mpg_data` object.
 *
 *
 * @param {allCarStats.avgMpg} Average miles per gallon on the highway and in the city. keys `city` and `highway`
 *
 * @param {allCarStats.allYearStats} The result of calling `getStatistics` from medium_1.js on
 * the years the cars were made.
 *
 * @param {allCarStats.ratioHybrids} ratio of cars that are hybrids
 */
export const allCarStats = {
    avgMpg: avgMpgHelper(),
    allYearStats: getStatistics(allYearStatsHelper()),
    ratioHybrids: ratioHybridsHelper(),
};

console.log(allCarStats);

function ratioHybridsHelper() {
    let totalCars = mpg_data.length;
    let hybridCount = 0;
    for (let i = 0; i < mpg_data.length; i++) {
        if (mpg_data[i].hybrid == true) {
            hybridCount++;
        }
    }
    return hybridCount / totalCars;
}

function allYearStatsHelper() {
    let yearArray = [];
    for (let i = 0; i < mpg_data.length; i++) {
        yearArray.push(mpg_data[i].year);
    }
    return yearArray;
}

function avgMpgHelper() {
    let totalCity = 0;
    let totalHighway = 0;
    for (let i = 0; i < mpg_data.length; i++) {
        totalCity += mpg_data[i].city_mpg;
        totalHighway += mpg_data[i].highway_mpg; 
    }
    let avgCity = totalCity / mpg_data.length; 
    let avgHighway = totalHighway / mpg_data.length;
    return {
        city: avgCity,
        highway: avgHighway
    }
}


/**
 * HINT: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/reduce
 *
 * @param {moreStats.makerHybrids} Array of objects where keys are the `make` of the car and
 * a list of `hybrids` available (their `id` string). Don't show car makes with 0 hybrids. Sort by the number of hybrids
 * in descending order.
 *
 *[{
 *     "make": "Buick",
 *     "hybrids": [
 *       "2012 Buick Lacrosse Convenience Group",
 *       "2012 Buick Lacrosse Leather Group",
 *       "2012 Buick Lacrosse Premium I Group",
 *       "2012 Buick Lacrosse"
 *     ]
 *   },
 *{
 *     "make": "BMW",
 *     "hybrids": [
 *       "2011 BMW ActiveHybrid 750i Sedan",
 *       "2011 BMW ActiveHybrid 750Li Sedan"
 *     ]
 *}]
 *
 *
 *
 *
 * @param {moreStats.avgMpgByYearAndHybrid} Object where keys are years and each year
 * an object with keys for `hybrid` and `notHybrid`. The hybrid and notHybrid
 * should be an object with keys for `highway` and `city` average mpg.
 *
 * Only years in the data should be keys.
 *
 * {
 *     2020: {
 *         hybrid: {
 *             city: average city mpg,
 *             highway: average highway mpg
 *         },
 *         notHybrid: {
 *             city: average city mpg,
 *             highway: average highway mpg
 *         }
 *     },
 *     2021: {
 *         hybrid: {
 *             city: average city mpg,
 *             highway: average highway mpg
 *         },
 *         notHybrid: {
 *             city: average city mpg,
 *             highway: average highway mpg
 *         }
 *     },
 *
 * }
 */
export const moreStats = {
    makerHybrids: makerHybridsHelper(),
    avgMpgByYearAndHybrid: avgMpgByYearAndHybridHelper()
};

console.log(moreStats);

function avgMpgByYearAndHybridHelper() {
    let returnObj = {};
    let yearsArray = [];
    let totalHybrids = 0;
    let hybridCity = 0;
    let hybridHwy = 0;
    let totalNon = 0;
    let nonCity = 0;
    let nonHwy = 0;

    for (let i = 0; i < mpg_data.length; i++) {
        yearsArray.push(mpg_data[i].year);
    }
    yearsArray = [...new Set(yearsArray)];
    
    for (let i = 0; i < yearsArray.length; i++) {
        for (let j = 0; j < mpg_data.length; j++) {
            if (yearsArray[i] == mpg_data[j].year) {
                if (mpg_data[j].hybrid == true) {
                    totalHybrids++;
                    hybridCity += mpg_data[j].city_mpg; 
                    hybridHwy += mpg_data[j].highway_mpg;
                } else {
                    totalNon++;
                    nonCity += mpg_data[j].city_mpg;
                    nonHwy += mpg_data[j].highway_mpg;
                }
            }
        }
        returnObj[i] = {
            1: {
                hybrid: {
                    city: hybridCity / totalHybrids,
                    highway: hybridHwy / totalHybrids
                },
                nonHybrid: {
                    city: nonCity / totalNon,
                    highway: nonHwy / totalNon
                }
            }
        }
        totalHybrids = 0;
        hybridCity = 0;
        hybridHwy = 0;
        totalNon = 0;
        nonCity = 0;
        nonHwy = 0;
    }
    return returnObj;
}

function makerHybridsHelper() {
    let returnArray = [];
    let hybridsArray = []; 
    let makesArray = [];
    for (let i = 0; i < mpg_data.length; i++) {
        if (mpg_data[i].hybrid == true) {
            hybridsArray.push(mpg_data[i]);
        }
    }

    for (let i = 0; i < hybridsArray.length; i++) {
        makesArray.push(hybridsArray[i].make);
    }
    makesArray = [...new Set(makesArray)];
    
    //let obj = {};
    //let objArray = [];
    let idsArrayArray = [];
    let idsArray = [];
    for (let i = 0; i < makesArray.length; i++) {
        for (let j = 0; j < hybridsArray.length; j++) {
            if (makesArray[i] == hybridsArray[j].make) {
                idsArray.push(hybridsArray[j].id);
                idsArrayArray[i] = idsArray;
            }
        }
        //idsArrayArray.push(idsArray);
        //console.log(idsArrayArray);
        returnArray[i] = {
            make: makesArray[i],
            hybrids: idsArrayArray[i]
        }
        //obj = {};
        idsArray = [];
    }
    //returnArray.sort((a, b) => b[hybrids].length - a[hybrids].length);
    return returnArray;
}

