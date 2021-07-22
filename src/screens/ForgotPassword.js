import React, { useState } from "react";
import {
  StyleSheet,
  Dimensions,
  TouchableOpacity,
  ScrollView,
  Modal,
  Alert,
} from "react-native";
import { Block, Button, Text, theme } from "galio-framework";
import materialTheme from "../constants/Theme";
import { IMLocalized, init } from "../localization/IMLocalization";
import { Icon } from "../components";
import { isValid } from "../utils/helpers";
import Input from "../components/Input";
import auth from '@react-native-firebase/auth';

const { height, width } = Dimensions.get("screen");

const ForgotPassword = (props) => {
  const { navigation } = props;

  const [modalVisible, setModalVisible] = useState(0);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [repeatPassword, setRepeatPassword] = useState("");
  const [requested, setRequested] = useState(false);
  const validemail = isValid("email", email);
  const validPassword = isValid("password", password);
  const validRepeatPassword = isValid("password", repeatPassword);

  const [request, setRequest] = useState(1);

  const handleRequestResent = () => {
    if (validemail) {
      auth().sendPasswordResetEmail(email).then(() => {
        setRequested(false);
        Alert.alert("Success", `We have sent a link to ${email}`, [
          {
            text: "OK",
            onPress: () => navigation.navigate("SignIn"),
            style: "OK",
          },
        ]);
      });
    } else {
      setRequested(true);
    }
  };

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
          <Block
            middle
            style={{
              marginTop: theme.SIZES.BASE * 8,
              paddingBottom: theme.SIZES.BASE,
            }}
          >
            <Text size={14} bold style={{ color: "#3B3E51" }}>
              Reset Your Password
            </Text>
            <Text
              size={14}
              bold
              style={{ textAlign: "center", color: "#3B3E51" }}
            >
              Please Provide your account email address to request a password
              reset link.
            </Text>
            <Text
              size={14}
              bold
              style={{ textAlign: "center", color: "#3B3E51" }}
            >
              You will receive a link to your email{"\n"} address if it is
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
                justifyContent: "center",
                alignItems: "center",
              }}
              onPress={() => handleRequestResent()}
            >
              <Text size={17} bold>
                Request Reset
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
            <Text
              size={14}
              bold
              style={{ paddingBottom: theme.SIZES.BASE, color: "#3B3E51" }}
            >
              Reset Your Password
            </Text>
            <Text
              size={14}
              bold
              style={{
                textAlign: "center",
                paddingBottom: theme.SIZES.BASE,
                color: "#3B3E51",
              }}
            >
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
                } else {
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
          <Block
            middle
            style={{
              marginTop: theme.SIZES.BASE * 8,
              marginBottom: theme.SIZES.BASE,
            }}
          >
            <Text size={14} bold st>
              Reset Your Password
            </Text>
            <Text
              size={14}
              bold
              style={{ textAlign: "center", marginBottom: theme.SIZES.BASE }}
            >
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
                  setModalVisible(true);
                  setRequested(false);
                } else {
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
              Alert.alert("Modal has been closed.");
            }}
          >
            <Block
              style={{
                marginTop: height * 0.3,
                backgroundColor: "rgba(255,255,255,0.6)",
                width: width,
                height: height * 0.3,
              }}
              center
              middle
            >
              <Block style={styles.innerModal} center middle>
                <Text size={16}>
                  {IMLocalized("You have succefully reset your password.")}
                </Text>
                <Button
                  color="white"
                  style={styles.modalButton}
                  onPress={() => {
                    setModalVisible(1);
                    navigation.navigate("SignIn");
                  }}
                >
                  <Text size={18}>OK</Text>
                </Button>
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
    height: theme.SIZES.BASE * 2,
    borderRadius: 17,
    borderWidth: 0.5,
    borderColor: "#C7C7C7",
    marginTop: theme.SIZES.BASE,
  },
  innerModal: {
    backgroundColor: "rgba(255,255,255,0.99)",
    width: width * 0.8,
    borderRadius: 15,
    height: height * 0.15,
    shadowColor: theme.COLORS.BLACK,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 3,
    shadowOpacity: 0.1,
    elevation: 5,
  },
  navbar: {
    backgroundColor: "#6E78F7",
    borderBottomRightRadius: 24,
    borderBottomLeftRadius: 24,
    width: width,
    height: height * 0.1,
    paddingTop: theme.SIZES.BASE,
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
