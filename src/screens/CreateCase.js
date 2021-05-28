import React, { useEffect, useState } from "react";
import {
  StyleSheet,
  Dimensions,
  ScrollView,
  Image,
  TouchableOpacity,
} from "react-native";
import { Block, Text, theme } from "galio-framework";
import { Icon } from "../components";
import { Alert } from "react-native";
import { useSelector } from 'react-redux';
import firestore from '@react-native-firebase/firestore';
import auth from '@react-native-firebase/auth';
import storage from '@react-native-firebase/storage';

const { width, height } = Dimensions.get("screen");

const CreateCase = (props) => {
  const { navigation } = props;
  const [createdTime, setCreatedTime] = useState('');
  const [dateOfInjury, setDateOfInjury] = useState('');
  const [isCompletedPatient, setIsCompletedPatient] = useState(true);

  const [patientName, setPatientName] = useState('');
  const [patientDob, SetPatientDob] = useState('');
  const [patientAvatar, setPatientAvatar] = useState('');
  const [patientCityState, setPatientCityState] = useState('');
  const [patientEmail, setPatientEmail] = useState('');
  const [patientPassword, setPatientPassword] = useState('abcABC123');
  const [patientSsn, setPatientSsn] = useState('');

  const [insurAddress, setInsurAddress] = useState('');
  const [insurCompany, setInsurCompany] = useState('');
  const [insurZipCode, setInsurZipCode] = useState('');
  const [insureCityState, setInsurCityState] = useState('');
  const [insurAdjuster, setInsurAdjuster] = useState('');
  const [insurPolicyNum, setInsurPolicyNum] = useState('');

  const [attorAddress, setAttorAddress] = useState('');
  const [attorCityState, setAttorCityState] = useState('');
  const [attorEmail, setAttorEmail] = useState('');
  const [attorFax, setAttorFax] = useState('');
  const [attorName, setAttorName] = useState('');
  const [attorAvatar, setAttorAvatar] = useState('');
  const [attorPhone, setAttorPhone] = useState('');
  const [attorReference, setAttorReference] = useState('');
  const [attorZip, setAttorZip] = useState('');

  const [noteAuthorName, setNoteAuthorName] = useState('');
  const [noteCreateDate, setNoteCreateDate] = useState('');
  const [noteDescription, setNoteDescription] = useState('');

  const addPInfo = useSelector((state) => state.patient.pInfo);
  const addAttorInfo = useSelector((state) => state.attorney.attorneyInfo);
  const addInsurInfo = useSelector((state) => state.insurance.insuranceInfo);
  const addNoteInfo = useSelector((state) => state.note.noteInfo);

  useEffect(() => {
    let createdTimeTemp = new Date().toLocaleDateString();
    setCreatedTime(createdTimeTemp);
    setDateOfInjury(createdTimeTemp);
    console.log("addPInfo: ", addPInfo);
    console.log("attorneyInfo: ", addAttorInfo);
    console.log("insuranceInfo: ", addInsurInfo);
    console.log("noteInfo: ", addNoteInfo);
    addPInfo && addPInfo.map((item, index) => {
      setPatientName(item.name);
      SetPatientDob(item.dob);
      setPatientAvatar(item.avatar);
      setPatientCityState(item.cityState);
      setPatientEmail(item.email);
      setPatientSsn(item.ssn);
    });
    addAttorInfo && addAttorInfo.map((item, index) => {
      setAttorAddress(item.attorAddress);
      setAttorCityState(item.attorCityState);
      setAttorEmail(item.attorEmail);
      setAttorFax(item.attorFax);
      setAttorName(item.attorName);
      setAttorAvatar(item.attorAvatar);
      setAttorPhone(item.attorTel);
      setAttorReference("");
      setAttorZip(item.attorZipcode);
    });
    addInsurInfo && addInsurInfo.map((item, index) => {
      setInsurAddress(item.insurAddress);
      setInsurCompany(item.insurCompanyName);
      setInsurZipCode(item.insurZipcode);
      setInsurCityState(item.insurCityState);
      setInsurAdjuster(item.insurAdjuster);
      setInsurPolicyNum(item.insurPolicyNumber);
    });
    addNoteInfo && addNoteInfo.map((item, index) => {
      setNoteAuthorName(item.noteAuthorName);
      setNoteCreateDate(item.noteCreateDate);
      setNoteDescription(item.noteDescription);
    });
  });

  const Action = (props) => {
    if (props.action == "") return <></>;
    if (props.action == "add")
      return (
        <TouchableOpacity onPress={() => {
          if (isCompletedPatient)
            navigation.navigate(props.link, { info: null });
          else
            Alert.alert(
              "Warning",
              "Please add the patient info",
              [
                {
                  text: "OK",
                  onPress: () => { },
                }
              ]
            );
        }}>
          <Image source={require('../assets/images/add.png')} alt="" />
        </TouchableOpacity>
      );
    if (props.action == "edit")
      return (
        <TouchableOpacity onPress={() => {
          if (isCompletedPatient)
            navigation.navigate(props.link);
          else
            Alert.alert(
              "Warning",
              "Please add the patient info",
              [
                {
                  text: "OK",
                  onPress: () => { },
                }
              ]
            );
        }}>
          <Image source={require('../assets/images/editGreen.png')} alt="" />
        </TouchableOpacity>
      );
  };

  const renderDetils = (details) => {
    let { heading, action, link } = {
      ...details,
    };

    return (
      <Block row center style={styles.caseContent}>
        <Block>
          <Text size={16}>{heading}</Text>
        </Block>
        <Block style={{ position: "absolute", right: 20 }}>
          <Action action={action} link={link} />
        </Block>
      </Block>
    );
  };

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
          Create Case
        </Text>
      </Block>
    );
  };

  return (
    <Block flex style={styles.notification}>
      {navbar()}
      <ScrollView
        vertical={true}
        showsVerticalScrollIndicator={false}
      >
        <TouchableOpacity onPress={() => {
          navigation.navigate("AddPatient", { editPatient: false, addPermission: false });
        }} style={{ width: 60 }}>
          <Image source={require("../assets/images/createCase.png")} />
        </TouchableOpacity>
        <Block row style={{ marginBottom: theme.SIZES.BASE }}>
          <Text size={10} style={{ left: theme.SIZES.BASE * 1.8 }}>
            Add
          </Text>
          <TouchableOpacity style={{ position: "absolute", right: 20 }}>
            <Text size={10} style={{ textDecorationLine: 'underline' }}
              onPress={() => navigation.navigate("Cases")}
            >
              Choose from current case
          </Text>
          </TouchableOpacity>
        </Block>

        <Block row center style={styles.patientHeading}>
          {patientAvatar ? (
            <Image
              source={{ uri: patientAvatar }}
              style={{ width: 60, height: 60, borderRadius: 50, borderWidth: 3, borderColor: "white" }}
            />
          ) : (
            <Image
              source={require("../assets/images/userDefault.png")}
              style={{ width: 60, height: 60, borderRadius: 50, borderWidth: 3, borderColor: "white" }}
            />
          )}
          <Block column style={{ marginLeft: theme.SIZES.BASE }}>
            <Text bold size={16}>
              {patientName}
            </Text>
            <Text color={"#909CA1"} style={{ paddingTop: theme.SIZES.BASE }}>
              {patientDob}
            </Text>
          </Block>
          <Block column style={{ paddingLeft: width * 0.4 }} >
            <Text style={{ alignSelf: "flex-end" }} color={"#06D81E"}>
              {/* 11:45 AM */}
            </Text>
            {
              !patientName ? <></> :
                <TouchableOpacity
                  onPress={() => navigation.navigate("AddPatient", { editPatient: true })}
                  style={{ backgroundColor: 'white' }}
                >
                  {
                    <Image source={require('../assets/images/editGreen.png')} alt="" style={{ width: 25, height: 22 }} />
                  }
                </TouchableOpacity>
            }
          </Block>
        </Block>
        <Block>
          <Text
            size={18}
            style={{
              padding: theme.SIZES.BASE * 1.5
            }}
          >
            Case Info
          </Text>
          {renderDetils({
            heading: `Created time:${createdTime}`,
            action: "",
            link: "",
          })}
          {renderDetils({
            heading: `Date of Injury: ${dateOfInjury}`,
            action: "",
            link: "",
          })}
          {renderDetils({
            heading: "Attorney Info",
            action: "add",
            link: "AddAttorney",
          })}
          {renderDetils({
            heading: "Insurance Info",
            action: "add",
            link: "AddInsurance",
          })}
          {renderDetils({
            heading: "Notes",
            action: "add",
            link: "AddNotes",
          })}
          {renderDetils({
            heading: "Case Files",
            action: "",
            link: "",
          })}
        </Block>
        <Block row center style={{ marginTop: theme.SIZES.BASE }}>
          <TouchableOpacity
            style={styles.saveSend}
            onPress={async () => {
              let patientDownloadURL = "";
              if (isCompletedPatient) {
                // add to firestore
                let pUid = '';
                let pDocId = '';
                console.log(patientEmail, patientPassword);
                await auth()
                  .createUserWithEmailAndPassword(patientEmail, patientPassword)
                  .then(async (res) => {
                    console.log(res.user.uid);
                    pUid = res.user.uid;

                    const reference = storage().ref(`avatar/${pUid}.png`);  // Patient Avatar Add to Storage and get Download URL
                    const pathToFile = patientAvatar;
                    // uploads file
                    await reference.putFile(pathToFile);
                    const url = await storage()
                      .ref(`avatar/${pUid}.png`)
                      .getDownloadURL();
                    patientDownloadURL = url;

                    firestore().collection('Patients').doc(res.user.uid).set({});
                    firestore().collection('Patients').doc(res.user.uid).collection("Patient").doc().set({
                      DOB: firestore.Timestamp.fromDate(new Date(patientDob)),
                      SSN: patientSsn,
                      address: "",
                      avatar: url,
                      cityState: patientCityState,
                      email: patientEmail,
                      geoLocation: "",
                      name: patientName,
                      phone: "",
                    });
                  })
                  .catch((error) => {
                    console.log(">>>Error>>>", error)
                  });
                console.log('pUid:', pUid);
                await firestore().collection('Patients').doc(pUid).collection("Patient").get().then((querySnapshot) => {
                  querySnapshot.forEach((doc) => {
                    pDocId = doc.id;
                  });
                });
                console.log("pDocId->", pDocId);
                const patientLinks = {
                  businessUserID: pUid,
                  patientProfileID: pDocId
                };

                // const attorPngRef = await storage().ref(`logo/${pUid}_attor.png`); // Patient Avatar Add to Storage and get Download URL
                // attorPngRef.put(attorAvatar);
                // setAttorAvatar(attorPngRef.getDownloadURL());
                const reference1 = storage().ref(`avatar/${pUid}_attor.png`);  // Patient Avatar Add to Storage and get Download URL
                const pathToFile1 = attorAvatar;
                // uploads file
                await reference1.putFile(pathToFile1);
                const url1 = await storage()
                  .ref(`avatar/${pUid}_attor.png`)
                  .getDownloadURL();

                firestore().collection('Cases').doc(pUid).set({});
                firestore().collection('Patients').doc(pUid).set({});
                firestore().collection('Patients').doc(pUid).collection("PatientProfileLink").doc().set(patientLinks);
                firestore().collection('Cases').doc(pUid).collection("Case").doc().set({
                  InsuranceInfo: {
                    address: insurAddress,
                    'city/state': insureCityState,
                    insuranceAdjuster: insurAdjuster,
                    insuranceCompany: insurCompany,
                    insurancePolicyNum: insurPolicyNum,
                    insurZip: insurZipCode,
                  },
                  attorneyInfo: {
                    attorneyAddress: attorAddress,
                    attorneyCityState: attorCityState,
                    attorneyEmail: attorEmail,
                    attorneyFax: attorFax,
                    attorneyName: attorName,
                    attorneyAvatar: url1,
                    attorneyPhone: attorPhone,
                    attorneyReference: "(WE DON'T USE THIS ONE YET)",
                    attorneyZip: attorZip,
                  },
                  caseAgent: {
                    agentID: auth().currentUser.uid,
                    agentReference: '',
                    agentName: '',
                  },
                  caseCreateTime: firestore.Timestamp.fromDate(new Date(createdTime)),
                  caseID: '',
                  uID: pUid,
                  caseStatus: 1,
                  caseWarning: {
                    '0': 'PATIENT_FILE_WAITING_REVIEW',
                  },
                  dateOfInjury: firestore.Timestamp.fromDate(new Date(dateOfInjury)),
                  notes: [
                    {
                      authorName: noteAuthorName,
                      authorReference: "",
                      createDate: firestore.Timestamp.fromDate(new Date(noteCreateDate)),
                      note: 'noteDescription',
                    },
                  ],
                  patientInfo: {
                    avatar: patientDownloadURL,
                    patientName: patientName,
                    patientReference: ''
                  },
                  patientUploadFile: [
                    {
                      isApproved: false,
                      label: '',
                      scanFileUrl: '',
                      uploadTime: '',
                    }
                  ],
                  pcDoctorInfo: {
                    doctorID: '',
                    doctorReference: '',
                    name: '',
                    phone: '',
                  },
                  schedule: {
                    scheduleReference: '',
                    scheduleTime: '',
                  }
                });
              }
              else
                Alert.alert(
                  "Warning",
                  "Please add the patient info",
                  [
                    {
                      text: "OK",
                      onPress: () => { },
                    }
                  ]
                );
            }}
          >
            <Text color={"white"} size={14}>
              Save and send notification
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.save}
          // onPress={() => {
          // }}
          >
            <Text color={"white"} size={14}>
              Cancel
            </Text>
          </TouchableOpacity>
        </Block>
      </ScrollView>
    </Block>
  );
};

