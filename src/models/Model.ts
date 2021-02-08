import { AxiosPromise, AxiosResponse, AxiosError } from "axios";

interface Sync<T> {
    save(data: T): AxiosPromise<T>;
    fetch(id: number): AxiosPromise<T>;
};

interface Events {
    on(eventName: string, callback: () => void): void;
    trigger(eventName: string): void;
};

interface Attributes<T> {
    get<K extends keyof T>(propName: K): T[K];
    set(data: T): void;
    getData(): T;
}

interface HasId {
    id?: number;
}



export class Model<T extends HasId> {

    constructor(private sync: Sync<T>, private events: Events, private attributes: Attributes<T>) { }

    get get() {
        return this.attributes.get;
    }

    get on() {
        return this.events.on;
    }

    get trigger() {
        return this.events.trigger;
    }


    set(data: T) {
        this.attributes.set(data);
        this.trigger('change');
    }

    save(): void {
        this.sync.save(this.attributes.getData()).then((response: AxiosResponse) => {
            this.trigger('save');
        }).catch((error: AxiosError) => {
            console.log(error);
        });
    }


    fetch(): void {
        const id = this.get('id');
        if (typeof id == 'number') {
            this.sync.fetch(id).then((response: AxiosResponse) => {
                this.set(response.data);
            });
        }

    }
}