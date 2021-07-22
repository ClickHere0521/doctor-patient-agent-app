import React, { useEffect, useState } from "react";
import {
  ScrollView,
  StyleSheet,
  TouchableOpacity,
  Image,
  Dimensions,
  Alert,
  ActivityIndicator,
  PermissionsAndroid,
} from "react-native";
import { Block, Text, theme } from "galio-framework";
import InputEmailPassword from "../components/Input";
import Input from '../components/InputType2';
import { IMLocalized } from "../localization/IMLocalization";
import { Modal } from 'react-native-paper';
import { materialTheme } from "../constants/";
import { Icon } from "../components/";
import MapView, { Marker } from 'react-native-maps';
import { launchCamera, launchImageLibrary } from 'react-native-image-picker';
import { useIsFocused } from '@react-navigation/native';
import { isValid } from '../utils/helpers';
import firestore from '@react-native-firebase/firestore';
import storage from '@react-native-firebase/storage';
import axios from 'axios';
import PhoneInput from 'react-phone-number-input/react-native-input'
import { isValidPhoneNumber } from 'react-phone-number-input'

const { width, height } = Dimensions.get("screen");

const CreateDoctorAccount = (props) => {
  const isFocused = useIsFocused();
  const { navigation, route } = props;
  const { doctor } = route.params;
  const [imageUri, setImageUri] = useState(null);
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [password, setPassword] = useState('');
  const [fullname, setFullname] = useState('');
  const [address, setAddress] = useState('');
  const [description, setDescription] = useState('');
  const [visible, setVisible] = useState(false);
  const [spinner, setSpinner] = useState(false);
  const [isCreatable, setIsCreatable] = useState(false);
  const [isAvatarEdited, setIsAvatarEdited] = useState(false);

  const hideModal = () => setVisible(false);
  const showModal = () => setVisible(true);
  const hideSpinner = () => setSpinner(false);
  const showSpinner = () => setSpinner(true);

  useEffect(() => {
    if (isFocused && !doctor) {
      setImageUri('');
      setEmail('');
      setPassword('');
      setFullname('');
      setAddress('');
      setPhone('');
      setDescription('');
    }
  }, [isFocused]);


  useEffect(() => {
    requestCameraPermission();
  }, []);

  useEffect(() => {
    setImageUri(doctor ? doctor.avatar : null);
    setEmail(doctor ? doctor.email : '');
    setPhone(doctor ? doctor.phone : '');
    setPassword(doctor ? doctor.password : '');
    setFullname(doctor ? doctor.name : '');
    setAddress(doctor ? doctor.address : '');
    setDescription(doctor ? doctor.description : '');
    setIsAvatarEdited(false);
  }, [doctor]);

  useEffect(() => {
    // alert(isValid('address', address))
    if(        
        imageUri &&
        fullname != '' &&
        phone != '' &&
        address != '' &&
        description != '' &&
        isValid('username', fullname) && 
        isValid('email', email) && 
        isValid('address', address) &&  
        isValid('password', password) &&
        phoneValidation('tel', phone) &&
        isValid('description', description)
      ) 
      setIsCreatable(true);
    else
      setIsCreatable(false);
  }, [imageUri, email, phone, password, fullname, address, description]);

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
          if (doctor) setIsAvatarEdited(true);
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
          if (doctor) setIsAvatarEdited(true);
          setImageUri(response.uri);
        }
      },
    );
  };

  const phoneValidation = (phonenumber) => {
    return phone ? (isValidPhoneNumber(phone) ? true : false) : false;
  }

  const navbar = () => {
    return (
      <Block row style={styles.navbar} center>
        <TouchableOpacity style={styles.touchableArea} onPress={() => navigation.goBack()}>
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
          bold
        >
          {doctor ? "Edit Doctor Account" : "Create Doctor Account"}
        </Text>
      </Block>
    );
  };

  const handleCreate = async () => {
    if (email && password && fullname && phone && address && description && imageUri) {
      showSpinner();
      if (doctor) {
        var url;
        //--------- If the user changes his/her avatar ---------//
        if (isAvatarEdited) {
          var uid = doctor.uid;
          const pngRef = storage().ref(`avatar/${uid}.png`);
          // uploads avatar
          await pngRef.putFile(imageUri);
          url = await storage()
            .ref(`avatar/${uid}.png`)
            .getDownloadURL();
        } else {
          url = imageUri;
        }

        // updates info
        firestore().collection('PCDoctors').doc(doctor.uid).update({
          password,
          avatar: url,
          name: fullname,
          phone,
          address,
          description,
        }).then(() => {
          hideSpinner();
          navigation.navigate("Doctors");
        }).catch((error) => console.log(error));
      } else {
        axios.post('http://us-central1-amgwf-70a28.cloudfunctions.net/createUser', {
          email,
          password,
        })
        .then(async(userCredential) => {
          var uid = userCredential.data.uid;
          const pngRef = storage().ref(`avatar/${uid}.png`);
          // uploads file
          await pngRef.putFile(imageUri);
          const url = await storage()
            .ref(`avatar/${uid}.png`)
            .getDownloadURL();
          firestore().collection('PCDoctors').doc(uid)
            .set({
              email, 
              password, 
              name: fullname, 
              address, 
              description, 
              uid, 
              phone,
              avatar: url
            })
            .then(() => {
              hideSpinner();
              navigation.navigate("Doctors");
            })
            .catch((error) => {
              hideSpinner();
              alert(error)
            });
        })
        .catch((error) => {
          hideSpinner();
          // console.log("userCredential ========= ", userCredential.status(400));
          // Alert.alert(userCredential.status(400).json({ error: error.message }));
          alert(error);
        });
      }
    }
  };

  return (
    <Block flex style={styles.components}>
      {navbar()}
      <ScrollView showsVerticalScrollIndicator={false}>
        <Block center>
          <Block row style={{ top: 20 }}>
            <InputEmailPassword
              label="Email"
              value={email}
              onChangeText={setEmail}
              disabled={!doctor ? false : true}
              keyboardType="email-password"
              leftIcon="email"
              rightIcon=""
              validate
              requested={false}
            />
          </Block>
          <Block row style={{ top: 20 }}>
            <InputEmailPassword
              label="Password"
              value={password}
              onChangeText={setPassword}
              keyboardType="password"
              leftIcon="lock"
              rightIcon="eye"
              validate
              requested={false}
            />
          </Block>
        </Block>
        <Block>
          <Text size={18} style={styles.heading}>
            Doctor Info
          </Text>
          <Block center row style={{ marginVertical: 10 }}>
            <Block middle>
              <TouchableOpacity
                onPress={() => showModal()}
              >
                <Image
                  source={imageUri ? { uri: imageUri } : require("../assets/images/userDefault.png")}
                  style={styles.photo}
                />
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
          </Block>
          <Block style={styles.doctorInfo}>
            <Block style={styles.detail}>
              <Block style={styles.interval}>
                <Block row>
                  <Text color={"black"}>Full name</Text>
                  <Text color={"red"}>*</Text>
                </Block>
                <Block>
                  <Input
                    label="Description"
                    value={fullname}
                    onChangeText={setFullname}
                    placeholder="Mark Veronich"
                    leftIcon=""
                    rightIcon=""
                    validate
                    style={styles.valiInput}
                    underlineColorAndroid="black"
                    requested={false}
                  />
                </Block>
              </Block>
              <Block style={styles.interval}>
                <Block row>
                  <Text color={"black"}>Phone</Text>
                  <Text color={"red"}>*</Text>
                </Block>
                <Block>
                  {/* <Input
                    label="Tel"
                    value={phone}
                    onChangeText={setPhone}
                    placeholder="1234567890"
                    leftIcon=""
                    rightIcon=""
                    validate
                    style={styles.valiInput}
                    underlineColorAndroid="black"
                    requested={false}
                  /> */}
                  <PhoneInput
                    placeholder="+1234567890"
                    value={phone}
                    maxLength={16}
                    onChange={setPhone}
                    underlineColorAndroid="black"
                  />
                  <Block>
                    <Text color="red">
                      {
                        phone ? (isValidPhoneNumber(phone) ? undefined : 'Invalid phone number') : ''
                      }</Text>
                  </Block>
                </Block>
              </Block>
              <Block style={styles.interval}>
                <Block row>
                  <Text color={"black"}>Address</Text>
                  <Text color={"red"}>*</Text>
                </Block>
                <Block>
                  <Input
                    label="title"
                    value={address}
                    onChangeText={setAddress}
                    placeholder="1587 West 3rd Avenue Columbus OH USA"
                    leftIcon=""
                    rightIcon=""
                    validate
                    style={styles.valiInput}
                    underlineColorAndroid="black"
                    requested={false}
                  />
                </Block>
              </Block>
              <Block style={styles.interval}>
                <Block row>
                  <Text color={"black"}>Description</Text>
                  <Text color={"red"}>*</Text>
                </Block>
                <Block>
                  <Input
                    label="Description"
                    value={description}
                    onChangeText={setDescription}
                    placeholder="Your description here"
                    leftIcon=""
                    rightIcon=""
                    validate
                    style={styles.valiInput}
                    underlineColorAndroid="black"
                    requested={false}
                  />
                </Block>
              </Block>
            </Block>
            <Block row>
              <Icon
                name="map-marker"
                family="font-awesome"
                color={"#0288D1"}
                style={{ margin: 10 }}
              />
              <Text size={12} color={"grey"} style={{ marginTop: 10 }}>
                {"1587 West 3rd Avenue, Columbus, OH, USA"}{" "}{doctor ? doctor.cityState : "Chicago/IL"}
              </Text>
            </Block>
            <Block style={{ borderRadius: 10 }}>
              <MapView
                region={{
                  latitude: 41.880032,
                  longitude: -87.623177,
                  latitudeDelta: 0.005,
                  longitudeDelta: 0.005,
                }}
                style={styles.mapView}
              >
                <Marker
                  coordinate={{
                    latitude: 41.880032,
                    longitude: -87.623177,
                  }}
                  title={doctor ? `${doctor.address} ${doctor.city_state}` : null}
                  onDragEnd={(e) => {
                    console.log("dragEnd", e.nativeEvent.coordinate);
                  }}
                />
              </MapView>
            </Block>
          </Block>
          <Block center>
            <TouchableOpacity style={[styles.saveBtn, isCreatable ? { backgroundColor: '#00CE30' } : { backgroundColor: 'grey' }]} disabled={!isCreatable} onPress={() => handleCreate()}>
              <Text color={"white"} size={18}>
                {doctor ? 'Save' : 'Create'}
              </Text>
            </TouchableOpacity>
          </Block>
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
  components: {
    paddingBottom: 50,
    paddingHorizontal: width * 0.05,
    backgroundColor: "white",
  },
  mapView: {
    width: width * 0.8,
    height: 150,
    margin: width * 0.01,
    alignSelf: "center"
  },
  emailPass: {
    padding: 4,
  },
  valiInput: {
    width: '100%',
    borderRadius: 9,
    backgroundColor: 'white',
    fontSize: 14,
    height: 40,
    padding: 10,
  },
  heading: {
    marginVertical: 20,
  },
  doctorInfo: {
    padding: 4,
  },
  detail: {
    borderRadius: 20,
    borderColor: "#EDEDED",
    borderWidth: 1,
    paddingHorizontal: 24,
    paddingTop: 30,
    marginVertical: 10,
  },
  asteride: {
    position: "absolute",
    left: theme.SIZES.BASE * 5,
  },
  saveBtn: {
    justifyContent: "center",
    alignItems: "center",
    width: 140,
    height: 36,
    borderRadius: 20,
    marginVertical: 20,
  },
  touchableArea: {
    width: 30,
    height: 30,
    justifyContent: 'center',
    alignItems: 'center'
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
  input: {
    marginTop: theme.SIZES.BASE * 0.5,
    width: width * 0.8,
    backgroundColor: "#EFEFEF",
    color: "black",
    shadowColor: "grey",
    shadowRadius: 20,
    elevation: 2,
  },
  name: {
    marginTop: theme.SIZES.BASE * 0.5,
    width: width * 0.8,
    color: "black",
    borderBottomColor: "grey",
    borderBottomWidth: 1,
  },
  interval: {
    paddingBottom: 10,
  },
  mapView: {
    width: width * 0.8,
    height: 150,
    margin: width * 0.01,
    alignSelf: "center"
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

export default CreateDoctorAccount;
