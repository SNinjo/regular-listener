type hookOnTrigger = (value: unknown) => unknown | Promise<unknown>;
type hookOnError = (error: unknown) => unknown | Promise<unknown>;
type ReadTypeOfArray = 'array' | 'some' | 'every';

abstract class RegularListener {
	private delay = 1000;
	private intervalId = 0;
	private readTypeOfArray: ReadTypeOfArray = 'array';
	private isMessagePrinted = false;

	private onTrigger: hookOnTrigger = () => {};
	private onError: null | hookOnError = null;


	constructor()
	constructor(onTrigger: hookOnTrigger)
	constructor(onTrigger?: hookOnTrigger) {
		if (onTrigger) {
			this.onTrigger = onTrigger;
		}
	}


	protected abstract isTriggered(value: unknown): boolean
	protected abstract isTriggered(value: unknown, index: number): boolean
	protected abstract isTriggered(value: unknown, index: number, array: Array<unknown>): boolean

	private toString(value: unknown): string
	private toString(value: Array<unknown>): string
	private toString(value: unknown | Array<unknown>): string {
		if (value instanceof Array) return `[${value.join(', ')}]`;
		else return `${value}`;
	}
 
	private async run(getValue: () => unknown, isOnce: boolean): Promise<void> {
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
								.map((element, index, value) => this.isTriggered(element, index, value))
								?.[this.readTypeOfArray](boolean => boolean)
						);
						break;
					}

					// eslint-disable-next-line no-console
					if (this.isMessagePrinted) console.log(`listen | isTriggered: ${isTriggered}, value: ${this.toString(value)}`);
					if (isTriggered) {
						if (isOnce) clearInterval(this.intervalId);
						await this.onTrigger(value);
						resolve();
					}
				} catch (error) {
					clearInterval(this.intervalId);
					if (this.onError) {
						// eslint-disable-next-line no-console
						if (this.isMessagePrinted) console.warn(`catch error | ${error}`);
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
	catch(onError: hookOnError): void {
		this.onError = onError;
	}


	setDelay(delay: number): void {
		this.delay = delay;
	}
	setReadTypeOfArray(readTypeOfArray: ReadTypeOfArray): void {
		this.readTypeOfArray = readTypeOfArray;
	}

	printMessage(): void {
		this.isMessagePrinted = true;
	}
	hideMessage(): void {
		this.isMessagePrinted = false;
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
	private isValueInitialized = false;
	private lastValue: unknown;
    
	protected isTriggered(value: unknown, index?: number, array?: Array<unknown>): boolean {
		if ((index !== undefined) && (array !== undefined)) {
			if (!this.isValueInitialized) {
				if (index !== (array.length - 1)) {
					return false;
				} else {
					this.isValueInitialized = true;
					this.lastValue = array;
					return false;
				}
			}


			if (!(this.lastValue instanceof Array)) throw new Error(`The last value isn't an array, please set initial value to be an array or set readTypeOfArray to "array".`);
			if (this.lastValue.length !== array.length) return true;

			const isUpdated = this.lastValue[index] !== value;
			this.lastValue[index] = value;
			return isUpdated;
		} else {
			if (!this.isValueInitialized) {
				this.isValueInitialized = true;
				this.lastValue = value;
				return false;
			}

			const isUpdated = (this.lastValue !== value);
			this.lastValue = value;
			return isUpdated;
		}
	}

	setInitialValue(value: unknown) {
		this.lastValue = value;
		this.isValueInitialized = true;
	}
}