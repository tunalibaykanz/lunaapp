import {ApiService} from './ApiService';
import auth from '@react-native-firebase/auth';
import db from '@react-native-firebase/firestore';
import {UserService} from './UserService';
import {reset} from 'react-native-svg/lib/typescript/lib/Matrix2D';
import {doc} from 'prettier';
import {GroupService} from './GroupService';

export class NewsService extends ApiService {
  private userService = new UserService();
  private groupService = new GroupService();

  async getNews(): Promise<News[]> {
    // const collection = 'users';
    // db()
    //   .collection(collection)
    //   .get()
    //   .then((res) => {
    //     res.docs.forEach((document) => {
    //       db().collection(collection).doc(document.id).delete();
    //     });
    //   });

    const currentUser = await this.userService.getCurrentUser();
    if (!currentUser) return [];
    const userGroupIds = (
      await this.groupService.getUserGroups(currentUser?.id)
    ).map((grp) => grp.id);

    const groupIds = userGroupIds.concat('-1');
    console.log('user group Ids' + userGroupIds);
    return db()
      .collection('news')
      .where('groups', 'array-contains-any', groupIds)
      .get()
      .then((value) =>
        value.docs
          .map((doc) => {
            const news = doc.data() as News;
            news.id = doc.id;
            return news;
          })
          .sort((a, b) => b.createDate - a.createDate),
      );
  }
  async addNews(news: News) {
    const currentUser = await this.userService.getCurrentUser();
    const newsWithGroups: News = {
      ...news,
      groups: currentUser?.isSysAdmin ? ['-1'] : currentUser?.managedGroups,
    };
    return db().collection('news').add(newsWithGroups);
  }

  updateReadCount(newsID: string) {
    db()
      .collection('news')
      .doc(newsID)
      .update({
        readCount: db.FieldValue.increment(1),
      });
  }
}
