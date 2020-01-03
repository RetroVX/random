/**
 * Alea
 * From http://baagoe.com/en/RandomMusings/javascript/
 * Johannes BaagÃ¸e <baagoe@baagoe.com>, 2010
 */
function Mash() {
  var n = 0xefc8249d;

  var mash = function (data) {
    data = data.toString();

    for (var i = 0; i < data.length; i++) {
      n += data.charCodeAt(i);
      var h = 0.02519603282416938 * n;
      n = h >>> 0;
      h -= n;
      h *= n;
      n = h >>> 0;
      h -= n;
      n += h * 0x100000000; // 2^32
    }

    return (n >>> 0) * 2.3283064365386963e-10; // 2^-32
  };

  mash.version = 'Mash 0.9';
  return mash;
} // From http://baagoe.com/en/RandomMusings/javascript/


function Alea() {
  return function (args) {
    // Johannes BaagÃ¸e <baagoe@baagoe.com>, 2010
    var s0 = 0;
    var s1 = 0;
    var s2 = 0;
    var c = 1;

    if (args.length == 0) {
      args = [+new Date()];
    }

    var mash = Mash();
    s0 = mash(' ');
    s1 = mash(' ');
    s2 = mash(' ');

    for (var i = 0; i < args.length; i++) {
      s0 -= mash(args[i]);

      if (s0 < 0) {
        s0 += 1;
      }

      s1 -= mash(args[i]);

      if (s1 < 0) {
        s1 += 1;
      }

      s2 -= mash(args[i]);

      if (s2 < 0) {
        s2 += 1;
      }
    }

    mash = null;

    var random = function () {
      var t = 2091639 * s0 + c * 2.3283064365386963e-10; // 2^-32

      s0 = s1;
      s1 = s2;
      return s2 = t - (c = t | 0);
    };

    random.uint32 = function () {
      return random() * 0x100000000; // 2^32
    };

    random.fract53 = function () {
      return random() + (random() * 0x200000 | 0) * 1.1102230246251565e-16; // 2^-53
    };

    random.version = 'Alea 0.9';
    random.args = args;
    return random;
  }(Array.prototype.slice.call(arguments));
}

/**
 * @author Conor Irwin <https://github.com/RetroVX> 
 * @license {@link http://opensource.org/licenses/MIT|MIT License}
 * @classdesc
 * A basic random utility generator using alea for seedable randomness  
 * Credit Alea: 
 * From http://baagoe.com/en/RandomMusings/javascript/
 * Johannes BaagÃ¸e <baagoe@baagoe.com>, 2010  
 * @class Random
 * @version 1.3.0
 * @example
 * const random = new Random('mySeed');
 * random.number(); 
 * -> 42
 * // instead of Math.random()
 * random.gen();
 * -> 0.9401234467513859
 */

var Random = function Random(seed) {
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

  this.seed = null; // Create the generator

  this.newGenerator(seed);
};
/**
 * Create a new Alea generator with a new seed
 * @method Random.newGenerator
 * @param {*} seed - a number or string to use as the seed
 */


Random.prototype.newGenerator = function newGenerator (seed) {
  this.seed = seed || new Date().getTime();
  this.gen = new Alea(this.seed);
};
/**
 * Return a random number depending on the max number inputted. 
 * If the max argument is undefined, max = 100.
 * @param {number} max - the max number to be able to generate
 * @returns {number}
 * @example
 * random.number(); -> 56
 * random.number(50000) -> 3741
 */


Random.prototype.number = function number (max) {
  if (max === undefined || max === null) {
    max = 100;
  }

  return Math.floor(this.gen() * Math.floor(max));
};
/**
 * Returns a number that is between the min and max arguments passed in
 * @method Random.between
 * @param {number} min - the min number
 * @param {number} max - the max number
 * @returns {number}
 * @example 
 * random.between(1, 25) -> 17
 */


Random.prototype.between = function between (min, max) {
  return Math.floor(this.gen() * (max - min + 1)) + min;
};
/**
 * Returns a boolean depending on if the percentChance check is passed
 * @param {number} percentChance - the number (percent out of 100)
 * @return {boolean}
 * @example
 * random.chance(50) -> 50% chance of happening
 * random.chance(1) -> 1% chance of happening
 */


Random.prototype.chance = function chance (percentChance) {
  return !!percentChance && this.gen() * 100 <= percentChance;
};
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


Random.prototype.itemFromArray = function itemFromArray (userArray) {
  return userArray[Math.floor(this.gen() * userArray.length)];
};
/**
 * Returns a random key/value pair from an object
 * @method Random.entryFromObject
 * @param {object} userObject - the object to pass in
 * @returns {array} Returns an array with the random key and value pair
 * @example
 * const myObject = {
 *   prop: 'hello',
 *   prop2: 'world',
 *   prop3: 42
 * }
 * const randomFromObject = random.entryFromObject(myObject);
 * -> ['prop2', 'world']
 */


Random.prototype.entryFromObject = function entryFromObject (userObject) {
  var entries = Object.entries(userObject);
  var randomProp = this.itemFromArray(entries);
  return randomProp;
};
/**
 * Returns a random key from an object
 * @method Random.keyFromObject
 * @param {object} userObject - the object to pass in
 * @returns {string} Returns a string with the random key
 * @example
 * const myObject = {
 *   prop: 'hello',
 *   prop2: 'world',
 *   prop3: 42
 * }
 * const randomKeyFromObject = random.keyFromObject(myObject);
 * -> 'prop3'
 */


Random.prototype.keyFromObject = function keyFromObject (userObject) {
  var keys = Object.keys(userObject);
  var randomKey = this.itemFromArray(keys);
  return randomKey;
};

module.exports = Random;
//# sourceMappingURL=random.js.map
