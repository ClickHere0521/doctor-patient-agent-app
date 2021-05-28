import React, { useState, useEffect } from "react";
import {
  StyleSheet,
  Dimensions,
  ScrollView,
  Image,
  TouchableOpacity,
  Alert,
} from "react-native";
import { Button, Block, Text, theme, Icon } from "galio-framework";
import { isValid } from '../utils/helpers';
import Input from '../components/InputType2';
import { materialTheme } from "../constants";
import * as ImagePicker from "expo-image-picker";
import { useDispatch } from 'react-redux';
import { attorneyInfoAction } from '../store/duck/action';
import { Modal } from 'react-native-paper';
import { launchCamera, launchImageLibrary } from 'react-native-image-picker';


const { width, height } = Dimensions.get("screen");
const thumbMeasure = (width - 48 - 32) / 3;

const AddAttorney = (props) => {

  const { navigation } = props;
  const { info } = props.route.params;
  // const { patientUid } = props.route.params;
  const [imageUri, setImageUri] = useState(null);
  const [editFlg, setEditFlg] = useState(false);
  const [userName, setUserName] = useState("");
  const [email, setEmail] = useState("");
  const [zipcode, setZipcode] = useState("");
  const [cityState, setCityState] = useState("");
  const [tel, setTel] = useState("");
  const [fax, setFax] = useState("");
  const [address, setAddress] = useState("");
  const [description, setDescription] = useState("");
  const [requested, setRequested] = useState(false);

  const validName = isValid('username', userName);
  const validEmail = isValid('email', email);
  const validAddress = isValid('address', address);
  const validCityState = isValid('citystate', cityState);
  const validZipcode = isValid('zipcode', zipcode);
  const validTel = isValid('tel', tel);
  const validFax = isValid('fax', fax);
  const validDescription = isValid('description', description);

  const attorneyInfoDispatch = useDispatch();

  const attorneyInfo = [];

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

  const renderUserDetail = (detail) => {
    let { heading, content, handleName, handleValue, handleLabel, handlePlaceholder, data } = { ...detail };
    console.log("data:", data);
    return (
      <Block style={styles.detail}>
        <Block row>
          <Text color={"grey"}>{heading}</Text>
          <Text color={"red"} style={styles.asteride}>
            *
          </Text>
        </Block>
        <Block>
          <Input
            label={handleLabel}
            value={data ? data : handleValue}
            onChangeText={(res) => {
              handleName(res)
              setSaveEnable()
            }}
            // editable={editFlg}
            placeholder={handlePlaceholder}
            keyboardType="email-address"
            leftIcon=""
            rightIcon=""
            validate
            requested={requested}
            style={styles.valiInput}
          />
        </Block>
      </Block>
    );
  };

  const setSaveEnable = () => {
    if (validEmail && validName && validAddress && validCityState && validZipcode && validTel && validFax) {
      setEditFlg(true);
    }
    else {
      setEditFlg(false);
    }
  }

  const navbar = () => {
    return (
      <Block row style={styles.navbar} center>
        <TouchableOpacity
          onPress={() => navigation.goBack()}
        >
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
          Add Attorney Info
        </Text>
        {/* <TouchableOpacity onPress={() => { setEditFlg(true) }}>
          <Image
            source={require("../assets/icons/editHeaderWhite.png")}
            alt=""
            style={{ marginLeft: width * 0.4 }}
          />
        </TouchableOpacity> */}
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
      attorDescription: description
    });

    console.log("attor-PInfo: ", attorneyInfo);

    attorneyInfoDispatch(attorneyInfoAction(attorneyInfo));

    navigation.goBack();
    // let caseId, attorneyId;
    // try {
    //   await firestore.collection('Cases').doc(patientUid).collection('Case').get().then((querySnapshot) => {
    //     querySnapshot.forEach((doc) => {
    //       caseId = doc.id;
    //     });
    //   });
    //   await firestore.collection('Cases').doc(patientUid).collection('Case').doc(caseId).collection('attorneyInfo').get().then((querySnapshot) => {
    //     querySnapshot.forEach((doc) => {
    //       attorneyId = doc.id;
    //     })
    //   });
    // } catch(e) {
    //   console.log(e);
    // }
    // let newRef = firestore.collection('Cases').doc(patientUid).collection('Case').doc(caseId).collection('attorneyInfo').doc(attorneyId);
    // newRef.set({
    //   address, cityState, email, fax, userName, tel, zipcode, description, reference: newRef
    // })
    // .then( async () => {
    //   const pngRef = storage.ref(`logo/${patientUid}.png`);
    //   await pngRef.put(imageUri);
    //   const url = await pngRef.getDownloadURL();
    //   console.log("FDFD",url);
    //   Alert.alert(
    //     "Success",
    //     "You have successfully created the attorney info",
    //     [
    //       {
    //         text: 'OK',
    //         onPress: () => navigation.navigate("CreateCase")
    //       }
    //     ]
    //   );        
    // })
    // .catch((error) => {
    //   console.log(error);
    // });
  }

  return (
    <Block center flex style={styles.profile}>
      {navbar()}
      <ScrollView vertical={true} showsVerticalScrollIndicator={false}>
        <Block center row style={{ marginTop: 10, top: 10, marginBottom: 20 }}>
          <Block middle>
            <TouchableOpacity
              onPress={() => showModal()}
            >
              { info && info.attorneyAvatar ? (
                <Image
                  source={{ uri: info.attorneyAvatar }}
                  style={{ width: 80, height: 80, borderRadius: 50 }}
                />
              ) : (
                <Image
                  source={imageUri ? { uri: imageUri } : require("../assets/images/userDefault.png")}
                  // source={require("../assets/images/userDefault.png")}
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

        <Block style={styles.userDetail}>
          {renderUserDetail({
            heading: "Full Name",
            handlePlaceholder: "Zulqurnain Haider",
            handleName: setUserName,
            handleValue: userName,
            handleLabel: "Username",
            data: info ? info.attorneyName : null,
          })}
          {renderUserDetail({
            heading: "Email",
            handlePlaceholder: "soreno@gmail.com",
            handleName: setEmail,
            handleValue: email,
            handleLabel: "Email",
            data: info ? info.attorneyEmail : null,
          })}
          {renderUserDetail({
            heading: "Address",
            handlePlaceholder: "Avenue 32",
            handleName: setAddress,
            handleValue: address,
            handleLabel: "Address",
            data: info ? info.attorneyAddress : null,
          })}
          {renderUserDetail({
            heading: "City/State",
            handlePlaceholder: "California,US",
            handleName: setCityState,
            handleValue: cityState,
            handleLabel: "Citystate",
            data: info ? info.attorneyCityState : null,
          })}
          {renderUserDetail({
            heading: "Zip Code",
            handlePlaceholder: "098978",
            handleName: setZipcode,
            handleValue: zipcode,
            handleLabel: "Zipcode",
            data: info ? info.attorneyZip : null,
          })}
          {renderUserDetail({
            heading: "Tel",
            handlePlaceholder: "1208903980",
            handleName: setTel,
            handleValue: tel,
            handleLabel: "Tel",
            data: info ? info.attorneyPhone : null,
          })}
          {renderUserDetail({
            heading: "Fax",
            handlePlaceholder: "090834",
            handleName: setFax,
            handleValue: fax,
            handleLabel: "Fax",
            data: info ? info.attorneyFax : null,
          })}
        </Block>
        <Block row center>
          <TouchableOpacity
            style={[editFlg ? styles.save : styles.saveDisable, info ? styles.noDisplay : styles.display]}
            disabled={!editFlg}
            onPress={() => handleSave()}
          >
            <Text color={"white"} size={16}>
              Save
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.save}
            onPress={() => {
              setEditFlg(false);
              navigation.goBack()
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
            <Text style={{color: '#FFF'}}>Open Camera</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.cameraButton} onPress={openLibrary}>
            <Text style={{color: '#FFF'}}>Open Library</Text>
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
  description: {
    borderRadius: 10,
    borderWidth: 1,
    borderColor: "grey",
    padding: 10,
    width: width * 0.8,
    margin: 10,
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
    paddingLeft: theme.SIZES.BASE,
  },
  valiInput: {
    textTransform: 'capitalize',
    width: '100%',
    borderRadius: 9,
    backgroundColor: 'white',
    fontSize: 14,
    height: 40,
    padding: 10,
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

export default AddAttorney;
