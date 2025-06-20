// Result

export type Result<V = undefined, E = undefined> = Ok<V> | Error<E>;

export type AsyncResult<V = undefined, E = undefined> = Promise<Result<V, E>>;

// Ok

export class Ok<V = undefined> {
    readonly type = "ok";
    constructor(public value: V) {}

    isOk(): this is Ok<V> {
        return true;
    }

    isError(): this is Error<never> {
        return false;
    }

    unwrap(): V {
        return this.value;
    }
}

export function ok<V>(value: V): Ok<V>;
export function ok(): Ok;

export function ok<V>(value?: V): Ok<V> {
    return new Ok(value as V);
}

// Error

export class Error<E = undefined> {
    readonly type = "error";
    constructor(public error: E) {}

    isOk(): this is Ok<never> {
        return false;
    }

    isError(): this is Error<E> {
        return true;
    }

    unwrap(): never {
        throw new Error("result is error");
    }
}

export function error<E>(error: E): Error<E>;
export function error(): Error<undefined>;

export function error<E>(error?: E): Error<E> {
    return new Error(error as E);
}

// Helpers

export function unwrap<T>(
	asyncResult: AsyncResult<T, unknown>
): Promise<T> {
	return asyncResult.then(r => r.unwrap());
}

export function unwrapAll<T extends readonly unknown[]>(
	asyncResults: { [K in keyof T]: AsyncResult<T[K], unknown> }
): { [K in keyof T]: Promise<T[K]> } {
	return asyncResults.map(p => p.then(r => r.unwrap())) as { [K in keyof T]: Promise<T[K]> };
}
