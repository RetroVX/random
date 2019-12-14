# Random

A Tiny Random Utility Generator

[![License: MIT](https://img.shields.io/badge/License-MIT-green.svg)](https://opensource.org/licenses/MIT)

### Features

* Alea
* Seedable
* random
    * number
    * between
    * itemFromArray
    * entryFromObject
* 2kb minified (<1kb minified + gzipped)

### Install

```
git clone https://github.com/RetroVX/minee.git
```
Or download from Zip

```javascript
import Random from "./path/to/random.js";

const seed = 'mySeed';

const random = new Random(seed);
```

### Example

```javascript

random.gen(); -> 0.9401234467513859

random.number(100); -> 42

random.between(1, 25); -> 17

random.itemFromArray([1, 2, 3, 4, 5]); -> 2

random.entryFromObject({prop1: 'hello', prop2: 'world'}); -> ['prop1', 'hello']

// new seed
random.newGenerator(seed);

```

### Version 1.0.0