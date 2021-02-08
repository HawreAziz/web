
export class Attributes<T> {
    constructor(private data: T) { };

    get = <K extends keyof T>(propName: K): T[K] => {
        return this.data[propName];
    }

    set(data: T): void {
        Object.assign(this.data, data);
    }

    getData(): T {
        return this.data;
    }
}