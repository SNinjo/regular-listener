import RegularListener, { BooleanListener, ValueExistedListener, ValueUpdatedListener } from '.';




let listener: RegularListener;
beforeEach(() => {
	jest.useFakeTimers();
})
afterEach(() => {
	listener.stop();
})




describe('test class RegularListener', () => {
	class NullListener extends RegularListener {
		protected isTriggered(value: unknown): boolean {
			return (value === null);
		}
	}

	
	test('no callback', () => {
		const mockListening = jest.fn();
		let value: undefined | null = undefined;
		listener = new NullListener();
		
		expect(mockListening).toBeCalledTimes(0);
		listener.listen(() => { mockListening(); return value });

		expect(mockListening).toBeCalledTimes(1);
		jest.advanceTimersByTime(1000);
		expect(mockListening).toBeCalledTimes(2);
		jest.advanceTimersByTime(1000);
		expect(mockListening).toBeCalledTimes(3);

		value = null;
		expect(mockListening).toBeCalledTimes(3);
		jest.advanceTimersByTime(1000);
		expect(mockListening).toBeCalledTimes(4);
		jest.advanceTimersByTime(1000);
		expect(mockListening).toBeCalledTimes(5);
	})


	describe('listen value', () => {
		test('every 1s', () => {
			const mockCallback = jest.fn();
			const mockListening = jest.fn();
			let value: undefined | null = undefined;
			listener = new NullListener(mockCallback);
			expect(mockCallback).toBeCalledTimes(0);
			expect(mockListening).toBeCalledTimes(0);
			listener.listen(() => { mockListening(); return value });
	
			expect(mockCallback).toBeCalledTimes(0);
			expect(mockListening).toBeCalledTimes(1);
			jest.advanceTimersByTime(1000);
			expect(mockCallback).toBeCalledTimes(0);
			expect(mockListening).toBeCalledTimes(2);
			jest.advanceTimersByTime(1000);
			expect(mockCallback).toBeCalledTimes(0);
			expect(mockListening).toBeCalledTimes(3);
	
			value = null;
			expect(mockCallback).toBeCalledTimes(0);
			expect(mockListening).toBeCalledTimes(3);
			jest.advanceTimersByTime(1000);
			expect(mockCallback).toBeCalledTimes(1);
			expect(mockListening).toBeCalledTimes(4);
			jest.advanceTimersByTime(1000);
			expect(mockCallback).toBeCalledTimes(2);
			expect(mockListening).toBeCalledTimes(5);
		})
		test('every 10s', () => {
			const mockCallback = jest.fn();
			const mockListening = jest.fn();
			let value: undefined | null = undefined;
			listener = new NullListener(mockCallback);
			expect(mockCallback).toBeCalledTimes(0);
			expect(mockListening).toBeCalledTimes(0);
			listener.setDelay(10000);
			listener.listen(() => { mockListening(); return value });
	
			expect(mockCallback).toBeCalledTimes(0);
			expect(mockListening).toBeCalledTimes(1);
			jest.advanceTimersByTime(10000);
			expect(mockCallback).toBeCalledTimes(0);
			expect(mockListening).toBeCalledTimes(2);
			jest.advanceTimersByTime(10000);
			expect(mockCallback).toBeCalledTimes(0);
			expect(mockListening).toBeCalledTimes(3);
	
			value = null;
			expect(mockCallback).toBeCalledTimes(0);
			expect(mockListening).toBeCalledTimes(3);
			jest.advanceTimersByTime(10000);
			expect(mockCallback).toBeCalledTimes(1);
			expect(mockListening).toBeCalledTimes(4);
			jest.advanceTimersByTime(10000);
			expect(mockCallback).toBeCalledTimes(2);
			expect(mockListening).toBeCalledTimes(5);
		})
	})

	describe('listen value once', () => {
		test('every 1s', () => {
			const mockCallback = jest.fn();
			const mockListening = jest.fn();
			let value: undefined | null = undefined;
			listener = new NullListener(mockCallback);
			expect(mockCallback).toBeCalledTimes(0);
			expect(mockListening).toBeCalledTimes(0);
			listener.listenOnce(() => { mockListening(); return value });

			expect(mockCallback).toBeCalledTimes(0);
			expect(mockListening).toBeCalledTimes(1);
			jest.advanceTimersByTime(1000);
			expect(mockCallback).toBeCalledTimes(0);
			expect(mockListening).toBeCalledTimes(2);
			jest.advanceTimersByTime(1000);
			expect(mockCallback).toBeCalledTimes(0);
			expect(mockListening).toBeCalledTimes(3);

			value = null;
			expect(mockCallback).toBeCalledTimes(0);
			expect(mockListening).toBeCalledTimes(3);
			jest.advanceTimersByTime(1000);
			expect(mockCallback).toBeCalledTimes(1);
			expect(mockListening).toBeCalledTimes(4);
			jest.advanceTimersByTime(1000);
			expect(mockCallback).toBeCalledTimes(1);
			expect(mockListening).toBeCalledTimes(4);
		})
		test('every 10s', () => {
			const mockCallback = jest.fn();
			const mockListening = jest.fn();
			let value: undefined | null = undefined;
			listener = new NullListener(mockCallback);
			expect(mockCallback).toBeCalledTimes(0);
			expect(mockListening).toBeCalledTimes(0);
			listener.setDelay(10000);
			listener.listenOnce(() => { mockListening(); return value });

			expect(mockCallback).toBeCalledTimes(0);
			expect(mockListening).toBeCalledTimes(1);
			jest.advanceTimersByTime(10000);
			expect(mockCallback).toBeCalledTimes(0);
			expect(mockListening).toBeCalledTimes(2);
			jest.advanceTimersByTime(10000);
			expect(mockCallback).toBeCalledTimes(0);
			expect(mockListening).toBeCalledTimes(3);

			value = null;
			expect(mockCallback).toBeCalledTimes(0);
			expect(mockListening).toBeCalledTimes(3);
			jest.advanceTimersByTime(10000);
			expect(mockCallback).toBeCalledTimes(1);
			expect(mockListening).toBeCalledTimes(4);
			jest.advanceTimersByTime(10000);
			expect(mockCallback).toBeCalledTimes(1);
			expect(mockListening).toBeCalledTimes(4);
		})
	})


	describe('return value (Promise)', () => {
		const fakeFunction = () => {};


		test('function listen', async () => {
			let value: undefined | null = undefined;
			listener = new NullListener(fakeFunction);
			let isResolved = false;
			const promise = listener.listen(() => value);
			promise.then(() => isResolved = true);

			expect(isResolved).toBe(false);
			jest.advanceTimersByTime(1000);
			expect(isResolved).toBe(false);
			jest.advanceTimersByTime(1000);
			expect(isResolved).toBe(false);

			value = null;
			expect(isResolved).toBe(false);
			jest.advanceTimersByTime(1000);
			await promise;
			expect(isResolved).toBe(true);
		})
		test('function listenOnce', async () => {
			let value: undefined | null = undefined;
			listener = new NullListener(fakeFunction);
			let isResolved = false;
			const promise = listener.listenOnce(() => value);
			promise.then(() => isResolved = true);

			expect(isResolved).toBe(false);
			jest.advanceTimersByTime(1000);
			expect(isResolved).toBe(false);
			jest.advanceTimersByTime(1000);
			expect(isResolved).toBe(false);

			value = null;
			expect(isResolved).toBe(false);
			jest.advanceTimersByTime(1000);
			await promise;
			expect(isResolved).toBe(true);
		})
	})


	describe('read type of array', () => {
		test(`='array'`, () => {
			const mockCallback = jest.fn();
			let value: undefined | null = undefined;
			listener = new NullListener(mockCallback);
			expect(mockCallback).toBeCalledTimes(0);

			listener.listenOnce(() => value);
			expect(mockCallback).toBeCalledTimes(0);

			value = null;
			jest.advanceTimersByTime(1000);
			expect(mockCallback).toBeCalledTimes(1);
		})
		test(`='some'`, () => {
			const mockCallback = jest.fn();
			let value: Array<unknown> = [0];
			listener = new NullListener(mockCallback);
			listener.setReadTypeOfArray('some');
			expect(mockCallback).toBeCalledTimes(0);

			listener.listen(() => value);
			expect(mockCallback).toBeCalledTimes(0);

			value = [null];
			jest.advanceTimersByTime(1000);
			expect(mockCallback).toBeCalledTimes(1);

			value = [0, null];
			jest.advanceTimersByTime(1000);
			expect(mockCallback).toBeCalledTimes(2);

			value = [null, 0];
			jest.advanceTimersByTime(1000);
			expect(mockCallback).toBeCalledTimes(3);

			value = [null, null];
			jest.advanceTimersByTime(1000);
			expect(mockCallback).toBeCalledTimes(4);
		})
		test(`='every'`, () => {
			const mockCallback = jest.fn();
			let value: Array<unknown> = [0];
			listener = new NullListener(mockCallback);
			listener.setReadTypeOfArray('every');
			expect(mockCallback).toBeCalledTimes(0);

			listener.listen(() => value);
			expect(mockCallback).toBeCalledTimes(0);

			value = [null];
			jest.advanceTimersByTime(1000);
			expect(mockCallback).toBeCalledTimes(1);

			value = [0, null];
			jest.advanceTimersByTime(1000);
			expect(mockCallback).toBeCalledTimes(1);

			value = [null, 0];
			jest.advanceTimersByTime(1000);
			expect(mockCallback).toBeCalledTimes(1);

			value = [null, null];
			jest.advanceTimersByTime(1000);
			expect(mockCallback).toBeCalledTimes(2);
		})
		test(`catch errors when the value isn't array`, async () => {
			let value: unknown = null;
			listener = new NullListener(() => {});

			listener.setReadTypeOfArray('some');
			await expect(listener.listen(() => value)).rejects.toThrow(new Error(`The value isn't an array, please set readTypeOfArray to "array".`));
			
			listener.setReadTypeOfArray('every');
			await expect(listener.listen(() => value)).rejects.toThrow(new Error(`The value isn't an array, please set readTypeOfArray to "array".`));


			value = [];
			listener.setReadTypeOfArray('some');
			await expect(listener.listen(() => value)).rejects.toThrow(new Error(`There are no value in the array, please add at least one value for listener.`));
			
			listener.setReadTypeOfArray('every');
			await expect(listener.listen(() => value)).rejects.toThrow(new Error(`There are no value in the array, please add at least one value for listener.`));
		})
	})
	
	
	describe('error handling', () => {
		const mockError = new Error('mock error');


		describe('throw error', () => {
			test('listen value', async () => {
				const mockCallback = jest.fn();
				const mockListening = jest.fn();
				listener = new NullListener(mockCallback);

				expect(mockCallback).toBeCalledTimes(0);
				expect(mockListening).toBeCalledTimes(0);
				await expect(listener.listen(() => { mockListening(); throw mockError; })).rejects.toThrow(mockError);
				expect(mockCallback).toBeCalledTimes(0);
				expect(mockListening).toBeCalledTimes(1);
				jest.advanceTimersByTime(1000);
				expect(mockCallback).toBeCalledTimes(0);
				expect(mockListening).toBeCalledTimes(1);
				jest.advanceTimersByTime(1000);
				expect(mockCallback).toBeCalledTimes(0);
				expect(mockListening).toBeCalledTimes(1);
			})
			test('listen value once', async () => {
				const mockCallback = jest.fn();
				const mockListening = jest.fn();
				listener = new NullListener(mockCallback);

				expect(mockCallback).toBeCalledTimes(0);
				expect(mockListening).toBeCalledTimes(0);
				await expect(listener.listenOnce(() => { mockListening(); throw mockError })).rejects.toThrow(mockError);
				expect(mockCallback).toBeCalledTimes(0);
				expect(mockListening).toBeCalledTimes(1);
				jest.advanceTimersByTime(1000);
				expect(mockCallback).toBeCalledTimes(0);
				expect(mockListening).toBeCalledTimes(1);
				jest.advanceTimersByTime(1000);
				expect(mockCallback).toBeCalledTimes(0);
				expect(mockListening).toBeCalledTimes(1);
			})
		})
		
		describe('catch errors via onError', () => {
			test('listen value', async () => {
				const mockCallback = jest.fn();
				const mockListening = jest.fn();
				const mockOnError = jest.fn();
				listener = new NullListener(mockCallback);
				listener.catch(mockOnError);

				expect(mockCallback).toBeCalledTimes(0);
				expect(mockListening).toBeCalledTimes(0);
				expect(mockOnError).toBeCalledTimes(0);
				listener.listen(() => { mockListening(); throw mockError });
				expect(mockCallback).toBeCalledTimes(0);
				expect(mockListening).toBeCalledTimes(1);
				expect(mockOnError).toBeCalledTimes(1);
				jest.advanceTimersByTime(1000);
				expect(mockCallback).toBeCalledTimes(0);
				expect(mockListening).toBeCalledTimes(1);
				expect(mockOnError).toBeCalledTimes(1);
				jest.advanceTimersByTime(1000);
				expect(mockCallback).toBeCalledTimes(0);
				expect(mockListening).toBeCalledTimes(1);
				expect(mockOnError).toBeCalledTimes(1);
			})
			test('listen value once', async () => {
				const mockCallback = jest.fn();
				const mockListening = jest.fn();
				const mockOnError = jest.fn();
				listener = new NullListener(mockCallback);
				listener.catch(mockOnError);

				expect(mockCallback).toBeCalledTimes(0);
				expect(mockListening).toBeCalledTimes(0);
				expect(mockOnError).toBeCalledTimes(0);
				listener.listenOnce(() => { mockListening(); throw mockError });
				expect(mockCallback).toBeCalledTimes(0);
				expect(mockListening).toBeCalledTimes(1);
				expect(mockOnError).toBeCalledTimes(1);
				jest.advanceTimersByTime(1000);
				expect(mockCallback).toBeCalledTimes(0);
				expect(mockListening).toBeCalledTimes(1);
				expect(mockOnError).toBeCalledTimes(1);
				jest.advanceTimersByTime(1000);
				expect(mockCallback).toBeCalledTimes(0);
				expect(mockListening).toBeCalledTimes(1);
				expect(mockOnError).toBeCalledTimes(1);
			})
		})
	})
})




