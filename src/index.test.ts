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
			const mockOnTrigger = jest.fn();
			const mockListening = jest.fn();
			let value: undefined | null = undefined;
			listener = new NullListener(mockOnTrigger);
			expect(mockOnTrigger).toBeCalledTimes(0);
			expect(mockListening).toBeCalledTimes(0);
			listener.listen(() => { mockListening(); return value });
	
			expect(mockOnTrigger).toBeCalledTimes(0);
			expect(mockListening).toBeCalledTimes(1);
			jest.advanceTimersByTime(1000);
			expect(mockOnTrigger).toBeCalledTimes(0);
			expect(mockListening).toBeCalledTimes(2);
			jest.advanceTimersByTime(1000);
			expect(mockOnTrigger).toBeCalledTimes(0);
			expect(mockListening).toBeCalledTimes(3);
	
			value = null;
			expect(mockOnTrigger).toBeCalledTimes(0);
			expect(mockListening).toBeCalledTimes(3);
			jest.advanceTimersByTime(1000);
			expect(mockOnTrigger).toBeCalledTimes(1);
			expect(mockListening).toBeCalledTimes(4);
			jest.advanceTimersByTime(1000);
			expect(mockOnTrigger).toBeCalledTimes(2);
			expect(mockListening).toBeCalledTimes(5);
		})
		test('every 10s', () => {
			const mockOnTrigger = jest.fn();
			const mockListening = jest.fn();
			let value: undefined | null = undefined;
			listener = new NullListener(mockOnTrigger);
			expect(mockOnTrigger).toBeCalledTimes(0);
			expect(mockListening).toBeCalledTimes(0);
			listener.setDelay(10000);
			listener.listen(() => { mockListening(); return value });
	
			expect(mockOnTrigger).toBeCalledTimes(0);
			expect(mockListening).toBeCalledTimes(1);
			jest.advanceTimersByTime(10000);
			expect(mockOnTrigger).toBeCalledTimes(0);
			expect(mockListening).toBeCalledTimes(2);
			jest.advanceTimersByTime(10000);
			expect(mockOnTrigger).toBeCalledTimes(0);
			expect(mockListening).toBeCalledTimes(3);
	
			value = null;
			expect(mockOnTrigger).toBeCalledTimes(0);
			expect(mockListening).toBeCalledTimes(3);
			jest.advanceTimersByTime(10000);
			expect(mockOnTrigger).toBeCalledTimes(1);
			expect(mockListening).toBeCalledTimes(4);
			jest.advanceTimersByTime(10000);
			expect(mockOnTrigger).toBeCalledTimes(2);
			expect(mockListening).toBeCalledTimes(5);
		})
	})

	describe('listen value once', () => {
		test('every 1s', () => {
			const mockOnTrigger = jest.fn();
			const mockListening = jest.fn();
			let value: undefined | null = undefined;
			listener = new NullListener(mockOnTrigger);
			expect(mockOnTrigger).toBeCalledTimes(0);
			expect(mockListening).toBeCalledTimes(0);
			listener.listenOnce(() => { mockListening(); return value });

			expect(mockOnTrigger).toBeCalledTimes(0);
			expect(mockListening).toBeCalledTimes(1);
			jest.advanceTimersByTime(1000);
			expect(mockOnTrigger).toBeCalledTimes(0);
			expect(mockListening).toBeCalledTimes(2);
			jest.advanceTimersByTime(1000);
			expect(mockOnTrigger).toBeCalledTimes(0);
			expect(mockListening).toBeCalledTimes(3);

			value = null;
			expect(mockOnTrigger).toBeCalledTimes(0);
			expect(mockListening).toBeCalledTimes(3);
			jest.advanceTimersByTime(1000);
			expect(mockOnTrigger).toBeCalledTimes(1);
			expect(mockListening).toBeCalledTimes(4);
			jest.advanceTimersByTime(1000);
			expect(mockOnTrigger).toBeCalledTimes(1);
			expect(mockListening).toBeCalledTimes(4);
		})
		test('every 10s', () => {
			const mockOnTrigger = jest.fn();
			const mockListening = jest.fn();
			let value: undefined | null = undefined;
			listener = new NullListener(mockOnTrigger);
			expect(mockOnTrigger).toBeCalledTimes(0);
			expect(mockListening).toBeCalledTimes(0);
			listener.setDelay(10000);
			listener.listenOnce(() => { mockListening(); return value });

			expect(mockOnTrigger).toBeCalledTimes(0);
			expect(mockListening).toBeCalledTimes(1);
			jest.advanceTimersByTime(10000);
			expect(mockOnTrigger).toBeCalledTimes(0);
			expect(mockListening).toBeCalledTimes(2);
			jest.advanceTimersByTime(10000);
			expect(mockOnTrigger).toBeCalledTimes(0);
			expect(mockListening).toBeCalledTimes(3);

			value = null;
			expect(mockOnTrigger).toBeCalledTimes(0);
			expect(mockListening).toBeCalledTimes(3);
			jest.advanceTimersByTime(10000);
			expect(mockOnTrigger).toBeCalledTimes(1);
			expect(mockListening).toBeCalledTimes(4);
			jest.advanceTimersByTime(10000);
			expect(mockOnTrigger).toBeCalledTimes(1);
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
			const mockOnTrigger = jest.fn();
			let value: undefined | null = undefined;
			listener = new NullListener(mockOnTrigger);
			expect(mockOnTrigger).toBeCalledTimes(0);

			listener.listenOnce(() => value);
			expect(mockOnTrigger).toBeCalledTimes(0);

			value = null;
			jest.advanceTimersByTime(1000);
			expect(mockOnTrigger).toBeCalledTimes(1);
		})
		test(`='some'`, () => {
			const mockOnTrigger = jest.fn();
			let value: Array<unknown> = [0];
			listener = new NullListener(mockOnTrigger);
			listener.setReadTypeOfArray('some');
			expect(mockOnTrigger).toBeCalledTimes(0);

			listener.listen(() => value);
			expect(mockOnTrigger).toBeCalledTimes(0);

			value = [null];
			jest.advanceTimersByTime(1000);
			expect(mockOnTrigger).toBeCalledTimes(1);

			value = [0, null];
			jest.advanceTimersByTime(1000);
			expect(mockOnTrigger).toBeCalledTimes(2);

			value = [null, 0];
			jest.advanceTimersByTime(1000);
			expect(mockOnTrigger).toBeCalledTimes(3);

			value = [null, null];
			jest.advanceTimersByTime(1000);
			expect(mockOnTrigger).toBeCalledTimes(4);
		})
		test(`='every'`, () => {
			const mockOnTrigger = jest.fn();
			let value: Array<unknown> = [0];
			listener = new NullListener(mockOnTrigger);
			listener.setReadTypeOfArray('every');
			expect(mockOnTrigger).toBeCalledTimes(0);

			listener.listen(() => value);
			expect(mockOnTrigger).toBeCalledTimes(0);

			value = [null];
			jest.advanceTimersByTime(1000);
			expect(mockOnTrigger).toBeCalledTimes(1);

			value = [0, null];
			jest.advanceTimersByTime(1000);
			expect(mockOnTrigger).toBeCalledTimes(1);

			value = [null, 0];
			jest.advanceTimersByTime(1000);
			expect(mockOnTrigger).toBeCalledTimes(1);

			value = [null, null];
			jest.advanceTimersByTime(1000);
			expect(mockOnTrigger).toBeCalledTimes(2);
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
				const mockOnTrigger = jest.fn();
				const mockListening = jest.fn();
				listener = new NullListener(mockOnTrigger);

				expect(mockOnTrigger).toBeCalledTimes(0);
				expect(mockListening).toBeCalledTimes(0);
				await expect(listener.listen(() => { mockListening(); throw mockError; })).rejects.toThrow(mockError);
				expect(mockOnTrigger).toBeCalledTimes(0);
				expect(mockListening).toBeCalledTimes(1);
				jest.advanceTimersByTime(1000);
				expect(mockOnTrigger).toBeCalledTimes(0);
				expect(mockListening).toBeCalledTimes(1);
				jest.advanceTimersByTime(1000);
				expect(mockOnTrigger).toBeCalledTimes(0);
				expect(mockListening).toBeCalledTimes(1);
			})
			test('listen value once', async () => {
				const mockOnTrigger = jest.fn();
				const mockListening = jest.fn();
				listener = new NullListener(mockOnTrigger);

				expect(mockOnTrigger).toBeCalledTimes(0);
				expect(mockListening).toBeCalledTimes(0);
				await expect(listener.listenOnce(() => { mockListening(); throw mockError })).rejects.toThrow(mockError);
				expect(mockOnTrigger).toBeCalledTimes(0);
				expect(mockListening).toBeCalledTimes(1);
				jest.advanceTimersByTime(1000);
				expect(mockOnTrigger).toBeCalledTimes(0);
				expect(mockListening).toBeCalledTimes(1);
				jest.advanceTimersByTime(1000);
				expect(mockOnTrigger).toBeCalledTimes(0);
				expect(mockListening).toBeCalledTimes(1);
			})
		})
		
		describe('catch errors via onError', () => {
			test('listen value', async () => {
				const mockOnTrigger = jest.fn();
				const mockListening = jest.fn();
				const mockOnError = jest.fn();
				listener = new NullListener(mockOnTrigger);
				listener.catch(mockOnError);

				expect(mockOnTrigger).toBeCalledTimes(0);
				expect(mockListening).toBeCalledTimes(0);
				expect(mockOnError).toBeCalledTimes(0);
				listener.listen(() => { mockListening(); throw mockError });
				expect(mockOnTrigger).toBeCalledTimes(0);
				expect(mockListening).toBeCalledTimes(1);
				expect(mockOnError).toBeCalledTimes(1);
				jest.advanceTimersByTime(1000);
				expect(mockOnTrigger).toBeCalledTimes(0);
				expect(mockListening).toBeCalledTimes(1);
				expect(mockOnError).toBeCalledTimes(1);
				jest.advanceTimersByTime(1000);
				expect(mockOnTrigger).toBeCalledTimes(0);
				expect(mockListening).toBeCalledTimes(1);
				expect(mockOnError).toBeCalledTimes(1);
			})
			test('listen value once', async () => {
				const mockOnTrigger = jest.fn();
				const mockListening = jest.fn();
				const mockOnError = jest.fn();
				listener = new NullListener(mockOnTrigger);
				listener.catch(mockOnError);

				expect(mockOnTrigger).toBeCalledTimes(0);
				expect(mockListening).toBeCalledTimes(0);
				expect(mockOnError).toBeCalledTimes(0);
				listener.listenOnce(() => { mockListening(); throw mockError });
				expect(mockOnTrigger).toBeCalledTimes(0);
				expect(mockListening).toBeCalledTimes(1);
				expect(mockOnError).toBeCalledTimes(1);
				jest.advanceTimersByTime(1000);
				expect(mockOnTrigger).toBeCalledTimes(0);
				expect(mockListening).toBeCalledTimes(1);
				expect(mockOnError).toBeCalledTimes(1);
				jest.advanceTimersByTime(1000);
				expect(mockOnTrigger).toBeCalledTimes(0);
				expect(mockListening).toBeCalledTimes(1);
				expect(mockOnError).toBeCalledTimes(1);
			})
		})
	})


	describe('message process', () => {
		let spyLogInfo: jest.SpyInstance<void, [message?: unknown, ...optionalParams: unknown[]], unknown>;
		let spyLogWarn: jest.SpyInstance<void, [message?: unknown, ...optionalParams: unknown[]], unknown>;
		beforeEach(() => {
			spyLogInfo = (
				jest
					.spyOn(global.console, 'log')
					.mockImplementation(() => {})
			);
			spyLogWarn = (
				jest
					.spyOn(global.console, 'warn')
					.mockImplementation(() => {})
			);
		})
		afterEach(() => {
			spyLogInfo.mockRestore();
			spyLogWarn.mockRestore();
		})


		describe('hide message', () => {
			test('default', () => {
				listener = new NullListener();

				listener.listen(() => null);
				expect(spyLogInfo).toBeCalledTimes(0);
			})
			test('set through function hideMessage', () => {
				listener = new NullListener();
				listener.hideMessage();
				listener.catch(() => {});

				listener.listen(() => { throw new Error('mock') });
				expect(spyLogWarn).toBeCalledTimes(0);
			})
		})
		describe('print message', () => {
			test(`"listen" message`, () => {
				let value: undefined | null | Array<number> = undefined;
				listener = new NullListener();
				listener.printMessage();

				listener.listen(() => value);
				expect(spyLogInfo).toBeCalledTimes(1);
				expect(spyLogInfo).toHaveBeenCalledWith('listen | isTriggered: false, value: undefined');

				value = null;
				jest.advanceTimersByTime(1000);
				expect(spyLogInfo).toBeCalledTimes(2);
				expect(spyLogInfo).toHaveBeenCalledWith('listen | isTriggered: true, value: null');

				value = [0, 1];
				jest.advanceTimersByTime(1000);
				expect(spyLogInfo).toBeCalledTimes(3);
				expect(spyLogInfo).toHaveBeenCalledWith('listen | isTriggered: false, value: [0, 1]');
			})
			test(`"error" message`, () => {
				listener = new NullListener();
				listener.catch(() => {});
				listener.printMessage();

				listener.listen(() => { throw new Error('mock error') });
				expect(spyLogWarn).toBeCalledTimes(1);
				expect(spyLogWarn).toHaveBeenCalledWith(`catch error | ${new Error('mock error')}`);
			})
		})
	})
})




