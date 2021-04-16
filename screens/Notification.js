import React, { useState } from "react";
import { StyleSheet, Dimensions, ScrollView, Image, TouchableOpacity } from "react-native";
import { Block, Text, theme } from "galio-framework";
import CalendarPicker from 'react-native-calendar-picker';

import materialTheme from '../constants/Theme';
import { Icon } from '../components'

const { width, height } = Dimensions.get('screen');

const Notification = (props) => {  

  const [isOpenCalendar, setIsOpenCalendar] = useState(false);

  const handleCalendar = () => {
    let isOpenCalendarTemp = !isOpenCalendar;
    setIsOpenCalendar(isOpenCalendarTemp);
  }

  return (
    <Block flex style={styles.notification}>   
      <Block >
        <Block style={styles.roundBlock}>
          <Block row style={{ marginTop: height * 0.12, paddingHorizontal: theme.SIZES.BASE * 0.5, position: 'absolute', zIndex: 1 }}>
            <Block>                
              <Icon size={16} name="arrow-left" family="font-awesome" color={'white'} style={{padding: 5}} />
            </Block>
            <Block>
              <Text color="white" size={20} style={{fontFamily: 'Inter-Black'}} bold>Select a time slot</Text>                                    
            </Block>
          </Block>
          <Block  style={{position: 'absolute', right: width * 0.1, top: height * 0.13}}>
            <TouchableOpacity
              onPress={handleCalendar}
            >
              <Text color="white">Calendar ></Text>
            </TouchableOpacity>            
          </Block>
        </Block>
      </Block>
      <Block style={{marginTop: height * 0.21, position:"absolute", zIndex:5}}>
        <ScrollView
          horizontal={true}
          pagingEnabled={true}
          decelerationRate={0}
          scrollEventThrottle={16}
          snapToAlignment="center"          
          showsHorizontalScrollIndicator={false}
          snapToInterval={(theme.SIZES.BASE * 0.375)}
          contentContainerStyle={{ paddingHorizontal: theme.SIZES.BASE / 2 }}
        >
              
          <TouchableOpacity           
            style={styles.dateActive}
          >              
            <Text size={16} color={'white'} style={{paddingLeft: 10}} >Today</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.dateInActive}
          >
            <Text size={16} style={{paddingLeft: 24}}>3.5</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.dateInActive}
          >
            <Text size={16} style={{paddingLeft: 24}}>3.6</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.dateInActive}
          >
            <Text size={16} style={{paddingLeft: 24}}>3.7</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.dateInActive}
          >
            <Text size={16} style={{paddingLeft: 24}}>3.8</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.dateInActive}
          >
            <Text size={16} style={{paddingLeft: 24}} >3.9</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.dateInActive}
          >
            <Text size={16} style={{paddingLeft: 18 }}>3.10</Text>
          </TouchableOpacity>
        </ScrollView>  
      </Block>
       
      <ScrollView vertical={true} showsVerticalScrollIndicator={false} style={{top: height * 0.27}}>
        {(isOpenCalendar) ? (
          <CalendarPicker            
            onDateChange={(date) => {console.log(date)}}
          />  
        ):(
          <>
          </>
        )}
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
  },
  roundBlock: {
    borderBottomLeftRadius: 34,
    borderBottomRightRadius: 34,
    position: 'absolute',
    backgroundColor: 'rgba(100, 120, 247, 0.84)',
    height: height * 0.25,    
    width: width,
    top: -10,
    zIndex: 2
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
});

export default Notification;