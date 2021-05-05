import {request} from 'http';

import {ApiService} from './ApiService';
import auth from '@react-native-firebase/auth';
import db from '@react-native-firebase/firestore';
import {doc} from 'prettier';

export class UserService extends ApiService {
  // eslint-disable-next-line @typescript-eslint/ban-ts-ignore
  // @ts-ignore

  private serverURL = 'http://localhost:9081/';

  async getCurrentUser() {
    if (auth().currentUser === null) return;
    // auth().signOut();
    const currentUserID = auth().currentUser?.uid;
    console.log('current user =====' + currentUserID);

    return await db()
      .collection('users')
      .doc(currentUserID)
      .get()
      .then((resp) => {
        return resp.data() as User;
      });
  }

  async login(username: string, password: string) {
    return await auth()
      .signInWithEmailAndPassword(username, password)
      .then(async (resp) => {
        return await db()
          .collection('users')
          .doc(resp.user.uid)
          .get()
          .then((usr) => usr.data() as User);
      });
  }

  async signup(username: string, password: string, registerUser: User) {
    auth()
      .createUserWithEmailAndPassword(username, password)
      .then((data) => {
        const user: User = {
          id: data.user.uid,
          email: data.user.email ? data.user.email : '',
          phoneNumber: registerUser.phoneNumber,
          name: registerUser.name,
          surname: registerUser.surname,
          avatar: data.user.photoURL ? data.user.photoURL : '',
          tckn: registerUser.tckn,
          managedGroups: [],
          isSysAdmin: false,
        };
        return user;
      })
      .then(async (user: User) => {
        const resp = await db().collection('users').doc(user.id).set(user);
        console.log('asdsa');
        return resp;
      });
  }

  async signOut() {
    return await auth().signOut();
  }

  async update(user: User) {
    return await db().collection('users').doc(user.id).update(user);
    // return this.post(this.serverURL + 'profile/update?userID=' + user.id, user);
  }

  async exitGroup(group: Group, userID: string) {
    const members = group.members.filter((value) => value !== userID);
    const currentUsr = await this.getCurrentUser();

    if (group.id && currentUsr?.managedGroups.includes(group.id)) {
      return await db().collection('groups').doc(group.id).delete();
    }
    return await db()
      .collection('groups')
      .doc(group.id)
      .update({members: members});
  }

  async getAllUsers() {
    return await db()
      .collection('users')
      .get()
      .then((result) => result.docs.map((doc) => doc.data() as User));
  }
  getUsersOfGroup(memberIds: string[]) {
    db()
      .collection('users')
      .where('id', 'array-contains-any', memberIds)
      .get()
      .then((resp) => {
        resp.docs
          .map((doc) => doc.data() as User)
          .sort((u1, u2) => u1.name.localeCompare(u2.name));
      });
  }
}
