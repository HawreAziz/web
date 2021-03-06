import { Model } from '../models/Model';

export abstract class View<T extends Model<K>, K> {

    constructor(public parent: Element, public model: T) {
        model.on('change', () => {
            this.render();
        })
    }

    abstract template(): string;
    eventsMap(): { [key: string]: () => void } {
        return {}
    };


    mapRegions(fragment: DocumentFragment): void { }

    render(): void {
        this.parent.innerHTML = "";
        const templateElement = document.createElement('template');
        templateElement.innerHTML = this.template();
        this.bindEvents(templateElement.content);
        this.mapRegions(templateElement.content);
        this.parent.append(templateElement.content);
    }

    bindEvents(fragment: DocumentFragment): void {
        const eventsMap = this.eventsMap();
        for (let eventKey in eventsMap) {
            const [eventName, selector] = eventKey.split(':');
            fragment.querySelectorAll(selector).forEach(element => {
                element.addEventListener(eventName, eventsMap[eventKey]);
            })

        }
    }

}