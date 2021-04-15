import React, { useState } from "react";
import { StyleSheet, Dimensions, ScrollView, Image, TouchableOpacity } from "react-native";
import { Block, Text, theme } from "galio-framework";

import materialTheme from '../constants/Theme';
import { Icon } from '../components'

const { width, height } = Dimensions.get('screen');

const Notification = (props) => {  

  return (
    <Block flex style={styles.notification}>   
        <ScrollView
          horizontal={true}
          pagingEnabled={true}
          decelerationRate={0}
          scrollEventThrottle={16}
          snapToAlignment="center"
          style={{height: 50, marginVertical: 10}}
          showsHorizontalScrollIndicator={false}
          snapToInterval={(theme.SIZES.BASE * 0.375)}
          contentContainerStyle={{ paddingHorizontal: theme.SIZES.BASE / 2 }}
          >
              
          <TouchableOpacity           
            style={{backgroundColor: '#00CE30', borderRadius: 10, padding: 4, marginRight: 4}}
          >              
            <Text color={'white'} style={{alignContent: 'center', alignSelf: 'center'}}>WED</Text>
            <Text color={'white'} size={10}>04/14/2021</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={{backgroundColor: 'white', borderColor: '#EDEDED', borderRadius: 10, padding: 4, marginRight: 4}}
          >
            <Text style={{alignContent: 'center', alignSelf: 'center'}}>THU</Text>
            <Text size={10}>04/15/2021</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={{backgroundColor: 'white', borderColor: '#EDEDED', borderRadius: 10, padding: 4, marginRight: 4}}
          >
            <Text style={{alignContent: 'center', alignSelf: 'center'}}>FRI</Text>
            <Text size={10}>04/16/2021</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={{backgroundColor: 'white', borderColor: '#EDEDED', borderRadius: 10, padding: 4, marginRight: 4}}
          >
            <Text style={{alignContent: 'center', alignSelf: 'center'}}>SAT</Text>
            <Text size={10}>04/17/2021</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={{backgroundColor: 'white', borderColor: '#EDEDED', borderRadius: 10, padding: 4, marginRight: 4}}
          >
            <Text style={{alignContent: 'center', alignSelf: 'center'}}>SUN</Text>
            <Text size={10}>04/18/2021</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={{backgroundColor: 'white', borderColor: '#EDEDED', borderRadius: 10, padding: 4, marginRight: 4}}
          >
            <Text style={{alignContent: 'center', alignSelf: 'center'}}>MON</Text>
            <Text size={10}>04/19/2021</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={{backgroundColor: 'white', borderColor: '#EDEDED', borderRadius: 10, padding: 4, marginRight: 4}}
          >
            <Text style={{alignContent: 'center', alignSelf: 'center'}}>THE</Text>
            <Text size={10}>04/19/2021</Text>
          </TouchableOpacity>
        </ScrollView>     
      <ScrollView vertical={true} showsVerticalScrollIndicator={false}>
        <Block style={styles.schedule}>        
          <Block row>
            <Image source={require('../assets/images/check.png')} style={{position:'absolute', zIndex: 5, right: -width * 0.05, top: -height * 0.01}} />  
            <Block middle>
              <Image source={require('../assets/images/avatar.png')} />
            </Block>    
            <Block middle style={{paddingTop: 10}}>              
              <Text bold size={18} style={{alignSelf: 'flex-start', paddingVertical: 5}}>Zean Ronen</Text>
              <Block style={{borderWidth: 1, borderRadius: 5, borderColor: theme.COLORS.GREY, padding: 8}}>
                <Text>MBBS,DOMS,MS - Ophthalmology</Text>
                <Text>Ophthalmologist</Text>
                <Text>26 years of experience</Text>
              </Block>
              <Block row style={{paddingVertical: 8}}>
                <Block middle>
                  <Icon name="map-marker" family="font-awesome" color={theme.COLORS.CUSTOM} size={16}> </Icon>  
                </Block>
                <Block middle style={{marginRight: 40}}>
                  <Text>8.00-9.00</Text>                  
                </Block>
                <Block middle>
                  <Icon name="map-marker" family="font-awesome" color={theme.COLORS.CUSTOM} size={16}> </Icon>  
                </Block>
                <Block middle>
                  <Text>Andheri East  </Text>                  
                </Block>    
              </Block>
            </Block>
          </Block>
        </Block>   
        <Block style={styles.schedule}>        
          <Block row>
            <Image source={require('../assets/images/check.png')} style={{position:'absolute', zIndex: 5, right: -width * 0.05, top: -height * 0.01}} />  
            <Block middle>
              <Image source={require('../assets/images/avatar.png')} />
            </Block>    
            <Block middle style={{paddingTop: 10}}>              
              <Text bold size={18} style={{alignSelf: 'flex-start', paddingVertical: 5}}>Zean Ronen</Text>
              <Block style={{borderWidth: 1, borderRadius: 5, borderColor: theme.COLORS.GREY, padding: 8}}>
                <Text>MBBS,DOMS,MS - Ophthalmology</Text>
                <Text>Ophthalmologist</Text>
                <Text>26 years of experience</Text>
              </Block>
              <Block row style={{paddingVertical: 8}}>
                <Block middle>
                  <Icon name="map-marker" family="font-awesome" color={theme.COLORS.CUSTOM} size={16}> </Icon>  
                </Block>
                <Block middle style={{marginRight: 40}}>
                  <Text>8.00-9.00</Text>                  
                </Block>
                <Block middle>
                  <Icon name="map-marker" family="font-awesome" color={theme.COLORS.CUSTOM} size={16}> </Icon>  
                </Block>
                <Block middle>
                  <Text>Andheri East  </Text>                  
                </Block>    
              </Block>
            </Block>
          </Block>
        </Block>  
        <Block style={styles.schedule}>        
          <Block row>
            <Image source={require('../assets/images/check.png')} style={{position:'absolute', zIndex: 5, right: -width * 0.05, top: -height * 0.01}} />  
            <Block middle>
              <Image source={require('../assets/images/avatar.png')} />
            </Block>    
            <Block middle style={{paddingTop: 10}}>              
              <Text bold size={18} style={{alignSelf: 'flex-start', paddingVertical: 5}}>Zean Ronen</Text>
              <Block style={{borderWidth: 1, borderRadius: 5, borderColor: theme.COLORS.GREY, padding: 8}}>
                <Text>MBBS,DOMS,MS - Ophthalmology</Text>
                <Text>Ophthalmologist</Text>
                <Text>26 years of experience</Text>
              </Block>
              <Block row style={{paddingVertical: 8}}>
                <Block middle>
                  <Icon name="map-marker" family="font-awesome" color={theme.COLORS.CUSTOM} size={16}> </Icon>  
                </Block>
                <Block middle style={{marginRight: 40}}>
                  <Text>8.00-9.00</Text>                  
                </Block>
                <Block middle>
                  <Icon name="map-marker" family="font-awesome" color={theme.COLORS.CUSTOM} size={16}> </Icon>  
                </Block>
                <Block middle>
                  <Text>Andheri East  </Text>                  
                </Block>    
              </Block>
            </Block>
          </Block>
        </Block>  
        <Block style={styles.schedule}>        
          <Block row>
            <Image source={require('../assets/images/check.png')} style={{position:'absolute', zIndex: 5, right: -width * 0.05, top: -height * 0.01}} />  
            <Block middle>
              <Image source={require('../assets/images/avatar.png')} />
            </Block>    
            <Block middle style={{paddingTop: 10}}>              
              <Text bold size={18} style={{alignSelf: 'flex-start', paddingVertical: 5}}>Zean Ronen</Text>
              <Block style={{borderWidth: 1, borderRadius: 5, borderColor: theme.COLORS.GREY, padding: 8}}>
                <Text>MBBS,DOMS,MS - Ophthalmology</Text>
                <Text>Ophthalmologist</Text>
                <Text>26 years of experience</Text>
              </Block>
              <Block row style={{paddingVertical: 8}}>
                <Block middle>
                  <Icon name="map-marker" family="font-awesome" color={theme.COLORS.CUSTOM} size={16}> </Icon>  
                </Block>
                <Block middle style={{marginRight: 40}}>
                  <Text>8.00-9.00</Text>                  
                </Block>
                <Block middle>
                  <Icon name="map-marker" family="font-awesome" color={theme.COLORS.CUSTOM} size={16}> </Icon>  
                </Block>
                <Block middle>
                  <Text>Andheri East  </Text>                  
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
  }
});

export default Notification;