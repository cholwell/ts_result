// Result

export type Result<V = undefined, E = undefined> = Ok<V> | Error<E>;

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
}

export function ok<V>(value: V): Ok<V>;
export function ok(): Ok;

export function ok<V>(value?: V): Ok<V> {
    return new Ok(value as V);
}

export function isOk<V>(result: Result<V, unknown>): result is Ok<V> {
    return result.isOk();
}

export function okOrDefault<V>(result: Result<V, unknown>, defaultValue: V): V {
    return result.isOk() ? result.value : defaultValue;
}

export function okOrThrow<V>(result: Result<V, unknown>): V {
    if (result.isError()) {
        throw new Error("result is error");
    }
    return result.value;
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
}

export function error<E>(error: E): Error<E>;
export function error(): Error<undefined>;

export function error<E>(error?: E): Error<E> {
    return new Error(error as E);
}

export function isError<E>(result: Result<unknown, E>): result is Error<E> {
    return result.isError();
}

export function errorOrDefault<E>(result: Result<unknown, E>, defaultError: E): E {
    return result.isError() ? result.error : defaultError;
}

export function errorOrThrow<E>(result: Result<unknown, E>): E {
    if (result.isOk()) {
        throw new Error("result is ok");
    }
    return result.error;
}
