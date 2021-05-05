import {ApiService} from './ApiService';
import db from '@react-native-firebase/firestore';
import {UserService} from './UserService';

export class GroupService extends ApiService {
  private userService = new UserService();
  async getUserGroups(userID: string) {
    const currentUser = await this.userService.getCurrentUser();

    const grpList = await db()
      .collection('groups')
      .get()
      .then((result) =>
        result.docs.map((res) => {
          const grp = res.data() as Group;
          grp.id = res.id;
          return grp;
        }),
      );
    if (currentUser && currentUser.isSysAdmin) return grpList;

    const retGrp = grpList.filter((grp: Group) => {
      return (
        grp.members.includes(userID) ||
        grp.specialUsers.includes(userID) ||
        grp.admin === userID
      );
    });

    console.log('');

    return retGrp;
  }
  async createGroup(group: Group) {
    const currentUser = await this.userService.getCurrentUser();
    if (!currentUser) return;
    return await db()
      .collection('groups')
      .add(group)
      .then((response) => {
        db().collection('groups').doc(response.id).update({
          id: response.id,
        });
        db()
          .collection('users')
          .doc(currentUser?.id)
          .update('managedGroups', [...currentUser.managedGroups, response.id]);
        db()
          .collection('users')
          .doc(group.admin)
          .update('managedGroups', db.FieldValue.arrayUnion(response.id));
      });
  }
}
