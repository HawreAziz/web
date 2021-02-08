import { Collection } from "../models/Collection";


export abstract class CollectionView<T, K> {
    abstract renderItem(model: T, itemPrent: Element): void;

    constructor(private parent: Element, public collection: Collection<T, K>) { }


    render(): void {
        this.parent.innerHTML = "";
        const templateElement = document.createElement('template');
        this.collection.models.forEach((user: T) => {
            const itemParent = document.createElement('div');
            this.renderItem(user, itemParent);
            templateElement.content.append(itemParent);
        });
        this.parent.append(templateElement.content);
    }
}