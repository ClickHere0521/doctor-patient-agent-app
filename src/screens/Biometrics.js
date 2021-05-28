import React, { useEffect, useState } from "react";
import {
  StyleSheet,
  Dimensions,
  ScrollView,
  Platform,
  Alert,
  Image
} from "react-native";
import { Block, Button, Input, Text, theme } from "galio-framework";
import { materialTheme } from "../constants/";
import { HeaderHeight } from "../constants/utils";
import { IMLocalized, init } from "../localization/IMLocalization";
import { useSelector } from "react-redux";
import ReactNativeBiometrics from 'react-native-biometrics'

const { width, height } = Dimensions.get("window");

const Biometrics = (props) => {
  const { navigation } = props;
  const { bioTypeProp } = props.route.params;
  const userRole = useSelector((state) => state.user.role);  
  const [bioType, setBioType] = useState('');

  useEffect(() => {
    setBioType(bioTypeProp);

    ReactNativeBiometrics.isSensorAvailable()
    .then((resultObject) => {
      const { available, biometryType } = resultObject
   
      if (available && biometryType === ReactNativeBiometrics.TouchID) {
        console.log('TouchID is supported')
      } else if (available && biometryType === ReactNativeBiometrics.FaceID) {
        console.log('FaceID is supported')
      } else if (available && biometryType === ReactNativeBiometrics.Biometrics) {
        console.log('Biometrics is supported')
      } else {
        console.log('Biometrics not supported')
      }
    })

    ReactNativeBiometrics.createKeys('WORKFORCE')
    .then((resultObject) => {
      const { publicKey } = resultObject
      console.log(publicKey)
      sendPublicKeyToServer(publicKey)
    });

    let epochTimeSeconds = Math.round((new Date()).getTime() / 1000).toString()
    let payload = epochTimeSeconds + 'some message'
    
    ReactNativeBiometrics.createSignature({
        promptMessage: 'Sign in',
        payload: payload
      })
      .then((resultObject) => {
        const { success, signature } = resultObject
    
        if (success) {
          console.log(signature)
          verifySignatureWithServer(signature, payload)
        }
      })

    ReactNativeBiometrics.simplePrompt({promptMessage: 'Confirm fingerprint'})
    .then((resultObject) => {
      const { success } = resultObject
    
      if (success) {
        navigation.replace("App");
      } else {
        console.log('user cancelled biometric prompt')
      }
    })
    .catch(() => {
      console.log('biometrics failed')
    }) 
  }, []);


  const gotoSignUp = () => {
    if (userRole != "agent") {
      return (
        <Block
          style={{ width: width, borderTopWidth: 1, borderColor: "white" }}
        >
          <Button
            size="large"
            color="transparent"
            shadowless
            onPress={() => navigation.navigate("Sign Up")}
          >
            <Block flexDirection="row" center middle>
              <Text center color={theme.COLORS.WHITE} size={16}>
                {"Don't have an account? SIGN UP "}
              </Text>
              <SvgUri
                width="36"
                height="36"
                source={require("../assets/icons/arrow-long-right.svg")}
              />
            </Block>
          </Button>
        </Block>
      );
    }
  };

  const signInBlock = () => {
    if (userRole == "agent") {
      return (
        <Block center style={{ marginBottom: theme.SIZES.BASE * 5 }}>
          <Text color="white">Sign In with Biometrics</Text>
        </Block>
      );
    } else {
      return (
        <Block center style={{ marginBottom: theme.SIZES.BASE }}>
          <Text color="white">Sign In with Biometrics</Text>
        </Block>
      );
    }
  };

  return (
    <ScrollView>
      <Block
        flex
        middle
        backgroundColor="rgba(139,147,248,1)"
        style={{ height: height }}
      >
        <Block flex>
          <Block
            flex
            flexDirection="row"
            style={{ marginTop: height * 0.05 }}
            center
          >
            <Image source={require("../assets/images/facial.png")} style={{ width: 50, height: 50 }}/>
            <Image source={require("../assets/images/finger.png")} style={{ marginLeft: theme.SIZES.BASE * 2, width: 50, height: 50 }}/>
          </Block>
          {signInBlock()}
        </Block>
        {gotoSignUp()}
      </Block>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  signin: {
    marginTop: Platform.OS === "android" ? -HeaderHeight : 0,
  },
  social: {
    width: theme.SIZES.BASE * 3.5,
    height: theme.SIZES.BASE * 3.5,
    borderRadius: theme.SIZES.BASE * 1.75,
    justifyContent: "center",
    shadowColor: "rgba(0, 0, 0, 0.3)",
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowRadius: 8,
    shadowOpacity: 1,
  },
  inputEmail: {
    width: width * 0.8,
    borderRadius: 0,
    borderBottomWidth: 1,
    borderBottomColor: materialTheme.COLORS.PLACEHOLDER,
    marginTop: theme.SIZES.BASE * 2,
  },
  inputPassword: {
    width: width * 0.8,
    borderRadius: 0,
    borderBottomWidth: 1,
    borderBottomColor: materialTheme.COLORS.PLACEHOLDER,
  },
  inputActive: {
    borderBottomColor: "white",
  },
  signInHeading: {
    paddingTop: theme.SIZES.BASE * 10,
  },
  signInBtn: {
    borderWidth: 2,
    borderRadius: 5,
    borderColor: "white",
    height: theme.SIZES.BASE * 3,
    width: width * 0.8,
    position: "relative",
  },
  checkboxContainer: {},
  label: {
    paddingLeft: theme.SIZES.BASE / 2,
    color: "white",
  },
});

export default Biometrics;
