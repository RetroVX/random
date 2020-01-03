import Random from './src/random.js';

const seed = 'helloWorld';
const random = new Random();

const obj = {
    prop1: 'hello',
    prop2: 'world',
    prop3: '!'
}

const table = [
    {
        random: random.gen(),
        number: random.number(),
        between: random.between(1, 100),
        key: random.keyFromObject(obj),
        chance: random.chance(50)
    }
];

console.table(table);