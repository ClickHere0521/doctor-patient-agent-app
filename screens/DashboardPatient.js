import React, { useState } from 'react';
import {
  ScrollView,
  StyleSheet,
  TouchableOpacity,
  TouchableWithoutFeedback,
  Image,
  ImageBackground,
  Dimensions
} from 'react-native';
import { Button, Block, Text, Input, theme } from 'galio-framework';

import { materialTheme, products, Images, tabs } from '../constants';
import { Select, Icon, Header, Product, Switch, Tabs, HorizontalListItem } from '../components';
import SwitchButton from 'switch-button-react-native';

const { width } = Dimensions.get('screen');

const thumbMeasure = (width - 48 - 32) / 3;
const cardWidth = width - (theme.SIZES.BASE * 2);

const Components = (props) => {

  const [ activeSwitch, setActiveSwitch ] = useState(null);

  const firstTimeCheck = () => {
    return (
      <Block flex flexDirection="row" center middle style={{marginTop: theme.SIZES.BASE * 2}}>
        <Text size={12} color='grey'>Are you using our app for the first time？</Text>
        <SwitchButton
            onValueChange={(val) => setActiveSwitch(val)}      // this is necessary for this component
            text1 = 'Yes'                        // optional: first text in switch button --- default ON
            text2 = 'No'                       // optional: second text in switch button --- default OFF
            switchWidth = {100}                 // optional: switch width --- default 44
            switchHeight = {40}                 // optional: switch height --- default 100
            switchDirection = 'rtl'             // optional: switch button direction ( ltr and rtl ) --- default ltr
            switchBorderRadius = {100}          // optional: switch border radius --- default oval
            switchSpeedChange = {500}           // optional: button change speed --- default 100
            switchBorderColor = '#3B3E51'       // optional: switch border color --- default #d4d4d4
            switchBackgroundColor = '#fff'      // optional: switch background color --- default #fff
            btnBorderColor = '#3B3E51'          // optional: button border color --- default #00a4b9
            btnBackgroundColor = '#3B3E51'      // optional: button background color --- default #00bcd4
            fontColor = '#3B3E51'               // optional: text font color --- default #b1b1b1
            activeFontColor = '#fff'            // optional: active font color --- default #fff
          />
      </Block>
    )
  }
  const typeIcons = () => {
    return (
        <Block flex flexDirection={'row'} style={[styles.navbarBtnGroup]}>
          <Block flexDirection={'column'} style={[styles.navbarBtn]} center>
            <Block center middle style={[styles.imageBtn]}>
              <Image source={require('../assets/icons/microscope.png')} style={{ width: theme.SIZES.BASE * 2.5, height: theme.SIZES.BASE * 3 }}/>
            </Block>
            <Block center style={{width: theme.SIZES.BASE * 6}}>
              <Text size={17} center color={'#000'} >Doctor</Text>
              <Text size={14} muted color={'#000'} center>Search doctor around you</Text>
            </Block>
          </Block>
          <Block flexDirection={'column'} style={[styles.navbarBtn]} center>
            <Block center middle style={[styles.imageBtn]}>
              <>{(activeSwitch)?(
                <Image shadow source={require('../assets/icons/status.png')} style={{ width: theme.SIZES.BASE * 2.4, height: theme.SIZES.BASE * 2.5}}/>
              ):(
                <Image shadow source={require('../assets/icons/group.png')} style={{ width: theme.SIZES.BASE * 2.4, height: theme.SIZES.BASE * 2.5}}/>
              )}</>
            </Block>
            <Block center style={{width: theme.SIZES.BASE * 6}}>
              <Text size={17} center color={'#000'} >Medicines</Text>
              <Text size={14} muted color={'#000'} center>Order Medicine to home</Text>
            </Block>
          </Block>
          <Block flexDirection={'column'} style={[styles.navbarBtn]} center>
            <Block center middle style={[styles.imageBtn]}>
            <Image source={require('../assets/icons/nurse.png')} style={{ width: theme.SIZES.BASE * 3.5, height: theme.SIZES.BASE * 2.5 }}/>
            </Block>
            <Block center style={{width: theme.SIZES.BASE * 6}}>
              <Text size={17} center color={'#000'} >Digonostic</Text>
              <Text size={14} muted color={'#000'} center>Book test at Doorstep</Text>
            </Block>
          </Block>
        </Block>
    );
  }
  
  const renderCards = () => {
    return (
      <Block flex style={styles.group}>
        <Block flex>
          <Block style={{ paddingHorizontal: theme.SIZES.BASE }}>
            <ScrollView horizontal={true} showsHorizontalScrollIndicator={false}>
                <Block flex card shadow style={[styles.category]}>
                    <ImageBackground
                        source={{ uri: Images.Products['Accessories'] }}
                        style={[styles.imageBlock]}
                        imageStyle={{ width: width - (theme.SIZES.BASE * 2), height: 200 }}>
                        <Block style={styles.categoryTitle}>
                        <Text size={18} bold color={theme.COLORS.WHITE}>Accessories</Text>
                        </Block>
                    </ImageBackground>
                </Block>
                <Block flex card shadow style={styles.category}>
                    <ImageBackground
                        source={{ uri: Images.Products['Makeup'] }}
                        style={[styles.imageBlock]}
                        imageStyle={{ width: width - (theme.SIZES.BASE * 2), height: 200 }}>
                        <Block style={styles.categoryTitle}>
                        <Text size={18} bold color={theme.COLORS.WHITE}>Makeup</Text>
                        </Block>
                    </ImageBackground>
                </Block>
                <Block flex card shadow style={styles.category}>
                    <ImageBackground
                        source={{ uri: Images.Products['Harley-Davidson'] }}
                        style={[styles.imageBlock]}
                        imageStyle={{ width: width - (theme.SIZES.BASE * 2), height: 200 }}>
                        <Block style={styles.categoryTitle}>
                        <Text size={18} bold color={theme.COLORS.WHITE}>Harley-Davidson</Text>
                        </Block>
                    </ImageBackground>
                </Block>
            </ScrollView>
            <Text color={'#3F4079'} bold size={17} style={styles.marginV2Base}>Doctors near by you</Text>
            <ScrollView horizontal={true} showsHorizontalScrollIndicator={false}>
                <Block flex row>
                        <HorizontalListItem product={products[1]} style={styles.marginRBase} />
                        <HorizontalListItem product={products[2]} />
                        <HorizontalListItem product={products[3]} />
                        <HorizontalListItem product={products[4]} />
                </Block>
            </ScrollView>
          </Block>
        </Block>
      </Block>
    )
  }

  return (
    <Block flex>
      <ScrollView
        style={styles.components}
        showsVerticalScrollIndicator={false}> 
        {firstTimeCheck()}
        {typeIcons()}
        {renderCards()}
      </ScrollView>
    </Block>
  );
}

