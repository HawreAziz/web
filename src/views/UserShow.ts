import { View } from './View';
import { User, UserProps } from '../models/User';


export class UserShow extends View<User, UserProps>{
    template(): string {
        return `
          <div>
            <h2>User Information</h2>
            <h3>Name is ${this.model.get('name')}</h3>
            <h3>Age is ${this.model.get('age')}</h3>
          </div>
        `
    }
}