describe('test class BooleanListener', () => {
	test('value = false', () => {
		const mockCallback = jest.fn();
		let value = false;
		listener = new BooleanListener(mockCallback);
		listener.listen(() => value);

		expect(mockCallback).toBeCalledTimes(0);
		jest.advanceTimersByTime(1000);
		expect(mockCallback).toBeCalledTimes(0);
	})
	test('value = true', () => {
		const mockCallback = jest.fn();
		let value = false;
		listener = new BooleanListener(mockCallback);
		listener.listenOnce(() => value);

		expect(mockCallback).toBeCalledTimes(0);
		jest.advanceTimersByTime(1000);
		expect(mockCallback).toBeCalledTimes(0);
		
		value = true;
		expect(mockCallback).toBeCalledTimes(0);
		jest.advanceTimersByTime(1000);
		expect(mockCallback).toBeCalledTimes(1);
	})
})




describe('test class ValueExistedListener', () => {
	test('value = undefined', () => {
		const mockCallback = jest.fn();
		let value: undefined = undefined;
		listener = new ValueExistedListener(mockCallback);
		listener.listen(() => value);

		expect(mockCallback).toBeCalledTimes(0);
		jest.advanceTimersByTime(1000);
		expect(mockCallback).toBeCalledTimes(0);
	})
	test('value = undefined', () => {
		const mockCallback = jest.fn();
		let value: null = null;
		listener = new ValueExistedListener(mockCallback);
		listener.listen(() => value);

		expect(mockCallback).toBeCalledTimes(0);
		jest.advanceTimersByTime(1000);
		expect(mockCallback).toBeCalledTimes(0);
	})
	test('value = 0', () => {
		const mockCallback = jest.fn();
		let value: null | number = null;
		listener = new ValueExistedListener(mockCallback);
		listener.listenOnce(() => value);

		expect(mockCallback).toBeCalledTimes(0);
		jest.advanceTimersByTime(1000);
		expect(mockCallback).toBeCalledTimes(0);
		
		value = 0;
		expect(mockCallback).toBeCalledTimes(0);
		jest.advanceTimersByTime(1000);
		expect(mockCallback).toBeCalledTimes(1);
	})
})




