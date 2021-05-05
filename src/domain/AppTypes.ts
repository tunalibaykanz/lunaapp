// eslint-disable-next-line @typescript-eslint/ban-ts-ignore
// @ts-ignore

type User = {
  id: string;
  email: string;
  phoneNumber: string;
  name: string;
  surname: string;
  tckn: string;
  avatar: string;
  managedGroups: string[];
  isSysAdmin: boolean;
};

type News = {
  id?: string;
  title: string;
  image?: string;
  readCount: number;
  detail: string;
  groups?: string[];
  createDate: number;
};

type Poll = {
  id?: string;
  groupId: string[];
  title: string;
  detail: string;
  attendeeIds: string[];
  pollQuestionList: PollQuestion[];
  startDate: number;
  endDate: number;
  publishDate: number;
};
type PollQuestion = {
  id?: string;
  title: string;
  type: string;
  pollOptions: PollOption[];
  pollId: string;
};
type PollOption = {
  id?: string;
  title: string;
  selected?: boolean;
  rateCount?: number;
  pollID: string;
  questionID: string;
};
type Group = {
  id?: string;
  title: string;
  logo: string;
  admin: string;
  specialUsers: string[];
  members: string[];
  types: string[];
};
type AccordionType = {
  title: object;
  content: object;
};

type GroupDetailSectionModel = {
  header: string;
  data: {
    id: string;
    image: string;
    name: string;
  }[];
  listRetriever: string;
  type: number;
};

type DDItemType = {
  label: any;
  value: any;
  icon?: () => Element;
  data?: any;
  disabled?: boolean;
  selected?: boolean;
};
type FilterGroupMember = {
  user: User;
  isMemeber: boolean;
  isSpecial: boolean;
};
type CategoryFilterType = {
  label: string;
  isSelelcted: boolean;
};
