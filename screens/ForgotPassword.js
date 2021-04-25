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
import { Block, Button, Text, theme, Input } from "galio-framework";
import materialTheme from "../constants/Theme";
import { IMLocalized, init } from "../src/localization/IMLocalization";
import { useFonts } from "expo-font";
import AppLoading from "expo-app-loading";
import { useDispatch, useSelector } from "react-redux";
import { roleSelector } from "../store/duck/action";
import SvgUri from "expo-svg-uri";
import { Icon } from "../components";

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

  const [request, setRequest] = useState(1);

  const navbar = () => {
    return (
      <Block row style={styles.navbar} center>
        <Icon
          name="arrow-left"
          family="font-awesome"
          color={"white"}
          size={16}
          style={styles.chevronLeft}
        />
        <Text
          color="white"
          style={{ paddingLeft: theme.SIZES.BASE }}
          size={17}
          bold
        >
          Forget Password
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
            <Input
              bgColor="transparent"
              placeholderTextColor={materialTheme.COLORS.PLACEHOLDER}
              borderless
              color="black"
              type="email-address"
              placeholder="Email"
              autoCapitalize="none"
              style={[styles.input, vals.email ? styles.inputActive : null]}
              iconContent={
                <Icon
                  size={16}
                  style={{ marginRight: theme.SIZES.BASE }}
                  color="black"
                  name="envelope"
                  family="font-awesome"
                />
              }
            />
          </Block>
          <Block>
            <Button
              color="white"
              style={{
                borderWidth: 1,
                borderColor: "#707070",
                width: theme.SIZES.BASE * 12,
              }}
              onPress={() => setRequest(2)}
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
            <Text size={14} bold>
              Reset Your Password
            </Text>
            <Text size={14} bold style={{ textAlign: "center" }}>
              Input the code sent to your email address.
            </Text>
          </Block>
          <Block>
            <Input
              bgColor="transparent"
              placeholderTextColor={materialTheme.COLORS.PLACEHOLDER}
              borderless
              color="black"
              placeholder="Input Code"
              autoCapitalize="none"
              style={[styles.input, vals.user ? styles.inputActive : null]}
              iconContent={
                <Icon
                  size={16}
                  style={{ marginRight: theme.SIZES.BASE }}
                  color="grey"
                  name="chevron-circle-right"
                  family="font-awesome"
                />
              }
            />
          </Block>
          <Block>
            <Button
              color="white"
              style={{
                borderWidth: 1,
                borderColor: "#707070",
                width: theme.SIZES.BASE * 12,
              }}
              onPress={() => setRequest(3)}
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
          <Block middle style={{ marginTop: theme.SIZES.BASE * 8 }}>
            <Text size={14} bold>
              Reset Your Password
            </Text>
            <Text size={14} bold style={{ textAlign: "center" }}>
              Successfully verified.Input a new password
            </Text>
          </Block>
          <Block>
            <Input
              password
              viewPass
              borderless
              bgColor="transparent"
              placeholder="password"
              color="black"
              style={[styles.input, styles.inputDefault]}
              iconContent={
                <Icon
                  size={18}
                  style={{ marginRight: theme.SIZES.BASE }}
                  color="grey"
                  name="chevron-circle-right"
                  family="font-awesome"
                />
              }
            />
          </Block>
          <Block>
            <Button
              color="white"
              style={{
                borderWidth: 1,
                borderColor: "#707070",
                width: theme.SIZES.BASE * 12,
              }}
              onPress={() => setModalVisible(true)}
            >
              <Text size={18} bold>
                Reset Password
              </Text>
            </Button>
          </Block>
          <Block style={{ marginTop: theme.SIZES.BASE }}>
            <TouchableOpacity onPress={() => setRequest(1)}>
              <Text>Start Again</Text>
            </TouchableOpacity>
          </Block>
          
          <Modal
            animationType="slide"
            transparent={true}
            visible={modalVisible}
            onRequestClose={() => {
              Alert.alert('Modal has been closed.');
            }}>
            <Block style={{marginTop: height * 0.3, backgroundColor: 'rgba(255,255,255,0.6)', width: width, height: height * 0.3}} center middle>
              <Block style={styles.innerModal} center middle>
                <Text size={16}>{IMLocalized('You have succefully reset your password.')}</Text>
                <Button color="white" style={styles.modalButton} onPress={() => { setModalVisible(1); navigation.navigate('SignIn')}}><Text size={18}>OK</Text></Button>
              </Block>
            </Block>
          </Modal>
        </Block>
      </Block>
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
      <ScrollView>{resetPasswordStep(request)}</ScrollView>
    </Block>
  );
};
const styles = StyleSheet.create({
  modalButton: {
    width: width * 0.25,
    height: theme .SIZES.BASE * 2,
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
