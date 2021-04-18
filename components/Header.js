import React from 'react';
import { withNavigation } from '@react-navigation/compat';
import { TouchableOpacity, StyleSheet, Platform, Dimensions, Keyboard } from 'react-native';
import { Button, Block, NavBar, Input, Text, theme } from 'galio-framework';

import Icon from './Icon';
import materialTheme from '../constants/Theme';
import Tabs from './Tabs';
import {IMLocalized, init} from '../src/localization/IMLocalization';

const { height, width } = Dimensions.get('window');
const iPhoneX = () => Platform.OS === 'ios' && (height === 812 || width === 812 || height === 896 || width === 896);

const ChatButton = ({isWhite, style, navigation}) => (
  <TouchableOpacity style={[styles.button, style]} onPress={() => navigation.navigate('Chat')}>
    <Icon
      family="GalioExtra"
      size={16}
      name="chat-33"
      color={theme.COLORS[isWhite ? 'WHITE' : 'ICON']}
    />
    <Block middle style={styles.notify} />
  </TouchableOpacity>
);

const BasketButton = ({isWhite, style, navigation}) => (
  <TouchableOpacity style={[styles.button, style]} onPress={() => navigation.navigate('Cart')}>
    <Icon
      family="GalioExtra"
      size={16}
      name="basket-simple"
      color={theme.COLORS[isWhite ? 'WHITE' : 'ICON']}
    />
    <Block middle style={styles.notify} />
  </TouchableOpacity>
);

const SearchButton = ({isWhite, style, navigation}) => (
  <TouchableOpacity style={[styles.button, style]} onPress={() => navigation.navigate('Search')}>
    <Icon
      size={16}
      family="entypo"
      name="magnifying-glass"
      color={theme.COLORS[isWhite ? 'WHITE' : 'ICON']}
    />
  </TouchableOpacity>
);

const AddButton = ({isWhite, style, navigation}) => (
  <TouchableOpacity style={[styles.button, style]} onPress={() => navigation.navigate('Add')}>
    <Icon
      family="font-awesome"
      size={18}
      name="plus"
      color={theme.COLORS[isWhite ? 'WHITE' : 'ICON']}
    />
  </TouchableOpacity>
);

const EditButton = ({isWhite, style, navigation}) => (
  <TouchableOpacity style={[styles.button, style]} onPress={() => navigation.navigate('Edit')}>
    <Icon
      family="font-awesome"
      size={18}
      name="edit"
      color={theme.COLORS[isWhite ? 'WHITE' : 'ICON']}
    />
  </TouchableOpacity>
);

const RemoveButton = ({isWhite, style, navigation}) => (
  <TouchableOpacity style={[styles.button, style]} onPress={() => navigation.navigate('Edit')}>
    <Icon
      family="font-awesome"
      size={18}
      name="trash"
      color={theme.COLORS[isWhite ? 'WHITE' : 'ICON']}
    />
  </TouchableOpacity>
);

