export type Result<V, E> = Ok<V> | Error<E>;

// Ok

export type Ok<V> = {
    type: "ok";
    value: V;
};

export function ok<V>(value: V): Ok<V>;
export function ok(): Ok<None>;

export function ok<V>(value?: V): Ok<V> {
    return {
        type: "ok",
        value: value as V
    };
}

export function isOk<V>(result: Result<V, unknown>): result is Ok<V> {
    return result.type === "ok";
}

// Error

export type Error<E> = {
    type: "error";
    error: E;
};

export function error<E>(error: E): Error<E>;
export function error(): Error<None>;

export function error<E>(error?: E): Error<E> {
    return {
        type: "error",
        error: error as E
    };
}

export function isError<E>(result: Result<unknown, E>): result is Error<E> {
    return result.type === "error";
}

// None

export type None = undefined;
