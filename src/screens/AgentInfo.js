import React, { useEffect, useState } from "react";
import {
  StyleSheet,
  Dimensions,
  ScrollView,
  Image,
  TouchableOpacity,
  Alert,
  PermissionsAndroid,
  ActivityIndicator,
} from "react-native";
import { Button, Block, Text, theme, Icon } from "galio-framework";
import { Modal } from 'react-native-paper';
import { materialTheme } from "../constants";
import {launchCamera, launchImageLibrary} from 'react-native-image-picker';
import { IMLocalized } from "../localization/IMLocalization";
import { isValid } from '../utils/helpers';
import Input from '../components/InputType2';
import firestore from '@react-native-firebase/firestore';
import auth from '@react-native-firebase/auth';
import storage from '@react-native-firebase/storage';
import PhoneInput from 'react-phone-number-input/react-native-input'
import { isValidPhoneNumber } from 'react-phone-number-input'

const { width, height } = Dimensions.get("screen");
const thumbMeasure = (width - 48 - 32) / 3;

const AgentInfo = (props) => {
  const { navigation } = props;
  const [imageUri, setImageUri] = useState("");
  const [fullname, setFullname] = useState("");
  const [email, setEmail] = useState("");
  const [tel, setTel] = useState("");
  const [visible, setVisible] = useState(false);
  const [isAvatarEdited, setIsAvatarEdited] = useState(false);
  const [spinner, setSpinner] = useState(false);
  const [isSave, setIsSave] = useState(true);

  const hideModal = () => setVisible(false);
  const showModal = () => setVisible(true);
  const hideSpinner = () => setSpinner(false);
  const showSpinner = () => setSpinner(true);

  useEffect(() => {
    requestCameraPermission();
  }, []);

  useEffect(() => {
    const fetchData = async () => {
      const agentUid = auth().currentUser.uid;
      try {
        firestore().collection('Agents').doc('6hQ6yTAGNXNihOuFfQku05BK1SJ2').collection('BusinessAgent').doc(agentUid).get()
          .then((doc) => {
            setFullname(doc.data().Name);
            setEmail(doc.data().email);
            setTel(doc.data().Phone);
            setImageUri(doc.data().avatar);
          })
          .catch((error) => {
            console.log(error);
          });
      } catch (e) {
        console.log(e);
      }
    }
    fetchData();    
  }, []);

  useEffect(() => {
    if (isValid('username', fullname) && phoneValidation(tel) ) 
      setIsSave(true);
    else 
      setIsSave(false);
  }, [fullname, tel]);

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
          setIsAvatarEdited(true);
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
          setIsAvatarEdited(true);
          setImageUri(response.uri);
        }
      },
    );
  };

  const navbar = () => {
    return (
      <Block>
        <Block row style={styles.navbar} center>
          <TouchableOpacity style={styles.touchableArea} onPress={() => navigation.openDrawer()}>
            <Icon
              name="align-justify"
              family="font-awesome"
              color="black"
              size={16}
              style={styles.chevronLeft}
            />
          </TouchableOpacity>
          <Text
            color="black"
            style={{ paddingLeft: theme.SIZES.BASE * 0.5 }}
            size={16}
            fontWeight="semiBold"
          >
            Agent Info
            {/* {IMLocalized("Agent Info")} */}
          </Text>
        </Block>
        <Block style={{ borderTopWidth: 1, borderColor: "white" }}></Block>
      </Block>
    );
  };

  const phoneValidation = (phonenumber) => {
    console.log(tel ? (isValidPhoneNumber(tel) ? true : false) : false);
    return tel ? (isValidPhoneNumber(tel) ? true : false) : false;
  }

  const handleSave = async () => {
    const agentUid = auth().currentUser.uid;
    var url;
    showSpinner();

    //----------- Avatar Upload ------------//
    if (isAvatarEdited) {
      const pngRef = storage().ref(`avatar/${agentUid}.png`);
      await pngRef.putFile(imageUri);
      url = await storage()
        .ref(`avatar/${agentUid}.png`)
        .getDownloadURL();
    } else {
      url = imageUri;
    }

    //----------- Firestore Update -----------//
    firestore().collection('Agents').doc('6hQ6yTAGNXNihOuFfQku05BK1SJ2').collection('BusinessAgent').doc(agentUid)
      .update({
        email, Name: fullname, Phone: tel, avatar: url,
      })
      .then(() => {
        hideSpinner();
      })
      .catch((error) => {
        console.log(error);
      });
    setIsSave(false);
  };

  return (
    <Block center flex style={styles.profile}>
      {navbar()}
      <ScrollView vertical={true} showsVerticalScrollIndicator={false}>
        <Block center row style={{ marginTop: theme.SIZES.BASE }}>
          <Block middle>
            <TouchableOpacity onPress={() => showModal()}>
              <Image
                source={imageUri ? { uri: imageUri } : require("../assets/images/userDefault.png")}
                style={styles.photo}
              />
              <Block style={styles.photoPick}>
                <Icon
                  name="camera"
                  family="font-awesome"
                  color="#555"
                  size={16}
                />
              </Block>
            </TouchableOpacity>
          </Block>
        </Block>
        <Block style={styles.userInfo}>
          <Text style={styles.label}>
            Full Name <Text color={"red"}>*</Text>
          </Text>
          <Input
            label="FULLNAME"
            value={fullname}
            onChangeText={setFullname}
            placeholder="Mark Veronich"
            leftIcon=""
            rightIcon=""
            validate
            style={styles.valiInput}
            underlineColorAndroid="black"
          />
          <Text style={styles.label}>
            Email <Text color={"red"}>*</Text>
          </Text>
          <Input
            label="Email"
            value={email}
            placeholder={"workforceAgent@gmail.com"}
            editable={false}
            keyboardType="email-address"
            leftIcon=""
            rightIcon=""
            validate
            style={styles.valiInput}
            underlineColorAndroid="black"
          />
          <Text style={styles.label}>
            Tel <Text color={"red"}>*</Text>
          </Text>
          {/* <Input
            label="Tel"
            value={tel}
            onChangeText={setTel}
            placeholder={"1234567890"}
            leftIcon=""
            rightIcon=""
            validate
            style={styles.valiInput}
            underlineColorAndroid="black"
          /> */}
          <PhoneInput
                placeholder="+1234567890"
                value={tel}
                maxLength={16}
                onChange={setTel}
                underlineColorAndroid="black"
                />
          <Block>
            <Text color="red">
            {
              tel ? (isValidPhoneNumber(tel) ? undefined : 'Invalid phone number') : ''
            }</Text>
          </Block>
          <Block row center>
            <Button
              center
              shadowless
              disabled={!isSave}
              color={isSave ? "#6E78F7" : "#666"}
              textStyle={styles.optionsButtonText}
              style={styles.optionsButton}
              onPress={() => handleSave()}
            >
              SAVE
            </Button>
          </Block>
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
      <Modal
        visible={spinner}
        onDismiss={hideSpinner}
        contentContainerStyle={styles.modal}
        dismissable={false}>
        <Text size={18} color="black">
          Saving ...
        </Text>
        <ActivityIndicator size={50} color="#6E78F7" />
      </Modal>
    </Block>
  );
};

