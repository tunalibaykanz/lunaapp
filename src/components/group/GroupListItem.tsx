import React, {ReactElement} from 'react';
import {Body, Icon, Left, ListItem, Right, Text, Thumbnail} from 'native-base';

type GroupListItemType = {
  group: Group;
  profile: User;
};

const GroupListItem: React.FC<GroupListItemType> = ({
  group,
  profile,
}: {
  group: Group;
  profile: User;
}): ReactElement => {
  return (
    <ListItem
      style={{backgroundColor: 'white'}}
      thumbnail
      noBorder
      key={profile.id}>
      <Left>
        <Thumbnail
          square
          source={
            group.logo.length > 0
              ? {uri: group.logo}
              : require('../../images/ODemocrasiLogo.png')
          }
          style={{resizeMode: 'contain'}}
        />
      </Left>
      <Body>
        <Text>{group.title}</Text>
      </Body>
      <Right>
        {group.members.includes(profile.id) ? (
          <Icon
            name={'user'}
            type={'FontAwesome5'}
            style={{fontSize: 24, color: 'orange'}}
          />
        ) : (
          <Icon
            name={'user-tie'}
            type={'FontAwesome5'}
            style={{fontSize: 24, color: 'orange'}}
          />
        )}
      </Right>
    </ListItem>
  );
};
export default GroupListItem;
