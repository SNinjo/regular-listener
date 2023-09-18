# RegularListener &middot; [![License](https://img.shields.io/badge/license-MIT-blue.svg)](https://github.com/SNinjo/regular-listener/blob/master/LICENSE) [![NPM](https://img.shields.io/badge/npm-v1.0.4-blue)](https://www.npmjs.com/package/regular-listener) [![CI](https://img.shields.io/badge/CI-passing-brightgreen)](https://github.com/SNinjo/regular-listener/actions/workflows/ci.yml)
RegularListener is a listener that detects the value periodically.

This listener can periodically detects any event without having to handle complicated settings.
There are many kind of listeners, and you also can make your own one.
Of course, all listeners are successfully tested by Jest.


## Usage
#### listen boolean once
``` javascript
import BooleanListener from 'regular-listener';

let bool = false;
...
const listener = new BooleanListener(() => {
	console.log('The value is true!');
})
listener.listenOnce(() => bool);
```

#### listen boolean every 500ms
``` javascript
import BooleanListener from 'regular-listener';

let bool = false;
...
const listener = new BooleanListener(() => {
	console.log('The value is true!');
})
listener.listen(() => bool, 500);
```

#### handle error
``` javascript
import BooleanListener from 'regular-listener';

let bool = false;
...
const listener = new BooleanListener(() => {
	throw new Error('mock error');
})
listener.catch((error) => {
	console.warn(`An error was thrown.`, error);
})
listener.listenOnce(() => {
	throw new Error('mock error');
});
```

#### make new listener
``` javascript
class PositiveNumberListener extends RegularListener<number> {
	protected isTriggered(value: number): boolean {
		return (value > 0);
	}
}
```


## Installation
```
npm install regular-listener
```


## API
#### class RegularListener\<T>
| method	          	| Return Type | Description                                      |
| --------------------- | ----------- | ------------------------------------------------ |
| isTriggered(value: T) | boolean     | Define whether the value triggers the condition. |

#### Listener
| name		          	| Description                                               |
| --------------------- | --------------------------------------------------------- |
| BooleanListener      	| Listen whether the value is true through Boolean. 		|
| ValueExistedListener  | Listen whether the value exists, not undefined or null.	|
| ValueUpdatedListener  | Listen whether the value is updated.                 		|


## License
RegularListener is [MIT licensed](./LICENSE).