import React, { useState } from "react";
import {
  StyleSheet,
  Dimensions,
  TouchableOpacity,
  ScrollView,
} from "react-native";
import { Block, Text, theme, Icon } from "galio-framework";
import { materialTheme } from "../constants";
import Input from '../components/InputType2';
import { isValid } from '../utils/helpers';
import firestore from '@react-native-firebase/firestore';

const { width, height } = Dimensions.get("screen");
const thumbMeasure = (width - 48 - 32) / 3;

const AddNotes = (props) => {
  const { navigation } = props;
  const {category, notes, edit} = props.route.params;
  const [authorName, setAuthorName] = useState(notes ? notes.author : '');
  const [dob, setDob] = useState(notes ? `${notes.date.toDate().getMonth() < 9 ? 0 : ''}${notes.date.toDate().getMonth()+1}/${notes.date.toDate().getDate() < 10 ? 0 : ''}${notes.date.toDate().getDate()}/${notes.date.toDate().getFullYear()}` : '');
  const [description, setDescription] = useState(notes ? notes.content : '');
  const [editFlg, setEditFlg] = useState(false);
  const [requested, setRequested] = useState(false);
  const [noteInfo, setNoteInfo] = useState([]);
  const validDob = isValid('date', dob);
  const validAuthorName = isValid('username', authorName);
  const validDescription = isValid('description', description);
  const renderUserDetail = (detail) => {
    let { heading, content, handleValue, handleName, handleLabel, handlePlaceholder } = { ...detail };
    return (
      <Block style={styles.detailStyle}>
        <Input
          label={handleLabel}
          value={handleValue}
          onChangeText={(res) => {
            handleName(res)
            setSaveEnable()
          }}
          placeholder={handlePlaceholder}
          keyboardType="email-address"
          leftIcon=""
          rightIcon=""
          validate
          requested={requested}
          style={styles.valiInput}
        />
      </Block>
    );
  };
  const setSaveEnable = () => {
    if (validDob && validAuthorName && validDescription) {
      setEditFlg(true);
    }
    else{
      setEditFlg(false);
    }
  }
  const handleSave = async () => {
    if (edit) {
      firestore().collection('Cases').doc(category.patientInfo.patientUid).collection('Case').get().then((shot) => {
        let noteInfoTemp = [];
        shot.docs.forEach((shotVal) => {
          noteInfoTemp = shotVal.data().notes;
        });
        setNoteInfo(noteInfoTemp);
      });
      const index = noteInfo.findIndex(element => element.note == notes.content);
      // alert(noteInfo.createDate.toDate());
      // console.log("noteInfo->", index);
      noteInfo[index] = {
        authorName: authorName,
        createDate: firestore.Timestamp.fromDate(new Date(dob)),
        note: description,
      }
      firestore().collection('Cases').doc(category.patientInfo.patientUid).collection('Case').doc(category.caseID).update({
        notes: noteInfo,
      }).then((res) => {
        alert('Successfully saved');
        // navigation.goBack();
      });
    } else {
      firestore().collection('Cases').doc(category.patientInfo.patientUid).collection('Case').get().then((shot) => {
        let noteInfoTemp = [];
        shot.docs.forEach((shotVal) => {
          noteInfoTemp = shotVal.data().notes;
        });
        setNoteInfo(noteInfoTemp);
      });
      noteInfo.push({
        authorName: authorName,
        createDate: firestore.Timestamp.fromDate(new Date(dob)),
        note: description,
      });
      firestore().collection('Cases').doc(category.patientInfo.patientUid).collection('Case').doc(category.caseID).update({
        notes: noteInfo,
      }).then((res) => {
        alert('Successfully saved');
        navigation.goBack();
      });
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
          {edit ? 'Edit a Note' : 'Add a Note'}
        </Text>
        {/* <TouchableOpacity onPress={
          () => setEditFlg(true)
        }>
          <Image
            source={require("../assets/icons/editHeaderWhite.png")}
            alt=""
            style={{ marginLeft: width * 0.55 }}
          />
        </TouchableOpacity> */}
      </Block>
    );
  };
  return (
    <Block center flex style={styles.profile}>
      {navbar()}
      <ScrollView vertical={true} showsVerticalScrollIndicator={false}>
        <Block style={styles.userDetail}>
          {renderUserDetail({
            heading: "General Physician @99",
            handlePlaceholder: "Fill with note create date",
            handleName: setDob,
            handleValue: dob,
            handleLabel: "Date",
          })}
          {renderUserDetail({
            heading: "General Physician @99",
            handlePlaceholder: "Fill with author Name",
            handleName: setAuthorName,
            handleValue: authorName,
            handleLabel: "Username",
          })}
          <Block style={[styles.detailStyle, { height: theme.SIZES.BASE * 10 }]}>
            <Input
              label="Description"
              value={description}
              onChangeText={(res) => {
                setDescription(res)
                setSaveEnable()
              }}
              placeholder="Write descriptions here."
              leftIcon=""
              rightIcon=""
              validate
              requested={requested}
              multiline={true}
              style={styles.valiInput}
            />
          </Block>
        </Block>
        <Block row style={{ marginTop: 20, alignSelf: 'flex-end' }}>
          <TouchableOpacity
            style={editFlg ? styles.save : styles.saveDisable}
            onPress={() => handleSave()}
            disabled={!editFlg}
          >
            <Text color={"#3A58FC"} size={14} style={{ alignSelf: 'center' }}>
              Save
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.save}
            onPress={() => {
              setEditFlg(false);
              setDob("");
              setAuthorName("");
              setDescription("");
              navigation.goBack();
            }}
          >
            <Text color={"#3A58FC"} size={14} style={{ alignSelf: 'center' }}>
              Cancel
            </Text>
          </TouchableOpacity>
        </Block>
      </ScrollView>
    </Block>
  );
};

const styles = StyleSheet.create({
  detailStyle: {
    borderWidth: 1,
    borderRadius: theme.SIZES.BASE,
    borderColor: 'grey',
    padding: theme.SIZES.BASE * 1.2,
    paddingBottom: 0,
    marginVertical: theme.SIZES.BASE,
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
    backgroundColor: "lightgrey",
    borderRadius: 20,
    borderColor: '#C7C7C7',
    borderWidth: 1,
    paddingVertical: 4,
    paddingHorizontal: 6,
    width: 90,
    marginBottom: 10,
    marginHorizontal: 10,
  },
  save: {
    backgroundColor: "white",
    borderRadius: 20,
    borderColor: '#C7C7C7',
    borderWidth: 1,
    paddingVertical: 4,
    paddingHorizontal: 6,
    width: 90,
    marginBottom: 10,
    marginHorizontal: 10,
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
    width: width * 0.9,
    marginTop: 20
  },
  detail: {
    borderRadius: 20,
    borderColor: "#EDEDED",
    borderWidth: 1,
    paddingHorizontal: 24,
    paddingVertical: 20,
    marginVertical: 10,
    width: width * 0.9
  },
  asteride: {
    position: "absolute",
    left: theme.SIZES.BASE * 12,
  },
  content: {
    position: 'absolute',
    left: theme.SIZES.BASE * 8
  },
  shadow: {
    shadowColor: 'grey',
    shadowRadius: 30,
    shadowOpacity: 0.2,
    shadowOffset: { width: 10, height: 10 },
    backgroundColor: 'white',
    elevation: 2,
    borderRadius: 20,
    borderColor: "#EDEDED",
    borderWidth: 1,
    paddingHorizontal: 24,
    paddingVertical: 20,
    marginVertical: 10,
    width: width * 0.9
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
});

export default AddNotes;
