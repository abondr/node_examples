module.exports = (x, y, callbackFunction) => {
    try {
        if (x < 0 || y < 0) {
            throw new Error(`Given Dimentions should be greater than zero.` +
                ` length = ${x} and breadth ${y}`);
        } else {
            callbackFunction(null, {
                perimeter: () => {
                    return (2 * (x + y));
                },
                area: () => {
                    return (x * y);
                }
            });
        }
    } catch (error) {
        callbackFunction(error, null);
    }
}