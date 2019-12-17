import { Alea } from "./alea.js";

/**
 * @author Conor Irwin <https://github.com/RetroVX> 
 * @license {@link http://opensource.org/licenses/MIT|MIT License}
 * @classdesc
 * A basic class to create seedable random numbers using alea.  
 * Credit Alea: 
 * From http://baagoe.com/en/RandomMusings/javascript/
 * Johannes BaagÃ¸e <baagoe@baagoe.com>, 2010  
 * @class Random
 * @version 1.1.0
 * @example
 * const random = new Random('mySeed');
 * random.number(); 
 * -> 42
 * // instead of Math.random()
 * random.gen();
 * -> 0.9401234467513859
 */
export default class Random {

    constructor(seed) {

        /**
         * the generator that creates random numbers.
         * use in place of Math.random()
         * @type method
         * @name Random.gen
         * @example
         * random.gen() -> 0.9401234467513859
         */
        this.gen = null;


        /**
         * The seed for alea to use
         * @name Random.seed
         */
        this.seed = null;
        

        // Create the generator
        this.newGenerator(seed);

    }


    /**
     * Create a new Alea generator with a new seed
     * @method Random.newGenerator
     * @param {*} seed - a number or string to use as the seed
     */
    newGenerator(seed) {        
        this.seed = seed || new Date().getTime();
        this.gen = new Alea(this.seed);
    }


    /**
     * Return a random number depending on the max number inputted. 
     * If the max argument is undefined, max = 100.
     * @param {number} max - the max number to be able to generate
     * @returns {number}
     * @example
     * random.number(); -> 56
     * random.number(50000) -> 3741
     */
    number(max) {
        if(max === undefined || max === null) { max = 100; }

        return Math.floor(this.gen() * Math.floor(max));
    }


    /**
     * Returns a number that is between the min and max arguments passed in
     * @method Random.between
     * @param {number} min - the min number
     * @param {number} max - the max number
     * @returns {number}
     * @example 
     * random.between(1, 25) -> 17
     */
    between(min, max) { 
        return Math.floor(this.gen() * (max - min + 1)) + min;
    }


    /**
     * Returns a random item from an array
     * @method Random.itemFromArray
     * @param {array} userArray - the array to pass in
     * @returns {*} item from array
     * @example
     * const list = [1, 2, 3, 4, 5];
     * const randomFromList = random.itemFromArray(list);
     * -> 2
     * const list2 = [{key: 'hello', something: 'world'}, {key: 'world', something: 'yes'}];
     * const randomFromList2 = random.itemFromArray(list2);
     * -> {key: 'hello', something: 'world'}
     */
    itemFromArray(userArray) {
        return userArray[Math.floor(this.gen() * userArray.length)];
    }


    /**
     * Returns a random key/value pair from an object
     * @method Random.entryFromObject
     * @param {object} userObject - the object to pass in
     * @returns {array} Returns an array with the random key and value pair
     * @example
     * const myObject = {
     *     prop: 'hello',
     *     prop2: 'world',
     *     prop3: 42
     * }
     * const randomFromObject = random.entryFromObject(myObject);
     * -> ['prop2', 'world']
     */
    entryFromObject(userObject) {
        const entries = Object.entries(userObject);
        const randomProp = this.itemFromArray(entries);

        return randomProp;
    }
}