const styles = StyleSheet.create({
  marginV2Base: {
    marginVertical: theme.SIZES.BASE * 2
  },
  marginRBase: {
    marginRight: theme.SIZES.BASE
  },
  imageBtn: {
    width: theme.SIZES.BASE * 5,
    height: theme.SIZES.BASE * 5,
    borderRadius: 1000,
    backgroundColor: 'white',
    shadowColor: 'black',
    shadowOffset: { width: 5, height: 10 },
    shadowRadius: 10,
    shadowOpacity: 0.5,
    elevation: 8,

  },
  navbarBtn: {
    width: theme.SIZES.BASE * 5,
    height: theme.SIZES.BASE * 5,
    padding: theme.SIZES.BASE,
    borderColor: 'white',
    marginLeft: theme.SIZES.BASE * 3,
  },
  components: {
    marginBottom: theme.SIZES.BASE,
    backgroundColor: 'white',
  },
  title: {
    paddingVertical: theme.SIZES.BASE,
    paddingHorizontal: theme.SIZES.BASE * 2,
  },
  group: {
    paddingTop: theme.SIZES.BASE * 3.75,
  },
  navbar: {
    borderBottomLeftRadius: 24,
    borderBottomRightRadius: 24,
    backgroundColor: '#6E78F7',
    padding: 0,
    height: theme.SIZES.BASE * 10,
  },
  navbarBtnGroup: {
    marginTop: theme.SIZES.BASE * 1.5,
    marginBottom: theme.SIZES.BASE * 2,
  },
  shadow: {
    shadowColor: 'black',
    shadowOffset: { width: 0, height: 0 },
    shadowRadius: 4,
    shadowOpacity: 0.4,
    elevation: 3,
  },
  imageBlock: {
    width: width - (theme.SIZES.BASE * 2),
    height: 200,
    overflow: 'hidden',
    borderRadius: 4,
  },
  rows: {
    height: theme.SIZES.BASE * 2,
  },
  category: {
    backgroundColor: theme.COLORS.WHITE,
    marginVertical: theme.SIZES.BASE / 2,
    borderWidth: 0,
    paddingRight: theme.SIZES.BASE,
  },
  categoryTitle: {
    height: '100%',
    paddingHorizontal: theme.SIZES.BASE,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default Components;