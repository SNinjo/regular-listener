type ReadTypeOfArray = 'array' | 'some' | 'every';
export abstract class RegularListener {
	protected delay = 1000;
	protected intervalId: number = 0;
	protected readTypeOfArray: ReadTypeOfArray = 'array';

	protected callback: (value: unknown) => unknown | Promise<unknown>;
	protected onError: null | ((error: unknown) => unknown | Promise<unknown>) = null;


	constructor(callback = () => {}) {
		this.callback = callback;
	}

	protected abstract isTriggered(value: unknown): boolean
	protected abstract isTriggered(value: unknown, index: number): boolean
 
	protected async run(getValue: () => unknown, isOnce: boolean): Promise<void> {
		return new Promise((resolve, reject) => {
			const run = async () => {
				try {
					const value = getValue();
					let isTriggered = false;
					switch (this.readTypeOfArray) {
					case 'array':
						isTriggered = this.isTriggered(value);
						break;
					
					case 'some':
					case 'every':
						if (!(value instanceof Array)) throw new Error(`The value isn't an array, please set readTypeOfArray to "array".`);
						if (value.length === 0) throw new Error(`There are no value in the array, please add at least one value for listener.`);
						isTriggered = (
							value
								.map((value, index) => this.isTriggered(value, index))
								?.[this.readTypeOfArray](boolean => boolean)
						);
						break;
					}

					if (isTriggered) {
						if (isOnce) clearInterval(this.intervalId);
						await this.callback(value);
						resolve();
					}
				} catch (error) {
					clearInterval(this.intervalId);
					if (this.onError) {
						await this.onError(error);
						resolve();
					} else {
						reject(error);
					}
				}
			}
			this.intervalId = setInterval(run, this.delay) as unknown as number;
			run();
		})
	}

	async listenOnce(getValue: () => unknown): Promise<void> {
		return this.run(getValue, true);
	}
	async listen(getValue: () => unknown): Promise<void> {
		return this.run(getValue, false);
	}
	stop(): void {
		clearInterval(this.intervalId);
	}
	catch(onError: (error: unknown) => unknown | Promise<unknown>): void {
		this.onError = onError;
	}

	setDelay(delay: number): void {
		this.delay = delay;
	}
	setReadTypeOfArray(readTypeOfArray: ReadTypeOfArray): void {
		this.readTypeOfArray = readTypeOfArray;
	}
}
export default RegularListener;


export class BooleanListener extends RegularListener {
	protected isTriggered(value: unknown): boolean {
		return Boolean(value);
	}
}

export class ValueExistedListener extends RegularListener {
	protected isTriggered(value: unknown): boolean {
		return (value !== undefined) && (value !== null);
	}
}

export class ValueUpdatedListener extends RegularListener {
	private isValueInitialized: boolean = true;
	private lastValue: unknown;
    
	protected isTriggered(value: unknown, index?: number): boolean {
		if ((index !== undefined) && !(this.lastValue instanceof Array)) throw new Error(`The last value isn't an array, please set initial value to be an array or set readTypeOfArray to "array".`);

		if (this.isValueInitialized) {
			this.isValueInitialized = false;
			this.lastValue = value;
			return false;
		}

		if (index !== undefined) {
			const isUpdated = ((this.lastValue as Array<unknown>)[index] !== value);
			(this.lastValue as Array<unknown>)[index] = value;
			return isUpdated;
		} else {
			const isUpdated = (this.lastValue !== value);
			this.lastValue = value;
			return isUpdated;
		}
	}

	setInitialValue(value: unknown) {
		this.lastValue = value;
		this.isValueInitialized = false;
	}
}