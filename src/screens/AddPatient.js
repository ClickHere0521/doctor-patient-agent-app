import React, { useState, useEffect } from 'react';
import {
  StyleSheet,
  Dimensions,
  ScrollView,
  Image,
  TouchableOpacity,
  View,
  ActivityIndicator,
  PermissionsAndroid,
  TextInput,
  Alert,
} from 'react-native';
import { Button, Block, Text, theme, Icon } from 'galio-framework';

import { materialTheme } from '../constants';
import { isValid } from '../utils/helpers';
import Input from '../components/InputType2';
import { useDispatch } from 'react-redux';
import { patientInfoAction } from '../store/duck/action';
import auth from '@react-native-firebase/auth';
import firestore from '@react-native-firebase/firestore';
import storage from '@react-native-firebase/storage';
import { Modal } from 'react-native-paper';
import { launchCamera, launchImageLibrary } from 'react-native-image-picker';
import DatePicker from 'react-native-datepicker'
import axios from 'axios';

const { width, height } = Dimensions.get('screen');
const thumbMeasure = (width - 48 - 32) / 3;

const AddPatient = props => {
  const { route, navigation } = props;
  const { editPatient, addPermission, fromCreateCase, category } = route.params;
  const [imageUri, setImageUri] = useState('');
  const [isSave, setIsSave] = useState(false);
  const [userName, setUserName] = useState('');
  const [patientID, setPatientID] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('abcABC123');
  const [dob, setDob] = useState(new Date());
  const [cityState, setCityState] = useState('');
  const [ssn, setSsn] = useState('');
  const [description, setDescription] = useState('');

  const [requested, setRequested] = useState(false);

  const validName = isValid('username', userName);
  const validEmail = isValid('email', email);
  const validDate = isValid('date', dob);
  const validCityState = isValid('citystate', cityState);
  const validSsn = isValid('ssn', ssn);
  const validDescription = isValid('description', description);
  const [spinner, setSpinner] = useState(false);

  const patientInfoDispatch = useDispatch();

  const pInfo = [];
  const [visible, setVisible] = useState(false);

  const hideSpinModal = () => setSpinner(false);
  const showSpinModal = () => setSpinner(true);

  useEffect(() => {
    requestCameraPermission();
  }, []);

  useEffect(() => {
    if (userName != '' && isValid('username', userName) && isValid('email', email))
      setIsSave(true);
    else
      setIsSave(false);
  }, [userName, email]);

  const hideModal = () => setVisible(false);
  const showModal = () => setVisible(true);

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

  const resetState = () => {
    setImageUri('');
    setUserName('');
    setDob(new Date());
    setCityState('');
    setEmail('');
    setSsn('');
    setDescription('');
    setIsSave(false);
    navigation.goBack();
  }

  const navbar = () => {
    return (
      <Block row style={styles.navbar} center>
        <TouchableOpacity style={styles.touchableArea} onPress={() => resetState()}>
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
          style={{ paddingLeft: theme.SIZES.BASE * 0.5 }}
          size={17}
          bold>
          {editPatient ? 'Patient Info' : 'Add Patient'}
        </Text>
      </Block>
    );
  };

  return (
    <Block flex style={styles.profile}>
      {navbar()}
      <ScrollView
        keyboardShouldPersistTaps='handled'
        showsVerticalScrollIndicator={false}
        style={{ marginHorizontal: width * 0.05 }}
      >
        <Block center row style={{ top: height * 0.04 }}>
          <Block middle>
            {category && category.avatar != '' ? (
              <Block>
                <Image
                  source={{ uri: category.avatar }}
                  style={styles.avatar}
                />
              </Block>
            ) : (
              <TouchableOpacity disabled={category} onPress={() => showModal()}>
                {category && category.avatar ? (
                  <Image
                    source={{ uri: category.avatar }}
                    style={styles.avatar}
                  />
                ) : (
                  <Image
                    source={imageUri != '' ? { uri: imageUri } : require("../assets/images/userDefault.png")}
                    style={styles.avatar}
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
            )}
          </Block>
        </Block>
        <Block style={styles.userInfo}>
          <Block row style-st flex flexDirection="row">
            <Block flex={2}>
              <Text style={styles.label} flex>
                Name <Text color={'red'}>*</Text>
              </Text>
            </Block>
            <Block flex={7}>
              <Input
                label="USERNAME"
                value={category ? category.name : userName}
                onChangeText={setUserName}
                placeholder="Name"
                keyboardType="email-address"
                leftIcon=""
                rightIcon=""
                validate
                editable={category ? false : true}
                requested={requested}
                style={styles.valiInput}
              />
            </Block>
          </Block>
          <Block row style-st flex flexDirection="row">
            <Block flex={2}>
              <Text style={{alignSelf: 'flex-start', fontSize: 14}}>
                Date of Birth <Text color={'red'}>*</Text>
              </Text>
            </Block>
            <Block flex={7}>
              {/* <Input
                label="DATE"
                value={handleDob()}
                onChangeText={res => {
                  setDob(res);
                  setSaveEnable();
                }}
                placeholder="MM/DD/YYYY"
                keyboardType="email-address"
                leftIcon=""
                rightIcon=""
                validate
                requested={requested}
                style={styles.valiInput}
                editable={category ? false : true}
              /> */}
              <DatePicker
                style={{ width: width * 0.68, marginBottom: 30 }}
                date={dob}
                mode="date"
                placeholder="select date"
                format="YYYY-MM-DD"
                minDate="1800-05-01"
                maxDate="2500-06-01"
                confirmBtnText="Confirm"
                cancelBtnText="Cancel"
                showIcon={false}
                disabled={category ? true : false}
                customStyles={{ dateInput: { borderRadius: 10, borderColor: "grey" } }}
                onDateChange={(date) => { setDob(date) }}
              />
            </Block>
          </Block>
          <Block row style-st flex flexDirection="row">
            <Block flex={2}>
              <Text style={styles.label}>
                City/State
                {/* <Text color={'red'}>*</Text> */}
              </Text>
            </Block>
            <Block flex={7}>
              <Input
                label="CityState"
                value={category ? category.cityState : cityState}
                onChangeText={setCityState}
                placeholder="NewYork XX"
                keyboardType="email-address"
                leftIcon=""
                rightIcon=""
                validate
                requested={requested}
                style={styles.valiInput}
                editable={category ? false : true}
              />
            </Block>
          </Block>
          <Block row style-st flex flexDirection="row">
            <Block flex={2}>
              <Text style={styles.label}>
                Email <Text color={'red'}>*</Text>
              </Text>
            </Block>
            <Block flex={7}>
              <Input
                label="Email"
                value={category ? category.email : email}
                onChangeText={setEmail}
                keyboardType="email-address"
                placeholder="john0092@email.com"
                leftIcon=""
                rightIcon=""
                validate
                requested={requested}
                style={styles.valiInput}
                editable={category ? false : true}
              />
            </Block>
          </Block>
          <Block row style-st flex flexDirection="row">
            <Block flex={2}>
              <Text style={styles.label}>SSN</Text>
            </Block>
            <Block flex={7}>
              <Input
                label="SSN"
                value={category ? category.SSN : ssn}
                onChangeText={setSsn}
                leftIcon=""
                rightIcon=""
                validate
                placeholder="123456789"
                requested={requested}
                style={styles.valiInput}
                keyboardType="numeric"
                editable={category ? false : true}
              />
            </Block>
          </Block>
        </Block>
        {category ? (
          <></>
        ) : (
          <Block row >
            <TouchableOpacity
              style={isSave ? styles.save : styles.saveDisable}
              disabled={!isSave}
              onPress={async () => {
                if (
                  validEmail &&
                  validName &&
                  dob
                ) {
                  if (!editPatient) {
                    showSpinModal();
                    if (!addPermission) {
                      console.log('email & password signUp');
                      pInfo.push({
                        email: email,
                        password: password,
                        cityState: cityState,
                        dob: dob,
                        email: email,
                        name: userName,
                        ssn: ssn,
                        avatar: imageUri,
                      });
                      console.log('addPatient-PInfo: ', pInfo);
                      patientInfoDispatch(patientInfoAction(pInfo));
                    } else {
                      await axios.post('http://us-central1-amgwf-70a28.cloudfunctions.net/createUser', {
                        email,
                        password,
                      })
                        .then(async res => {
                          let url = '';
                          if (imageUri != '') {
                            const reference = storage().ref(
                              `avatar/${res.data.uid}.png`,
                            ); // Patient Avatar Add to Storage and get Download URL
                            const pathToFile = imageUri;
                            // uploads file
                            await reference.putFile(pathToFile);
                            url = await storage()
                              .ref(`avatar/${res.data.uid}.png`)
                              .getDownloadURL();
                          }

                          firestore()
                            .collection('Patients')
                            .doc(res.data.uid)
                            .set({});
                          firestore()
                            .collection('Patients')
                            .doc(res.data.uid)
                            .collection('Patient')
                            .doc()
                            .set({
                              DOB: firestore.Timestamp.fromDate(new Date(dob)),
                              SSN: ssn,
                              address: '',
                              avatar: url,
                              cityState: cityState,
                              email: email,
                              geoLocation: '',
                              name: userName,
                              phone: '',
                              patientID: res.data.uid,
                            });
                        })
                        .catch(error => {
                          hideSpinModal();
                          Alert(res.status(400).json({ error: error.message }));
                          // console.log('>>>Error>>>', error);
                        });
                    }
                    setRequested(false);
                    hideSpinModal();
                    resetState();
                  } else {
                    setRequested(true);
                  }
                }
              }}>
              <Text color={'white'} size={16}>
                Save
              </Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.save}
              onPress={() => {
                resetState();
              }}>
              <Text color={'white'} size={16}>
                Cancel
              </Text>
            </TouchableOpacity>
          </Block>
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
      <Modal
        visible={spinner}
        onDismiss={hideSpinModal}
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
  profile: {
    // marginTop: Platform.OS === "android" ? height * 0.02 : height * 0.02,
    backgroundColor: 'white',
  },
  optionsButtonText: {
    fontSize: theme.SIZES.BASE * 0.75,
    color: 'white',
    fontWeight: 'normal',
    fontStyle: 'normal',
    letterSpacing: -0.29,
  },
  optionsButton: {
    width: 'auto',
    height: 34,
    paddingHorizontal: theme.SIZES.BASE,
    paddingVertical: 10,
    borderRadius: 3,
    shadowColor: 'rgba(0, 0, 0, 0.1)',
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
    borderColor: 'grey',
    backgroundColor: theme.COLORS.WHITE,
    shadowColor: 'black',
    shadowOffset: { width: 0, height: 0 },
    shadowRadius: 8,
    shadowOpacity: 0.2,
    zIndex: 2,
  },
  userInfo: {
    marginTop: height * 0.08,
    marginBottom: height * 0.05,
    marginHorizontal: width * 0.01,
  },
  profileImage: {
    width: width * 1.1,
    height: 'auto',
  },
  profileContainer: {
    width: width,
    height: 'auto',
    flex: 1,
  },
  profileDetails: {
    paddingTop: theme.SIZES.BASE * 4,
    justifyContent: 'flex-end',
    position: 'relative',
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
    position: 'relative',
    paddingHorizontal: theme.SIZES.BASE,
    paddingVertical: theme.SIZES.BASE,
    marginHorizontal: theme.SIZES.BASE,
    marginTop: -theme.SIZES.BASE,
    marginBottom: 0,
    borderTopLeftRadius: 13,
    borderTopRightRadius: 13,
    backgroundColor: theme.COLORS.WHITE,
    shadowColor: 'black',
    shadowOffset: { width: 0, height: 0 },
    shadowRadius: 8,
    shadowOpacity: 0.2,
    zIndex: 2,
  },
  thumb: {
    borderRadius: 4,
    marginVertical: 4,
    alignSelf: 'center',
    width: thumbMeasure,
    height: thumbMeasure,
  },
  gradient: {
    zIndex: 1,
    left: 0,
    right: 0,
    bottom: 0,
    height: '30%',
    position: 'absolute',
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
    alignSelf: 'flex-start',
    fontSize: 14,
  },
  saveDisable: {
    backgroundColor: 'grey',
    borderRadius: 15,
    width: width * 0.35,
    height: 40,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 10,
    marginHorizontal: 20,
  },
  save: {
    backgroundColor: '#00CE30',
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
    borderColor: 'grey',
    color: 'black',
    padding: 10,
    width: width * 0.8,
    height: height * 0.2,
    margin: 10,
  },
  navbar: {
    backgroundColor: '#6E78F7',
    borderBottomRightRadius: 24,
    borderBottomLeftRadius: 24,
    width: width,
    height: height * 0.1,
    paddingTop: theme.SIZES.BASE,
    paddingLeft: theme.SIZES.BASE * 0.5,
  },
  valiInput: {
    color: "black",
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
  touchableArea: {
    width: 30,
    height: 30,
    justifyContent: 'center',
    alignItems: 'center'
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
  container: {
    flex: 1,
  },
  textInputContainer: {
    flexDirection: 'row',
  },
  textInput: {
    backgroundColor: '#FFFFFF',
    height: 44,
    borderRadius: 5,
    paddingVertical: 5,
    paddingHorizontal: 10,
    fontSize: 15,
    flex: 1,
  },
  poweredContainer: {
    justifyContent: 'flex-end',
    alignItems: 'center',
    borderBottomRightRadius: 5,
    borderBottomLeftRadius: 5,
    borderColor: '#c8c7cc',
    borderTopWidth: 0.5,
  },
  powered: {},
  listView: {},
  row: {
    backgroundColor: '#FFFFFF',
    padding: 13,
    height: 44,
    flexDirection: 'row',
  },
  separator: {
    height: 0.5,
    backgroundColor: '#c8c7cc',
  },
  description: {},
  loader: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    height: 20,
  },
  avatar: {
    width: 80,
    height: 80,
    borderRadius: 50,
    borderColor: '#eee',
    borderWidth: 2
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
});

export default AddPatient;
