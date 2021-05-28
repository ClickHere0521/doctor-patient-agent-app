import React, { useState, useEffect } from "react";
import {
  ScrollView,
  StyleSheet,
  Dimensions,
  TouchableHighlight,
  TouchableOpacity,
  ActivityIndicator,
  Alert,
  Platform,
  PermissionsAndroid,
} from "react-native";
import { useSelector } from "react-redux";
import { Button, Block, Text, theme } from "galio-framework";
import { Icon } from "../components";
import { IMLocalized } from "../localization/IMLocalization";
import firestore from '@react-native-firebase/firestore';
import LinearGradient from 'react-native-linear-gradient';
import storage from '@react-native-firebase/storage';
import { Modal } from 'react-native-paper';
import {launchCamera, launchImageLibrary} from 'react-native-image-picker';
import RNFetchBlob from 'rn-fetch-blob';

const { width, height } = Dimensions.get("screen");
const cardWidth = theme.SIZES.BASE * 4;

const PatientCaseFile = (props) => {
  const userRole = useSelector((state) => state.user.role);
  const { navigation } = props;
  // const { agentID, patientID, caseID } = props.route.params;
  const agentID = "6hQ6yTAGNXNihOuFfQku05BK1SJ2";
  const patientID = "fnKnshVLw4gDoISHRcnz1YkTNh62";
  const caseID = "Ve414BvL9u8ynhnVKavQ";
  const [activity, setActivity] = useState(false);  
  const [caseFiles, setCaseFiles] = useState();
  const [sortDirection, setSortDirection] = useState({
    label: true,
    author: true,
    uptime: true,
  });

  const sortCategories = [
    {
      title: IMLocalized("label"),
    },
    {
      title: IMLocalized("author"),
    },
    {
      title: IMLocalized("uploadTime"),
    },
    {
      title: IMLocalized("file"),
    },
  ];
  const REMOTE_IMAGE_PATH =
    'https://raw.githubusercontent.com/AboutReact/sampleresource/master/gift.png';
  const [visible, setVisible] = useState(false);
  const [fileUri, setFileUri] = useState('');
  const [fileName, setFileName] = useState('');
  var tmpCaseFiles;

  const hideModal = () => setVisible(false);
  const showModal = () => setVisible(true);
  
  useEffect(() => {
    requestCameraPermission();
  }, []);
  
  firestore()
    .collection("Cases")
    .doc(patientID)
    .collection("Case")
    .get()
    .then((querySnapShot) => {
      querySnapShot.forEach((doc) => {
        tmpCaseFiles = doc.data().CaseFiles;
      });
      setCaseFiles(tmpCaseFiles);
    });

  const getExtention = filename => {
    // To get the file extension
    return /[.]/.exec(filename) ? /[^.]+$/.exec(filename) : undefined;
  };  

  const checkPermission = async () => {
    if (Platform.OS === 'ios') {
      downloadImage();
    } else {
      try {
        const granted = await PermissionsAndroid.request(
          PermissionsAndroid.PERMISSIONS.WRITE_EXTERNAL_STORAGE,
          {
            title: 'Storage Permission Required',
            message:
              'App needs access to your storage to download Photos',
          }
        );
        if (granted === PermissionsAndroid.RESULTS.GRANTED) {
          // Once user grant the permission start downloading
          console.log('Storage Permission Granted.');
          downloadImage();
        } else {
          // If permission denied then show alert
          alert('Storage Permission Not Granted');
        }
      } catch (err) {
        // To handle permission related exception
        console.warn(err);
      }
    }
  };

  const downloadImage = () => {
    let date = new Date();
    // Image URL which we want to download
    let image_URL = REMOTE_IMAGE_PATH;    
    // Getting the extention of the file
    let ext = getExtention(image_URL);
    ext = '.' + ext[0];
    // Get config and fs from RNFetchBlob
    // config: To pass the downloading related options
    // fs: Directory path where we want our image to download
    const { config, fs } = RNFetchBlob;
    let PictureDir = fs.dirs.PictureDir;
    let options = {
      fileCache: true,
      addAndroidDownloads: {
        // Related to the Android only
        useDownloadManager: true,
        notification: true,
        path:
          PictureDir +
          '/image_' + 
          Math.floor(date.getTime() + date.getSeconds() / 2) +
          ext,
        description: 'Image',
      },
    };
    config(options)
      .fetch('GET', image_URL)
      .then(res => {
        // Showing alert after successful downloading
        console.log('res -> ', JSON.stringify(res));
        alert('Image Downloaded Successfully.');
      });
  };

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
        setFileUri(response.uri);
        setFileName(response.fileName);
        Alert.alert(
          "Success",
          `You have successfully scanned \n ${response.fileName}. \n\n Do you want to upload it?`,
          [
            {
              text: "OK",
              onPress: () => {},
            },
            {
              text: "Cancel",
              onPress: () => {},
            }
          ]
        );
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
        setFileUri(response.uri);
        setFileName(response.fileName);
      },
    );
  };

  const navbar = () => {
    return (
      <Block>
        <Block row style={styles.navbar} center>
          <TouchableOpacity onPress={() => navigation.goBack()}>
            <Icon
              name="arrow-left"
              family="font-awesome"
              color="black"
              size={16}
              style={styles.chevronLeft}
            />
          </TouchableOpacity>
          <Text
            color="black"
            style={{ paddingLeft: theme.SIZES.BASE }}
            size={20}
            fontWeight="semiBold"
          >
            {IMLocalized("caseFile")}{" "}
            {roleTitle()}
          </Text>
        </Block>
        <Block style={{ borderTopWidth: 1, borderColor: "white" }}></Block>
      </Block>
    );
  };

  const roleTitle = () => {
    switch (userRole) {
      case "agent":
        return <Text>(Agent)</Text>;
      case "patient":
        return <Text>(Patient)</Text>;
      case "doctor":
        return <Text>(Doctor)</Text>;
    }
  };

  const renderSort = (item, index) => {
    const sortting = () => {
      switch (item.title) {
        case "Label":
          const sortArray = [...caseFiles].sort((a, b) => {
            if (a.label < b.label) return sortDirection.label ? -1 : 1;
            if (a.label > b.label) return sortDirection.label ? 1 : -1;
            return 0;
          });
          setCaseFiles(sortArray);
          let temSort1 = { ...sortDirection };
          setSortDirection({ ...temSort1, label: !temSort1.label });
          break;
        case "Author":
          const sortArray1 = [...caseFiles].sort((a, b) => {
            if (a.author < b.author) return sortDirection.author ? -1 : 1;
            if (a.author > b.author) return sortDirection.author ? 1 : -1;
            return 0;
          });
          setCaseFiles(sortArray1);
          let temSort2 = { ...sortDirection };
          setSortDirection({ ...temSort2, author: !temSort2.author });
          break;
        case "Upload Time":
          const sortArray2 = [...caseFiles].sort((a, b) => {
            if (a.UploadTime < b.UploadTime)
              return sortDirection.uptime ? -1 : 1;
            if (a.UploadTime > b.UploadTime)
              return sortDirection.uptime ? 1 : -1;
            return 0;
          });
          setCaseFiles(sortArray2);
          let temSort3 = { ...sortDirection };
          setSortDirection({ ...temSort3, uptime: !temSort3.uptime });
          break;
      }
    };
    return (
      <TouchableOpacity
        style={{ zIndex: 3 }}
        key={`product-${item.title}`}
        onPress={() => sortting()}
      >
        <LinearGradient
          start={{ x: 0, y: 0 }}
          end={{ x: 0.25, y: 1.1 }}
          locations={[0.2, 1]}
          colors={["#EFEFEF", "#FFF"]}
          style={styles.sortItem}
        >
          <Block center>
            <Text center size={15} fontWeight="semiBold">
              {item.title}
            </Text>
          </Block>
        </LinearGradient>
      </TouchableOpacity>
    );
  };

  const scanAndUpload = () => {
    if (userRole != "doctor") {
      return (
        <Block>
          <ScrollView
            horizontal={true}
            style={{
              alignSelf: "center",
              marginVertical: theme.SIZES.BASE / 2,
            }}
          >
            <TouchableOpacity style={{ zIndex: 3 }} onPress={() => showModal()}>
              <LinearGradient
                start={{ x: 0, y: 0 }}
                end={{ x: 0.25, y: 1.1 }}
                locations={[0.2, 1]}
                colors={["#00CE30", "#00CE30"]}
                style={styles.sortItem}
              >
                <Block center>
                  <Text center size={15} fontWeight="semiBold" color="white">
                    {IMLocalized("scanFile")}
                  </Text>
                </Block>
              </LinearGradient>
            </TouchableOpacity>
            <TouchableOpacity

              // onPress={}
            >
              <LinearGradient
                start={{ x: 0, y: 0 }}
                end={{ x: 0.25, y: 1.1 }}
                locations={[0.2, 1]}
                colors={["#00CE30", "#00CE30"]}
                style={styles.sortItem}
              >
                <Block center>
                  <Text center size={15} fontWeight="semiBold" color="white">
                    {IMLocalized("Upload Files")}
                  </Text>
                </Block>
              </LinearGradient>
            </TouchableOpacity>
          </ScrollView>
        </Block>
      );
    }
  };

  const renderSorts = () => {
    return (
      <Block
        style={{
          padding: theme.SIZES.BASE / 2,
        }}
      >
        <ScrollView
          horizontal={true}
          pagingEnabled={true}
          decelerationRate={0}
          scrollEventThrottle={16}
          snapToAlignment="center"
          style={{ width }}
          showsHorizontalScrollIndicator={false}
          snapToInterval={cardWidth + theme.SIZES.BASE * 0.375}
        >
          {sortCategories &&
            sortCategories.map((item, index) => renderSort(item, index))}
        </ScrollView>
      </Block>
    );
  };

  const returnButtons = () => {
    if (userRole == "agent") {
      return (
        <Block>
          <Button
            style={{ borderRadius: 16, width: width * 0.95 }}
            color="#00CE30"
            onPress={() => navigation.navigate("UploadCaseFiles")}
          >
            {IMLocalized("uploadPatientFiles")}
          </Button>
          <Button
            style={{ borderRadius: 16, width: width * 0.95 }}
            color="#00CE30"
          >
            {IMLocalized("packAndShare")}
          </Button>
        </Block>
      );
    } else {
      return (
        <Button
          style={{ borderRadius: 16, width: width * 0.95 }}
          color="#00CE30"
          onPress={() => navigation.navigate("UploadCaseFiles")}
        >
          {IMLocalized("uploadPatientFiles")}
        </Button>
      );
    }
  };

  return (
    <Block flex style={styles.components}>
      {navbar()}
      {scanAndUpload()}
      {renderSorts()}
      <ScrollView
        vertical={true}
        pagingEnabled={true}
        decelerationRate={0}
        scrollEventThrottle={16}
        snapToAlignment="center"
        style={{ width }}
        showsHorizontalScrollIndicator={false}
        snapToInterval={cardWidth + theme.SIZES.BASE * 0.375}
        style={{ padding: theme.SIZES.BASE / 2 }}
      >
        {caseFiles ? (
          caseFiles.map((vals, index) => {
            const time = new Date(
              vals.UploadTime.seconds * 1000 +
                vals.UploadTime.nanoseconds / 1000000
            );
            const timeDis = time.toDateString();
            return (
              <Block key={index}>
                <TouchableHighlight

                >
                  <LinearGradient
                    start={{ x: 0, y: 0 }}
                    end={{ x: 0.25, y: 1.1 }}
                    locations={[0.2, 1]}
                    colors={["#EFEFEF", "#FFF"]}
                    style={styles.caseItem}
                  >
                    <Block flex flexDirection="row" middle>
                      <Block flex={1} style={{ alignItems: "flex-start" }}>
                        <Text center size={15} fontWeight="semiBold">
                          {vals.label}
                        </Text>
                      </Block>
                      <Block flex={1}>
                        <Text center size={15} fontWeight="semiBold">
                          {vals.author}
                        </Text>
                      </Block>
                      <Block flex={1}>
                        <Text center size={15} fontWeight="semiBold">
                          {timeDis}
                        </Text>
                      </Block>
                      <Block flex={0.3} style={{ alignItems: "flex-end" }}>
                        <TouchableOpacity onPress={checkPermission}>
                          <Icon
                            name="paperclip"
                            family="font-awesome"
                            size={20}
                          ></Icon>
                        </TouchableOpacity>
                      </Block>
                    </Block>
                  </LinearGradient>
                </TouchableHighlight>
              </Block>
            );
          })
        ) : (
          <ActivityIndicator size={50} color="#6E78F7" />
        )}

      </ScrollView>
      {returnButtons()}
      <Block>
        
      </Block>
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
  navbar: {
    backgroundColor: "white",
    width: width,
    height: height * 0.1,
    paddingTop: theme.SIZES.BASE * 2,
    paddingLeft: theme.SIZES.BASE,
    borderBottomWidth: 1,
    borderColor: "rgba(112, 112, 112, 0.1)",
  },
  sortBox: {
    borderTopWidth: 2,
    borderColor: "white",
    margin: theme.SIZES.BASE,
    marginBottom: 0,
  },
  components: {
    backgroundColor: "#F8F8F8",
  },
  title: {
    paddingVertical: theme.SIZES.BASE,
    paddingHorizontal: theme.SIZES.BASE * 2,
  },
  group: {
    paddingTop: theme.SIZES.BASE * 3.75,
  },
  shadow: {
    shadowColor: "black",
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 4,
    shadowOpacity: 0.2,
    elevation: 2,
  },
  button: {
    marginBottom: theme.SIZES.BASE,
    width: width - theme.SIZES.BASE * 3,
  },
  options: {
    paddingHorizontal: theme.SIZES.BASE / 2,
  },
  optionsText: {
    fontSize: theme.SIZES.BASE * 0.75,
    color: "#4a4a4a",
    fontWeight: "normal",
    fontStyle: "normal",
    letterSpacing: -0.29,
  },
  optionsButton: {
    width: "auto",
    height: 34,
    paddingHorizontal: theme.SIZES.BASE,
    paddingVertical: 10,
  },
  sortItem: {
    borderWidth: 2,
    borderRadius: 1000,
    borderColor: "white",
    marginVertical: 4,
    paddingVertical: 10,
    paddingHorizontal: width * 0.045,
    marginHorizontal: theme.SIZES.BASE / 4,
    shadowColor: "black",
    shadowOffset: { width: -3, height: -3 },
    shadowRadius: 10,
    shadowOpacity: 0.2,
    elevation: 2,
  },
  caseItem: {
    borderWidth: 2,
    borderRadius: 10,
    borderColor: "white",
    marginVertical: 4,
    paddingVertical: 6,
    paddingHorizontal: 25,
    marginHorizontal: theme.SIZES.BASE / 4,
    shadowColor: "black",
    shadowOffset: { width: -3, height: -3 },
    shadowRadius: 10,
    shadowOpacity: 0.2,
    elevation: 2,
    height: theme.SIZES.BASE * 4,
  },
  productItem: {
    width: cardWidth - theme.SIZES.BASE * 2,
    marginHorizontal: theme.SIZES.BASE,
    shadowColor: "black",
    shadowOffset: { width: 0, height: 7 },
    shadowRadius: 10,
    shadowOpacity: 0.2,
  },
  productRounded: {
    borderWidth: 2,
    borderRadius: 1000,
    borderColor: "#DDDDDD",
    padding: 3,
    shadowColor: "black",
    shadowOffset: { width: 2, height: 2 },
    shadowRadius: 4,
    shadowOpacity: 0.2,
  },
  productImage: {
    borderWidth: 1,
    borderRadius: 1000,
    padding: 5,
    width: cardWidth - theme.SIZES.BASE,
    height: cardWidth - theme.SIZES.BASE,
  },
  searchBtn: {
    right: theme.SIZES.BASE,
    borderRadius: 1000,
    borderWidth: 1,
    borderColor: "#DDD",
    backgroundColor: "#FFF",
    width: theme.SIZES.BASE * 2,
    height: theme.SIZES.BASE * 2,
    marginLeft: 5,
  },
  greyGradient: {
    shadowColor: "black",
    shadowOffset: { width: 2, height: 2 },
    shadowRadius: 2,
    shadowOpacity: 0.2,
    elevation: 2,
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
    zIndex: 1001,
  },
});

export default PatientCaseFile;
