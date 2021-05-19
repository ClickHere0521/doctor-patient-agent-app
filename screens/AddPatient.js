import React, { useState } from "react";
import {
  StyleSheet,
  Dimensions,
  ScrollView,
  Image,
  ImageBackground,
  TouchableOpacity,
  Platform,
} from "react-native";
import { Button, Block, Text, theme, Icon } from "galio-framework";

import { materialTheme } from "../constants";
import SwitchButton from "switch-button-react-native";
import * as ImagePicker from "expo-image-picker";
import { SvgUri } from "react-native-svg";
import { isValid } from '../src/utils/helpers';
import Input from '../components/InputType2';
import { useDispatch } from 'react-redux';
import { patientInfoAction } from '../store/duck/action';
import * as firebase from 'firebase';
import "firebase/firestore";
import "firebase/auth";
import firebaseConfig from "../FirebaseConfig";

if (!firebase.apps.length) {
  firebase.initializeApp(firebaseConfig);
}

const auth = firebase.auth();

const dbh = firebase.firestore();

const { width, height } = Dimensions.get("screen");
const thumbMeasure = (width - 48 - 32) / 3;

const AddPatient = (props) => {
  const { route, navigation } = props;
  const { editPatient, patientUid } = route.params;
  const patientInfoDispatch = useDispatch();
  const [activeSwitch, setActiveSwitch] = useState(1);
  const [imageUri, setImageUri] = useState(null);


  // const imageUri = "../assets/images/avatar.png";
  const handleChange = (name, value) => {
    setVals({ [name]: value });
  };

  const [editFlg, setEditFlg] = useState(false);

  const [userName, setUserName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("abcABC123");
  const [dob, setDob] = useState("");
  const [cityState, setCityState] = useState("");
  const [ssn, setSsn] = useState("");
  const [description, setDescription] = useState("");

  const [requested, setRequested] = useState(false);

  const validName = isValid('username', userName);
  const validEmail = isValid('email', email);
  const validDate = isValid('date', dob);
  const validCityState = isValid('citystate', cityState);
  const validSsn = isValid('ssn', ssn);
  const validDescription = isValid('description', description);

  const userId = "";
  const handleAvatar = (val) => {
    setActiveSwitch(val);
    if (val == 2) pickImage();
    else setImageUri(null);
  };

  const pickImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      aspect: [3, 3],
      quality: 1,
    });

    console.log(result);

    if (!result.cancelled) {
      setImageUri(result.uri);
    }
  };
  const navbar = () => {
    return (
      <Block row style={styles.navbar} center>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Icon
            name="arrow-left"
            family="font-awesome"
            color="white"
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
          {editPatient ? "Patient Info" : "Add Patient"}
        </Text>
        <TouchableOpacity onPress={() => { setEditFlg(true) }}>
          <Image
            source={require("../assets/icons/editHeaderWhite.png")}
            alt=""
            style={{ marginLeft: width * 0.54 }}
          />
        </TouchableOpacity>
      </Block>
    );
  };

  return (
    <Block center flex style={styles.profile}>
      {navbar()}
      <ScrollView vertical={true} showsVerticalScrollIndicator={false}>
        <Block center row style={{ top: 10 }}>
          <Block middle style={{ marginRight: 14 }}>
            {imageUri ? (
              <Image
                source={{ uri: imageUri }}
                style={{ width: 50, height: 50 }}
              />
            ) : (
              <Image
                source={require("../assets/images/userDefault.png")}
                style={{ width: 50, height: 50 }}
              />
            )}
          </Block>
          <SwitchButton
            onValueChange={handleAvatar}
            text1="Remove"
            text2="Upload"
            switchWidth={120}
            switchHeight={30}
            switchdirection="rtl"
            switchBorderRadius={100}
            switchSpeedChange={500}
            switchBorderColor="#3B3E51"
            switchBackgroundColor="#fff"
            btnBorderColor="#3B3E51"
            btnBackgroundColor="#3B3E51"
            fontColor="#3B3E51"
            activeFontColor="#fff"
          />
        </Block>
        <Block style={styles.userInfo}>
          <Block row style-st flex flexDirection="row">
            <Block flex={2}>
              <Text style={styles.label} flex>
                Name <Text color={"red"}>*</Text>
              </Text>
            </Block>
            <Block flex={7}>
              <Input
                label="USERNAME"
                value={userName}
                onChangeText={setUserName}
                editable={editFlg}
                placeholder="Name"
                keyboardType="email-address"
                leftIcon=""
                rightIcon=""
                validate
                requested={requested}
                style={styles.valiInput}
              />
            </Block>
          </Block>
          <Block row style-st flex flexDirection="row">
            <Block flex={2}>
              <Text style={styles.label}>
                Date of Birth <Text color={"red"}>*</Text>
              </Text>
            </Block>
            <Block flex={7}>
              <Input
                label="DATE"
                value={dob}
                onChangeText={setDob}
                editable={editFlg}
                placeholder="MM/DD/YYYY"
                keyboardType="email-address"
                leftIcon=""
                rightIcon=""
                validate
                requested={requested}
                style={styles.valiInput}
              />
            </Block>
          </Block>
          <Block row style-st flex flexDirection="row">
            <Block flex={2}>
              <Text style={styles.label}>
                City/State <Text color={"red"}>*</Text>
              </Text>
            </Block>
            <Block flex={7}>
              <Input
                label="CityState"
                value={cityState}
                onChangeText={setCityState}
                editable={editFlg}
                placeholder="NewYork XX"
                keyboardType="email-address"
                leftIcon=""
                rightIcon=""
                validate
                requested={requested}
                style={styles.valiInput}
              />
            </Block>
          </Block>
          <Block row style-st flex flexDirection="row">
            <Block flex={2}>
              <Text style={styles.label}>
                Email <Text color={"red"}>*</Text>
              </Text>
            </Block>
            <Block flex={7}>
              <Input
                label="Email"
                value={email}
                onChangeText={setEmail}
                editable={editFlg}
                keyboardType="email-address"
                placeholder="john0092@email.com"
                leftIcon=""
                rightIcon=""
                validate
                requested={requested}
                style={styles.valiInput}
              />
            </Block>
          </Block>
          <Block row style-st flex flexDirection="row">
            <Block flex={2}>
              <Text style={styles.label}>
                SSN <Text color={"red"}>*</Text>
              </Text>
            </Block>
            <Block flex={7}>
              <Input
                label="SSN"
                value={ssn}
                onChangeText={setSsn}
                editable={editFlg}
                leftIcon=""
                rightIcon=""
                validate
                placeholder="123456789"
                requested={requested}
                style={styles.valiInput}
              />
            </Block>
          </Block>
          <Block style-st>
            <Text style={styles.label}>
              Description <Text color={"red"}>*</Text>
            </Text>
            <Input
              label="Description"
              value={description}
              onChangeText={setDescription}
              editable={editFlg}
              leftIcon=""
              rightIcon=""
              validate
              requested={requested}
              style={[styles.valiInput, { height: 100 }]}
              multiline={true}
            />
          </Block>
        </Block>
        <Block row center>
          <TouchableOpacity
            style={styles.save}
            onPress={async () => {
              if (validEmail && validName && validSsn && validCityState && validDate && validDescription) {
                if (!editPatient) {
                  console.log("email & password signUp");
                  await auth
                    .createUserWithEmailAndPassword(email, password)
                    .then((res) => {
                      dbh.collection('Patients').doc(res.user.uid).collection("Patient").doc().collection("Profile").add({
                        address: "",
                        avatar: "",
                        cityState: cityState,
                        description: description,
                        dob: dob,
                        email: email,
                        geoLocation: "",
                        name: userName,
                        phone: "",
                        scheduleRelatedID: "",
                        ssn: ssn
                      }).
                        then(() => {
                          console.log('user Add');
                        });
                      patientInfoDispatch(patientInfoAction(res.user.uid));
                    })
                    .catch((error) => {
                      console.log(">>>Error>>>")
                    });

                  setEditFlg(false);
                  setRequested(false);
                }
                else {
                  setRequested(true);
                }
              }
            }}
          >
            <Text color={"white"} size={16}>
              Save
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.save}
            onPress={() => {
              setUserName("");
              setDob("");
              setCityState("");
              setEmail("");
              setSsn("");
              setDescription("");
              setEditFlg(false);
            }}
          >
            <Text color={"white"} size={16}>
              Cancel
            </Text>
          </TouchableOpacity>
        </Block>
      </ScrollView>
    </Block>
  );
};

