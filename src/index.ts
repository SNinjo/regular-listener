export abstract class RegularListener<T> {
	protected delay = 1000;
	protected intervalId: number = 0;

	protected callback: (value: T) => unknown | Promise<unknown>;
	protected onError: null | ((error: unknown) => unknown | Promise<unknown>) = null;


	constructor(callback = () => {}) {
		this.callback = callback;
	}

	protected abstract isTriggered(value: T): boolean
	protected async run(getValue: () => T, isOnce: boolean): Promise<void> {
		return new Promise((resolve, reject) => {
			const run = async () => {
				try {
					const value = getValue();
					if (this.isTriggered(value)) {
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

	async listenOnce(getValue: () => T, delay = this.delay): Promise<void> {
		this.delay = delay;
		return this.run(getValue, true);
	}
	async listen(getValue: () => T, delay = this.delay): Promise<void> {
		this.delay = delay;
		return this.run(getValue, false);
	}
	stop(): void {
		clearInterval(this.intervalId);
	}
	catch(onError: (error: unknown) => unknown | Promise<unknown>): void {
		this.onError = onError;
	}
}
export default RegularListener;


export class BooleanListener<T> extends RegularListener<T> {
	protected isTriggered(value: T): boolean {
		return Boolean(value);
	}
}

export class ValueExistedListener<T> extends RegularListener<T> {
	protected isTriggered(value: T): boolean {
		return (value !== undefined) && (value !== null);
	}
}

export class ValueUpdatedListener<T> extends RegularListener<T> {
	private isFirstGettingValue: boolean = true;
	private lastValue: T | null = null;
    
	protected isTriggered(value: T): boolean {
		if (this.isFirstGettingValue) {
			this.isFirstGettingValue = false;
			this.lastValue = value;
			return false;
		}

		const isUpdated = (this.lastValue !== value);
		this.lastValue = value;
		return isUpdated;
	}

	setInitialValue(value: T) {
		this.lastValue = value;
		this.isFirstGettingValue = false;
	}
}