import React, { useEffect, useState } from "react";
import {
  StyleSheet,
  Dimensions,
  ScrollView,
  Platform,
  TouchableOpacity,
  Alert,
} from "react-native";
import { Block, Button, Text, theme } from "galio-framework";
import { materialTheme } from "../constants/";
import { HeaderHeight } from "../constants/utils";
import { IMLocalized, init } from "../localization/IMLocalization";
import { useSelector } from "react-redux";
import { CheckBox } from "react-native-elements";
import { isValid } from "../utils/helpers";
import Input from "../components/InputType1";
import AsyncStorage from '@react-native-community/async-storage';
import auth from '@react-native-firebase/auth';
import firestore from "@react-native-firebase/firestore";

const { width, height } = Dimensions.get("window");

const SignIn = (props) => {
  const { navigation } = props;
  const userRole = useSelector((state) => state.user.role);

  const [isSelected, setSelected] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [requested, setRequested] = useState(false);
  const validemail = isValid("email", email);
  const validPassword = isValid("password", password);

  const SignInHeading = (role) => {
    switch (role) {
      case "agent":
        return (
          <Block middle style={styles.signInHeading}>
            <Text
              bold
              color="white"
              size={40}
              style={{ alignSelf: "flex-start" }}
            >
              {IMLocalized("agent")}
            </Text>
          </Block>
        );
      case "patient":
        return (
          <Block middle style={styles.signInHeading}>
            <Text
              bold
              color="white"
              size={34}
              style={{ alignSelf: "flex-start" }}
            >
              {IMLocalized("patient")}
            </Text>
          </Block>
        );
      case "doctor":
        return (
          <Block middle style={styles.signInHeading}>
            <Text
              bold
              color="white"
              size={34}
              style={{ alignSelf: "flex-start" }}
            >
              {IMLocalized("doctor")}
            </Text>
          </Block>
        );
      default:
        break;
    }
  };

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
            </Block>
          </Button>
        </Block>
      );
    }
  };

  const handleSignIn = () => {
    var tmpBio;
    
    auth().signInWithEmailAndPassword(email, password)
      .then(async (res) => {
        if (isSelected) 
          await AsyncStorage.setItem(
              'reminder',
              JSON.stringify({ reminder: true }),
              () => {}
            )
        else 
          await AsyncStorage.setItem(
            'reminder',
            JSON.stringify({ reminder: false }),
            () => {}
          )  
        
        firestore().collection('Users').doc(res.user.uid).get().then((query) => {
          if (userRole == query.data().role) {
            switch (query.data().role) {
              case 'agent': 
                AsyncStorage.getItem(
                  'bio',
                  (err, result) => {
                    tmpBio = JSON.parse(result);
                    if (!tmpBio) 
                      navigation.replace("App");
                    if (tmpBio && tmpBio.bio == 'none') 
                      navigation.replace("App");
                    if (tmpBio && tmpBio.bio == 'touch')
                      navigation.navigate("Biometrics", {bioTypeProp: 'touch'});
                    if (tmpBio && tmpBio.bio == 'face')
                      navigation.navigate("Biometrics", {bioTypeProp: 'face'});
                  }
                ); 
                break;
              case 'doctor':
                AsyncStorage.getItem(
                  'bio',
                  (err, result) => {
                    tmpBio = JSON.parse(result);
                    if (!tmpBio) 
                      navigation.replace("App");
                    if (tmpBio && tmpBio.bio == 'none') 
                      navigation.replace("App");
                    if (tmpBio && tmpBio.bio == 'touch')
                      navigation.navigate("Biometrics", {bioTypeProp: 'touch'});
                    if (tmpBio && tmpBio.bio == 'face')
                      navigation.navigate("Biometrics", {bioTypeProp: 'face'});
                  }
                );
                break;
              case 'patient':
                AsyncStorage.getItem(
                  'bio',
                  (err, result) => {
                    tmpBio = JSON.parse(result);
                    if (!tmpBio) 
                      navigation.replace("App");
                    if (tmpBio && tmpBio.bio == 'none') 
                      navigation.replace("App");
                    if (tmpBio && tmpBio.bio == 'touch')
                      navigation.navigate("Biometrics", {bioTypeProp: 'touch'});
                    if (tmpBio && tmpBio.bio == 'face')
                      navigation.navigate("Biometrics", {bioTypeProp: 'face'});
                  }
                );
                break;
              default: break;
            }
          } else {
            Alert.alert(
              "Warning",
              "Please choose the correct role", 
              [
                {
                  text: "OK",
                  onPress: () => console.log("OK Pressed"),
                  style: "OK",
                },
              ]
            );
          }
        });

      })
      .catch((error) => {
        Alert.alert("Warning", "This email and password is invaild", [
          {
            text: "OK",
            onPress: () => console.log("OK Pressed"),
            style: "OK",
          },
        ]);
      });
  };

  return (
    <ScrollView>
      <Block
        flex
        middle
        backgroundColor="rgba(139,147,248,1)"
        style={{ height: height }}
      >
        {SignInHeading(userRole)}
        <Block flex>
          <Block column flex style={{ margin: theme.SIZES.BASE * 2 }}>
            <Block>
              <Input
                label="Email"
                value={email}
                onChangeText={setEmail}
                disabled={false}
                keyboardType="email-address"
                leftIcon=""
                rightIcon=""
                validate
                requested={requested}
              />
            </Block>
            <Block>
              <Input
                label="PASSWORD"
                value={password}
                onChangeText={setPassword}
                disabled={false}
                leftIcon=""
                rightIcon="eye"
                validate
                requested={requested}
              />
            </Block>
          </Block>
          <Block
            center
            flex
            style={{ marginTop: height * 0.15, borderRadius: 15 }}
          >
            <TouchableOpacity
              style={styles.signInBtn}
              onPress={() => {
                if (validemail && validPassword) {
                  handleSignIn();
                  setRequested(false);
                } else {
                  setRequested(true);
                }
              }}
            >
              <Text
                size={18}
                color={theme.COLORS.WHITE}
                style={{ alignSelf: "center", paddingTop: 7 }}
              >
                {IMLocalized("signIn")}
              </Text>
            </TouchableOpacity>
          </Block>
          <Block flex flexDirection="row" style={{ width: width * 0.85 }} center>
            <Block flex={1}>
              <CheckBox
                checked={isSelected}
                center
                containerStyle={{ backgroundColor: "rgba(0,0,0,0)", width: 10 }}
                onPress={() => {
                  setSelected(!isSelected);
                }}
              />
            </Block>
            <Block flex={6}>
              <Text style={styles.label}>Remember me</Text>
            </Block>
            <Block flex={4}>
              <TouchableOpacity
                onPress={() => navigation.navigate("ForgotPassword")}
              >
                <Text style={{ color: "white" }}>
                  {IMLocalized("ForgotPassword")}
                </Text>
              </TouchableOpacity>
            </Block>
          </Block>
          <Block flex>
            <></>
          </Block>
          <Block flex>
            <></>
          </Block>
          <Block flex>
            <></>
          </Block>
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
  label: {
    color: "white",
  },
});

export default SignIn;
