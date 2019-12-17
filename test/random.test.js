const RandomLib = require('./../dist/random.js');

// thanks to seeding, we know the outcome for each method allowing easier tests
// if the seed changes, the tests will need to be updated
const random = new RandomLib('jestTests');

test('random.gen should be between 0 and 1', () => {
    const value = random.gen();

    expect(value).toBeGreaterThanOrEqual(0);
    expect(value).toBeLessThanOrEqual(1);

});

test('random.number should output a number less than max argument (100)', () => {
    // defaults to max = 100;
    const value = random.number();

    expect(value).toBeGreaterThanOrEqual(0);
    expect(value).toBeLessThanOrEqual(100);
});

test('random.between should ouput a number between the min (1) and max (25) numbers', () => {

    const value = random.between(1, 25);

    expect(value).toBeGreaterThanOrEqual(1);
    expect(value).toBeLessThanOrEqual(25);
    expect(value).toBeLessThan(26);

});

test('random.itemFromArray should output a random item from the passed in array', () => {
    const mockArray = [1, 2, 3, 4, 5];
    // item should always be '4'
    const item = random.itemFromArray(mockArray);

    expect(item).toBe(4);
})

test('random.entryFromObject should output an array with a key value pair', () => {
    const testObject = {
        prop1: 'hello',
        prop2: 'world',
        prop3: 42,
    }
    const entry = random.entryFromObject(testObject);
    expect(Array.isArray(entry)).toBeTruthy();

    expect(entry).toContain('prop2');
    expect(entry).toContain('world');

    expect(entry[0]).toBe('prop2');
    expect(entry[1]).toBe('world');

    expect(testObject).toHaveProperty(entry[0], entry[1]);


})