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
import {  Block, Text, theme, Input } from "galio-framework";
import { IMLocalized } from "../localization/IMLocalization";
import { Modal } from 'react-native-paper';
import { materialTheme } from "../constants/";
import { Icon } from "../components/";
import MapView, { Marker } from 'react-native-maps';
import { patient } from "../store/duck/reducers";
import {launchCamera, launchImageLibrary} from 'react-native-image-picker';

const { width, height } = Dimensions.get("screen");

const CreateDoctorAccount = (props) => {
  const { navigation, route } = props;
  let { doctor } = route.params;
  const [imageUri, setImageUri] = useState(null);
  const [email, setEmail] = useState("fdsfds");
  const [password, setPassword] = useState("");
  const [fullname, setFullname ] = useState("");
  const [address, setAddress] = useState("");
  const [description, setDescription] = useState("");
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
        console.log('====================',response.uri, response.fileName)
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
        console.log('====================',response.uri, response.fileName)
        setImageUri(response.uri);
      },
    );
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
          {doctor ? "Edit Doctor Account" : "Create Doctor Account"}
        </Text>
      </Block>
    );
  };

  const handleCreate = () => {
    if(email && password && fullname && address && description && imageUri)
    {
      auth()
        .createUserWithEmailAndPassword(email, password)
        .then( async (userCredential) => {
          var uid = userCredential.user.uid;
          const pngRef = storage.ref(`avatar/${uid}.png`);
          await pngRef.put(imageUri);
          const url = await pngRef.getDownloadURL();
          firestore.collection('PCDoctors').doc(uid).set({});
          firestore.collection('PCDoctors').doc(uid).collection('PCDoctor').doc()
            .set({
              email, password, name: fullname, address, description, avatar: url, timeSlot: {
                Monday: { a: '0', b: '0', c: '0'},
                Tuesday: { a: '0', b: '0', c: '0'},
                Wednesday: { a: '0', b: '0', c: '0'},
                Thursday: { a: '0', b: '0', c: '0'},
                Friday: { a: '0', b: '0', c: '0'},
                Saturday: { a: '0', b: '0', c: '0'},
                Sundy: { a: '0', b: '0', c: '0'},
              }
            })
            .then(() => {

              Alert.alert(
                "Success",
                "You have successfully created a new doctor account",
                [
                  {
                    text: "OK",
                    onPress: () => {}
                  }
                ]
              );
            })
            .catch((error) => console.log(error));
        })
        .catch((error) => {
          console.log(error);
        });
    }
  };

  return (
    <Block flex style={styles.components}>
      {navbar()}
      <ScrollView showsVerticalScrollIndicator={false}>
        <Block center>
          <Input
            bgColor="transparent"
            placeholderTextColor={materialTheme.COLORS.PLACEHOLDER}
            borderless
            color="black"
            type="email-address"
            placeholder={doctor ? doctor.email : "Email" }           
            autoCapitalize="none"
            style={styles.input}            
            onChangeText={e => setEmail(e)}
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
          <Input
            bgColor="transparent"
            placeholderTextColor={materialTheme.COLORS.PLACEHOLDER}
            borderless
            color="black"
            password
            viewPass
            placeholder={doctor ? doctor.password : "Password"}
            autoCapitalize="none"
            style={styles.input}
            onChangeText={e => setPassword(e)}
            iconContent={
              <Icon
                size={16}
                style={{ marginRight: theme.SIZES.BASE }}
                color="black"
                name="key"
                family="font-awesome"
              />
            }
          />
        </Block>
        <Block>
          <Text size={18} style={styles.heading}>
            Doctor Info
          </Text>
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
                    source={doctor ? { uri: doctor.avatar } : require("../assets/images/userDefault.png") }
                    style={{ width: 80, height: 80, borderRadius: 50 }}
                  />
                )}
              </TouchableOpacity>
              <Icon
                name="camera"
                family="font-awesome"
                color="#666"
                size={24}
                style={{position: 'absolute', bottom: 4, right: 4}}
              />
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
                    bgColor="transparent"
                    placeholderTextColor={materialTheme.COLORS.PLACEHOLDER}
                    borderless
                    color="black"
                    placeholder={doctor ? doctor.name : "Mark Veronich"}
                    onChangeText={e => setFullname(e)}
                    autoCapitalize="none"
                    style={styles.name}
                  />
                </Block>
              </Block>
              <Block style={styles.interval}>
                <Block row>
                  <Text color={"black"}>Address</Text>
                  <Text color={"red"}>*</Text>
                </Block>
                <Block>
                  <Input
                    bgColor="transparent"
                    placeholderTextColor={materialTheme.COLORS.PLACEHOLDER}
                    borderless
                    color="black"
                    placeholder={doctor ? doctor.address : "1587 West 3rd Avenue, Columbus, OH, USA"}
                    onChangeText={e => setAddress(e)}
                    autoCapitalize="none"
                    style={styles.name}
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
                    bgColor="transparent"
                    placeholderTextColor={materialTheme.COLORS.PLACEHOLDER}
                    borderless
                    color="black"
                    placeholder={doctor ? doctor.description : "description here"}
                    onChangeText={e => setDescription(e)}
                    autoCapitalize="none"
                    style={styles.name}
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
                {doctor ? doctor.address : "1587 West 3rd Avenue, Columbus, OH, USA"}{" "}{doctor ? doctor.city_state : "Chicago/IL"}
              </Text>
            </Block>
            <Block style={{borderRadius: 10}}>
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
          <Block center style={styles.saveBtn}>
            <TouchableOpacity onPress={() => handleCreate()}>
              <Text color={"white"} size={18}>
                Create
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
    paddingVertical: 20,
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
    backgroundColor: "#00CE30",
    marginVertical: 20,
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
    paddingBottom: 20,
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
});

export default CreateDoctorAccount;
