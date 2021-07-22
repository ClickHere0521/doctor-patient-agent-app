import React, { useState, useEffect, useRef } from "react";
import {
  StyleSheet,
  Dimensions,
  ScrollView,
  Image,
  TouchableOpacity,
  Alert,
  PermissionsAndroid,
} from "react-native";
import { Button, Block, Text, theme, Icon } from "galio-framework";
import { isValid } from '../utils/helpers';
import Input from '../components/InputType2';
import { materialTheme } from "../constants";
import { useDispatch, useSelector } from 'react-redux';
import { attorneyInfoAction } from '../store/duck/action';
import { Modal } from 'react-native-paper';
import { launchCamera, launchImageLibrary } from 'react-native-image-picker';
import PhoneInput from 'react-phone-number-input/react-native-input'
import { isValidPhoneNumber } from 'react-phone-number-input'
import { createIconSetFromFontello } from "react-native-vector-icons";
const { width, height } = Dimensions.get("screen");
const thumbMeasure = (width - 48 - 32) / 3;

const AddAttorney = (props) => {
  const userRole = useSelector((state) => state.user.role);
  const { navigation } = props;
  const { info } = props.route.params;
  // const { patientUid } = props.route.params;
  const [imageUri, setImageUri] = useState('');
  const [isSave, setIsSave] = useState(false);
  const [userName, setUserName] = useState("");
  const [email, setEmail] = useState("");
  const [zipcode, setZipcode] = useState("");
  const [cityState, setCityState] = useState("");
  const [tel, setTel] = useState("");
  const [fax, setFax] = useState("");
  const [address, setAddress] = useState("");
  const [requested, setRequested] = useState(false);
  const [permission, setPermission] = useState(true);
  const [visible, setVisible] = useState(false);

  const attorneyInfoDispatch = useDispatch();
  const attorneyInfo = [];

  const hideModal = () => setVisible(false);
  const showModal = () => setVisible(true);

  useEffect(() => {
    requestCameraPermission();
    if (userRole == 'agent')
      setPermission(true);
    else
      setPermission(false);
  }, []);

  useEffect(() => {
    if (
      userName != '' &&
      email != '' &&
      address != '' &&
      cityState != '' &&
      zipcode != '' &&
      tel != '' &&
      fax != '' &&
      isValid('username', userName) &&
      isValid('email', email) &&
      isValid('address', address) &&
      isValid('citystate', cityState) &&
      isValid('zipcode', zipcode) &&
      phoneValidation(tel) &&
      isValid('fax', fax)
    )
      setIsSave(true);
    else
      setIsSave(false);
  }, [userName, email, address, cityState, zipcode, tel, fax, imageUri]);

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
    launchCamera(
      {
        mediaType: 'photo',
        includeBase64: false,
        maxHeight: 200,
        maxWidth: 200,
        saveToPhotos: true,
      },
      response => {
        hideModal();
        if (response.uri) {
          setImageUri(response.uri);
        }
      },
    );
  };

  const openLibrary = () => {
    launchImageLibrary(
      {
        mediaType: 'photo',
        includeBase64: false,
        maxHeight: 200,
        maxWidth: 200,
      },
      response => {
        hideModal();
        if (response.uri) {
          setImageUri(response.uri);
        }
      },
    );
  };

  const phoneValidation = (phonenumber) => {
    console.log(tel ? (isValidPhoneNumber(tel) ? true : false) : false);
    return tel ? (isValidPhoneNumber(tel) ? true : false) : false;
  }

  const renderUserDetail = (detail) => {
    let { heading, handleName, handleValue, handleLabel, handlePlaceholder, data, keyboardType } = { ...detail };
    if (handleLabel == "Tel") {
      return (
        <Block style={styles.detail}>
          <Block row>
            <Text color={"grey"}>{heading}</Text>
            <Text color={"red"} style={styles.asteride}>
              *
            </Text>
          </Block>
          <Block>
            {permission ? (
              <PhoneInput
                placeholder="+1234567890"
                value={tel}
                maxLength={16}
                onChange={setTel}
                />
            ) : (
              <PhoneInput
                editable={false}
                value={tel}
                maxLength={16}
                onChange={setTel} />
            )}
          </Block>
          <Block>
            <Text color="red">
            {
              tel ? (isValidPhoneNumber(tel) ? undefined : 'Invalid phone number') : ''
            }</Text>
          </Block>
        </Block>
      );
    }
    else {
      return (
        <Block style={styles.detail}>
          <Block row>
            <Text color={"grey"}>{heading}</Text>
            <Text color={"red"} style={styles.asteride}>
              *
            </Text>
          </Block>
          <Block>
            {permission ? (
              <Input
                label={handleLabel}
                value={data ? data : handleValue}
                onChangeText={(res) => handleName(res)}
                editable={!info}
                placeholder={handlePlaceholder}
                keyboardType={keyboardType}
                leftIcon=""
                rightIcon=""
                validate
                requested={requested}
                style={styles.valiInput}
              />
            ) : (
              <Text style={styles.valiInput}>
                {data}
              </Text>
            )}
          </Block>
        </Block>
      );
    }
  };


  const navbar = () => {
    return (
      <Block row style={styles.navbar} center>
        <TouchableOpacity
          style={styles.touchableArea}
          onPress={() => resetAndGoBack()}
        >
          <Icon
            name="arrow-left"
            family="font-awesome"
            color="white"
            size={16}
          />
        </TouchableOpacity>
        <Text
          color="white"
          style={{ paddingLeft: theme.SIZES.BASE * 0.5 }}
          size={17}
          bold
        >
          Attorney Info
        </Text>
      </Block>
    );
  };

  const handleSave = async () => {
    attorneyInfo.push({
      attorAvatar: imageUri,
      attorName: userName,
      attorEmail: email,
      attorZipcode: zipcode,
      attorCityState: cityState,
      attorTel: tel,
      attorFax: fax,
      attorAddress: address,
    });
    attorneyInfoDispatch(attorneyInfoAction(attorneyInfo));
    // resetAndGoBack();
    setIsSave(false);
    navigation.goBack();
  }

  const resetAndGoBack = () => {
    // setIsSave(false);
    // setImageUri("");
    // setUserName("");
    // setEmail("");
    // setAddress("");
    // setCityState("");
    // setZipcode("");
    // setTel("");
    // setFax("");
    navigation.goBack();
  }
  return (
    <Block center flex style={styles.profile}>
      {navbar()}
      <ScrollView vertical={true} showsVerticalScrollIndicator={false}>
        <Block center row style={{ marginTop: 10, top: 10, marginBottom: 20 }}>
          <Block middle>
            {permission ? (
              <Block>
                <TouchableOpacity
                  disabled={info}
                  onPress={() => showModal()}
                >
                  {info && info.attorneyAvatar ? (
                    <Image
                      source={{ uri: info.attorneyAvatar }}
                      style={styles.photo}
                    />
                  ) : (
                    <Image
                      source={imageUri != '' ? { uri: imageUri } : require("../assets/images/userDefault.png")}
                      style={styles.photo}
                    />
                  )}
                  <Block style={styles.photoPick}>
                    <Icon
                      name="camera"
                      family="font-awesome"
                      color="#666"
                      size={16}
                    />
                  </Block>
                </TouchableOpacity>
              </Block>
            ) : (
              <Image
                source={{ uri: info.attorneyAvatar }}
                style={{ width: 80, height: 80, borderRadius: 50 }}
              />
            )}
          </Block>
        </Block>

        <Block style={styles.userDetail}>
          {renderUserDetail({
            heading: "Full Name",
            handlePlaceholder: "Zulqurnain Haider",
            handleName: setUserName,
            handleValue: userName,
            handleLabel: "Username",
            keyboardType: "email-address",
            data: info ? info.attorneyName : null,
          })}
          {renderUserDetail({
            heading: "Email",
            handlePlaceholder: "soreno@gmail.com",
            handleName: setEmail,
            handleValue: email,
            handleLabel: "Email",
            keyboardType: "email-address",
            data: info ? info.attorneyEmail : null,
          })}
          {renderUserDetail({
            heading: "Address",
            handlePlaceholder: "Avenue 32",
            handleName: setAddress,
            handleValue: address,
            handleLabel: "Address",
            keyboardType: "email-address",
            data: info ? info.attorneyAddress : null,
          })}
          {renderUserDetail({
            heading: "City/State",
            handlePlaceholder: "California,US",
            handleName: setCityState,
            handleValue: cityState,
            handleLabel: "Citystate",
            keyboardType: "email-address",
            data: info ? info.attorneyCityState : null,
          })}
          {renderUserDetail({
            heading: "Zip Code",
            handlePlaceholder: "098978",
            handleName: setZipcode,
            handleValue: zipcode,
            handleLabel: "Zipcode",
            keyboardType: "numeric",
            data: info ? info.attorneyZip : null,
          })}
          {renderUserDetail({
            heading: "Tel",
            handlePlaceholder: "1208903980",
            handleName: setTel,
            handleValue: tel,
            handleLabel: "Tel",
            keyboardType: "number-pad",
            data: info ? info.attorneyPhone : null,
          })}
          {renderUserDetail({
            heading: "Fax",
            handlePlaceholder: "090834",
            handleName: setFax,
            handleValue: fax,
            handleLabel: "Fax",
            keyboardType: "number-pad",
            data: info ? info.attorneyFax : null,
          })}
        </Block>
        {permission ? (
          <Block row center style={{ padding: theme.SIZES.BASE * 0.5 }}>
            <TouchableOpacity
              style={[isSave ? styles.save : styles.saveDisable, info ? styles.noDisplay : styles.display]}
              disabled={!isSave}
              onPress={() => handleSave()}
            >
              <Text color={"white"} size={16}>
                Save
              </Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.save}
              onPress={() => resetAndGoBack()}
            >
              <Text color={"white"} size={16}>
                Cancel
              </Text>
            </TouchableOpacity>
          </Block>
        ) : (
          <Block></Block>
        )}
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
  noDisplay: {
    display: "none",
  },
  display: {
    // display: flex,
  },
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
  touchableArea: {
    width: 30,
    height: 30,
    justifyContent: 'center',
    alignItems: 'center'
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
    paddingHorizontal: width * 0.06,
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
    paddingTop: 14,
    alignSelf: "flex-start",
    fontSize: 16,
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
  location: {
    shadowOpacity: 0.2,
    shadowColor: "grey",
    backgroundColor: "white",
    shadowRadius: 10,
    elevation: 2,
    width: width * 0.8,
    margin: 10,
    padding: 4,
  },
  map: {
    width: width * 0.8,
    marginHorizontal: 10,
    marginBottom: 6,
  },
  userDetail: {
    width: width,
  },
  detail: {
    borderRadius: 20,
    borderColor: "#EDEDED",
    borderWidth: 1,
    paddingHorizontal: 24,
    paddingVertical: 20,
    marginVertical: 10,
    paddingBottom: 0
  },
  asteride: {
    position: "absolute",
    left: theme.SIZES.BASE * 5,
  },
  navbar: {
    backgroundColor: "#6E78F7",
    borderBottomRightRadius: 24,
    borderBottomLeftRadius: 24,
    width: width,
    height: height * 0.1,
    paddingTop: theme.SIZES.BASE,
    paddingLeft: theme.SIZES.BASE * 0.5,
  },
  valiInput: {
    width: '100%',
    borderRadius: 9,
    backgroundColor: 'white',
    fontSize: 14,
    height: 40,
    padding: 10,
    color: '#333'
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
  photoPick: {
    alignItems: 'center',
    justifyContent: 'center',
    position: 'absolute',
    bottom: 0,
    right: 0,
    backgroundColor: '#eee',
    borderRadius: 30,
    width: 24,
    height: 24
  },
  photo: {
    width: 80,
    height: 80,
    borderRadius: 50,
    borderColor: '#eee',
    borderWidth: 2
  },
});

export default AddAttorney;
