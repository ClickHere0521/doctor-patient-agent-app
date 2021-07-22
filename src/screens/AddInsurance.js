import React, { useState, useEffect } from "react";
import {
  StyleSheet,
  Dimensions,
  ScrollView,
  TouchableOpacity,
} from "react-native";
import { Block, Text, theme, Icon } from "galio-framework";
import { isValid } from '../utils/helpers';
import Input from '../components/InputType2';
import { materialTheme } from "../constants";
import { useDispatch, useSelector } from 'react-redux';
import { insuranceInfoAction } from '../store/duck/action';

const { width, height } = Dimensions.get("screen");
const thumbMeasure = (width - 48 - 32) / 3;

const AddInsurance = (props) => {
  const userRole = useSelector((state) => state.user.role);
  const { navigation } = props;
  const { info } = props.route.params;
  const [isSave, setIsSave] = useState(false);
  const [userName, setUserName] = useState("");
  const [insurancenumber, setInsurancenumber] = useState("");
  const [zipcode, setZipcode] = useState("");
  const [cityState, setCityState] = useState("");
  const [insuranceadjuster, setInsuranceAdjuster] = useState("");
  const [address, setAddress] = useState("");
  const [description, setDescription] = useState("");
  const [requested, setRequested] = useState(false);
  const [permission, setPermission] = useState(true);

  const insuranceInfo = [];
  const insuranceInfoDispatch = useDispatch();

  useEffect(() => {
    if (userRole == 'agent') 
      setPermission(true);
    else
      setPermission(false);
  }, []);

  useEffect(() => {
    if (
        isValid('username', userName) && 
        isValid('insurancenumber', insurancenumber) &&
        isValid('address', address) && 
        isValid('citystate', cityState) &&
        isValid('zipcode', zipcode) &&
        isValid('insuranceadjuster', insuranceadjuster) &&
        isValid('description', description)
      ) 
      setIsSave(true);
    else 
      setIsSave(false);
  }, [userName, insurancenumber, address, cityState, zipcode, insuranceadjuster, description]);

  const renderUserDetail = (detail) => {
    let { heading, handleName, handleValue, handleLabel, handlePlaceholder, data, keyboardType } = { ...detail };
    return (
      <Block style={styles.detail}>
        <Block row>
          <Text color={"grey"}>{heading}</Text>
          <Text color={"red"} style={styles.asteride}>
            *
          </Text>
        </Block>
        <Block>
          {permission ? (
            <Input
              label={handleLabel}
              value={data ? data : handleValue}
              onChangeText={(res) => {
                handleName(res);
              }}
              editable={!info}
              placeholder={handlePlaceholder}
              keyboardType={keyboardType}
              leftIcon=""
              rightIcon=""
              validate
              requested={requested}
              style={styles.valiInput}
            />
          ) : (
            <Text style={styles.valiInput}>
              {data}
            </Text>
          )}
        </Block>
      </Block>
    );
  };

  const navbar = () => {
    return (
      <Block row style={styles.navbar} center>
        <TouchableOpacity
          style={styles.touchableArea}
          onPress={() => resetAndGoBack()}
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
          style={{ paddingLeft: theme.SIZES.BASE * 0.5 }}
          size={17}
          bold
        >
          {/* {permission ? "Add Insurance Info" : "Insurance Info"} */}
          Insurance Info
        </Text>
      </Block>
    );
  };

  const handleSave = async () => {
    insuranceInfo.push({
      insurCompanyName: userName,
      insurZipcode: zipcode,
      insurCityState: cityState,
      insurAddress: address,
      insurAdjuster: insuranceadjuster,
      insurPolicyNumber: insurancenumber,
    });

    insuranceInfoDispatch(insuranceInfoAction(insuranceInfo));
    resetAndGoBack();
  }

  const resetAndGoBack = () => {
    setUserName("");
    setInsurancenumber("");
    setInsuranceAdjuster("");
    setAddress("");
    setCityState("");
    setZipcode("");
    setIsSave(false);
    navigation.goBack();
  }
  return (
    <Block center flex style={styles.profile}>
      {navbar()}
      <ScrollView vertical={true} showsVerticalScrollIndicator={false}>
        <Block style={styles.userDetail}>
          {renderUserDetail({
            heading: "Insurance Company Name",
            handlePlaceholder: "Zulqurnain Haider",
            handleName: setUserName,
            handleValue: userName,
            handleLabel: "Username",
            keyboardType: "email-address",
            data: info ? info.insuranceCompany : null,
          })}
          {renderUserDetail({
            heading: "Insurance Policy Number",
            handlePlaceholder: "9994684215",
            handleName: setInsurancenumber,
            handleValue: insurancenumber,
            handleLabel: "Insurancenumber",
            keyboardType: "numeric",
            data: info ? info.insurancePolicyNum : null,
          })}
          {renderUserDetail({
            heading: "Insurance Adjuster",
            handlePlaceholder: "James Hamilton",
            handleName: setInsuranceAdjuster,
            handleValue: insuranceadjuster,
            handleLabel: "Insuranceadjuster",
            keyboardType: "email-address",
            data: info ? info.insuranceAdjuster : null,
          })}
          {renderUserDetail({
            heading: "Address",
            handlePlaceholder: "Avenue 32",
            handleName: setAddress,
            handleValue: address,
            handleLabel: "Address",
            keyboardType: "email-address",
            data: info ? info.address : null,
          })}
          {renderUserDetail({
            heading: "City/State",
            handlePlaceholder: "California,US",
            handleName: setCityState,
            handleValue: cityState,
            handleLabel: "Citystate",
            keyboardType: "email-address",
            data: info ? info['city/state'] : null,
          })}
          {renderUserDetail({
            heading: "Zip Code",
            handlePlaceholder: "098978",
            handleName: setZipcode,
            handleValue: zipcode,
            handleLabel: "Zipcode",
            keyboardType: "numeric",
            data: info ? info.insurZip : null,
          })}
        </Block>
        <Block row center style={{padding: theme.SIZES.BASE * 0.5}}>
          {permission ? (
            <Block row>
              <TouchableOpacity
                style={[isSave ? styles.save : styles.saveDisable, info? styles.noDisplay: styles.display]}
                disabled={!isSave}
                onPress={() => handleSave()}
              >
                <Text color={"white"} size={16}>
                  Save
                </Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={styles.save}
                onPress={() => {resetAndGoBack()}}
              >
                <Text color={"white"} size={16}>
                  Cancel
                </Text>
              </TouchableOpacity>
            </Block>
          ) : (
            <Block></Block>
          )}
        </Block>
      </ScrollView>
    </Block>
  );
};

