import React, { useEffect, useState } from "react";
import {
  Image,
  StyleSheet,
  Dimensions,
  View,
  TouchableOpacity,
  ScrollView,
  Modal
} from "react-native";
// import { Block, Button, Text, theme, Input } from "galio-framework";
import { Block, Button, Text, theme } from "galio-framework";
import materialTheme from "../constants/Theme";
import { IMLocalized, init } from "../src/localization/IMLocalization";
import { useFonts } from "expo-font";
import AppLoading from "expo-app-loading";
import { useDispatch, useSelector } from "react-redux";
import { roleSelector } from "../store/duck/action";
import SvgUri from "expo-svg-uri";
import { Icon } from "../components";
import { Form, InputText } from 'validate-form-in-expo-style';
import { FontAwesome, Feather } from "@expo/vector-icons"
import { Ionicons } from '@expo/vector-icons';
import { isValid } from '../src/utils/helpers';
import Input from '../components/Input';
const { height, width } = Dimensions.get("screen");

const ForgotPassword = (props) => {
  const { navigation } = props;

  const [modalVisible, setModalVisible] = useState(0);
  const [vals, setVals] = useState({
    user: "-",
    email: "-",
    password: "-",
    active: {
      user: false,
      email: false,
      password: false,
    },
  });


  const [firstName, setFristName] = useState('');
  // const handleLastName = (last_name) => {
  //     setLastName(last_name);
  // }
  // const handleNumber = (number) => {
  //     setNumber(number);
  // }
  const [number, setNumber] = useState("");
  const [last_name, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [repeatPassword, setRepeatPassword] = useState("");

  const [requested, setRequested] = useState(false);
  const validemail = isValid('email', email);
  const validPassword = isValid('password', password);
  const validRepeatPassword = isValid('password', repeatPassword);

  const submit = () => {
    alert("form submit, thank you.")
  }

  const [request, setRequest] = useState(1);

  const navbar = () => {
    return (
      <Block row style={styles.navbar} center>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Icon
            name="arrow-left"
            family="font-awesome"
            color={"white"}
            size={16}
            style={styles.chevronLeft}
          />
        </TouchableOpacity>
        <Text
          color="white"
          style={{ paddingLeft: theme.SIZES.BASE }}
          size={17}
          bold
        >
          Forgot Password
        </Text>
      </Block>
    );
  };

  const requestResent = () => {
    return (
      <Block flex style={{ backgroundColor: "white", height: height * 0.84 }}>
        <Block middle style={{ padding: theme.SIZES.BASE }}>
          <Block middle style={{ marginTop: theme.SIZES.BASE * 8 }}>
            <Text size={14} bold>
              Reset Your Password
            </Text>
            <Text size={14} bold style={{ textAlign: "center" }}>
              Please Provide your account email address to request a password
              reset code.
            </Text>
            <Text size={14} bold style={{ textAlign: "center" }}>
              You will receive your a code to your email{"\n"} address if it is
              valid.
            </Text>
          </Block>
          <Block>
            <Block row>
              <Input
                label="Email"
                value={email}
                onChangeText={setEmail}
                disabled={false}
                keyboardType="email-address"
                leftIcon="email"
                rightIcon="close"
                validate
                requested={requested}
              />
            </Block>
          </Block>
          <Block>
            <Button
              color="white"
              style={{
                borderWidth: 1,
                borderColor: "#707070",
                width: theme.SIZES.BASE * 12,
              }}
              onPress={() => {
                console.log(validemail);
                if (validemail) {
                  setRequest(2);
                  setRequested(false);
                }
                else {
                  setRequested(true);
                }
              }}
            >
              <Text size={18} bold>
                Request Resent Code
              </Text>
            </Button>
          </Block>
        </Block>
      </Block>
    );
  };

  const submitCode = () => {
    return (
      <Block flex style={{ backgroundColor: "white", height: height * 0.84 }}>
        <Block middle style={{ padding: theme.SIZES.BASE }}>
          <Block middle style={{ marginTop: theme.SIZES.BASE * 8 }}>
            <Text size={14} bold style={{ paddingBottom: theme.SIZES.BASE }}>
              Reset Your Password
            </Text>
            <Text size={14} bold style={{ textAlign: "center", paddingBottom: theme.SIZES.BASE }}>
              Input the code sent to your email address.
            </Text>
          </Block>
          <Block>
            <Block row>
              <Input
                label="Password"
                value={password}
                onChangeText={setPassword}
                disabled={false}
                leftIcon="lock"
                rightIcon="close"
                validate
                requested={requested}
              />
            </Block>
          </Block>
          <Block>
            <Button
              color="white"
              style={{
                borderWidth: 1,
                borderColor: "#707070",
                width: theme.SIZES.BASE * 12,
              }}
              onPress={() => {
                console.log(validPassword);
                if (validPassword) {
                  setRequest(3);
                  setRequested(false);
                }
                else {
                  setRequested(true);
                }
              }}
            >
              <Text size={18} bold>
                Submit Code
              </Text>
            </Button>
          </Block>
          <Block style={{ marginTop: theme.SIZES.BASE }}>
            <TouchableOpacity onPress={() => setRequest(1)}>
              <Text>Go Back</Text>
            </TouchableOpacity>
          </Block>
        </Block>
      </Block>
    );
  };

  const ResetPassword = () => {
    return (
      <Block flex style={{ backgroundColor: "white", height: height * 0.84 }}>
        <Block middle style={{ padding: theme.SIZES.BASE }}>
          <Block middle style={{ marginTop: theme.SIZES.BASE * 8, marginBottom: theme.SIZES.BASE }}>
            <Text size={14} bold st>
              Reset Your Password
            </Text>
            <Text size={14} bold style={{ textAlign: "center", marginBottom: theme.SIZES.BASE }}>
              Successfully verified.Input a new password
            </Text>
          </Block>
          <Block>
            <Block row>
              <Input
                label="Password"
                value={repeatPassword}
                onChangeText={setRepeatPassword}
                disabled={false}
                leftIcon="lock"
                rightIcon="close"
                validate
                requested={requested}
              />
            </Block>
          </Block>
          <Block>
            <Button
              color="white"
              style={{
                borderWidth: 1,
                borderColor: "#707070",
                width: theme.SIZES.BASE * 12,
              }}
              onPress={() => {
                console.log(validRepeatPassword);
                if (validRepeatPassword) {
                  setModalVisible(true)
                  setRequested(false);
                }
                else {
                  setRequested(true);
                }
              }}
            >
              <Text size={18} bold>
                Reset Password
              </Text>
            </Button>
          </Block>
          <Block style={{ marginTop: theme.SIZES.BASE }}>
            <TouchableOpacity onPress={() => setRequest(1)}>
              <Text bold>Start Again</Text>
            </TouchableOpacity>
          </Block>

          <Modal
            animationType="slide"
            transparent={true}
            visible={modalVisible}
            onRequestClose={() => {
              Alert.alert('Modal has been closed.');
            }}>
            <Block style={{ marginTop: height * 0.3, backgroundColor: 'rgba(255,255,255,0.6)', width: width, height: height * 0.3 }} center middle>
              <Block style={styles.innerModal} center middle>
                <Text size={16}>{IMLocalized('You have succefully reset your password.')}</Text>
                <Button color="white" style={styles.modalButton} onPress={() => { setModalVisible(1); navigation.navigate('SignIn') }}><Text size={18}>OK</Text></Button>
              </Block>
            </Block>
          </Modal>
        </Block>
      </Block>
    );
  };

  const checkForm = () => {

    return (
      <ScrollView>
      </ScrollView>
    );
  };
  const resetPasswordStep = (request) => {
    switch (request) {
      case 1:
        return requestResent();
      case 2:
        return submitCode();
      case 3:
        return ResetPassword();
    }
  };

  return (
    <Block>
      {navbar()}
      {/* {checkForm()} */}
      <ScrollView>{resetPasswordStep(request)}</ScrollView>
    </Block>
  );
};
const styles = StyleSheet.create({
  modalButton: {
    width: width * 0.25,
    height: theme.SIZES.BASE * 2,
    borderRadius: 17,
    borderWidth: 0.5,
    borderColor: "#C7C7C7",
    marginTop: theme.SIZES.BASE
  },
  innerModal: {
    backgroundColor: 'rgba(255,255,255,0.99)', width: width * 0.8, borderRadius: 15, height: height * 0.15,
    shadowColor: theme.COLORS.BLACK,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 3,
    shadowOpacity: 0.1,
    elevation: 5
  },
  navbar: {
    backgroundColor: "#6E78F7",
    borderBottomRightRadius: 24,
    borderBottomLeftRadius: 24,
    width: width,
    height: height * 0.16,
    paddingTop: theme.SIZES.BASE * 2,
    paddingLeft: theme.SIZES.BASE,
  },
  input: {
    marginVertical: theme.SIZES.BASE,
    width: width * 0.8,
    borderBottomWidth: 1,
    borderBottomColor: materialTheme.COLORS.PLACEHOLDER,
    color: "black",
  },
  inputActive: {
    borderBottomColor: "black",
  },
});
export default ForgotPassword;
