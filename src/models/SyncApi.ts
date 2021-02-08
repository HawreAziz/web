import axios, { AxiosPromise } from 'axios';

interface HasId {
    id?: number;
}
export class SyncApi<T extends HasId> {

    constructor(private rootURL: string) { }

    save(data: T): AxiosPromise<T> {
        const { id } = data;

        if (id) {
            return axios.put(`${this.rootURL}/${id}`, data);
        } else {
            return axios.post(this.rootURL, data);
        }
    }

    fetch(id: number): AxiosPromise<T> {
        return axios.get(`${this.rootURL}/${id}`);
    }
}