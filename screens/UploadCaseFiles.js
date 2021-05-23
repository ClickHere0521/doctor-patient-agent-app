import React, { useState, useEffect } from "react";
import {
  ScrollView,
  StyleSheet,
  Dimensions,
  TouchableHighlight,
  TouchableOpacity,
  Alert,
} from "react-native";
import { Button, Block, Text, Input, theme } from "galio-framework";
import { Icon } from "../components";
import { LinearGradient } from "expo-linear-gradient";
import { IMLocalized } from "../src/localization/IMLocalization";
import { useSelector } from "react-redux";
import { CheckBox } from "react-native-elements";
import * as FileSystem from 'expo-file-system';
import * as firebase from 'firebase';
const { width, height } = Dimensions.get("screen");
const cardWidth = theme.SIZES.BASE * 4;

const UploadCaseFiles = (props) => {
  const userRole = useSelector(state => state.user.role);
  const { navigation } = props;
  const [caseFiles, setCaseFiles] = useState([]);
  // const { agentID, patientID, caseID } = props.route.params;
  const agentID = '6hQ6yTAGNXNihOuFfQku05BK1SJ2';
  const patientID = '6hQ6yTAGNXNihOuFfQku05BK1SJ2';
  const caseID = '9OrscCF5Sww521UBck7W';
  const firestore = firebase.firestore();
  const storage = firebase.storage();
  const [imageUri, setImageUri] = useState("");
  const [sortDirection, setSortDirection] = useState({
    label: true, 
    author: true, 
    uptime: true, 
  });
  const sortCategories = [
    {
      title: IMLocalized("Label"),
    },
    {
      title: IMLocalized("Upload Time"),
    },
    {
      title: IMLocalized("File"),
    },
    {
      title: IMLocalized("Approved"),
    },
  ];

  const sortAgentCategories = [
    {
      title: IMLocalized("Label"),
    },
    {
      title: IMLocalized("Author"),
    },
    {
      title: IMLocalized("Upload Time"),
    },
    {
      title: IMLocalized("File"),
    },
    {
      title: IMLocalized("Approved"),
    },
  ];

  useEffect(() => {
    firestore.collection('Cases').doc(patientID).collection('Case').get().then((querySnapShot) => {
      var tmpCaseFiles;
      querySnapShot.forEach((doc) => {
        tmpCaseFiles = doc.data().patientUploadFile;
      });
      setCaseFiles(tmpCaseFiles);
    }); 
  }, []);

  const handleCheck = (index) => {
    let tempCaseFiles = [...caseFiles];
    tempCaseFiles[index].isApproved = !tempCaseFiles[index].isApproved;
    setCaseFiles(tempCaseFiles);
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
            <Text color="black" style={{paddingLeft: theme.SIZES.BASE}} size={20} fontWeight="semiBold">{IMLocalized('Upload Case File')}</Text>
        </Block>
        <Block style={{borderTopWidth:1, borderColor: 'white'}}></Block>
      </Block>
    )
  }

  const renderSort = (item, index) => {
    const sortting = () => {
      switch (item.title) {
        case 'Label':
          const sortArray = [...caseFiles].sort((a, b) => {
            if (a.label < b.label) return (sortDirection.label ? -1 : 1);
            if (a.label > b.label) return (sortDirection.label ? 1 : -1);
            return 0;
          });
          setCaseFiles(sortArray);
          let temSort1 = { ...sortDirection };
          setSortDirection({...temSort1, label: !temSort1.label})
          break;
        case 'Author':
          const sortArray1 = [...caseFiles].sort((a, b) => {
            if (a.author < b.author) return (sortDirection.author ? -1 : 1);
            if (a.author > b.author) return (sortDirection.author ? 1 : -1);
            return 0;
          });
          setCaseFiles(sortArray1);
          let temSort2 = { ...sortDirection };
          setSortDirection({...temSort2, author: !temSort2.author})
          break;
        case 'Upload Time':
          const sortArray2 = [...caseFiles].sort((a, b) => {
            if (a.uploadTime < b.uploadTime) return (sortDirection.uptime ? -1 : 1);
            if (a.uploadTime > b.uploadTime) return (sortDirection.uptime ? 1 : -1);
            return 0;
          });
          setCaseFiles(sortArray2);
          let temSort3 = { ...sortDirection };
          setSortDirection({...temSort3, uptime: !temSort3.uptime})
          break;
      }
    }

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

  const returnButtons = () => {
    if(userRole == "agent"){
      return (
        <Block>
          <Button style={{borderRadius: 16, width: width * 0.95}} color="#00CE30" onPress={() => handleSave()}>{IMLocalized('save')}</Button>
        </Block>
      )
    }
    else{
      return(
        <Block></Block>
      )
    }
  }

  const renderSorts = () => {
    if(userRole == "agent")
    {
      return(
        <Block style={{ marginTop: theme.SIZES.BASE / 2, padding: theme.SIZES.BASE/2}}>
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
            {sortAgentCategories &&
              sortAgentCategories.map((item, index) => renderSort(item, index))}
          </ScrollView>
        </Block>
      )
    }
    else {
      return (
        <Block style={{ marginTop: theme.SIZES.BASE / 2, padding: theme.SIZES.BASE/2}}>
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
  }

  const onDownloadImagePress = (url, label) => {
    FileSystem.downloadAsync(
      url,
      FileSystem.documentDirectory + `${label}.png`
    )
      .then(({ uri }) => {
        console.log('Finished downloading to ', uri);
      })
      .catch(error => {
        console.error(error);
      });
  };

  const handleSave = async () => {
    await firestore.collection('Cases').doc(patientID).collection('Case').doc(caseID).update({ patientUploadFile : caseFiles});      
    Alert.alert(
      "Success",
      "You have successfully updated the file info",
      [
        {
          text: 'OK',
          onPress: () => {}
        }
      ]
    );  
  };

  return (
    <Block flex
      style={styles.components}>
        {navbar()}
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
          style={{padding: theme.SIZES.BASE/2}}
        >
          {caseFiles &&
            caseFiles.map((vals, index) => {
              const time = new Date(vals.uploadTime.seconds * 1000 + vals.uploadTime.nanoseconds/1000000);
              const timeDis = time.toDateString()
              if(userRole == 'agent'){
                return (
                  <Block key={index}>
                    <TouchableHighlight
                      style={{ zIndex: 3 }}
                      // onPress={}
                      >
                      <LinearGradient
                        start={{ x: 0, y: 0 }}
                        end={{ x: 0.25, y: 1.1 }}
                        locations={[0.2, 1]}
                        colors={["#EFEFEF", "#FFF"]}
                        style={styles.caseItem}
                      >
                        <Block flex flexDirection="row" middle>
                          <Block flex={1}  style={{alignItems: 'flex-start'}}>
                            <Text center size={15} fontWeight="semiBold">
                              {vals.label}
                            </Text>
                          </Block>
                          <Block flex={1}  style={{alignItems: 'flex-start'}}>
                            <Text center size={15} bold color='grey' fontWeight="semiBold">
                              {vals.author}
                            </Text>
                          </Block>
                          <Block flex={1} >
                            <Text center size={15} fontWeight="semiBold">
                              {timeDis}
                            </Text>
                          </Block>
                          <Block flex={1} style={{alignItems: 'flex-end'}}>
                            <TouchableOpacity onPress={() => onDownloadImagePress(vals.scanFileUrl, vals.label)}>
                              <Icon name="paperclip" family="font-awesome" size={20}></Icon>
                            </TouchableOpacity>
                          </Block>
                          <Block flex={1} style={{alignItems: 'flex-end'}}>
                            <CheckBox
                              checked={vals.isApproved}
                              containerStyle={{ backgroundColor: "white", borderWidth: 0 }}
                              onPress={() => handleCheck(index)}
                            />
                          </Block>
                        </Block>
                      </LinearGradient>
                    </TouchableHighlight>
                  </Block>
                )
              }
              else{
                return (
                  <Block key={index}>
                    <TouchableHighlight
                      style={{ zIndex: 3 }}
                      // onPress={}
                      >
                      <LinearGradient
                        start={{ x: 0, y: 0 }}
                        end={{ x: 0.25, y: 1.1 }}
                        locations={[0.2, 1]}
                        colors={["#EFEFEF", "#FFF"]}
                        style={styles.caseItem}
                      >
                        <Block flex flexDirection="row" middle>
                          <Block flex={1}  style={{alignItems: 'flex-start'}}>
                            <Text center size={15} fontWeight="semiBold">
                            {vals.label}
                            </Text>
                          </Block>
                          <Block flex={1} >
                            <Text center size={15} fontWeight="semiBold">
                            {timeDis}
                            </Text>
                          </Block>
                          <Block flex={1} style={{alignItems: 'flex-end'}}>
                            <Icon name="paperclip" family="font-awesome" size={20}></Icon>
                          </Block>
                          <Block flex={1} style={{alignItems: 'flex-end'}}>
                            <CheckBox
                              checked={vals.isApproved}
                              containerStyle={{ backgroundColor: "white", borderWidth: 0 }}
                            />
                          </Block>
                        </Block>
                      </LinearGradient>
                    </TouchableHighlight>
                  </Block>
                )
              }
            })}
        </ScrollView>
        {returnButtons()}
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
      borderColor: 'rgba(112, 112, 112, 0.1)'
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
    paddingVertical: 6,
    paddingHorizontal: 20,
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
    position: "absolute",
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
});

export default UploadCaseFiles;
