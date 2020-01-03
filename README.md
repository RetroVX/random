# Random

A Tiny Random Utility Generator

[![License: MIT](https://img.shields.io/badge/License-MIT-green.svg)](https://opensource.org/licenses/MIT)

### Features

* Alea RNG
* Seedable
* Random
    * number
    * between
    * chance
    * itemFromArray
    * entryFromObject
    * keyFromObject
* Tested with Jest
* 2kb minified (<1kb minified + gzipped)

### Install

```
git clone https://github.com/RetroVX/random.git
```
Or download from Zip

#### Node & Common
```javascript
const Random = require('./path/to/random.js');

const seed = 'mySeed';
const random = new Random(seed);
```

#### Module
```javascript
import Random from "./path/to/random.mjs";

const seed = 'mySeed';
const random = new Random(seed);
```

#### UMD
```html
<script type="text/javascript" src="path/to/random.umd.js"></script>
```
```javascript
const seed = 'mySeed';
const random = new window.random(seed);

```

### Examples

```javascript
// generate a random number between 0 and 1.
// use this in place of Math.random()
random.gen(); -> 0.9401234467513859

// generate a random number with a max number (defaults to 100 if undefined)
random.number(100); -> 42

// generates a random number using a min and max number
random.between(1, 25); -> 17

// percent chance to happen
random.chance(50) -> true

// picks a random item from an array
random.itemFromArray([1, 2, 3, 4, 5]); -> 2

// picks a random key/value pair and outputs as an array
random.entryFromObject({prop1: 'hello', prop2: 'world'}); -> ['prop1', 'hello']

// picks a random key from an object
random.keyFromObject({prop1: 'hello', prop2: 'world'}); -> 'prop2'

// new seed
random.newGenerator(seed);
```

### Credit
Alea
 * Johannes BaagÃ¸e <baagoe@baagoe.com>, 2010

### Version 1.3.0
