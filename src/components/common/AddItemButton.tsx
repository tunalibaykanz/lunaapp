import React, {FC, ReactElement} from 'react';
import {Body, Button, ListItem, Text} from 'native-base';
import {useProfile} from '../../context/profile';

function shouldShowButton(user: User, title: string) {
  if (user.isSysAdmin) return true;

  return (
    user.managedGroups !== undefined &&
    user.managedGroups.length > 0 &&
    title.indexOf('Group') < 0
  );
}

const AddItemButton: FC<{
  onClick: () => void;
  title: string;
}> = ({onClick, title}: {onClick: () => void; title: string}): ReactElement => {
  const {profile} = useProfile();
  const crrUSer: User = profile.user;
  const displayValue = shouldShowButton(crrUSer, title) ? 'flex' : 'none';
  return (
    <ListItem
      thumbnail
      style={{
        marginTop: 5,
        marginLeft: 0,
        display: displayValue,
      }}>
      <Body>
        <Button info bordered style={{alignSelf: 'center'}} onPress={onClick}>
          <Text> {title} </Text>
        </Button>
      </Body>
    </ListItem>
  );
};

export default AddItemButton;
