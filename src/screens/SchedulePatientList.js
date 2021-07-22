import React, { useEffect, useState } from "react";
import {
  ScrollView,
  StyleSheet,
  TouchableOpacity,
  Dimensions,
  View,
  ActivityIndicator,
} from "react-native";
import { Block, Text, theme } from "galio-framework";
import products from "../constants/images/home";
import {
  Icon,
  ListItem,
} from "../components/";
import { IMLocalized } from "../localization/IMLocalization";
import firestore from '@react-native-firebase/firestore';
import { set } from "lodash";

const { width, height } = Dimensions.get("screen");
const cardWidth = theme.SIZES.BASE * 4;

const Components = (props) => {
  const { navigation } = props;
  const { doctor } = props.route.params;
  const [spinner, setSpinner] = useState(false);
  const [booking, setBooking] = useState([]);
  const tempBooking = [];

  useEffect(() => {
    setSpinner(true);
    firestore().collection('PCDoctors').doc(doctor.uid).collection('Bookings').get().then((querySnapShot) => {
      querySnapShot.forEach((bookingDoc) => {
        // bookingDoc.data().caseReference.get().then((caseShot) => {
        //   caseShot.data();
        // });
        tempBooking.push({
          booking: bookingDoc.data(),
          // case: caseDoc,
        });
      });
      setBooking(tempBooking);

    }).then((res) => {
      if (tempBooking.length == 0) {
        setBooking([]);
      }
      setSpinner(false);
    });
  }, [doctor]);

  const handleCheck = (index) => {
    let tempBookingCheck = [...booking];
    tempBookingCheck[index].booking.isChecked = !tempBookingCheck[index].booking.isChecked;
    setBooking(tempBookingCheck);
  };

  const renderPatientsList = () => {
    return (
      spinner ? (
        <ActivityIndicator style={{marginTop: 40}} size={50} color="#6E78F7" />
        ) : (
          <>  
            {
              booking && booking.map((val, index) => (
                  <ListItem key={index} category={val} horizontal role="schedulePatientList" handleCheck={handleCheck} index={index}/>
                ) 
              )
            }            
          </>
        )          
    );
  };

  const renderSaveButton = () => {
    return (
      <TouchableOpacity onPress={() => navigation.goBack()}>
        <Block center style={styles.saveButton}>
          <Text color="white" size={16}>
            {IMLocalized("save")}
          </Text>
        </Block>
      </TouchableOpacity>
    );
  }
  
  const navbar = () => {
    return (
      <Block>
        <Block row style={styles.navbar} center>
          <TouchableOpacity
            style={styles.touchableArea}
            onPress={() => navigation.goBack()}
          >
            <Icon
              name="arrow-left"
              family="font-awesome"
              color="black"
              size={16}
              style={styles.chevronLeft}
            />
          </TouchableOpacity>
          <Text
            color="black"
            style={{ paddingLeft: theme.SIZES.BASE * 0.5 }}
            size={16}
            fontWeight="semiBold"
          >
            {IMLocalized("Patient List")}
          </Text>
        </Block>
        <Block style={{ borderTopWidth: 1, borderColor: "white" }}></Block>
      </Block>
    );
  };

  return (
    <Block flex>
      {navbar()}
      <ScrollView
        style={styles.components}
        showsVerticalScrollIndicator={false}
      >
        {renderPatientsList()}
      </ScrollView>
      {
        spinner ? (
          <></>
        ) : renderSaveButton()
      }
    </Block>
  );
};

const styles = StyleSheet.create({
  components: {
    paddingTop: theme.SIZES.BASE,
    paddingHorizontal: theme.SIZES.BASE,
    backgroundColor: "#F8F8F8",
  },
  title: {
    paddingVertical: theme.SIZES.BASE,
    paddingHorizontal: theme.SIZES.BASE * 2,
  },
  saveButton: {
    width: width * 0.7, 
    height: 40, 
    justifyContent: 'center', 
    alignItems: 'center',
    backgroundColor: "#6E78F7",
    borderRadius: 20,    
    marginBottom: 20,
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
  imageBlock: {
    overflow: "hidden",
    borderRadius: 4,
  },
  rows: {
    height: theme.SIZES.BASE * 2,
  },
  social: {
    width: theme.SIZES.BASE * 3.5,
    height: theme.SIZES.BASE * 3.5,
    borderRadius: theme.SIZES.BASE * 1.75,
    justifyContent: "center",
  },
  category: {
    backgroundColor: theme.COLORS.WHITE,
    marginVertical: theme.SIZES.BASE / 2,
    borderWidth: 0,
  },
  categoryTitle: {
    height: "100%",
    paddingHorizontal: theme.SIZES.BASE,
    backgroundColor: "rgba(0, 0, 0, 0.5)",
    justifyContent: "center",
    alignItems: "center",
  },
  sortItem: {
    borderWidth: 2,
    borderRadius: 1000,
    borderColor: "#FFF",
    paddingVertical: 8,
    paddingHorizontal: width * 0.03,
    marginHorizontal: theme.SIZES.BASE * 0.5,
    shadowColor: "black",
    shadowOffset: { width: -3, height: -3 },
    shadowRadius: 10,
    shadowOpacity: 0.2,
    elevation: 2,
    margin: 2,
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
    paddingLeft: 5,
  },
  greyGradient: {
    shadowColor: "black",
    shadowOffset: { width: 2, height: 2 },
    shadowRadius: 2,
    shadowOpacity: 0.2,
    elevation: 2,
  },
  touchableArea: {
    width: 30, 
    height: 30, 
    justifyContent: 'center', 
    alignItems: 'center'
  },
  navbar: {
    backgroundColor: "white",
    width: width,
    height: height * 0.1,
    paddingTop: theme.SIZES.BASE * 2,
    paddingLeft: theme.SIZES.BASE * 0.5,
    borderBottomWidth: 1,
    borderColor: "rgba(112, 112, 112, 0.1)",
  },
});

export default Components;