describe('test class ValueUpdatedListener', () => {
	test(`value isn't updated`, () => {
		const mockCallback = jest.fn();
		const value = 0;
		listener = new ValueUpdatedListener(mockCallback);
		listener.listen(() => value);

		expect(mockCallback).toBeCalledTimes(0);
		jest.advanceTimersByTime(1000);
		expect(mockCallback).toBeCalledTimes(0);
	})
	describe('value is updated', () => {
		test('get initial value automatically', () => {
			const mockCallback = jest.fn();
			let value = 0;
			listener = new ValueUpdatedListener(mockCallback);
			listener.listenOnce(() => value);
	
			expect(mockCallback).toBeCalledTimes(0);
			jest.advanceTimersByTime(1000);
			expect(mockCallback).toBeCalledTimes(0);
			
			value++;
			expect(mockCallback).toBeCalledTimes(0);
			jest.advanceTimersByTime(1000);
			expect(mockCallback).toBeCalledTimes(1);
		})
		test('get initial value manually', () => {
			const mockCallback = jest.fn();
			let value = 0;
			listener = new ValueUpdatedListener(mockCallback);
			(listener as ValueUpdatedListener).setInitialValue(0);
			listener.listenOnce(() => value);
	
			expect(mockCallback).toBeCalledTimes(0);
			jest.advanceTimersByTime(1000);
			expect(mockCallback).toBeCalledTimes(0);
			
			value++;
			expect(mockCallback).toBeCalledTimes(0);
			jest.advanceTimersByTime(1000);
			expect(mockCallback).toBeCalledTimes(1);
		})
		test('get initial value manually and trigger it right away', () => {
			const mockCallback = jest.fn();
			let value = 1;
			listener = new ValueUpdatedListener(mockCallback);
			(listener as ValueUpdatedListener).setInitialValue(0);
			
			expect(mockCallback).toBeCalledTimes(0);
			listener.listenOnce(() => value);
			expect(mockCallback).toBeCalledTimes(1);
		})
	})

	describe('read type of array', () => {
		test(`='array'`, () => {
			const mockCallback = jest.fn();
			let value: undefined | null = undefined;
			listener = new ValueUpdatedListener(mockCallback);
			expect(mockCallback).toBeCalledTimes(0);

			listener.listenOnce(() => value);
			expect(mockCallback).toBeCalledTimes(0);

			value = null;
			jest.advanceTimersByTime(1000);
			expect(mockCallback).toBeCalledTimes(1);
		})
		test(`='some'`, () => {
			const mockCallback = jest.fn();
			let value: Array<unknown> = [0, 0];
			listener = new ValueUpdatedListener(mockCallback);
			listener.setReadTypeOfArray('some');
			(listener as ValueUpdatedListener).setInitialValue([0, 0]);
			expect(mockCallback).toBeCalledTimes(0);

			listener.listen(() => value);
			expect(mockCallback).toBeCalledTimes(0);

			value = [0, null];
			jest.advanceTimersByTime(1000);
			expect(mockCallback).toBeCalledTimes(1);

			value = [null, 0];
			jest.advanceTimersByTime(1000);
			expect(mockCallback).toBeCalledTimes(2);

			value = [null, null];
			jest.advanceTimersByTime(1000);
			expect(mockCallback).toBeCalledTimes(3);

			value = [null, null];
			jest.advanceTimersByTime(1000);
			expect(mockCallback).toBeCalledTimes(3);
		})
		test(`='every'`, () => {
			const mockCallback = jest.fn();
			let value: Array<unknown> = [0, 0];
			listener = new ValueUpdatedListener(mockCallback);
			listener.setReadTypeOfArray('every');
			(listener as ValueUpdatedListener).setInitialValue([0, 0]);
			expect(mockCallback).toBeCalledTimes(0);

			listener.listen(() => value);
			expect(mockCallback).toBeCalledTimes(0);

			value = [0, null];
			jest.advanceTimersByTime(1000);
			expect(mockCallback).toBeCalledTimes(0);

			value = [null, 0];
			jest.advanceTimersByTime(1000);
			expect(mockCallback).toBeCalledTimes(1);

			value = [null, null];
			jest.advanceTimersByTime(1000);
			expect(mockCallback).toBeCalledTimes(1);

			value = [null, null];
			jest.advanceTimersByTime(1000);
			expect(mockCallback).toBeCalledTimes(1);
		})
		test(`catch errors when the value isn't array`, async () => {
			let value: Array<unknown> = [null, null];
			listener = new ValueUpdatedListener(() => {});
			(listener as ValueUpdatedListener).setInitialValue(null);

			listener.setReadTypeOfArray('some');
			await expect(listener.listen(() => value)).rejects.toThrow(new Error(`The last value isn't an array, please set initial value to be an array or set readTypeOfArray to "array".`));
			
			listener.setReadTypeOfArray('every');
			await expect(listener.listen(() => value)).rejects.toThrow(new Error(`The last value isn't an array, please set initial value to be an array or set readTypeOfArray to "array".`));
		})
	})
})