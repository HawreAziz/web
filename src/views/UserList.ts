import { CollectionView } from './CollectionView';
import { User, UserProps } from '../models/User';
import { UserEdit } from './UserEdit';


export class UserList extends CollectionView<User, UserProps> {
    renderItem(user: User, itemParent: Element): void {
        new UserEdit(itemParent, user).render();
    }
}