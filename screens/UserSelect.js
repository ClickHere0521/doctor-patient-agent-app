import React, { useEffect } from 'react';
import { ImageBackground, Image, StyleSheet, StatusBar, Dimensions, View } from 'react-native';
import { Block, Button, Text, theme } from 'galio-framework';
import { LinearGradient } from 'expo-linear-gradient';

const { height, width } = Dimensions.get('screen');

import materialTheme from '../constants/Theme';
import Images from '../constants/Images';
import {IMLocalized, init} from '../src/localization/IMLocalization';
import { Icon, Product } from '../components/';
import { useFonts } from 'expo-font';
import AppLoading from 'expo-app-loading';

const Onboarding = (props) => {
  const { navigation } = props;

  useEffect(() => {
    // Update the document title using the browser API
    init('en-US');
  }, []);
  let [fontsLoaded] = useFonts({
    'Inter-Black': require('../assets/fonts/LeagueSpartan-Bold.otf'),
  });
  if (!fontsLoaded) {
    return <AppLoading />;
  } else {
    return (
      <Block flex style={styles.container}>
        
        <Block middle style={{height: height / 1.8}}>
          <Image
            source={require('../assets/images/doctor.png')}
            style={{ height: height / 2.5, width: width / 1.2, zIndex: 1 , borderRadius: 30} }
          />
          <Block middle style={styles.roundBlock}>
            <Block style={{ marginBottom: theme.SIZES.BASE / 2, paddingHorizontal: theme.SIZES.BASE * 2, position: 'absolute', zIndex: 3 }} middle>
              <Block>
                <Image source={require('../assets/icons/cureBag.png')} style={{ height:theme.SIZES.BASE * 2, width: theme.SIZES.BASE * 2.2}}/>
              </Block>
              <Block row style={{marginTop: theme.SIZES.BASE}}>
                <Text color="white" size={34} style={{fontFamily: 'Inter-Black'}} bold>{IMLocalized('Workforce')}</Text>
              </Block>
            </Block>
          </Block>
        </Block>
        <Block flex={1} space="between" style={{marginTop: theme.SIZES.BASE * 5}}>
          <Block center style={{ paddingBottom: 30 }}>
            <Button
              shadowless
              style={styles.button}
              textStyle={{fontSize: 14, color: '#3F4079', fontWeight: 'bold'}}
              onPress={() => navigation.navigate('App')}>
              {IMLocalized('Workforce agent')}
            </Button>
            
            <Button
              shadowless
              style={styles.button}
              textStyle={{fontSize: 14, color: '#3082CC', fontWeight: 'bold'}}
              onPress={() => navigation.navigate('App')}>
              {IMLocalized('Patient')}
            </Button>
            
            <Button
              shadowless
              style={styles.button}
              textStyle={[styles.buttonTextStyle, {color: '#FF6B6B'}]}
              onPress={() => navigation.navigate('App')}>
              {IMLocalized('Primary Care Doctor')}
            </Button>
            
            <Text color="grey" size={10}>{IMLocalized('AgreeTerm')}</Text>

          </Block>
        </Block>
        <View style={styles.circle}/>
      </Block>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: "white",
  },
  button: {
    borderWidth: 1,
    borderColor: '#ECECEC',
    borderRadius : 25,
    width: width - theme.SIZES.BASE * 6,
    height: theme.SIZES.BASE * 3,
    shadowRadius: 2,
    shadowOpacity: 5,
    backgroundColor: 'white'
  },
  pro: {
    backgroundColor: materialTheme.COLORS.LABEL,
    paddingHorizontal: 8,
    marginLeft: 12,
    borderRadius: 2,
    height: 22
  },
  gradient: {
    zIndex: 1,
    position: 'absolute',
    top: 33 + theme.SIZES.BASE,
    left: 0,
    right: 0,
    height: 90,
  },
  circle: {
    width: theme.SIZES.BASE * 10,
    height: theme.SIZES.BASE * 10,
    backgroundColor: '#3946FF',
    position: 'absolute',
    borderRadius: 1000,
    right: -theme.SIZES.BASE * 5,
    bottom: -theme.SIZES.BASE * 8
  },
  roundBlock: {
    borderBottomLeftRadius: 34,
    borderBottomRightRadius: 34,
    position: 'absolute',
    backgroundColor: 'rgba(100, 120, 247, 0.84)',
    height: height / 1.8,
    width: width,
    zIndex: 2
  },
  backIcon: {
    position: 'absolute',
    zIndex: 100,
    width: theme.SIZES.BASE * 1.5,
    height: theme.SIZES.BASE * 1.5,
    left: theme.SIZES.BASE * 2,
    top: theme.SIZES.BASE * 5
  },
  buttonTextStyle: {
    fontSize: 14,
    fontWeight: 'bold',
  }
});

export default Onboarding;