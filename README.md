# lineage
Traverse up the DOM tree to a specific parent or all the way up to `body`. Returns an array of DOM nodes. Especially useful for event handling and verifying `currentTaraget` elements are children of `target` parents.

## usage
```js
import (Lineage) from '@afoot/lineage';
const lineage = Lineage(document.querySelector('.foo'));
console.log(lineage); // Returns ['.foo','body']
```
## license
[MIT](./LICENSE) © [Matthew Smith](http://www.niftinessafoot.com)
## made with ❤️ and ☕️ by
![Niftiness Afoot!](https://gist.githubusercontent.com/niftinessafoot/2dba588395cb557293d5f09aebcd2ab0/raw/770293c76bead4f0986ff959f3ea8880017d92c0/bot.svg?sanitize=true) [Matthew Smith](https://github.com/niftinessafoot)