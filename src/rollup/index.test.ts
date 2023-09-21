/* eslint-disable @typescript-eslint/no-var-requires */
import RegularListener, { BooleanListener, ValueExistedListener } from '../../build/index.js';


test('import functions from regular-listener', () => {
	expect(typeof RegularListener).toBe('function');
	expect(typeof BooleanListener).toBe('function');
	expect(typeof ValueExistedListener).toBe('function');
	expect(BooleanListener.prototype instanceof RegularListener).toBe(true);
	expect(ValueExistedListener.prototype instanceof RegularListener).toBe(true);
})

test('require functions from regular-listener', () => {
	const RegularListener = require('../../build/index.js');
	const { BooleanListener, ValueExistedListener } = require('../../build/index.js');
	expect(typeof RegularListener).toBe('function');
	expect(typeof BooleanListener).toBe('function');
	expect(typeof ValueExistedListener).toBe('function');
	expect(BooleanListener.prototype instanceof RegularListener).toBe(true);
	expect(ValueExistedListener.prototype instanceof RegularListener).toBe(true);
})