import axios from 'axios';
import { Events } from './Events';


export class Collection<T, K> {
    models: T[] = [];
    events: Events = new Events();

    constructor(private rootURL: string, private deserilize: (json: K) => T) { }

    get on() {
        return this.events.on;
    }

    get trigger() {
        return this.events.trigger;
    }

    fetch = async (): Promise<void> => {
        try {
            const response = await axios.get(this.rootURL);
            response.data.forEach((element: K) => {
                const user = this.deserilize(element);
                this.models.push(user);
            });
            this.trigger('change');
        } catch (error) {
            console.log(error);
        }
    }
}