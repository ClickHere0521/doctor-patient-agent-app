import React, { useState } from 'react';
import { StyleSheet, Dimensions, ScrollView, Image, ImageBackground, Platform } from 'react-native';
import { Button, Block, Text, theme, Input } from 'galio-framework';

import { materialTheme } from '../constants';
import SwitchButton from 'switch-button-react-native';

const { width, height } = Dimensions.get('screen');
const thumbMeasure = (width - 48 - 32) / 3;

const EditProfile = (props) => {
  const { navigation } = props;  

  const [vals, setVals] = useState({
    email: '-',
    password: '-',
    active: {
      'email': false,
      'password': false,
    }
  });
  const [ activeSwitch, setActiveSwitch ] = useState(1);
  
  const handleChange = (name, value) => {
    setVals({ [name]: value });
  }

  return (
    <Block center flex style={styles.profile}>
      <ScrollView vertical={true} showsVerticalScrollIndicator={false}>
        <Block center row>
          <Block middle>
            <Image source={require('../assets/images/avatar.png')} />
          </Block>
          <SwitchButton
            onValueChange={(val) => setActiveSwitch(val)}      // this is necessary for this component
            text1 = 'Remove'                        // optional: first text in switch button --- default ON
            text2 = 'Upload'                       // optional: second text in switch button --- default OFF
            switchWidth = {120}                 // optional: switch width --- default 44
            switchHeight = {30}                 // optional: switch height --- default 100
            switchdirection = 'rtl'             // optional: switch button direction ( ltr and rtl ) --- default ltr
            switchBorderRadius = {100}          // optional: switch border radius --- default oval
            switchSpeedChange = {500}           // optional: button change speed --- default 100
            switchBorderColor = '#3B3E51'       // optional: switch border color --- default #d4d4d4
            switchBackgroundColor = '#fff'      // optional: switch background color --- default #fff
            btnBorderColor = '#3B3E51'          // optional: button border color --- default #00a4b9
            btnBackgroundColor = '#3B3E51'      // optional: button background color --- default #00bcd4
            fontColor = '#3B3E51'               // optional: text font color --- default #b1b1b1
            activeFontColor = '#fff'            // optional: active font color --- default #fff
          />
        </Block>      
        <Block center style={styles.userInfo}>        
        <Text style={styles.label}>
          Full name <Text color={'red'}>*</Text>
        </Text>
        <Input
          borderless
          color="grey"
          placeholder="Mark Veronic"
          type="email-address"
          autoCapitalize="none"
          bgColor='transparent'
          value="Mark Veronic"
          placeholderTextColor={materialTheme.COLORS.PLACEHOLDER}
          onChangeText={text => handleChange('name', text)}
          style={[styles.input, vals.email ? styles.inputActive : null]}          
        />
        <Text style={styles.label}>
          Email <Text color={'red'}>*</Text>
        </Text>
        <Input
          borderless
          color="grey"
          placeholder="Markveronic@gmail.com"
          type="email-address"
          autoCapitalize="none"
          bgColor='transparent' 
          value="Markveronic@gmail.com"         
          placeholderTextColor={materialTheme.COLORS.PLACEHOLDER}
          onChangeText={text => handleChange('email', text)}
          style={[styles.input, vals.email ? styles.inputActive : null]}
          
        />
        <Text style={styles.label}>
          Tel <Text color={'red'}>*</Text>
        </Text>
        <Input
          borderless
          color="grey"
          placeholder="+1234567890"
          type="email-address"
          autoCapitalize="none"
          bgColor='transparent'    
          value='+1234567890'      
          placeholderTextColor={materialTheme.COLORS.PLACEHOLDER}
          onChangeText={text => handleChange('email', text)}
          style={[styles.input, vals.email ? styles.inputActive : null]}
          
        />
        <Text style={{paddingTop: 10, alignSelf: 'flex-start'}}>
          Location <Text color={'red'}>*</Text>
        </Text>
        <Input
          borderless
          color="grey"
          placeholder="California, US"
          type="email-address"
          autoCapitalize="none"
          bgColor='transparent'     
          value="California, US"     
          placeholderTextColor={materialTheme.COLORS.PLACEHOLDER}
          onChangeText={text => handleChange('email', text)}
          style={[styles.input, vals.email ? styles.inputActive : null]}
          
        />
        <Block row style={{alignSelf: 'flex-end'}}>
          <Button
            center
            shadowless
            color='#6E78F7'
            textStyle={styles.optionsButtonText}
            style={styles.optionsButton}
            onPress={() => handleDelete(item.id)}
          >
            EDIT
          </Button>  
          <Button
            center
            shadowless
            color='#6E78F7'
            textStyle={styles.optionsButtonText}
            style={styles.optionsButton}
            onPress={() => handleDelete(item.id)}
          >
            SAVE
          </Button>
        </Block>      
      </Block>
      </ScrollView>
    </Block>
  );
}

const styles = StyleSheet.create({
  profile: {
    marginTop: Platform.OS === 'android' ? height * 0.02 : height * 0.02,
  },
  optionsButtonText: {
    fontSize: theme.SIZES.BASE * 0.75,
    color: 'white',
    fontWeight: "normal",
    fontStyle: "normal",
    letterSpacing: -0.29,
  },
  optionsButton: {
    width: 'auto',
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
    borderColor: 'grey',
    backgroundColor: theme.COLORS.WHITE,
    shadowColor: 'black',
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
    shadowColor: 'black',
    shadowOffset: { width: 0, height: 0 },
    shadowRadius: 8,
    shadowOpacity: 0.2,
    elevation: 3,
    zIndex: 2,
  },
  profileImage: {
    width: width * 1.1,
    height: 'auto',
  },
  profileContainer: {
    width: width,
    height: 'auto',
    flex: 1,
  },
  profileDetails: {
    paddingTop: theme.SIZES.BASE * 4,
    justifyContent: 'flex-end',
    position: 'relative',
  },
  profileTexts: {
    paddingHorizontal: theme.SIZES.BASE * 2,
    paddingVertical: theme.SIZES.BASE * 2,
    zIndex: 2
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
    position: 'relative',
    paddingHorizontal: theme.SIZES.BASE,
    paddingVertical: theme.SIZES.BASE,
    marginHorizontal: theme.SIZES.BASE,
    marginTop: -theme.SIZES.BASE,
    marginBottom: 0,
    borderTopLeftRadius: 13,
    borderTopRightRadius: 13,
    backgroundColor: theme.COLORS.WHITE,
    shadowColor: 'black',
    shadowOffset: { width: 0, height: 0 },
    shadowRadius: 8,
    shadowOpacity: 0.2,
    zIndex: 2,
  },
  thumb: {
    borderRadius: 4,
    marginVertical: 4,
    alignSelf: 'center',
    width: thumbMeasure,
    height: thumbMeasure
  },
  gradient: {
    zIndex: 1,
    left: 0,
    right: 0,
    bottom: 0,
    height: '30%',
    position: 'absolute',
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
    paddingLeft: 8, paddingRight: 30, marginRight:-26},
  label: {
    paddingTop: 10, 
    alignSelf: 'flex-start'
  },
});

export default EditProfile;