const styles = StyleSheet.create({
  profile: {
    // marginTop: Platform.OS === "android" ? height * 0.02 : height * 0.02,
    backgroundColor: "white",
  },
  optionsButtonText: {
    fontSize: theme.SIZES.BASE * 0.75,
    color: "white",
    fontWeight: "normal",
    fontStyle: "normal",
    letterSpacing: -0.29,
  },
  optionsButton: {
    width: "auto",
    height: 34,
    paddingHorizontal: theme.SIZES.BASE,
    paddingVertical: 10,
    borderRadius: 3,
    shadowColor: "rgba(0, 0, 0, 0.1)",
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 4,
    shadowOpacity: 1,
  },
  uploadPicture: {
    paddingHorizontal: 14,
    paddingVertical: 1,
    marginTop: height * 0.01,
    marginHorizontal: width * 0.01,
    borderRadius: 20,
    borderWidth: 1,
    borderColor: "grey",
    backgroundColor: theme.COLORS.WHITE,
    shadowColor: "black",
    shadowOffset: { width: 0, height: 0 },
    shadowRadius: 8,
    shadowOpacity: 0.2,
    zIndex: 2,
  },
  userInfo: {
    marginTop: height * 0.04,
    marginBottom: height * 0.05,
    marginHorizontal: width * 0.01,
  },
  profileImage: {
    width: width * 1.1,
    height: "auto",
  },
  profileContainer: {
    width: width,
    height: "auto",
    flex: 1,
  },
  profileDetails: {
    paddingTop: theme.SIZES.BASE * 4,
    justifyContent: "flex-end",
    position: "relative",
  },
  profileTexts: {
    paddingHorizontal: theme.SIZES.BASE * 2,
    paddingVertical: theme.SIZES.BASE * 2,
    zIndex: 2,
  },
  pro: {
    backgroundColor: materialTheme.COLORS.LABEL,
    paddingHorizontal: 6,
    marginRight: theme.SIZES.BASE / 2,
    borderRadius: 4,
    height: 19,
    width: 90,
  },
  seller: {
    marginRight: theme.SIZES.BASE / 2,
  },
  options: {
    position: "relative",
    paddingHorizontal: theme.SIZES.BASE,
    paddingVertical: theme.SIZES.BASE,
    marginHorizontal: theme.SIZES.BASE,
    marginTop: -theme.SIZES.BASE,
    marginBottom: 0,
    borderTopLeftRadius: 13,
    borderTopRightRadius: 13,
    backgroundColor: theme.COLORS.WHITE,
    shadowColor: "black",
    shadowOffset: { width: 0, height: 0 },
    shadowRadius: 8,
    shadowOpacity: 0.2,
    zIndex: 2,
  },
  thumb: {
    borderRadius: 4,
    marginVertical: 4,
    alignSelf: "center",
    width: thumbMeasure,
    height: thumbMeasure,
  },
  gradient: {
    zIndex: 1,
    left: 0,
    right: 0,
    bottom: 0,
    height: "30%",
    position: "absolute",
  },
  input: {
    width: width * 0.8,
    borderRadius: 0,
    borderBottomWidth: 1,
    borderBottomColor: materialTheme.COLORS.PLACEHOLDER,
  },
  inputActive: {
    borderBottomColor: "black",
  },
  upload: {
    borderWidth: 1,
    borderRadius: 20,
    paddingVertical: 5,
    paddingLeft: 8,
    paddingRight: 30,
    marginRight: -26,
  },
  label: {
    paddingTop: theme.SIZES.BASE * 0.5,
    alignSelf: "flex-start",
    fontSize: 14,
  },
  roundBlock: {
    borderBottomLeftRadius: 34,
    borderBottomRightRadius: 34,
    backgroundColor: "rgba(100, 120, 247, 0.84)",
    height: height * 0.16,
    width: width,
    top: -10,
    zIndex: 2,
  },
  heading: {
    marginTop: height * 0.08,
    paddingHorizontal: theme.SIZES.BASE * 0.5,
    zIndex: 1,
  },
  spinBar: {
    borderRadius: 4,
    shadowColor: "grey",
    shadowOpacity: 0.2,
    elevation: 2,
    backgroundColor: "white",
    padding: 6,
  },
  inputPassword: {
    width: width * 0.5,
    height: 30,
    borderRadius: 6,
    shadowColor: "grey",
    shadowOpacity: 0.2,
    elevation: 2,
    backgroundColor: "white",
    paddingHorizontal: 20,
    paddingVertical: 0,
  },
  save: {
    backgroundColor: "#00CE30",
    borderRadius: 15,
    width: width * 0.35,
    height: 40,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 10,
    marginHorizontal: 20,
  },
  description: {
    borderRadius: 10,
    borderWidth: 1,
    borderColor: "grey",
    color: 'black',
    padding: 10,
    width: width * 0.8,
    height: height * 0.2,
    margin: 10,
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
  valiInput: {
    textTransform: 'capitalize',
    width: '100%',
    borderRadius: 9,
    backgroundColor: 'white',
    borderColor: 'grey',
    borderWidth: 1,
    borderTopLeftRadius: 9,
    borderTopRightRadius: 9,
    fontSize: 14,
    height: 40,
    padding: 10,
    borderBottomWidth: 1,
  }
});

export default AddPatient;
