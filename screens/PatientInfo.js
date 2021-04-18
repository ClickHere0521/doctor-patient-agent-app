import React, { useState } from 'react';
import { StyleSheet, Dimensions, ScrollView, Image, ImageBackground, Platform } from 'react-native';
import { Button, Block, Text, theme, Input } from 'galio-framework';
import SwitchButton from 'switch-button-react-native';
import { Icon } from '../components';
import { Images, materialTheme } from '../constants';
import { HeaderHeight } from "../constants/utils";
import { IMLocalized } from "../src/localization/IMLocalization";

const { width, height } = Dimensions.get('screen');
const thumbMeasure = (width - 48 - 32) / 3;

const PatientInfo = (props) => {
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
        <Block style={{paddingTop: height * 0.05}} >
          <Block style={styles.options}>
            <Block row>
              <Block block space="between" style={{ padding: theme.SIZES.BASE, paddingVertical: theme.SIZES.BASE * 0.3}}>
                <Block middle>
                  <Block row style={{ alignSelf: 'flex-start'}}>
                    <Block middle>
                      <Icon name="user" family="font-awesome" color={theme.COLORS.MUTED} size={16}> </Icon>  
                    </Block>
                    <Block>
                      <Text muted size={12}>{IMLocalized('patientName')}</Text>
                    </Block>                      
                  </Block>                                    
                  <Text bold size={12} color="black" style={{marginBottom: 8, alignSelf: 'flex-start' , width: width * 0.36, padding: width * 0.02}}>Jimmy Fallon</Text>
                </Block>
                <Block middle>
                  <Block row style={{ alignSelf: 'flex-start'}}>
                    <Block middle>
                      <Icon name="phone" family="font-awesome" color={theme.COLORS.MUTED} size={16}> </Icon>  
                    </Block>
                    <Block>
                    <Text muted size={12} >{IMLocalized('phoneNumber')}</Text>
                    </Block>                      
                  </Block>                    
                  <Text bold size={12} color="black" style={{marginBottom: 8, alignSelf: 'flex-start' , width: width * 0.36, padding: width * 0.02}}>01234567890</Text>
                </Block>
                <Block middle>
                <Block row style={{ alignSelf: 'flex-start'}}>
                  <Block middle>
                    <Icon name="envelope" family="font-awesome" color={theme.COLORS.MUTED} size={16}> </Icon>  
                  </Block>
                  <Block>
                    <Text muted size={12} >{IMLocalized('emailAddress')}</Text>
                    </Block>                      
                  </Block>                    
                  <Text bold size={12} color="black" style={{marginBottom: 8, alignSelf: 'flex-start', width: width * 0.36, padding: width * 0.02}}>emailaddress@gmail.com</Text>
                </Block>
              </Block>   
              <Block block space="between" style={{ padding: theme.SIZES.BASE, paddingVertical: theme.SIZES.BASE * 0.3}}>
                <Block middle>
                  <Block row style={{ alignSelf: 'flex-start'}}>
                    <Block middle>
                      <Icon name="id-card" family="font-awesome" color={theme.COLORS.MUTED} size={16}> </Icon>  
                    </Block>
                    <Block>
                    <Text muted size={12}>{IMLocalized('nationalId')}</Text>
                    </Block>                      
                  </Block>                  
                  <Text bold size={12} color="black" style={{marginBottom: 8, alignSelf: 'flex-start', padding: width * 0.02}}>3236945328940784098</Text>
                </Block>
                <Block middle>
                  <Block row style={{ alignSelf: 'flex-start'}}>
                    <Block middle>
                      <Icon name="map-marker" family="font-awesome" color={theme.COLORS.MUTED} size={16}> </Icon>  
                    </Block>
                    <Block>
                    <Text muted size={12}>{IMLocalized('countryProvince')}</Text>
                    </Block>                      
                  </Block>                   
                  <Text bold size={12} color="black" style={{marginBottom: 8, alignSelf: 'flex-start', padding: width * 0.02}}>US California</Text>
                </Block>
                <Block middle>
                  <Block row style={{ alignSelf: 'flex-start'}}>
                    <Block middle>
                      <Icon name="address-book" family="font-awesome" color={theme.COLORS.MUTED} size={16}> </Icon>  
                    </Block>
                    <Block>
                    <Text muted size={12}>address</Text>
                    </Block>                      
                  </Block>                  
                  <Text bold size={12} color="black" style={{marginBottom: 8, alignSelf: 'flex-start', padding: width * 0.02}}>Address here</Text>
                </Block>
              </Block>   
            </Block>    
          </Block>        
        </Block>
        <Block style={{paddingTop: height * 0.05}} >
          <Block style={styles.options}>        
            <Block row>
              <Block block space="between" style={{ padding: theme.SIZES.BASE, paddingVertical: theme.SIZES.BASE * 0.3, width: width * 0.45}}>
                <Block middle>
                  <Block row style={{ alignSelf: 'flex-start'}}>
                    <Block block>                      
                      <Icon name="heart" family="font-awesome" color={theme.COLORS.MUTED} size={16}> </Icon>  
                      <Text bold size={12} color="black" style={{marginBottom: 8, alignSelf: 'flex-start'}}>{IMLocalized('age')}</Text>
                    </Block>
                    <Block block>
                      <Text bold size={12} color="black" style={{marginBottom: 8, alignSelf: 'flex-end', padding: width * 0.02, paddingLeft: width * 0.18}}>33</Text>
                    </Block>                    
                  </Block>                  
                </Block>
                <Block middle>
                  <Block row style={{ alignSelf: 'flex-start'}}>
                    <Block block>
                      <Icon name="arrow-up" family="font-awesome" color={theme.COLORS.MUTED} size={16}> </Icon>                        
                      <Text bold size={12} color="black" style={{marginBottom: 8, alignSelf: 'flex-start'}}>{IMLocalized('height')}</Text>
                    </Block>
                    <Block block>
                      <Text bold size={12} color="black" style={{marginBottom: 8, alignSelf: 'flex-end', padding: width * 0.02, paddingLeft: width * 0.1}}>170CM</Text>
                    </Block>                    
                  </Block>                  
                </Block>
                <Block middle>
                  <Block row style={{ alignSelf: 'flex-start'}}>
                    <Block block>
                      <Icon name="tint" family="font-awesome" color={theme.COLORS.MUTED} size={16}> </Icon>                        
                      <Text bold size={12} color="black" style={{marginBottom: 8, alignSelf: 'flex-start'}}>{IMLocalized('bloodType')}</Text>
                    </Block>
                    <Block block>
                      <Text bold size={12} color="black" style={{marginBottom: 8, alignSelf: 'flex-end', padding: width * 0.02, paddingLeft: width * 0.07}}>AB</Text>
                    </Block>                    
                  </Block>                  
                </Block>
              </Block>   
              <Block block space="between" style={{ padding: theme.SIZES.BASE, paddingVertical: theme.SIZES.BASE * 0.3}}>
                <Block middle>
                  <Block row style={{ alignSelf: 'flex-start'}}>
                    <Block block>
                      <Icon name="venus-mars" family="font-awesome" color={theme.COLORS.MUTED} size={16}> </Icon>                        
                      <Text bold size={12} color="black" style={{marginBottom: 8, alignSelf: 'flex-start'}}>{IMLocalized('gender')}</Text>
                    </Block>
                    <Block block>
                      <Text bold size={12} color="black" style={{marginBottom: 8, alignSelf: 'flex-end', padding: width * 0.02, paddingLeft: width * 0.19}}>F</Text>
                    </Block>                    
                  </Block>                  
                </Block>
                <Block middle>
                  <Block row style={{ alignSelf: 'flex-start'}}>
                    <Block block>
                      <Icon name="fire" family="font-awesome" color={theme.COLORS.MUTED} size={16}> </Icon>                        
                      <Text bold size={12} color="black" style={{marginBottom: 8, alignSelf: 'flex-start'}}>{IMLocalized('weight')}</Text>
                    </Block>
                    <Block block>
                      <Text bold size={12} color="black" style={{marginBottom: 8, alignSelf: 'flex-end', padding: width * 0.02, paddingLeft: width * 0.16}}>70 kg</Text>
                    </Block>                    
                  </Block>                  
                </Block>
                <Block middle>
                  <Block row style={{ alignSelf: 'flex-start'}}>
                    <Block block>
                      <Icon name="shield" family="font-awesome" color={theme.COLORS.MUTED} size={16}> </Icon>                        
                      <Text bold size={12} color="black" style={{marginBottom: 8, alignSelf: 'flex-start'}}>{IMLocalized('insurance')}</Text>
                    </Block>
                    <Block block>
                      <Text bold size={12} color="black" style={{marginBottom: 8, alignSelf: 'flex-end', padding: width * 0.02, paddingLeft: width * 0.1}}>Insured</Text>
                    </Block>                    
                  </Block>                  
                </Block>
              </Block>  
            </Block>  
          </Block>        
        </Block>
        <Block style={{paddingTop: height * 0.05}}>
          <Block style={styles.options}>          
            <Block row>
              <Block block space="between" style={{ padding: theme.SIZES.BASE, paddingVertical: theme.SIZES.BASE * 0.3}}>
                <Block middle>
                  <Text muted size={10} style={{ alignSelf: 'flex-start'}}>15</Text>
                  <Text bold size={10} color="black" style={{marginBottom: 8, alignSelf: 'flex-start' }}>{IMLocalized('prescriptions')}</Text>
                </Block>
              </Block>   
              <Block block space="between" style={{ padding: theme.SIZES.BASE, paddingVertical: theme.SIZES.BASE * 0.3}}>
                <Block middle>
                  <Text muted size={10} style={{ alignSelf: 'flex-start'}}>6</Text>
                  <Text bold size={10} color="black" style={{marginBottom: 8, alignSelf: 'flex-start'}}>{IMLocalized('ongoingMeds')}</Text>
                </Block>
              </Block>  
              <Block block space="between" style={{ padding: theme.SIZES.BASE, paddingVertical: theme.SIZES.BASE * 0.3}}>
                <Block middle>
                  <Text muted size={10} style={{ alignSelf: 'flex-start'}}>10</Text>
                  <Text bold size={10} color="black" style={{marginBottom: 8, alignSelf: 'flex-start'}}>{IMLocalized('visits')}</Text>
                </Block>
              </Block>
              <Block block space="between" style={{ padding: theme.SIZES.BASE, paddingVertical: theme.SIZES.BASE * 0.3}}>
                <Block middle>
                  <Text muted size={10} style={{ alignSelf: 'flex-start'}}>10</Text>
                  <Text bold size={10} color="black" style={{marginBottom: 8, alignSelf: 'flex-start'}}>{IMLocalized('consultations')}</Text>
                </Block>
              </Block>    
            </Block>    
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

export default PatientInfo;