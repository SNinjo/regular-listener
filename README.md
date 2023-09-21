# RegularListener &middot; [![License](https://img.shields.io/badge/license-MIT-blue.svg)](https://github.com/SNinjo/regular-listener/blob/master/LICENSE) [![NPM](https://img.shields.io/badge/npm-v1.0.7-blue)](https://www.npmjs.com/package/regular-listener) [![CI](https://img.shields.io/badge/CI-passing-brightgreen)](https://github.com/SNinjo/regular-listener/actions/workflows/ci.yml)
RegularListener is a listener that detects the value periodically.

This listener can periodically detects any event without having to handle complicated settings.
There are many kind of listeners, and you also can make your own one.
Of course, all listeners are successfully tested by Jest.


## Usage
#### listen to boolean once
``` javascript
import { BooleanListener } from 'regular-listener';

let boolean = false;
...
const listener = new BooleanListener(() => {
	console.log('The value is true!');
})
listener.listenOnce(() => boolean);
```

#### listen to boolean every 500ms
``` javascript
import { BooleanListener } from 'regular-listener';

let boolean = false;
...
const listener = new BooleanListener(() => {
	console.log('The value is true!');
})
listener.setDelay(500);
listener.listen(() => boolean);
```

#### listen to each element in the array and check that at least one element satisfies the condition
``` javascript
import { BooleanListener } from 'regular-listener';

let array = [true, true];
...
const listener = new BooleanListener(() => {
	console.log('All Elements are true!');
})
listener.setReadTypeOfArray('some');
listener.listen(() => array);
```

#### listen to each element in the array and check that every element satisfies the condition
``` javascript
import { BooleanListener } from 'regular-listener';

let array = [true, true];
...
const listener = new BooleanListener(() => {
	console.log('All Elements are true!');
})
listener.setReadTypeOfArray('every');
listener.listen(() => array);
```

#### handle error
``` javascript
import { BooleanListener } from 'regular-listener';

const listener = new BooleanListener(() => {
	throw new Error('mock error');
})
listener.catch((error) => {
	console.warn(`An error was thrown.`, error);
})
listener.listenOnce(() => {
	throw new Error('mock error');
})
```

#### print message
``` javascript
import { BooleanListener } from 'regular-listener';

let value = false;
const listener = new BooleanListener(() => { throw new Error('mock error') });
listener.printMessage();
listener.catch(() => {});
listener.listenOnce(() => value);
setTimeout(() => {
	value = true;
}, 3000);
```
``` shell
listen | isTriggered: false, value: false
listen | isTriggered: false, value: false
listen | isTriggered: false, value: false
listen | isTriggered: true, value: true
catch error | Error: mock error
```

#### make new listener
``` javascript
class PositiveNumberListener extends RegularListener {
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
| method	          				   | Return Type | Description                            										        |
| ------------------------------------ | ----------- | ------------------------------------------------------------------------------------ |
| isTriggered(value: T) 			   | boolean     | Define whether the value triggers the condition. 									|
| isTriggered(value: T, index: number) | boolean     | Define whether the value of the <index> element in the array triggers the condition. |

#### Listener
| name		          	| Description                                               |
| --------------------- | --------------------------------------------------------- |
| BooleanListener      	| Listen whether the value is true through Boolean. 		|
| ValueExistedListener  | Listen whether the value exists, not undefined or null.	|
| ValueUpdatedListener  | Listen whether the value is updated.                 		|


## License
RegularListener is [MIT licensed](./LICENSE).