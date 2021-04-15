import React, { useState } from 'react';
import { Alert, Dimensions, StyleSheet, KeyboardAvoidingView, Platform } from 'react-native';

import { Block, Button, Input, Text, theme } from 'galio-framework';

import { LinearGradient } from 'expo-linear-gradient';
import { materialTheme } from '../constants/';
import { HeaderHeight } from "../constants/utils";
import {IMLocalized, init} from '../src/localization/IMLocalization';

const { height, width } = Dimensions.get('window');

const SignUp = (props) => {

  const { navigation } = props;

  const [vals, setVals] = useState({
    user: '-',
    email: '-',
    password: '-',
    active: {
      user: false,
      email: false,
      password: false,
    }
  });

  const handleChange = (name, value) => {
    setVals({ [name]: value });
  }

  const toggleActive = (name) => {
    const { active } = vals;
    active[name] = !active[name];

    setVals({ active });
  }

  return (
    <LinearGradient
      start={{ x: 0, y: 0 }}
      end={{ x: 0.25, y: 1.1 }}
      locations={[0.2, 1]}
      colors={['#4E54C8', '#8F94FB']}
      style={[styles.signup, { flex: 1, paddingTop: theme.SIZES.BASE * 4 }]}>
      <Block flex middle>
        <KeyboardAvoidingView behavior={Platform.OS === "ios" ? "padding" : "position"} enabled keyboardVerticalOffset={0}> 
          <Block middle style={{ paddingTop: theme.SIZES.BASE * 5, paddingHorizontal: width * 0.1 }}>
            <Text color="white" size={34} style={{alignSelf: 'flex-start', fontWeight: 'bold'}}>
              {IMLocalized('Welcome')}
            </Text>
          </Block>
          <Block flex={1} center space="between">
            <Block center>
              <Input
                bgColor='transparent'
                placeholderTextColor={materialTheme.COLORS.PLACEHOLDER}
                borderless
                color="white"
                placeholder="Username"
                autoCapitalize="none"
                style={[styles.input, vals.user ? styles.inputActive : null]}
                onChangeText={text => handleChange('user', text)}
                onBlur={() => toggleActive('user')}
                onFocus={() => toggleActive('user')}
              />
              <Input
                bgColor='transparent'
                placeholderTextColor={materialTheme.COLORS.PLACEHOLDER}
                borderless
                color="white"
                type="email-address"
                placeholder="Email"
                autoCapitalize="none"
                style={[styles.input, vals.email ? styles.inputActive : null]}
                onChangeText={text => handleChange('email', text)}
                onBlur={() => toggleActive('email')}
                onFocus={() => toggleActive('email')}
              />
              <Input
                bgColor='transparent'
                placeholderTextColor={materialTheme.COLORS.PLACEHOLDER}
                borderless
                color="white"
                password
                viewPass
                placeholder="Password"
                iconColor="white"
                style={[styles.input, vals.password ? styles.inputActive : null]}
                onChangeText={text => handleChange('password', text)}
                onBlur={() => toggleActive('password')}
                onFocus={() => toggleActive('password')}
              />
            </Block>
            <Block flex center style={{ marginTop: 20, width: width * 0.8 }}>
              <Button
              size="large"
                shadowless
                style={{ height: 48 }}
                color={materialTheme.COLORS.BUTTON_COLOR}
              >
                SIGN UP
              </Button>
              <Button size="large" color="transparent" shadowless onPress={() => navigation.navigate('Sign In')}>
                <Text center color={theme.COLORS.WHITE} size={theme.SIZES.FONT * 0.75}>
                  Already have an account? Sign In
                </Text>
              </Button>
            </Block>
          </Block>
        </KeyboardAvoidingView>
      </Block>
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  signup: {
    marginTop: Platform.OS === 'android' ? -HeaderHeight : 0,
  },
  social: {
    width: theme.SIZES.BASE * 3.5,
    height: theme.SIZES.BASE * 3.5,
    borderRadius: theme.SIZES.BASE * 1.75,
    justifyContent: 'center',
    shadowColor: 'rgba(0, 0, 0, 0.3)',
    shadowOffset: {
      width: 0,
      height: 4
    },
    shadowRadius: 8,
    shadowOpacity: 1
  },
  input: {
    width: width * 0.8,
    borderRadius: 0,
    borderBottomWidth: 1,
    borderBottomColor: materialTheme.COLORS.PLACEHOLDER,
  },
  inputActive: {
    borderBottomColor: "white",
  },
});

export default SignUp;