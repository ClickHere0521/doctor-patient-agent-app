import React, { useState } from "react";
import {
  ScrollView,
  StyleSheet,
  TouchableOpacity,
  Image,
  Dimensions,
  View,
  Alert,
  ActivityIndicator,
} from "react-native";
import { Button, Block, Text, theme, Input } from "galio-framework";
import { IMLocalized } from "../src/localization/IMLocalization";
import { materialTheme } from "../constants/";
import { Icon } from "../components/";
import SwitchButton from "switch-button-react-native";
import MapView from 'react-native-maps';
import * as ImagePicker from "expo-image-picker";
import * as firebase from "firebase";
import 'firebase/firestore';
import 'firebase/auth';
import 'firebase/storage';

const firestore = firebase.firestore();
const auth = firebase.auth();
const storage = firebase.storage();
const { width, height } = Dimensions.get("screen");

const CreateDoctorAccount = (props) => {
  const { navigation } = props;
  const [activeSwitch, setActiveSwitch] = useState(1);
  const [imageUri, setImageUri] = useState(null);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [fullname, setFullname ] = useState("");
  const [address, setAddress] = useState("");
  const [description, setDescription] = useState("");
  const [activity, setActivity] = useState(false);

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
          Create Doctor Account
        </Text>
      </Block>
    );
  };

  const handleCreate = async () => {
    if(email && password && fullname && address && description && imageUri)
    {
      setActivity(true);
      auth
        .createUserWithEmailAndPassword(email, password)
        .then( (userCredential) => {
          var uid = userCredential.user.uid;
          firestore.collection('PCDoctors').doc(uid).collection('PCDoctor').doc()
            .set({
              email, password, fullName: fullname, address, description
            })
            .then( async () => {
              setActivity(false);
              const pngRef = storage.ref(`logo/${uid}.png`);
              await pngRef.put(imageUri);
              const url = await pngRef.getDownloadURL();
              console.log("FDFD",url);

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
  }

  return (
    <Block flex style={styles.components}>
      {navbar()}
      <ScrollView showsVerticalScrollIndicator={false}>
        <ActivityIndicator animating={activity} style={{opacity: 0.5}} />
        <Block center>
          <Input
            bgColor="transparent"
            placeholderTextColor={materialTheme.COLORS.PLACEHOLDER}
            borderless
            color="black"
            type="email-address"
            placeholder="Email"
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
            placeholder="Password"
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
                    placeholder="Mark Veronic"
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
                    placeholder="Markveronic@"
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
                    placeholder="Markveronic@"
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
                92/6, 3rd Floor, Outer Ring Road, Chandra Layout
              </Text>
            </Block>
            <Block style={{borderRadius: 10}}>
              <MapView 
                initialRegion={{
                  latitude: 37.78825,
                  longitude: -122.4324,
                  latitudeDelta: 0.0922,
                  longitudeDelta: 0.0421,
                }}
                style={styles.mapView} 
              />
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
    height: height * 0.16,
    paddingTop: theme.SIZES.BASE * 2,
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
});

export default CreateDoctorAccount;
