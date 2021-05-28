import React, { useEffect } from 'react';
import { View, Image,Platform } from 'react-native';
import { useSelector } from 'react-redux';
import { IMLocalized, init } from "../localization/IMLocalization";
import Splash from 'react-native-splash-screen';

const SplashScreen = (props) => {
  const setLang = useSelector(({ language }) => language.language);

  useEffect(() => {
    console.log("lang->>>" + setLang);
    // Update the document title using the browser API
    init(setLang);
  }, [setLang]);

  useEffect(() => {
    const { navigation } = props;
    if (Platform.OS === 'android') {
      Splash.hide();
    }
    setTimeout(() => {
      navigation.navigate('UserSelectStack');
    }, 3000);
  }, []);

  return (
    <View>
      <Image source={require("../assets/images/splash.png")} style={{width: '100%', height: '100%'}}/>
    </View>
  );
}

export default SplashScreen;
