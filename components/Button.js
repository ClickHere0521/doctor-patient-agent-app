import React from 'react';
import { StyleSheet } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { Button, Text, theme } from 'galio-framework';

import materialTheme from '../constants/Theme';

const MKButton = props => {
  // const { gradient, children, style, ...props } = props;

  if (props.gradient) {
    return (
      <LinearGradient
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 0 }}
        locations={[0.2, 1]}
        style={[styles.gradient, props.style]}
        colors={[materialTheme.COLORS.GRADIENT_START, materialTheme.COLORS.GRADIENT_END]}
      >
        <Button color="transparent" style={[styles.gradient, props.Buttonstyle]} {...props}>
          <Text color={theme.COLORS.WHITE}>{props.children}</Text>
        </Button>
      </LinearGradient>
    );
  }

  return (
    <Button {...props}>{props.children}</Button>
  );
}

const styles = StyleSheet.create({
  gradient: {
    borderWidth: 0,
    borderRadius: theme.SIZES.BASE * 2,
  },
});

export default MKButton;