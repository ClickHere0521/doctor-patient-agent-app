import React, { useEffect, useState } from 'react';
import * as Font from 'expo-font';
import { createIconSetFromIcoMoon } from '@expo/vector-icons';
import { Icon } from 'galio-framework';

import GalioConfig from '../assets/fonts/galioExtra';
const GalioExtra = require('../assets/fonts/Roboto-Regular.ttf');
const IconGalioExtra = createIconSetFromIcoMoon(GalioConfig, 'GalioExtra');

const IconExtra = props => {

  const { name, family, ...rest } = props;
  const [fontLoaded, setFontLoaded] = useState(false);

  useEffect(() => {
    try{
      Font.loadAsync({ GalioExtra: GalioExtra });
    } catch (err) {

    }
    setFontLoaded(true);
  });
  
  if (name && family && fontLoaded) {
    if (family === 'GalioExtra') {
      return <IconGalioExtra name={name} family={family} {...rest} />;
    }
    return <Icon name={name} family={family} {...rest} />;
  }

  return null;
}

export default IconExtra;