describe('test class BooleanListener', () => {
	test('value = false', () => {
		const mockOnTrigger = jest.fn();
		let value = false;
		listener = new BooleanListener(mockOnTrigger);
		listener.listen(() => value);

		expect(mockOnTrigger).toBeCalledTimes(0);
		jest.advanceTimersByTime(1000);
		expect(mockOnTrigger).toBeCalledTimes(0);
	})
	test('value = true', () => {
		const mockOnTrigger = jest.fn();
		let value = false;
		listener = new BooleanListener(mockOnTrigger);
		listener.listenOnce(() => value);

		expect(mockOnTrigger).toBeCalledTimes(0);
		jest.advanceTimersByTime(1000);
		expect(mockOnTrigger).toBeCalledTimes(0);
		
		value = true;
		expect(mockOnTrigger).toBeCalledTimes(0);
		jest.advanceTimersByTime(1000);
		expect(mockOnTrigger).toBeCalledTimes(1);
	})
})




describe('test class ValueExistedListener', () => {
	test('value = undefined', () => {
		const mockOnTrigger = jest.fn();
		let value: undefined = undefined;
		listener = new ValueExistedListener(mockOnTrigger);
		listener.listen(() => value);

		expect(mockOnTrigger).toBeCalledTimes(0);
		jest.advanceTimersByTime(1000);
		expect(mockOnTrigger).toBeCalledTimes(0);
	})
	test('value = undefined', () => {
		const mockOnTrigger = jest.fn();
		let value: null = null;
		listener = new ValueExistedListener(mockOnTrigger);
		listener.listen(() => value);

		expect(mockOnTrigger).toBeCalledTimes(0);
		jest.advanceTimersByTime(1000);
		expect(mockOnTrigger).toBeCalledTimes(0);
	})
	test('value = 0', () => {
		const mockOnTrigger = jest.fn();
		let value: null | number = null;
		listener = new ValueExistedListener(mockOnTrigger);
		listener.listenOnce(() => value);

		expect(mockOnTrigger).toBeCalledTimes(0);
		jest.advanceTimersByTime(1000);
		expect(mockOnTrigger).toBeCalledTimes(0);
		
		value = 0;
		expect(mockOnTrigger).toBeCalledTimes(0);
		jest.advanceTimersByTime(1000);
		expect(mockOnTrigger).toBeCalledTimes(1);
	})
})




