# babel-plugin-function-log

Insert console.log to the top of body in function.

This repo is not recommended.

Please view the better tools, [funlog](https://www.npmjs.com/package/@freddyzeng/funlog)

## Example

**In**

```js
// input code
```

**Out**

```js
"use strict";

// output code
```

## Installation

```sh
$ npm install babel-plugin-function-log
```

## Usage

### Via `.babelrc` (Recommended)

**.babelrc**

```json
{
  "plugins": ["function-log"]
}
```

### Via CLI

```sh
$ babel --plugins function-log script.js
```

### Via Node API

```javascript
require("babel-core").transform("code", {
  plugins: ["function-log"]
});
```