const styles = StyleSheet.create({
  notification: {
    backgroundColor: theme.COLORS.WHITE,
  },
  schedule: {
    paddingHorizontal: width * 0.03,
    marginTop: height * 0.02,
    marginHorizontal: width * 0.04,
    borderRadius: 13,
    backgroundColor: theme.COLORS.WHITE,
    shadowColor: "black",
    shadowOffset: { width: 0, height: 0 },
    shadowRadius: 8,
    shadowOpacity: 0.2,
    elevation: 3,
    zIndex: 2,
  },
  title: {
    paddingTop: theme.SIZES.BASE / 2,
    paddingBottom: theme.SIZES.BASE * 1.5,
  },
  rows: {
    paddingHorizontal: theme.SIZES.BASE,
    marginBottom: theme.SIZES.BASE * 1.25,
  },
  roundBlock: {
    borderBottomLeftRadius: 34,
    borderBottomRightRadius: 34,
    position: "absolute",
    backgroundColor: "rgba(100, 120, 247, 0.84)",
    height: height * 0.16,
    width: width,
    top: -10,
    zIndex: 2,
  },
  dateActive: {
    backgroundColor: "#00CE30",
    borderRadius: 18,
    paddingHorizontal: 8,
    paddingVertical: 5,
    marginRight: 4,
    width: 80,
    height: 34,
  },
  dateInActive: {
    borderWidth: 1,
    borderColor: "white",
    borderRadius: 18,
    paddingHorizontal: 4,
    paddingVertical: 5,
    marginRight: 4,
    width: 80,
    height: 34,
    backgroundColor: "white",
    shadowColor: "black",
    shadowOffset: { width: 0, height: 0 },
    shadowRadius: 8,
    shadowOpacity: 0.2,
    elevation: 3,
  },
  heading: {
    marginTop: height * 0.08,
    paddingHorizontal: theme.SIZES.BASE * 0.5,
    position: "absolute",
    zIndex: 1,
  },
  body: {
    marginTop: height * 0.21,
    position: "absolute",
    zIndex: 5,
  },
  check: {
    position: "absolute",
    zIndex: 5,
    right: -width * 0.05,
    top: -height * 0.01,
  },
  patientHeading: {
    width: width * 0.92,
    padding: theme.SIZES.BASE / 4,
    borderColor: "#F1F1F1",
    borderRadius: 20,
    shadowColor: "grey",
    shadowOpacity: 0.2,
    shadowOpacity: 5,
    elevation: 2,
    backgroundColor: "#FEFEFE",
  },
  caseContent: {
    width: width * 0.92,
    borderColor: "#F1F1F1",
    borderRadius: 10,
    shadowColor: "grey",
    shadowOpacity: 0.2,
    shadowOpacity: 5,
    elevation: 2,
    backgroundColor: "#FEFEFE",
    paddingVertical: theme.SIZES.BASE * 1.5,
    paddingHorizontal: theme.SIZES.BASE,
    marginBottom: theme.SIZES.BASE,
  },
  save: {
    backgroundColor: "#00CE30",
    borderRadius: 20,
    width: width * 0.2,
    height: 36,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 10,
    marginHorizontal: 20,
  },
  saveSend: {
    backgroundColor: "#00CE30",
    borderRadius: 20,
    width: width * 0.5,
    height: 36,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 10,
    marginHorizontal: 20,
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

export default CreateCase;