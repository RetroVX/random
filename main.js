import Random from "./src/random.js";

const seed = 'helloWorld';
const random = new Random(seed);

const table = [
    {
        random: random.gen(),
        number: random.number(),
        between: random.between(1, 100),
    }
];

console.table(table);