const styles = StyleSheet.create({
  profile: {},
  optionsButtonText: {
    fontSize: 14,
    color: "white",
    fontWeight: "normal",
    fontStyle: "normal",
    letterSpacing: -0.29,
  },
  optionsButton: {
    width: 100,
    height: 30,  
    borderRadius: 20,
    shadowColor: "rgba(0, 0, 0, 0.1)",
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 4,
    shadowOpacity: 1,
    marginBottom: 20,
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
    paddingHorizontal: width * 0.05,
    marginTop: height * 0.04,
    marginBottom: height * 0.05,
    marginHorizontal: width * 0.01,
    borderRadius: 13,
    backgroundColor: theme.COLORS.WHITE,
    shadowColor: "black",
    shadowOffset: { width: 0, height: 0 },
    shadowRadius: 8,
    shadowOpacity: 0.2,
    elevation: 3,
    zIndex: 2,
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
    paddingTop: 30,
    alignSelf: "flex-start",
  },
  navbar: {
    backgroundColor: "white",
    width: width,
    height: height * 0.1,
    paddingTop: theme.SIZES.BASE * 2,
    paddingLeft: theme.SIZES.BASE * 0.5,
    borderBottomWidth: 1,
    borderColor: "rgba(112, 112, 112, 0.1)",
  },
  valiInput: {
    width: '100%',
    borderRadius: 9,
    backgroundColor: 'white',
    fontSize: 14,
    height: 40,
    padding: 10,
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
  cameraButton: {
    width: width * 0.5,
    height: height * 0.07,
    backgroundColor: '#6E78F7',
    borderRadius: 25,
    alignItems: 'center',
    justifyContent: 'center',
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

export default AgentInfo;