describe('test class ValueUpdatedListener', () => {
	describe(`value isn't updated`, () => {
		test('not array', () => {
			const mockOnTrigger = jest.fn();
			const value = 0;
			listener = new ValueUpdatedListener(mockOnTrigger);
			listener.listen(() => value);

			expect(mockOnTrigger).toBeCalledTimes(0);
			jest.advanceTimersByTime(1000);
			expect(mockOnTrigger).toBeCalledTimes(0);
		})
		test('array', () => {
			const mockOnTrigger = jest.fn();
			const value = [0];
			listener = new ValueUpdatedListener(mockOnTrigger);
			(listener as ValueUpdatedListener).setInitialValue(value);
			listener.listen(() => value);

			expect(mockOnTrigger).toBeCalledTimes(0);
			jest.advanceTimersByTime(1000);
			expect(mockOnTrigger).toBeCalledTimes(0);
		})
	})
	describe('value is updated', () => {
		describe('get initial value automatically', () => {
			test('not array', () => {
				const mockOnTrigger = jest.fn();
				let value = 0;
				listener = new ValueUpdatedListener(mockOnTrigger);
				listener.listenOnce(() => value);
		
				expect(mockOnTrigger).toBeCalledTimes(0);
				jest.advanceTimersByTime(1000);
				expect(mockOnTrigger).toBeCalledTimes(0);
				
				value++;
				expect(mockOnTrigger).toBeCalledTimes(0);
				jest.advanceTimersByTime(1000);
				expect(mockOnTrigger).toBeCalledTimes(1);
			})
			describe('array (each readTypeOfArray)', () => {
				test(`='array'`, () => {
					const mockOnTrigger = jest.fn();
					let value = [0, 0];
					listener = new ValueUpdatedListener(mockOnTrigger);
					listener.listenOnce(() => value);
			
					expect(mockOnTrigger).toBeCalledTimes(0);
					jest.advanceTimersByTime(1000);
					expect(mockOnTrigger).toBeCalledTimes(0);
					
					value = [0, 1];
					expect(mockOnTrigger).toBeCalledTimes(0);
					jest.advanceTimersByTime(1000);
					expect(mockOnTrigger).toBeCalledTimes(1);
				})
				test(`='some'`, () => {
					const mockOnTrigger = jest.fn();
					let value = [0, 0];
					listener = new ValueUpdatedListener(mockOnTrigger);
					listener.setReadTypeOfArray('some');
					listener.listenOnce(() => value);
			
					expect(mockOnTrigger).toBeCalledTimes(0);
					jest.advanceTimersByTime(1000);
					expect(mockOnTrigger).toBeCalledTimes(0);
					
					value = [0, 1];
					expect(mockOnTrigger).toBeCalledTimes(0);
					jest.advanceTimersByTime(1000);
					expect(mockOnTrigger).toBeCalledTimes(1);
				})
				test(`='every'`, () => {
					const mockOnTrigger = jest.fn();
					let value = [0, 0];
					listener = new ValueUpdatedListener(mockOnTrigger);
					listener.setReadTypeOfArray('every');
					listener.listenOnce(() => value);
			
					expect(mockOnTrigger).toBeCalledTimes(0);
					jest.advanceTimersByTime(1000);
					expect(mockOnTrigger).toBeCalledTimes(0);
					
					value = [1, 1];
					expect(mockOnTrigger).toBeCalledTimes(0);
					jest.advanceTimersByTime(1000);
					expect(mockOnTrigger).toBeCalledTimes(1);
				})
			})
		})
		describe('get initial value manually', () => {
			test('not array', () => {
				const mockOnTrigger = jest.fn();
				let value = 0;
				listener = new ValueUpdatedListener(mockOnTrigger);
				(listener as ValueUpdatedListener).setInitialValue(0);
				listener.listenOnce(() => value);
		
				expect(mockOnTrigger).toBeCalledTimes(0);
				jest.advanceTimersByTime(1000);
				expect(mockOnTrigger).toBeCalledTimes(0);
				
				value++;
				expect(mockOnTrigger).toBeCalledTimes(0);
				jest.advanceTimersByTime(1000);
				expect(mockOnTrigger).toBeCalledTimes(1);
			})
			test('array', () => {
				const mockOnTrigger = jest.fn();
				let value = [0, 0];
				listener = new ValueUpdatedListener(mockOnTrigger);
				(listener as ValueUpdatedListener).setInitialValue(value);
				listener.listenOnce(() => value);
		
				expect(mockOnTrigger).toBeCalledTimes(0);
				jest.advanceTimersByTime(1000);
				expect(mockOnTrigger).toBeCalledTimes(0);
				
				value = [0, 1];
				expect(mockOnTrigger).toBeCalledTimes(0);
				jest.advanceTimersByTime(1000);
				expect(mockOnTrigger).toBeCalledTimes(1);
			})
		})
		describe('get initial value manually and trigger it right away', () => {
			test('not array', () => {
				const mockOnTrigger = jest.fn();
				let value = 1;
				listener = new ValueUpdatedListener(mockOnTrigger);
				(listener as ValueUpdatedListener).setInitialValue(0);
				
				expect(mockOnTrigger).toBeCalledTimes(0);
				listener.listenOnce(() => value);
				expect(mockOnTrigger).toBeCalledTimes(1);
			})
			test('array', () => {
				const mockOnTrigger = jest.fn();
				let value = [0, 0];
				listener = new ValueUpdatedListener(mockOnTrigger);
				(listener as ValueUpdatedListener).setInitialValue([0, 0]);
				
				expect(mockOnTrigger).toBeCalledTimes(0);
				listener.listenOnce(() => value);
				expect(mockOnTrigger).toBeCalledTimes(1);
			})
		})
	})


	describe('read type of array', () => {
		test(`='array'`, () => {
			const mockOnTrigger = jest.fn();
			let value: undefined | null = undefined;
			listener = new ValueUpdatedListener(mockOnTrigger);
			expect(mockOnTrigger).toBeCalledTimes(0);

			listener.listenOnce(() => value);
			expect(mockOnTrigger).toBeCalledTimes(0);

			value = null;
			jest.advanceTimersByTime(1000);
			expect(mockOnTrigger).toBeCalledTimes(1);
		})
		test(`='some'`, () => {
			const mockOnTrigger = jest.fn();
			let value: Array<unknown> = [0, 0];
			listener = new ValueUpdatedListener(mockOnTrigger);
			listener.setReadTypeOfArray('some');
			(listener as ValueUpdatedListener).setInitialValue([0, 0]);
			expect(mockOnTrigger).toBeCalledTimes(0);

			listener.listen(() => value);
			expect(mockOnTrigger).toBeCalledTimes(0);

			value = [0, null];
			jest.advanceTimersByTime(1000);
			expect(mockOnTrigger).toBeCalledTimes(1);

			value = [null, 0];
			jest.advanceTimersByTime(1000);
			expect(mockOnTrigger).toBeCalledTimes(2);

			value = [null, null];
			jest.advanceTimersByTime(1000);
			expect(mockOnTrigger).toBeCalledTimes(3);

			value = [null, null];
			jest.advanceTimersByTime(1000);
			expect(mockOnTrigger).toBeCalledTimes(3);


			value = [null, null, 0];
			jest.advanceTimersByTime(1000);
			expect(mockOnTrigger).toBeCalledTimes(4);

			value = [0, null, null, 0];
			jest.advanceTimersByTime(1000);
			expect(mockOnTrigger).toBeCalledTimes(5);

			value = [0, null, 0, null, 0];
			jest.advanceTimersByTime(1000);
			expect(mockOnTrigger).toBeCalledTimes(6);

			value = [0];
			jest.advanceTimersByTime(1000);
			expect(mockOnTrigger).toBeCalledTimes(7);
		})
		test(`='every'`, () => {
			const mockOnTrigger = jest.fn();
			let value: Array<unknown> = [0, 0];
			listener = new ValueUpdatedListener(mockOnTrigger);
			listener.setReadTypeOfArray('every');
			(listener as ValueUpdatedListener).setInitialValue([0, 0]);
			expect(mockOnTrigger).toBeCalledTimes(0);

			listener.listen(() => value);
			expect(mockOnTrigger).toBeCalledTimes(0);

			value = [0, null];
			jest.advanceTimersByTime(1000);
			expect(mockOnTrigger).toBeCalledTimes(0);

			value = [null, 0];
			jest.advanceTimersByTime(1000);
			expect(mockOnTrigger).toBeCalledTimes(1);

			value = [null, null];
			jest.advanceTimersByTime(1000);
			expect(mockOnTrigger).toBeCalledTimes(1);

			value = [null, null];
			jest.advanceTimersByTime(1000);
			expect(mockOnTrigger).toBeCalledTimes(1);


			value = [null, null, 0];
			jest.advanceTimersByTime(1000);
			expect(mockOnTrigger).toBeCalledTimes(2);

			value = [0, null, null, 0];
			jest.advanceTimersByTime(1000);
			expect(mockOnTrigger).toBeCalledTimes(3);

			value = [0, null, 0, null, 0];
			jest.advanceTimersByTime(1000);
			expect(mockOnTrigger).toBeCalledTimes(4);

			value = [0];
			jest.advanceTimersByTime(1000);
			expect(mockOnTrigger).toBeCalledTimes(5);
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