const styles = StyleSheet.create({
  noDisplay: {
    display: "none"
  },
  profile: {
    // marginTop: Platform.OS === "android" ? height * 0.02 : height * 0.02,
    backgroundColor: "white"
  },
  touchableArea: {
    width: 30, 
    height: 30, 
    justifyContent: 'center', 
    alignItems: 'center'
  },
  pro: {
    backgroundColor: materialTheme.COLORS.LABEL,
    paddingHorizontal: 6,
    marginRight: theme.SIZES.BASE / 2,
    borderRadius: 4,
    height: 19,
    width: 90
  },
  input: {
    width: width * 0.8,
    borderRadius: 0,
    borderBottomWidth: 1,
    borderBottomColor: materialTheme.COLORS.PLACEHOLDER
  },
  inputActive: {
    borderBottomColor: "black"
  },
  label: {
    paddingTop: 14,
    alignSelf: "flex-start",
    fontSize: 16
  },
  heading: {
    marginTop: height * 0.08,
    paddingHorizontal: theme.SIZES.BASE * 0.5,
    zIndex: 1
  },
  saveDisable: {
    backgroundColor: "grey",
    borderRadius: 15,
    width: width * 0.35,
    height: 40,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 10,
    marginHorizontal: 20,
  },
  save: {
    backgroundColor: "#00CE30",
    borderRadius: 15,
    width: width * 0.35,
    height: 40,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 10,
    marginHorizontal: 20
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
    width: width,
  },
  detail: {
    borderRadius: 20,
    borderColor: "#EDEDED",
    borderWidth: 1,
    paddingHorizontal: 24,
    paddingVertical: 20,
    marginVertical: 10,
    paddingBottom: 0
  },
  asteride: {
    position: "absolute",
    left: theme.SIZES.BASE * 11,
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
  valiInput: {
    width: '100%',
    borderRadius: 9,
    backgroundColor: 'white',
    fontSize: 14,
    height: 40,
    padding: 10,
    color: 'black',
  }
});

export default AddInsurance;
