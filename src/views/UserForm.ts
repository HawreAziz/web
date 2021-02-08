import { User, UserProps } from '../models/User';
import { View } from './View';


export class UserForm extends View<User, UserProps> {


    template(): string {
        return `
          <input class="set-name" placeholder=${this.model.get('name')} />
          <button>Update name</button>
          <button class='set-age'>Set random age</button>
          <button class='save-data'>Save data</button>
        `
    }


    eventsMap(): { [key: string]: () => void } {
        return {
            "click:.set-age": this.onSetAge,
            "change:.set-name": this.onSetName,
            "click:.save-data": this.onSave,
        }
    }


    onSave = () => {
        this.model.save();
    }

    onSetAge = (): void => {
        this.model.setRandomAge();
    }

    onSetName = (): void => {
        const input = this.parent.querySelector('input');
        if (!input) { return; }
        this.model.set({ name: input.value })
    }
}