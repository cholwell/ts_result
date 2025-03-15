export type Result<V = undefined, E = undefined> = Ok<V> | Error<E>;

// Ok

export type Ok<V = undefined> = {
    type: "ok";
    value: V;
};

export function ok<V>(value: V): Ok<V>;
export function ok(): Ok;

export function ok<V>(value?: V): Ok<V> {
    return {
        type: "ok",
        value: value as V
    };
}

export function isOk<V>(result: Result<V, unknown>): result is Ok<V> {
    return result.type === "ok";
}

export function okOrDefault<V>(result: Result<V, unknown>, defaultValue: V): V {
    return isOk(result) ? result.value : defaultValue;
}

export function okOrThrow<V>(result: Result<V, unknown>): V {
    if (isError(result)) {
        throw new Error("result is error");
    }
    return result.value;
}

// Error

export type Error<E = undefined> = {
    type: "error";
    error: E;
};

export function error<E>(error: E): Error<E>;
export function error(): Error<undefined>;

export function error<E>(error?: E): Error<E> {
    return {
        type: "error",
        error: error as E
    };
}

export function isError<E>(result: Result<unknown, E>): result is Error<E> {
    return result.type === "error";
}

export function errorOrDefalt<E>(result: Result<unknown, E>, defaultError: E): E {
    return isError(result) ? result.error : defaultError;
}

export function errorOrThrow<E>(result: Result<unknown, E>): E {
    if (isOk(result)) {
        throw new Error("result is ok");
    }
    return result.error;
}