const Header = (props) => {

  const { back, title, white, transparent, navigation, scene } = props;    
  // const { routeName } = navigation.state;
  // const { options } = scene.descriptor;
  // const routeName = scene.descriptor?.options.headerTitle ?? '';  
  const noShadow = ["Search", "Profile"].includes(title);
  const headerStyles = [
    !noShadow ? styles.shadow : null,
    transparent ? { backgroundColor: 'rgba(0,0,0,0)' } : null,
  ];

  if(title == "DoctorDetail") return(
    <>
    </>
  );

  const handleLeftPress = () => {
    const { back, navigation } = props;
    if (back)
      navigation.goBack();
      else
        navigation.openDrawer();
    // return (back ? navigation.goBack() : navigation.openDrawer());
  }

  const renderRight = () => {
    const { white, title, navigation, scene } = props;
    // const { options } = scene.descriptor;
    // const routeName = options.headerTitle; // wip

    if (title ===  'Title') {
      return ([
        <ChatButton key='chat-search' navigation={navigation} isWhite={white} />,
        <BasketButton key='basket-search' navigation={navigation} isWhite={white} />
      ]);
    }

    switch (title) {
      case 'About':
      case 'Agreement':
      case 'Cart':
      case 'Categories':
      case 'Category':
      case 'Deals':
      case 'Home':
      case 'Woman':
      case 'Man':
      case 'Case View':
      case 'Primary Care Doctor View':
        return ([
          <AddButton key='addCase' navigation={navigation} isWhite={white} />,
          <EditButton key='editCase' navigation={navigation} isWhite={white} />,
          <RemoveButton key='removeCase' navigation={navigation} isWhite={white} />
        ]);
      case 'Kids':
      case 'Schedule View':
        return ([
          <AddButton key='addCase' navigation={navigation} isWhite={white} />,
          <EditButton key='editCase' navigation={navigation} isWhite={white} />,
          <RemoveButton key='removeCase' navigation={navigation} isWhite={white} />
        ]);
      case 'NewCollection':
      case 'Notifications':
      case 'Privacy':
      case 'Profile':
      case 'Search':
      case 'Settings':
        return ([
          <ChatButton key='chat-search' navigation={navigation} isWhite={white} />,
          <BasketButton key='basket-search' navigation={navigation} isWhite={white} />
        ]);
      case 'Product':
        return ([
          <SearchButton key='search-product' navigation={navigation} isWhite={white} />,
          <BasketButton key='basket-product' navigation={navigation} isWhite={white} />
        ]);
      default:
        break;
    }
  }

  const renderSearch = () => {
    const { navigation } = props;
    return (
      <Input
        right
        color="black"
        style={styles.search}
        placeholder="What are you looking for?"
        onFocus={() => {Keyboard.dismiss(); navigation.navigate('Search');}}
        iconContent={<Icon size={16} color={theme.COLORS.MUTED} name="magnifying-glass" family="entypo" />}
      />
    )
  }

  const renderOptions = () => {
    const { navigation, optionLeft, optionRight } = props;

    return (
      <Block row style={styles.tabs}>
        <Button shadowless style={[styles.tab, styles.divider]} onPress={() => navigation.navigate('Categories')}>
          <Block row middle>
            <Icon name="grid" family="feather" style={{ paddingRight: 8 }} />
            <Text size={16} style={styles.tabTitle}>{optionLeft || 'Categories'}</Text>
          </Block>
        </Button>
        <Button shadowless style={styles.tab} onPress={() => navigation.navigate('Deals')}>
          <Block row middle>
            <Icon size={16} name="camera-18" family="GalioExtra" style={{ paddingRight: 8 }} />
            <Text size={16} style={styles.tabTitle}>{optionRight || 'Best Deals'}</Text>
          </Block>
        </Button>
      </Block>
    )
  }

  const renderTabs = () => {
    const { tabs, tabIndex, navigation } = props;
    const defaultTab = tabs && tabs[0] && tabs[0].id;
    
    if (!tabs) return null;

    return (
      <Tabs
        data={tabs || []}
        initialIndex={tabIndex || defaultTab}
        onChange={
          id => navigation.setParams({ tabId: id })
        } 
      />
    )
  }

  const renderHeader = () => {
    const { search, tabs, options } = props;
    if (search || tabs || options) {
      return (
        <Block center>
          {search ? renderSearch() : null}
          {options ? renderOptions() : null}
          {tabs ? renderTabs() : null}
        </Block>
      )
    }
    return null;
  }

  return (
    <Block style={headerStyles}>
      <NavBar
        back={back}
        title={IMLocalized(title)}
        style={styles.navbar}
        transparent={transparent}
        right={renderRight()}
        rightStyle={{ alignItems: 'center' }}
        leftStyle={{ paddingTop: 3, flex: 0.3 }}
        leftIconName={back ? null : "navicon"}
        // leftIconFamily="font-awesome"
        leftIconColor={white ? theme.COLORS.WHITE : theme.COLORS.ICON}
        titleStyle={[
          styles.title,
          { color: theme.COLORS[white ? 'WHITE' : 'ICON'] },
        ]}
        onLeftPress={handleLeftPress}
      />
      {renderHeader()}
    </Block>
  );
}

const styles = StyleSheet.create({
  button: {
    padding: 12,
    position: 'relative',
  },
  title: {
    width: '100%',
    fontSize: 16,
    fontWeight: 'bold',
  },
  navbar: {
    paddingVertical: 0,
    paddingBottom: theme.SIZES.BASE * 1.5,
    paddingTop: iPhoneX ? theme.SIZES.BASE * 4 : theme.SIZES.BASE,
    zIndex: 5,
  },
  shadow: {
    backgroundColor: theme.COLORS.WHITE,
    shadowColor: 'black',
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 6,
    shadowOpacity: 0.2,
    elevation: 3,
  },
  notify: {
    backgroundColor: materialTheme.COLORS.LABEL,
    borderRadius: 4,
    height: theme.SIZES.BASE / 2,
    width: theme.SIZES.BASE / 2,
    position: 'absolute',
    top: 8,
    right: 8,
  },
  header: {
    backgroundColor: theme.COLORS.WHITE,
  },
  divider: {
    borderRightWidth: 0.3,
    borderRightColor: theme.COLORS.MUTED,
  },
  search: {
    height: 48,
    width: width - 32,
    marginHorizontal: 16,
    borderWidth: 1,
    borderRadius: 3,
  },
  tabs: {
    marginBottom: 24,
    marginTop: 10,
  },
  tab: {
    backgroundColor: theme.COLORS.TRANSPARENT,
    width: width * 0.50,
    borderRadius: 0,
    borderWidth: 0,
    height: 24,
    elevation: 0,
  },
  tabTitle: {
    lineHeight: 19,
    fontWeight: '300'
  },
});

export default withNavigation(Header);