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

    okOrDefault(_defaultValue: V): V {
            return this.value;
        }

    okOrThrow(): V {
        return this.value;
    }

    errorOrDefault<E>(defaultError: E): E {
        return defaultError;
    }

    errorOrThrow<E>(): never {
        throw new Error("result is ok");
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

    okOrDefault<V>(defaultValue: V): V {
        return defaultValue;
    }

    okOrThrow(): never {
        throw new Error("result is error");
    }

    errorOrDefault(defaultError: E): E {
        return this.error ?? defaultError;
    }

    errorOrThrow(): E {
        return this.error;
    }
}

export function error<E>(error: E): Error<E>;
export function error(): Error<undefined>;

export function error<E>(error?: E): Error<E> {
    return new Error(error as E);
}
