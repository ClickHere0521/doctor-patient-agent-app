import React, { useEffect, useState } from "react";
import {
  StyleSheet,
  Dimensions,
  ScrollView,
  Image,
  TouchableOpacity,
  Alert,
} from "react-native";
import { Button, Block, Text, theme, Icon } from "galio-framework";

import { materialTheme } from "../constants";
import SwitchButton from "switch-button-react-native";
import { IMLocalized } from "../src/localization/IMLocalization";
import * as ImagePicker from "expo-image-picker";
import { isValid } from '../src/utils/helpers';
import Input from '../components/InputType2';
import * as firebase from "firebase";
import 'firebase/firestore';
import 'firebase/auth';
import 'firebase/storage';

const { width, height } = Dimensions.get("screen");
const thumbMeasure = (width - 48 - 32) / 3;

const AgentInfo = (props) => {
  const { navigation } = props;
  const [activeSwitch, setActiveSwitch] = useState(1);
  const [imageUri, setImageUri] = useState(null);
  const firestore = firebase.firestore();
  const auth = firebase.auth();
  const storage = firebase.storage();

  const handleAvatar = (val) => {
    setActiveSwitch(val);
    if (val == 2) pickImage();
    else setImageUri(null);
  };

  const [editFlg, setEditFlg] = useState(false);
  const [fullname, setFullname] = useState("");
  const [email, setEmail] = useState("");
  const [tel, setTel] = useState("");
  const [address, setAddress] = useState("");
  const [requested, setRequested] = useState(false);
  const validName = isValid('fullname', fullname);
  const validEmail = isValid('email', email);
  const validTel = isValid('tel', tel);
  const validAddress = isValid('address', address);

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
      <Block>
        <Block row style={styles.navbar} center>
          <TouchableOpacity onPress={() => navigation.openDrawer()}>
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
            style={{ paddingLeft: theme.SIZES.BASE }}
            size={22}
            fontWeight="semiBold"
          >
            {IMLocalized("Agent Info")}
          </Text>
        </Block>
        <Block style={{ borderTopWidth: 1, borderColor: "white" }}></Block>
      </Block>
    );
  };

  const handleSave = async () => {
    const agentUid = auth.currentUser.uid;

    if (editFlg == true) {
      if (validName && validEmail && validTel && validAddress) {
        let businessAgentId;
        try {
          await firestore.collection('Agents').doc(agentUid).collection('BusinessAgent').get().then((querySnapshot) => {
            querySnapshot.forEach((doc) => {
              businessAgentId = doc.id;
            });
          });
        } catch(e) {
          console.log(e);
        }
        let newRef = firestore.collection('Agents').doc(agentUid).collection('BusinessAgent').doc(businessAgentId);
        newRef.set({
          email, fullName: fullname, phone: tel, location: address, role: "agent"
        })
        .then( async () => {
          const pngRef = storage.ref(`logo/${agentUid}.png`);
          await pngRef.put(imageUri);
          const url = await pngRef.getDownloadURL();
          console.log("FDFD",url);

          Alert.alert(
            "Success",
            "You have successfully edited the agent info",
            [
              {
                text: 'OK',
                onPress: () => {}
              }
            ]
          );        
        })
        .catch((error) => {
          console.log(error);
        });
          setEditFlg(false)
          setRequested(false);
        }
      else {
        setRequested(true);
      }
    }
  };

  useEffect(() => {
    const fetchData = async () => {
      const agentUid = auth.currentUser.uid;
      try {
        let businessAgentId;
        try {
          await firestore.collection('Agents').doc(agentUid).collection('BusinessAgent').get().then((querySnapshot) => {
            querySnapshot.forEach((doc) => {
              businessAgentId = doc.id;
            });
          });
        } catch(e) {
          console.log(e);
        }
        firestore.collection('Agents').doc(agentUid).collection('BusinessAgent').doc(businessAgentId).get()
          .then((doc) => {
            setFullname(doc.data().fullName);
            setEmail(doc.data().email);
            setTel(doc.data().phone);
            setAddress(doc.data().location);
            // console.log(`agent data ${doc.data()}`);
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

  return (
    <Block center flex style={styles.profile}>
      {navbar()}
      <ScrollView vertical={true} showsVerticalScrollIndicator={false}>
        <Block center row style={{ marginTop: theme.SIZES.BASE * 3 }}>
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

          <Text style={styles.label}>
            Full Name <Text color={"red"}>*</Text>
          </Text>
          <Block flex flexDirection="column">
            <Block flex={1}>
              <Input
                label="FULLNAME"
                value={fullname}
                onChangeText={setFullname}
                editable={editFlg}
                placeholder={fullname}
                leftIcon=""
                rightIcon=""
                validate
                requested={requested}
                style={styles.valiInput}
                underlineColorAndroid="black"
              />
            </Block>
          </Block>
          <Text style={styles.label}>
            Email <Text color={"red"}>*</Text>
          </Text>

          <Input
            label="Email"
            value={email}
            onChangeText={setEmail}
            placeholder={email}
            editable={editFlg}
            keyboardType="email-address"
            leftIcon=""
            rightIcon=""
            validate
            requested={requested}
            style={styles.valiInput}
            underlineColorAndroid="black"
          />
          <Text style={styles.label}>
            Tel <Text color={"red"}>*</Text>
          </Text>
          <Block style={{ width: '100%' }}>
            <Input
              label="Tel"
              value={tel}
              onChangeText={setTel}
              placeholder={tel}
              editable={editFlg}
              leftIcon=""
              rightIcon=""
              validate
              requested={requested}
              style={styles.valiInput}
              underlineColorAndroid="black"
            />
          </Block>
          <Text style={{ paddingTop: 10, alignSelf: "flex-start" }}>
            Location <Text color={"red"}>*</Text>
          </Text>

          <Input
            label="Address"
            value={address}
            onChangeText={setAddress}
            editable={editFlg}
            placeholder={address}
            leftIcon=""
            rightIcon=""
            validate
            requested={requested}
            style={styles.valiInput}
            underlineColorAndroid="black"
          />
          <Block row style={{ alignSelf: "flex-end" }}>
            <Button
              center
              shadowless
              color="#6E78F7"
              textStyle={styles.optionsButtonText}
              style={styles.optionsButton}
              onPress={() => {
                setEditFlg(true);
              }}
            >
              EDIT
            </Button>
            <Button
              center
              shadowless
              color="#6E78F7"
              textStyle={styles.optionsButtonText}
              style={styles.optionsButton}
              onPress={() => handleSave()}
            >
              SAVE
            </Button>
          </Block>
        </Block>
      </ScrollView>
    </Block>
  );
};

const styles = StyleSheet.create({
  profile: {},
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
    paddingHorizontal: width * 0.03,
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
    paddingTop: 10,
    alignSelf: "flex-start",
  },
  navbar: {
    backgroundColor: "white",
    width: width,
    height: height * 0.16,
    paddingTop: theme.SIZES.BASE * 2,
    paddingLeft: theme.SIZES.BASE,
    borderBottomWidth: 1,
    borderColor: "rgba(112, 112, 112, 0.1)",
  },
  valiInput: {
    textTransform: 'capitalize',
    width: '100%',
    borderRadius: 9,
    backgroundColor: 'white',
    fontSize: 14,
    height: 40,
    padding: 10,
  }
});

export default AgentInfo;
