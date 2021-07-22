import React, { useEffect, useState } from 'react';
import {
  StyleSheet,
  Dimensions,
  ScrollView,
  Image,
  TouchableOpacity,
  ActivityIndicator,
  TextInput,
} from 'react-native';
import { Block, Text, theme } from 'galio-framework';
import { Icon } from '../components';
import { Alert } from 'react-native';
import { useSelector } from 'react-redux';
import firestore from '@react-native-firebase/firestore';
import auth from '@react-native-firebase/auth';
import storage from '@react-native-firebase/storage';
import { Modal } from 'react-native-paper';
import { patient } from '../store/duck/reducers';
import { useDispatch } from 'react-redux';
import { patientInfoAction, attorneyInfoAction, insuranceInfoAction, noteInfoAction } from '../store/duck/action';
import DatePicker from 'react-native-datepicker'
import axios from 'axios';
import { useFocusEffect, useIsFocused } from '@react-navigation/native';

const { width, height } = Dimensions.get('screen');

const CreateCase = props => {
  const { route, navigation } = props;
  const { selectedPatient } = route.params;
  const [createdTime, setCreatedTime] = useState('');
  const [dateOfInjury, setDateOfInjury] = useState(new Date());
  const [isCompletedPatient, setIsCompletedPatient] = useState(false);
  const [ableAdd, setAbleAdd] = useState(true);
  const [getPID, setGetPID] = useState('');

  const [patientName, setPatientName] = useState('');
  const [patientDob, setPatientDob] = useState(new Date());
  const [patientAvatar, setPatientAvatar] = useState(
    '../assets/images/userDefault.png',
  );
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
  const [attorAvatar, setAttorAvatar] = useState(
    '../assets/images/userDefault.png',
  );
  const [attorPhone, setAttorPhone] = useState('');
  const [attorReference, setAttorReference] = useState('');
  const [attorZip, setAttorZip] = useState('');

  const [noteAuthorName, setNoteAuthorName] = useState('');
  const [noteCreateDate, setNoteCreateDate] = useState('');
  const [noteDescription, setNoteDescription] = useState('');
  const [spinner, setSpinner] = useState(false);

  const addPInfo = useSelector(state => state.patient.pInfo);
  const addAttorInfo = useSelector(state => state.attorney.attorneyInfo);
  const addInsurInfo = useSelector(state => state.insurance.insuranceInfo);
  const addNoteInfo = useSelector(state => state.note.noteInfo);

  const attorneyInfoDispatch = useDispatch();
  const insuranceInfoDispatch = useDispatch();
  const patientInfoDispatch = useDispatch();
  const noteInfoDispatch = useDispatch();

  useEffect(() => {
    let createdTimeTemp = new Date().toLocaleDateString();
    setCreatedTime(createdTimeTemp);
    if (selectedPatient) {
      //selectedPermission
      setAbleAdd(true);

      setPatientName(selectedPatient.name);
      console.log(selectedPatient.DOB.toDate().toDateString());
      // setPatientDob(new Date());
      setPatientDob(selectedPatient.DOB.toDate());
      setPatientAvatar(selectedPatient.avatar);
      setPatientCityState(selectedPatient.cityState);
      setPatientEmail(selectedPatient.email);
      setPatientSsn(selectedPatient.SSN);
      setGetPID(selectedPatient.patientID);
    } else {
      setAbleAdd(false);
      addPInfo &&
        addPInfo.map((item, index) => {
          setPatientName(item.name);
          setPatientDob(item.dob);
          setPatientAvatar(item.avatar);
          setPatientCityState(item.cityState);
          setPatientEmail(item.email);
          setPatientSsn(item.ssn);
        });
    }
    addAttorInfo &&
      addAttorInfo.map((item, index) => {
        setAttorAddress(item.attorAddress);
        setAttorCityState(item.attorCityState);
        setAttorEmail(item.attorEmail);
        setAttorFax(item.attorFax);
        setAttorName(item.attorName);
        setAttorAvatar(item.attorAvatar);
        setAttorPhone(item.attorTel);
        setAttorReference('');
        setAttorZip(item.attorZipcode);
      });
    addInsurInfo &&
      addInsurInfo.map((item, index) => {
        setInsurAddress(item.insurAddress);
        setInsurCompany(item.insurCompanyName);
        setInsurZipCode(item.insurZipcode);
        setInsurCityState(item.insurCityState);
        setInsurAdjuster(item.insurAdjuster);
        setInsurPolicyNum(item.insurPolicyNumber);
      });
    addNoteInfo &&
      addNoteInfo.map((item, index) => {
        setNoteAuthorName(item.noteAuthorName);
        setNoteCreateDate(item.noteCreateDate);
        setNoteDescription(item.noteDescription);
      });
    if (
      (!selectedPatient ? addPInfo.length != 0 : true) &&
      addAttorInfo.length != 0 &&
      addInsurInfo.length != 0 &&
      addNoteInfo.length != 0
    ) {
      setIsCompletedPatient(true);
    } else {
      setIsCompletedPatient(false);
    }
  }, [selectedPatient, addAttorInfo, addInsurInfo, addPInfo, addNoteInfo]);

  const hideModal = () => setSpinner(false);
  const showModal = () => setSpinner(true);

  // const selectInfoType = (infotype) => {
  //   switch(infotype){
  //     case 'AddAttorney':
  //       return addAttorInfo;
  //     case 'AddInsurance':
  //       return addInsurInfo;
  //     case 'AddNotes':
  //       return addNoteInfo;
  //   }
  // }

  const Action = props => {
    if (props.action == '') return <></>;
    if (props.action == 'add')
      return (
        <TouchableOpacity
          style={styles.touchableArea}
          onPress={() => {
            navigation.navigate(props.link, { info: null });
          }}>
          <Image source={require('../assets/images/add.png')} alt="" />
        </TouchableOpacity>
      );
    if (props.action == 'edit')
      return (
        <TouchableOpacity
          onPress={() => {
            navigation.navigate(props.link);
          }}>
          <Image source={require('../assets/images/editGreen.png')} alt="" />
        </TouchableOpacity>
      );
  };

  const renderDetils = details => {
    let { heading, action, link } = {
      ...details,
    };
    if (action == 'injuryTime') {
      return (
        <Block row center style={styles.caseContent}>
          <Block flex={1}>
            <Text size={16}>Date of Injury: </Text>
          </Block>
          <DatePicker
            style={{ width: width * 0.5, fontSize: 16 }}
            date={heading}
            mode="date"
            placeholder="select date"
            format="YYYY-MM-DD"
            minDate="1800-05-01"
            maxDate="2500-06-01"
            confirmBtnText="Confirm"
            cancelBtnText="Cancel"
            showIcon={false}
            customStyles={{ dateInput: { borderWidth: 0 } }}
            onDateChange={(date) => { setDateOfInjury(date) }}
          />
        </Block>
      );
    } else {
      return (
        <Block row center style={styles.caseContent}>
          <Block>
            <Text size={16}>{heading}</Text>
          </Block>
          <Block style={{ position: 'absolute', right: 10 }}>
            <Action action={action} link={link} />
          </Block>
        </Block>
      );
    }
  };

  const navbar = () => {
    return (
      <Block row style={styles.navbar} center>
        <TouchableOpacity style={styles.touchableArea} onPress={() => { onCancelCreateCase()}}>
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
          Create Case
        </Text>
      </Block>
    );
  };

  const onCancelCreateCase = () => {
    setPatientName("");
    setPatientDob(new Date());
    setPatientAvatar("");
    setPatientCityState("");
    setPatientEmail("");
    setPatientSsn("");
    setGetPID("");
    
    const insuranceInfo = [];
    const pInfo = [];
    const attorneyInfo = [];
    const noteInfo = [];

    attorneyInfoDispatch(attorneyInfoAction(attorneyInfo));

    patientInfoDispatch(patientInfoAction(pInfo));

    insuranceInfoDispatch(insuranceInfoAction(insuranceInfo));

    noteInfoDispatch(noteInfoAction(noteInfo));
    navigation.goBack();
  }

  const patientCard = () => {
    if (patientName) {
      return (
        <Block row center style={styles.patientHeading}>
          {patientAvatar && patientAvatar != '../assets/images/userDefault.png' ? (
            <Image
              source={{ uri: patientAvatar }}
              style={{
                width: 60,
                height: 60,
                borderRadius: 50,
                borderWidth: 3,
                borderColor: 'white',
              }}
            />
          ) : (
            <Image
              source={require('../assets/images/userDefault.png')}
              style={{
                width: 60,
                height: 60,
                borderRadius: 50,
                borderWidth: 3,
                borderColor: 'white',
              }}
            />
          )}
          <Block flex={4} style={{ marginLeft: theme.SIZES.BASE }}>
            <Text bold size={16}>
              {patientName}
            </Text>
            <Text color={'#909CA1'} style={{ paddingTop: theme.SIZES.BASE }}>
              {new Date(patientDob).toDateString()}
            </Text>
          </Block>
          <Block flex={1}>
            <Text style={{ alignSelf: 'flex-end' }} color={'#06D81E'}>
            </Text>
            {!patientName ? (
              <></>
            ) : (
              <TouchableOpacity
                onPress={() =>
                  navigation.navigate('AddPatient', {
                    editPatient: true, fromCreateCase: true, category: {
                      avatar: patientAvatar == '../assets/images/userDefault.png' ? '' : patientAvatar,
                      name: patientName,
                      DOB: patientDob,
                      cityState: patientCityState,
                      email: patientEmail,
                      SSN: patientSsn,
                    }
                  })
                }
                style={{ backgroundColor: 'white' }}>
                {
                  <Text>Detail</Text>
                }
              </TouchableOpacity>
            )}
          </Block>
        </Block>
      );
    }
    else {
      return (
        <Block></Block>
      );
    }
  }

  const onCreateCase = async () => {
    showModal();
    let patientDownloadURL = '';
    if (isCompletedPatient) {
      // add to firestore
      let pUid = '';
      let pDocId = '';
      let suc_flg = false;
      if (!selectedPatient) {
        await axios.post('http://us-central1-amgwf-70a28.cloudfunctions.net/createUser', {
          email: patientEmail,
          password: patientPassword,
        })
          .then(async res => {
            // clearTimeout(timeout);
            suc_flg = true;
            pUid = res.data.uid;
            let url = '';
            console.log("then",pUid,"paAva",patientAvatar);
            if (patientAvatar) {
              const reference = storage().ref(`avatar/${res.data.uid}.png`); // Patient Avatar Add to Storage and get Download URL
              const pathToFile = patientAvatar;
              // uploads file
              await reference.putFile(pathToFile);
              url = await storage()
                .ref(`avatar/${res.data.uid}.png`)
                .getDownloadURL();
              patientDownloadURL = url;
            }
            console.log("then-next");

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
                DOB: firestore.Timestamp.fromDate(
                  new Date(patientDob),
                ),
                SSN: patientSsn,
                address: '',
                avatar: url,
                cityState: patientCityState,
                email: patientEmail,
                geoLocation: '',
                name: patientName,
                patientID: res.data.uid,
                phone: '',
              });
          })
          .catch((error) => {
            console.log("catch");
            suc_flg = false;
            hideModal();
            console.log(error);
            Alert.alert(res.status(400).json({ error: error.message }));
          });
      } else {
        patientDownloadURL = patientAvatar;
        pUid = getPID;
        suc_flg = true;
      }
      if (suc_flg) {
        console.log("attor->",pUid)
        await firestore()
          .collection('Patients')
          .doc(pUid)
          .collection('Patient')
          .get()
          .then(querySnapshot => {
            querySnapshot.forEach(doc => {
              pDocId = doc.id;
            });
          });
        const patientLinks = {
          businessUserID: pUid,
          patientProfileID: pDocId,
        };
        let url1 = '';
        
        console.log("attor->",pUid,"attoavatar",attorAvatar)
        if (attorAvatar != '' && attorAvatar) {
          const reference1 = storage().ref(`avatar/${pUid}_attor.png`); // Patient Avatar Add to Storage and get Download URL
          const pathToFile1 = attorAvatar;
          // uploads file
          await reference1.putFile(pathToFile1);
          url1 = await storage()
            .ref(`avatar/${pUid}_attor.png`)
            .getDownloadURL();
        }
        console.log("attoravatar->",attorAvatar)

        firestore().collection('Cases').doc(pUid).set({});

        // firestore().collection('Patients').doc(pUid).set({});
        firestore()
          .collection('Patients')
          .doc(pUid)
          .collection('PatientProfileLink')
          .doc()
          .set(patientLinks);

        let caseID = firestore().collection('Cases').doc(pUid).collection('Case').doc().id;
        firestore()
          .collection('Cases')
          .doc(pUid)
          .collection('Case')
          .doc(caseID)
          .set({
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
            caseCreateTime: firestore.Timestamp.fromDate(
              new Date(createdTime),
            ),
            caseID: caseID,
            uID: pUid,
            caseStatus: 1,
            caseWarning: {
              0: 'PATIENT_FILE_WAITING_REVIEW',
            },
            dateOfInjury: firestore.Timestamp.fromDate(new Date(dateOfInjury)),
            notes: [
              {
                authorName: noteAuthorName,
                authorReference: '',
                createDate: firestore.Timestamp.fromDate(
                  new Date(noteCreateDate),
                ),
                note: noteDescription,
              },
            ],
            patientInfo: {
              avatar: patientDownloadURL,
              patientName: patientName,
              patientReference: '',
            },
            patientUploadFile: [
              {
                isApproved: false,
                label: '',
                scanFileUrl: '',
                uploadTime: '',
              },
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
            },
          });
        hideModal();
        onCancelCreateCase();
      }
      else {
        onCancelCreateCase();
        hideModal();
      }
    } else {
      Alert.alert('Warning', 'Please add the patient info', [
        {
          text: 'OK',
          onPress: () => { },
        },
      ]);
    }
  }

  return (
    <Block flex style={styles.notification}>
      {navbar()}
      <ScrollView vertical={true} showsVerticalScrollIndicator={false}>
        <TouchableOpacity
          onPress={() => {
            navigation.navigate('AddPatient', {
              editPatient: false,
              addPermission: false,
              category: null,
            });
          }}
          style={{ width: 60, marginLeft: 30 }}
          disabled={ableAdd}>
          <Image source={require('../assets/images/createCase.png')} />
        </TouchableOpacity>
        <Block row style={{ marginBottom: theme.SIZES.BASE }} disabled>
          <Text size={10} style={{ left: theme.SIZES.BASE * 1.8 }}>
            Add Patient Info
          </Text>
          <TouchableOpacity style={{left: width * 0.4}} onPress={() => { 
            navigation.navigate("Patients");
          }}>
            <Text size={10} style={{textDecorationLine: 'underline',}}>Choose from current patient</Text>
          </TouchableOpacity>
        </Block>
        {patientCard()}
        <Block>
          <Text
            size={18}
            style={{
              padding: theme.SIZES.BASE * 1.5,
            }}>
            Case Info
          </Text>
          {renderDetils({
            heading: `Created time:                         ${createdTime}`,
            action: '',
            link: '',
          })}
          {renderDetils({
            heading: dateOfInjury,
            action: 'injuryTime',
            link: '',
          })}
          {renderDetils({
            heading: 'Attorney Info',
            action: 'add',
            link: 'AddAttorney',
          })}
          {renderDetils({
            heading: 'Insurance Info',
            action: 'add',
            link: 'AddInsurance',
          })}
          {renderDetils({
            heading: 'Notes',
            action: 'add',
            link: 'AddNotes'
          })}
        </Block>
        <Block row center style={{ marginVetical: theme.SIZES.BASE, padding: theme.SIZES.BASE * 0.5 }}>
          <TouchableOpacity
            style={isCompletedPatient ? styles.saveSend : styles.saveSendDisabled}
            disabled={!isCompletedPatient}
            onPress={() => onCreateCase()}>
            <Text color={'white'} size={14}>
              Save and send notification
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.save}
            onPress={() => {
              onCancelCreateCase();
            }}
          >
            <Text color={'white'} size={14}>
              Cancel
            </Text>
          </TouchableOpacity>
        </Block>
      </ScrollView>
      <Modal
        visible={spinner}
        onDismiss={hideModal}
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
  notification: {
    backgroundColor: theme.COLORS.WHITE,
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
  touchableArea: {
    width: 30,
    height: 30,
    justifyContent: 'center',
    alignItems: 'center'
  },
  schedule: {
    paddingHorizontal: width * 0.03,
    marginTop: height * 0.02,
    marginHorizontal: width * 0.04,
    borderRadius: 13,
    backgroundColor: theme.COLORS.WHITE,
    shadowColor: 'black',
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
    position: 'absolute',
    backgroundColor: 'rgba(100, 120, 247, 0.84)',
    height: height * 0.16,
    width: width,
    top: -10,
    zIndex: 2,
  },
  dateActive: {
    backgroundColor: '#00CE30',
    borderRadius: 18,
    paddingHorizontal: 8,
    paddingVertical: 5,
    marginRight: 4,
    width: 80,
    height: 34,
  },
  dateInActive: {
    borderWidth: 1,
    borderColor: 'white',
    borderRadius: 18,
    paddingHorizontal: 4,
    paddingVertical: 5,
    marginRight: 4,
    width: 80,
    height: 34,
    backgroundColor: 'white',
    shadowColor: 'black',
    shadowOffset: { width: 0, height: 0 },
    shadowRadius: 8,
    shadowOpacity: 0.2,
    elevation: 3,
  },
  heading: {
    marginTop: height * 0.08,
    paddingHorizontal: theme.SIZES.BASE * 0.5,
    position: 'absolute',
    zIndex: 1,
  },
  body: {
    marginTop: height * 0.21,
    position: 'absolute',
    zIndex: 5,
  },
  check: {
    position: 'absolute',
    zIndex: 5,
    right: -width * 0.05,
    top: -height * 0.01,
  },
  patientHeading: {
    width: width * 0.92,
    padding: theme.SIZES.BASE / 4,
    borderColor: '#F1F1F1',
    borderRadius: 20,
    shadowColor: 'grey',
    shadowOpacity: 0.2,
    shadowOpacity: 5,
    elevation: 2,
    backgroundColor: '#FEFEFE',
  },
  caseContent: {
    width: width * 0.92,
    borderColor: '#F1F1F1',
    borderRadius: 10,
    shadowColor: 'grey',
    shadowOpacity: 0.2,
    shadowOpacity: 5,
    elevation: 2,
    backgroundColor: '#FEFEFE',
    paddingVertical: theme.SIZES.BASE * 1.2,
    paddingHorizontal: theme.SIZES.BASE,
    marginBottom: theme.SIZES.BASE,
  },
  save: {
    backgroundColor: '#00CE30',
    borderRadius: 15,
    width: width * 0.2,
    height: 40,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 10,
    marginHorizontal: 20,
  },
  saveSend: {
    backgroundColor: '#00CE30',
    borderRadius: 15,
    width: width * 0.5,
    height: 40,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 10,
    marginHorizontal: 20,
  },
  saveSendDisabled: {
    backgroundColor: '#999999',
    borderRadius: 15,
    width: width * 0.5,
    height: 40,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 10,
    marginHorizontal: 20,
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
});

export default CreateCase;
