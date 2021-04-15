import React, { useState } from "react";
import { StyleSheet, Dimensions, ScrollView, Image, TouchableOpacity } from "react-native";
import { Block, Text, theme } from "galio-framework";

import materialTheme from '../constants/Theme';
import { Icon } from '../components'

const { width, height } = Dimensions.get('screen');

const CaseHistory = (props) => {  

  return (
    <Block flex style={styles.notification}>           
      <ScrollView vertical={true} showsVerticalScrollIndicator={false}>
        <Block style={styles.schedule}>        
          <Block row>
            <Image source={require('../assets/images/check.png')} style={styles.checkImage} />     
            <Block middle style={styles.padTop10}>              
              <Text bold size={18} style={styles.caseTitle}>Get 50% off on complete medical checkup</Text>
              <Block style={styles.blockText}>
                <Text style={styles.marBtm5}>MBBS,DOMS,MS - Ophthalmology</Text>
                <Text style={styles.marBtm5}>Ophthalmologist</Text>
                <Text style={styles.marBtm5}>26 years of experience</Text>
                <Block row style={styles.padVrt1}>
                <Block middle>
                  <Icon name="map-marker" family="font-awesome" color={theme.COLORS.MUTED} size={16}> </Icon>  
                </Block>
                <Block middle style={styles.marRight40}>
                  <Text>02/16/2021</Text>                  
                </Block>   
              </Block>
              </Block>
            </Block>
          </Block>
        </Block> 
        <Block style={styles.schedule}>        
          <Block row>
            <Image source={require('../assets/images/check.png')} style={styles.checkImage} />     
            <Block middle style={styles.padTop10}>              
              <Text bold size={18} style={styles.caseTitle}>Get 50% off on complete medical checkup</Text>
              <Block style={styles.blockText}>
                <Text style={styles.marBtm5}>MBBS,DOMS,MS - Ophthalmology</Text>
                <Text style={styles.marBtm5}>Ophthalmologist</Text>
                <Text style={styles.marBtm5}>26 years of experience</Text>
                <Block row style={styles.padVrt1}>
                <Block middle>
                  <Icon name="map-marker" family="font-awesome" color={theme.COLORS.MUTED} size={16}> </Icon>  
                </Block>
                <Block middle style={styles.marRight40}>
                  <Text>02/16/2021</Text>                  
                </Block>   
              </Block>
              </Block>
            </Block>
          </Block>
        </Block>
        <Block style={styles.schedule}>        
          <Block row>
            <Image source={require('../assets/images/check.png')} style={styles.checkImage} />     
            <Block middle style={styles.padTop10}>              
              <Text bold size={18} style={styles.caseTitle}>Get 50% off on complete medical checkup</Text>
              <Block style={styles.blockText}>
                <Text style={styles.marBtm5}>MBBS,DOMS,MS - Ophthalmology</Text>
                <Text style={styles.marBtm5}>Ophthalmologist</Text>
                <Text style={styles.marBtm5}>26 years of experience</Text>
                <Block row style={styles.padVrt1}>
                <Block middle>
                  <Icon name="map-marker" family="font-awesome" color={theme.COLORS.MUTED} size={16}> </Icon>  
                </Block>
                <Block middle style={styles.marRight40}>
                  <Text>02/16/2021</Text>                  
                </Block>   
              </Block>
              </Block>
            </Block>
          </Block>
        </Block>
        <Block style={styles.schedule}>        
          <Block row>
            <Image source={require('../assets/images/check.png')} style={styles.checkImage} />     
            <Block middle style={styles.padTop10}>              
              <Text bold size={18} style={styles.caseTitle}>Get 50% off on complete medical checkup</Text>
              <Block style={styles.blockText}>
                <Text style={styles.marBtm5}>MBBS,DOMS,MS - Ophthalmology</Text>
                <Text style={styles.marBtm5}>Ophthalmologist</Text>
                <Text style={styles.marBtm5}>26 years of experience</Text>
                <Block row style={styles.padVrt1}>
                <Block middle>
                  <Icon name="map-marker" family="font-awesome" color={theme.COLORS.MUTED} size={16}> </Icon>  
                </Block>
                <Block middle style={styles.marRight40}>
                  <Text>02/16/2021</Text>                  
                </Block>   
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
  notification: {
    paddingVertical: theme.SIZES.BASE / 3,
  },  
  caseTitle: {
    alignSelf: 'flex-start',
    paddingVertical: 5
  },
  checkImage: {
    position:'absolute', 
    zIndex: 5, 
    right: -width * 0.05, 
    top: -height * 0.01
  },
  schedule: {
    paddingHorizontal: width * 0.05,
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
  blockText: {
    borderWidth: 1, 
    borderRadius: 5, 
    borderColor: theme.COLORS.GREY, 
    padding: 8, 
    marginBottom:12, 
    width: width * 0.82
  },
  padTop10: {
    paddingTop: 10
  },
  marBtm5: {
    marginBottom: 5
  },
  padVrt1: {
    paddingVertical: 1
  },
  marRight40: {
    marginRight: 40
  }
});

export default CaseHistory;