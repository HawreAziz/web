import { UserList } from './views/UserList';
import { User } from './models/User';



const collection = User.buildCollection();

collection.on('change', () => {
    const root = document.getElementById('root');
    if (root) {
        new UserList(root, collection).render();
    }
});

collection.fetch();


