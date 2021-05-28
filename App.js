import React, {useEffect, useState} from 'react';
import {Platform, StatusBar, Image, LogBox, Text, View} from 'react-native';
import AppLoading from 'expo-app-loading';
import {Asset} from 'expo-asset';
import {Block, GalioProvider} from 'galio-framework';
import {NavigationContainer} from '@react-navigation/native';
import {PersistGate} from 'redux-persist/integration/react';
// Configure redux
import {Provider} from 'react-redux';
import {configureStore} from './src/store';
const {store, persistor} = configureStore();

// Before rendering any navigation stack
import {enableScreens} from 'react-native-screens';
enableScreens();

import Screens from './src/navigation/Screens';
import {Images, materialTheme} from './src/constants/';

LogBox.ignoreAllLogs();
const assetImages = [
  Images.Profile,
  Images.Avatar,
  Images.Onboarding,
  Images.Products.Auto,
  Images.Products.Motocycle,
  Images.Products.Watches,
  Images.Products.Makeup,
  Images.Products.Accessories,
  Images.Products.Fragrance,
  Images.Products.BMW,
  Images.Products.Mustang,
  Images.Products['Harley-Davidson'],
];

const cacheImages = images => {
  return images.map(image => {
    if (typeof image === 'string') {
      return Image.prefetch(image);
    } else {
      return Asset.fromModule(image).downloadAsync();
    }
  });
};

const App = props => {
  const [isLoadingComplete, setIsLoadingComplete] = useState(false);

  const _loadResourcesAsync = async () => {
    return Promise.all([...cacheImages(assetImages)]);
  };

  const _handleLoadingError = error => {
    // In this case, you might want to report the error to your error
    // reporting service, for example Sentry
    console.warn(error);
  };

  const _handleFinishLoading = () => {
    setIsLoadingComplete(true);
  };

  return (
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <NavigationContainer>
          <GalioProvider theme={materialTheme}>
            <Block flex>
              {Platform.OS === 'ios' && <StatusBar barStyle="default" />}
              <Screens />
            </Block>
          </GalioProvider>
        </NavigationContainer>
      </PersistGate>
    </Provider>
  );
};
export default App;
