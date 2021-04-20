import React, { useState } from "react";
import {
  ScrollView,
  StyleSheet,
  TouchableOpacity,
  TouchableWithoutFeedback,
  Image,
  ImageBackground,
  Dimensions,
} from "react-native";
import { Button, Block, Text, Input, theme } from "galio-framework";
import { materialTheme, products, Images, tabs } from "../constants/";
import {
  Select,
  Icon,
  Header,
  Product,
  Switch,
  Tabs,
  ListItem,
} from "../components/";
import { launchCamera, launchImageLibrary } from "react-native-image-picker";
import { SliderBox } from "react-native-image-slider-box";
import SvgUri from "expo-svg-uri";

const { width, height } = Dimensions.get("screen");

const Components = (props) => {
  const { navigation } = props;
  // const [ imageSource, setImageSource ] = useState([
  //   "https://source.unsplash.com/1024x768/?nature",
  //   "https://source.unsplash.com/1024x768/?water",
  //   "https://source.unsplash.com/1024x768/?tree",
  // ]);
  const [imageSource, setImageSource] = useState(null);
  const options = {
    title: "Load Photo",
    customButtons: [
      { name: "button_id_1", title: "CustomButton 1" },
      { name: "button_id_2", title: "CustomButton 2" },
    ],
    storageOptions: {
      skipBackup: true,
      path: "images",
    },
  };

  const showCamera = () => {
    launchCamera(options, (response) => {
      if (response.error) {
        console.log("LaunchCamera Error: ", response.error);
      } else {
        setImageSource(response.uri);
      }
    });
  };

  // const showImagePicker = () => {
  //   ImagePicker.showImagePicker(options, (response) => {
  //     console.log("Response = ", response);

  //     if (response.didCancel) {
  //       console.log("User cancelled image picker");
  //     } else if (response.error) {
  //       console.log("ImagePicker Error: ", response.error);
  //     } else if (response.customButton) {
  //       console.log("User tapped custom button: ", response.customButton);
  //       Alert.alert(response.customButton);
  //     } else {
  //       // You can also display the image using data:
  //       // const source = { uri: 'data:image/jpeg;base64,' + response.data };
  //       setImageSource(response.uri);
  //     }
  //   });
  // };

  return (
    <Block flex>
      <ScrollView
        style={styles.components}
        showsVerticalScrollIndicator={false}
      >
        <TouchableOpacity 
          onPress={() => navigation.goBack()}
          style={styles.backIcon}
        >
          <Icon
            name="chevron-left"
            family="font-awesome"            
          />
        </TouchableOpacity>
        <Block center>
          <Image
            source={require("../assets/images/patient1.png")}
            alt=""
            style={styles.patientImage}
          />
          <Image
            source={require("../assets/images/ok.png")}
            alt=""
            style={styles.statusImage}
          />
        </Block>
        <Block center>
          <Text size={24}>Zain Haider</Text>
          <Block row>
            <Text size={14}>ui/ux/interaction designer</Text>
            <SvgUri
              width="20"
              height="20"
              source={require("../assets/icons/edit.svg")}
              style={{ position: "absolute", right: -30 }}
            />
          </Block>
          {imageSource ? (
            <Block center style={styles.slider}>
              <SliderBox
                images={imageSource}
                dotColor="#FFEE58"
                inactiveDotColor="#90A4AE"
                // sliderBoxHeight={200}
                // sliderBoxWidth={200}
                parentWidth={250}
                ImageComponentStyle={{ borderRadius: 15, width: "100%" }}
                dotStyle={{
                  width: 15,
                  height: 15,
                  borderRadius: 15,
                  marginHorizontal: 10,
                  padding: 0,
                  margin: 0,
                }}
                onCurrentImagePressed={(index) =>
                  console.warn(`image ${index} pressed`)
                }
                currentImageEmitter={(index) =>
                  console.warn(`current pos is: ${index}`)
                }
              />
            </Block>
          ) : (
            <Block style={styles.camera}>
              <SvgUri
                width="65"
                height="65"
                source={require("../assets/icons/camera_plus.svg")}
                style={{ position: "absolute", top: 90, left: 94 }}
              />
            </Block>
          )}
          {/* <TouchableOpacity onPress={() => showCamera()} style={styles.takePhoto}>
            <Text>Take Photo</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={() => showImagePicker()} style={styles.takePhoto}>
            <Text>Load Photo</Text>
          </TouchableOpacity> */}
        </Block>
        <Block center row style={styles.doctor}>
          <Block center style={(styles.doctorItem, { paddingLeft: 30 })}>
            <Image
              source={require("../assets/images/grayscale-photo-of-man2.png")}
              alt=""
              style={styles.patientImage}
            />
            <Image
              source={require("../assets/images/ok.png")}
              alt=""
              style={styles.statusImage}
            />
          </Block>
          <Block style={styles.doctorItem}>
            <Text size={24}>Dr. Adila Tahir</Text>
            <Text size={14}>M.B.B.S, F.C.P.S. (Gynecology)</Text>
          </Block>
          <Block style={(styles.doctorItem, { paddingRight: 16 })}>
            <TouchableOpacity 
              style={styles.profileBtn}
              onPress={() => navigation.navigate("DoctorDetail")}  
            >
              <Text color={"white"}>Profile</Text>
            </TouchableOpacity>
          </Block>
        </Block>
        <Block center>
          <Text size={16} style={styles.text}>
            Case start time：2020.09.23
          </Text>
          <Block row>
            <Block style={{ marginLeft: 30 }}>
              <Block row>
                <SvgUri
                  width="25"
                  height="25"
                  source={require("../assets/icons/rect_check.svg")}
                  style={{
                    position: "absolute",
                    marginLeft: -16,
                    marginTop: 6,
                  }}
                />
                <Text size={16} style={styles.text}>
                  New case
                </Text>
              </Block>
              <Block row>
                <SvgUri
                  width="25"
                  height="25"
                  source={require("../assets/icons/rect_check.svg")}
                  style={{
                    position: "absolute",
                    marginLeft: -16,
                    marginTop: 6,
                  }}
                />
                <Text size={16} style={styles.text}>
                  Waiting schedule
                </Text>
              </Block>
              <Block row>
                <SvgUri
                  width="25"
                  height="25"
                  source={require("../assets/icons/rect_check.svg")}
                  style={{
                    position: "absolute",
                    marginLeft: -16,
                    marginTop: 6,
                  }}
                />
                <Text size={16} style={styles.text}>
                  Scheduled
                </Text>
              </Block>
            </Block>
            <Block style={{ marginLeft: 30 }}>
              <Block row>
                <SvgUri
                  width="25"
                  height="25"
                  source={require("../assets/icons/rect_check.svg")}
                  style={{
                    position: "absolute",
                    marginLeft: -16,
                    marginTop: 6,
                  }}
                />
                <Text size={16} style={styles.text}>
                  Treatment
                </Text>
              </Block>
              <Block row>
                <SvgUri
                  width="25"
                  height="25"
                  source={require("../assets/icons/rect_check.svg")}
                  style={{
                    position: "absolute",
                    marginLeft: -16,
                    marginTop: 6,
                  }}
                />
                <Text size={16} style={styles.text}>
                  Dashboard
                </Text>
              </Block>
              <Block row>
                <SvgUri
                  width="25"
                  height="25"
                  source={require("../assets/icons/rect_check.svg")}
                  style={{
                    position: "absolute",
                    marginLeft: -16,
                    marginTop: 6,
                  }}
                />
                <TouchableOpacity
                  onPress={() => navigation.navigate("AgentReview")}
                >
                  <Text color={"#6E78F7"} size={16} style={styles.text}>
                    Treatment Review
                  </Text>
                </TouchableOpacity>
              </Block>
            </Block>
          </Block>
        </Block>
      </ScrollView>
    </Block>
  );
};

