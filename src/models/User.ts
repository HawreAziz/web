import { SyncApi } from './SyncApi';
import { Attributes } from './Attributes';
import { Events } from './Events';
import { Model } from './Model';
import { Collection } from './Collection';


export interface UserProps {
    name?: string;
    age?: number;
    id?: number;
}


const rootURL = 'http://localhost:3000/users';

export class User extends Model<UserProps> {
    static buildUser(attrs: UserProps): User {
        return new User(
            new SyncApi<UserProps>(rootURL),
            new Events(),
            new Attributes<UserProps>(attrs)
        );
    }

    static buildCollection(): Collection<User, UserProps> {
        return new Collection<User, UserProps>(rootURL, (element: UserProps): User => {
            return User.buildUser(element)
        })
    }

    setRandomAge(): void {
        const age = Math.round(Math.random() * 100);
        this.set({ age });
    }
}



