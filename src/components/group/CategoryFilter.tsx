import {
  Body,
  CheckBox,
  Input,
  Item,
  Label,
  ListItem,
  Right,
  Switch,
  Text,
} from 'native-base';
import React, {FC, useState} from 'react';
import {FlatList} from 'react-native';

const RenderListItem: FC<{category: CategoryFilterType}> = ({
  category,
}: {
  category: CategoryFilterType;
}) => {
  const [isSelected, setSelected] = useState(category.isSelelcted);

  return (
    <ListItem key={category.label}>
      <CheckBox
        checked={isSelected}
        color="green"
        onPress={() => {
          category.isSelelcted = !isSelected;
          setSelected(!isSelected);
        }}
        style={{alignContent: 'center', paddingLeft: 0}}
      />
      <Body>
        <Text>{category.label}</Text>
      </Body>
    </ListItem>
  );
};

export const CategoryFilter: FC<{categoryItems: CategoryFilterType[]}> = ({
  categoryItems,
}: {
  categoryItems: Array<CategoryFilterType>;
}) => {
  return (
    <>
      <Item regular>
        <Input placeholder="Regular Textbox" />
      </Item>
      <FlatList
        style={{width: '100%', marginTop: 10}}
        data={categoryItems}
        renderItem={({item}: {item: CategoryFilterType}) => (
          <RenderListItem category={item} />
        )}
        keyExtractor={(item) => item.label}
      />
    </>
  );
};
