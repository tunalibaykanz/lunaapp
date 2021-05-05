import {ApiService} from './ApiService';
import db from '@react-native-firebase/firestore';
import {UserService} from './UserService';
import {GroupService} from './GroupService';

export class PollService extends ApiService {
  private userService = new UserService();
  private groupService = new GroupService();
  async addPoll(poll: Poll) {
    const currentUser = await this.userService.getCurrentUser();
    if (!currentUser) return;

    if (currentUser.isSysAdmin) {
      poll.groupId = ['-1'];
    } else {
      poll.groupId = currentUser.managedGroups;
    }

    return await db()
      .collection('polls')
      .add(poll)
      .then((pollDetail) => {
        poll.pollQuestionList.forEach(async (question) => {
          const q = question;
          q.pollId = pollDetail.id;
          await db()
            .collection('pollQuestion')
            .add(q)
            .then((questionDetail) => {
              q.pollOptions.forEach(async (pollOption) => {
                const o = pollOption;
                o.pollID = pollDetail.id;
                o.questionID = questionDetail.id;
                await db().collection('pollOptions').add(o);
              });
            });
        });
      });
  }

  async getPollList() {
    const currentUser = await this.userService.getCurrentUser();
    if (!currentUser) return;

    const userGroupIds = (
      await this.groupService.getUserGroups(currentUser.id)
    ).map((grp) => grp.id);

    userGroupIds.push('-1');

    return db()
      .collection('polls')
      .where('groupId', 'array-contains-any', userGroupIds)
      .get()
      .then((resp) => {
        return resp.docs
          .map((p) => {
            const poll = p.data() as Poll;
            poll.id = p.id;
            return poll;
          })
          .sort((a, b) => b.endDate - a.endDate);
      });
  }

  async getPollDetail(pollID: string) {
    return await db()
      .collection('polls')
      .doc(pollID)
      .get()
      .then(async (resp) => {
        const p = resp.data() as Poll;
        p.pollQuestionList = await this.getPollQuestions(pollID);
        return p;
      });
  }

  async getPollQuestions(pollID: string) {
    const pollQuestions = await db()
      .collection('pollQuestion')
      .where('pollId', '==', pollID)
      .get()
      .then((questions) => {
        return questions.docs.map((q) => {
          const question = q.data() as PollQuestion;
          question.id = q.id;
          return question;
        });
      });

    const filledQuestions = pollQuestions.map(async (q) => {
      // eslint-disable-next-line @typescript-eslint/ban-ts-ignore
      // @ts-ignore
      q.pollOptions = await this.getQuestionOptions(pollID, q.id);
      return q;
    });

    return await Promise.all(filledQuestions);
  }

  async getQuestionOptions(pollID: string, questionID: string) {
    return await db()
      .collection('pollOptions')
      .where('questionID', '==', questionID)
      .get()
      .then((o) => {
        return o.docs.map((opt) => {
          const option = opt.data() as PollOption;
          option.id = opt.id;
          return option;
        });
      });
  }

  async votePoll(pollId: string, answers: PollQuestion[]) {
    const currentUser = await this.userService.getCurrentUser();
    answers.forEach((answer) => {
      answer.pollOptions
        .filter((value) => value.selected)
        .forEach((value) =>
          db()
            .collection('pollOptions')
            .doc(value.id)
            .update({
              rateCount: db.FieldValue.increment(1),
            }),
        );
    });

    return await db()
      .collection('polls')
      .doc(pollId)
      .update({
        attendeeIds: db.FieldValue.arrayUnion(currentUser?.id),
      })
      .catch((reason) => console.log('update error' + reason));
  }
}
