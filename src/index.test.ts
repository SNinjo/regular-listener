import RegularListener, { BooleanListener, ValueExistedListener, ValueUpdatedListener } from '.';




let listener: RegularListener<unknown>;
beforeEach(() => {
	jest.useFakeTimers();
})
afterEach(() => {
	listener.stop();
})




describe('test class RegularListener', () => {
	class NullListener<T> extends RegularListener<T> {
		protected isTriggered(value: T): boolean {
			return (value === null);
		}
	}

	
	test("no callback", () => {
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
			listener.listen(() => { mockListening(); return value }, 10000);
	
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
			listener.listenOnce(() => { mockListening(); return value }, 10000);

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
		
		describe('catch error via onError', () => {
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
	test("value isn't updated", () => {
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
			(listener as ValueUpdatedListener<number>).setInitialValue(0);
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
			(listener as ValueUpdatedListener<number>).setInitialValue(0);
			
			expect(mockCallback).toBeCalledTimes(0);
			listener.listenOnce(() => value);
			expect(mockCallback).toBeCalledTimes(1);
		})
	})
})