const styles = StyleSheet.create({
  components: {
    paddingTop: theme.SIZES.BASE * 6,
    backgroundColor: "white",
  },
  patientImage: {
    width: 60,
    height: 60,
  },
  statusImage: {
    position: "absolute",
    right: 0,
  },
  takePhoto: {
    borderWidth: 1,
    borderRadius: 8,
    borderColor: "#CCCCCC",
    paddingVertical: 8,
    paddingHorizontal: 32,
    marginTop: 16,
  },
  photo: {
    width: 200,
    height: 200,
    borderRadius: 8,
  },
  doctor: {
    paddingVertical: 14,
    borderRadius: 40,
    borderWidth: 1,
    borderColor: "#CCCCCC",
    marginTop: theme.SIZES.BASE * 18,
  },
  doctorItem: {
    marginHorizontal: 10,
  },
  profileBtn: {
    borderRadius: 20,
    backgroundColor: "#00CE30",
    paddingVertical: 4,
    paddingHorizontal: 10,
  },
  text: {
    marginHorizontal: 10,
    marginVertical: 10,
  },
  camera: {
    backgroundColor: "#E7F0FF",
    borderRadius: 30,
    marginVertical: theme.SIZES.BASE * 4,
    width: 250,
    height: 250,
    position: "absolute",
  },
  slider: {
    position: "absolute",
    marginTop: theme.SIZES.BASE * 4,
  },
  backIcon: {
    position: 'absolute', 
    marginLeft: theme.SIZES.BASE * 2
  }
});

export default Components;
