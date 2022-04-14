import uniqueRandomRange from "unique-random-range";

export function randomSumGenerator(quantity, sum, min = 0) {
    // only a single number required; return the passed sum.
    if (quantity === 1) return [sum];
 
    const max = sum - 10 >= 0 ? 10 : sum
    const randomNum = uniqueRandomRange(min, max)();
    const deltaSum = sum - randomNum
    const deltaQuantity = quantity - 1
    const newMin = Math.floor(deltaSum / deltaQuantity)

    return [
        randomNum,
        ...randomSumGenerator(deltaQuantity, deltaSum, newMin),
    ];
}