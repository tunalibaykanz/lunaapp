import React from 'react';
import {Button, Footer, FooterTab, Icon, Text} from 'native-base';

function AppFooter(appProps: AppProps) {
  // let screen = appProps.activeScreen;

  function switchScreen(value: number) {
    // console.log('clicked ' + value + ' activeScreen' + screen);
    appProps.onActivePageChange(value);
  }

  return (
    <>
      <Footer>
        <FooterTab>
          {/*<Button badge vertical>*/}
          {/*  <Badge>*/}
          {/*    <Text>2</Text>*/}
          {/*  </Badge>*/}
          {/*  <Icon name="apps" />*/}
          {/*  <Text>Apps</Text>*/}
          {/*</Button>*/}
          <Button vertical>
            <Icon name="news" type={'Entypo'} onPress={() => switchScreen(0)} />
            <Text>Haberler</Text>
          </Button>
          <Button active={false} vertical onPress={() => switchScreen(1)}>
            <Icon active name="poll-h" type={'FontAwesome5'} />
            <Text>Anketler</Text>
          </Button>
          <Button vertical onPress={() => switchScreen(2)}>
            <Icon name="group" type={'MaterialIcons'} />
            <Text>Gruplarim</Text>
          </Button>
          <Button vertical onPress={() => switchScreen(3)}>
            <Icon name="person" type={'MaterialIcons'} />
            <Text>Profilim</Text>
          </Button>
        </FooterTab>
      </Footer>
    </>
  );
}

interface AppProps {
  activeScreen?: number;
  onActivePageChange(active: number): void;
}

export default AppFooter;
