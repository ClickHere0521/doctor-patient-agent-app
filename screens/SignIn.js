import React, { useState } from 'react';
import { StyleSheet, Dimensions, KeyboardAvoidingView, Alert, Platform } from 'react-native';
import { Block, Button, Input, Text, theme } from 'galio-framework';

import { LinearGradient } from 'expo-linear-gradient';
import { materialTheme } from '../constants/';
import { HeaderHeight } from "../constants/utils";
import {IMLocalized, init} from '../src/localization/IMLocalization';

const { width, height } = Dimensions.get('window');

const SignIn = (props) => {
  
  const { navigation } = props;  

  const [vals, setVals] = useState({
    email: '-',
    password: '-',
    active: {
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

    setVals( active );
  }

  return (
    <LinearGradient
      start={{ x: 0, y: 0 }}
      end={{ x: 0.25, y: 1.1 }}
      locations={[0.2, 1]}
      colors={['#4E54C8', '#8F94FB']}
      style={[styles.signin, {flex: 1, paddingTop: theme.SIZES.BASE * 4}]}>
      <Block flex middle>
        <KeyboardAvoidingView behavior="padding" enabled>
          <Block middle style={{ paddingTop: theme.SIZES.BASE * 5, paddingHorizontal: width * 0.1 }}>
            <Text color="white" size={34} style={{alignSelf: 'flex-start', fontWeight: 'bold'}}>
              {IMLocalized('Workforce')}
            </Text>
            <Text color="white" size={34} style={{alignSelf: 'flex-start', fontWeight: 'bold'}}>
              {IMLocalized('Agent')}
            </Text>
          </Block>
          <Block flex>
            <Block center>
              <Input
                borderless
                color="white"
                placeholder="Email"
                type="email-address"
                autoCapitalize="none"
                bgColor='transparent'
                onBlur={() => toggleActive('email')}
                onFocus={() => toggleActive('email')}
                placeholderTextColor={materialTheme.COLORS.PLACEHOLDER}
                onChangeText={text => handleChange('email', text)}
                style={[styles.input, vals.email ? styles.inputActive : null]}
                
              />
              <Input
                password
                viewPass
                borderless
                color="white"
                iconColor="white"
                placeholder="Password"
                bgColor='transparent'
                onBlur={() => toggleActive('password')}
                onFocus={() => toggleActive('password')}
                placeholderTextColor={materialTheme.COLORS.PLACEHOLDER}
                onChangeText={text => handleChange('password', text)}
                style={[styles.input, vals.password ? styles.inputActive : null]}
              />

            </Block>
            <Block center flex style={{ marginTop: height * 0.1 }}>
              <Button size="large" color="transparent" shadowless onPress={() => navigation.navigate('Sign Up')}>
                <Text
                  center
                  color={theme.COLORS.WHITE}
                  size={theme.SIZES.FONT * 0.75}
                  style={{ marginTop: 20 }}
                >
                  {"Don't have an account? Sign Up"}
                </Text>
              </Button>
              <Button
                size="large"
                color={materialTheme.COLORS.BUTTON_COLOR}               
                style={{ height: 48, width: width * 0.8 }}
                onPress={() => Alert.alert('Sign in action',`Email: ${vals.email} Password: ${password}`,)}
              >
                SIGN IN
              </Button>
            </Block>
          </Block>
        </KeyboardAvoidingView>
      </Block>
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  signin: {        
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

export default SignIn;