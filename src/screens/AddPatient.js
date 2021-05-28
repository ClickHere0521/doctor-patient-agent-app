import React, { useState, useEffect } from "react";
import {
  StyleSheet,
  Dimensions,
  ScrollView,
  Image,
  TouchableOpacity,
  View,
} from "react-native";
import { Button, Block, Text, theme, Icon } from "galio-framework";

import { materialTheme } from "../constants";
import * as ImagePicker from "expo-image-picker";
import { isValid } from '../utils/helpers';
import Input from '../components/InputType2';
import { useDispatch } from 'react-redux';
import { patientInfoAction } from '../store/duck/action';
import auth from '@react-native-firebase/auth';
import firestore from '@react-native-firebase/firestore';
import { Modal } from 'react-native-paper';
import { launchCamera, launchImageLibrary } from 'react-native-image-picker';


const { width, height } = Dimensions.get("screen");
const thumbMeasure = (width - 48 - 32) / 3;

const AddPatient = (props) => {
  const { route, navigation } = props;
  const { editPatient, addPermission } = route.params;
  const [imageUri, setImageUri] = useState(null);
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

  const patientInfoDispatch = useDispatch();

  const pInfo = [];
  const [visible, setVisible] = useState(false);

  const hideModal = () => setVisible(false);
  const showModal = () => setVisible(true);

  useEffect(() => {
    requestCameraPermission();
  }, []);

  const requestCameraPermission = async () => {
    try {
      const granted = await PermissionsAndroid.request(
        PermissionsAndroid.PERMISSIONS.CAMERA,
        {
          title: 'App Camera Permission',
          message: 'App needs access to your camera ',
          buttonNeutral: 'Ask Me Later',
          buttonNegative: 'Cancel',
          buttonPositive: 'OK',
        },
      );
      if (granted === PermissionsAndroid.RESULTS.GRANTED) {
        console.log('Camera permission given');
      } else {
        console.log('Camera permission denied');
      }
    } catch (err) {
      console.warn(err);
    }
  };

  const openCamera = () => {
    hideModal();
    launchCamera(
      {
        mediaType: 'photo',
        includeBase64: false,
        maxHeight: 200,
        maxWidth: 200,
        saveToPhotos: true,
      },
      response => {
        console.log('====================', response.uri, response.fileName)
        setImageUri(response.uri);
      },
    );
  };

  const openLibrary = () => {
    hideModal();
    launchImageLibrary(
      {
        mediaType: 'photo',
        includeBase64: false,
        maxHeight: 200,
        maxWidth: 200,
      },
      response => {
        console.log('====================', response.uri, response.fileName)
        setImageUri(response.uri);
      },
    );
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
      </Block>
    );
  };

  const setSaveEnable = () => {
    if (validEmail && validName && validSsn && validCityState && validDate) {
      setEditFlg(true);
    }
  }

  return (
    <Block center flex style={styles.profile}>
      {navbar()}
      <ScrollView vertical={true} showsVerticalScrollIndicator={false}>
        <Block center row style={{ top: 10 }}>
          <Block middle>
            <TouchableOpacity
              onPress={() => showModal()}
            >
              {imageUri ? (
                <Image
                  source={{ uri: imageUri }}
                  style={{ width: 80, height: 80, borderRadius: 50 }}
                />
              ) : (
                <Image
                  // source={doctorId ? { uri: doctor.avatar } : require("../assets/images/userDefault.png")}
                  source={require("../assets/images/userDefault.png")}
                  style={{ width: 80, height: 80, borderRadius: 50 }}
                />
              )}
            </TouchableOpacity>

            <Icon
              name="camera"
              family="font-awesome"
              color="#555"
              size={20}
              style={{ position: 'absolute', bottom: 4, right: 4 }}
            />
          </Block>
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
                onChangeText={(res) => {
                  setUserName(res)
                  setSaveEnable()
                }}
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
                onChangeText={(res) => {
                  setDob(res)
                  setSaveEnable()
                }}
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
                onChangeText={(res) => {
                  setCityState(res)
                  setSaveEnable()
                }}
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
                onChangeText={(res) => {
                  setEmail(res)
                  setSaveEnable()
                }}
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
                onChangeText={(res) => {
                  setSsn(res)
                  setSaveEnable()
                }}
                leftIcon=""
                rightIcon=""
                validate
                placeholder="123456789"
                requested={requested}
                style={styles.valiInput}
              />
            </Block>
          </Block>
        </Block>
        <Block row center>
          <TouchableOpacity
            style={editFlg ? styles.save : styles.saveDisable}
            disabled={!editFlg}
            onPress={async () => {
              if (validEmail && validName && validSsn && validCityState && validDate) {
                if (!editPatient) {
                  if (!addPermission) {
                    console.log("email & password signUp");
                    pInfo.push({
                      email: email,
                      password: password,
                      cityState: cityState,
                      dob: dob,
                      email: email,
                      name: userName,
                      ssn: ssn,
                      avatar: imageUri
                    });

                    console.log("addPatient-PInfo: ", pInfo);

                    patientInfoDispatch(patientInfoAction(pInfo));
                  }
                  else {
                    await auth()
                      .createUserWithEmailAndPassword(email, password)
                      .then(async (res) => {
                        console.log(res.user.uid);

                        const reference = storage().ref(`avatar/${res.user.uid}.png`);  // Patient Avatar Add to Storage and get Download URL
                        const pathToFile = patientAvatar;
                        // uploads file
                        await reference.putFile(pathToFile);
                        const url = await storage()
                          .ref(`avatar/${res.user.uid}.png`)
                          .getDownloadURL();
                        patientDownloadURL = url;

                        firestore().collection('Patients').doc(res.user.uid).set({});
                        firestore().collection('Patients').doc(res.user.uid).collection("Patient").doc().set({
                          DOB: firestore.Timestamp.fromDate(new Date(dob)),
                          SSN: ssn,
                          address: "",
                          avatar: url,
                          cityState: cityState,
                          email: email,
                          geoLocation: "",
                          name: userName,
                          phone: "",
                        });
                      })
                      .catch((error) => {
                        console.log(">>>Error>>>", error)
                      });
                  }
                  setRequested(false);

                  navigation.goBack();
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
              navigation.goBack();
            }}
          >
            <Text color={"white"} size={16}>
              Cancel
            </Text>
          </TouchableOpacity>
        </Block>
      </ScrollView>

      <Modal
        visible={visible}
        onDismiss={hideModal}
        contentContainerStyle={styles.modal}>
        <TouchableOpacity style={styles.cameraButton} onPress={openCamera}>
          <Text style={{ color: '#FFF' }}>Open Camera</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.cameraButton} onPress={openLibrary}>
          <Text style={{ color: '#FFF' }}>Open Library</Text>
        </TouchableOpacity>
      </Modal>
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
  saveDisable: {
    backgroundColor: "grey",
    borderRadius: 15,
    width: width * 0.35,
    height: 40,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 10,
    marginHorizontal: 20,
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
    height: height * 0.1,
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
  },
  cameraButton: {
    width: width * 0.5,
    height: height * 0.07,
    backgroundColor: '#6E78F7',
    borderRadius: 25,
    alignItems: 'center',
    justifyContent: 'center',
  },
  modal: {
    backgroundColor: 'white',
    padding: 40,
    borderRadius: 20,
    alignSelf: 'center',
    width: width * 0.7,
    height: height * 0.3,
    alignItems: 'center',
    justifyContent: 'space-around',
    zIndex: 1000,
  },
});

export default AddPatient;
