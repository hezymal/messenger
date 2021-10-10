interface Flavoring<FlavorT> {
    _type?: FlavorT;
}

export type Flavor<T, FlavorT> = T & Flavoring<FlavorT>;

export type Await<T> = T extends PromiseLike<infer U> ? U : T;

export type AsyncResult<T extends (...args: any) => any> = Await<ReturnType<T>>;
