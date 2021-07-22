import React, { useState, useEffect } from "react";
import {
  ScrollView,
  StyleSheet,
  TouchableOpacity,
  Dimensions,
} from "react-native";
import { Block, Text, theme } from "galio-framework";
import {
  Icon,
  ListItem,
} from "../components/";
import LinearGradient from "react-native-linear-gradient";
import { IMLocalized, init } from "../localization/IMLocalization";
import auth from '@react-native-firebase/auth';
import firestore from '@react-native-firebase/firestore';

const { width, height } = Dimensions.get("screen");
const cardWidth = theme.SIZES.BASE * 4;

const DoctorCaseHistory = (props) => {
  const { navigation } = props;
  const [filterIndex, setFilterIndex] = useState(0);
  const [sortIndex, setSortIndex] = useState(0);
  const [doctor, setDoctor] = useState([]);
  const [cases, setCases] = useState(null);
  let doctorTemp = {};
  const sortCategories = [
    {
      title: IMLocalized("name"),    
    },
    {
      title: IMLocalized("status"),
    },
    {
      title: IMLocalized("date"),
    },
  ];
  const filterCategories = [
    {
      title: IMLocalized("newCase"),
    },
    {
      title: IMLocalized("waiting"),
    },
    {
      title: IMLocalized("scheduled"),
    },
    {
      title: IMLocalized("treatment"),
    },
    {
      title: IMLocalized("review"),
    },
    {
      title: IMLocalized("discharged"),
    },
  ];

  useEffect(() => {
    const currentUserUid = auth().currentUser.uid;
    firestore().collection('PCDoctors').doc(currentUserUid).collection('PCDoctor').get().then((querySnapshot) => {
      querySnapshot.forEach((doc) => {
        doctorTemp = doc.data();        
      });
      const caseTemp = [];
      const caseArrayPromise = doctorTemp.linkedCases.map((val) => {
        const refArray = val.caseReference.get().then((refVal) => {
          const refValData = refVal.data();
          // console.log('refValData === >', refValData);
          caseTemp.push({...refValData});
          return caseTemp;  
        });
        return refArray;
      });
      Promise.all(caseArrayPromise).then((array) => {
        // console.log('caseTemp === >', array[0]);
        setCases(array[0]);
      });
      setDoctor(doctorTemp);
    });
  }, []);

  const renderSort = (item, index) => {
    return (
      <TouchableOpacity
        style={{ zIndex: 3 }}
        key={`product-${item.title}`}
        onPress={() => setSortIndex(index)}
      >
        <LinearGradient
          start={{ x: 0, y: 0 }}
          end={{ x: 0.25, y: 1.1 }}
          locations={[0.2, 1]}
          colors={index == sortIndex ? ["#06D81E", "#06D81E"] : ["#EFEFEF", "#FFF"]}
          style={styles.sortItem}
          flex={1}
        >
          <Block center>
            <Text center size={15} fontWeight="semiBold" color={ index == sortIndex ? "white" : "black" }>
              {item.title}
            </Text>
          </Block>
        </LinearGradient>
      </TouchableOpacity>
    );
  };
  const renderSorts = () => {
    return (
      <Block flex style={{ marginTop: theme.SIZES.BASE / 2 }}>
        <ScrollView
          horizontal={true}
          pagingEnabled={true}
          decelerationRate={0}
          scrollEventThrottle={16}
          snapToAlignment="center"
          style={{ width }}
          showsHorizontalScrollIndicator={false}
          snapToInterval={cardWidth + theme.SIZES.BASE * 0.375}
          contentContainerStyle={{
            paddingHorizontal: theme.SIZES.BASE / 2,
          }}
        >
          {sortCategories &&
            sortCategories.map((item, index) => renderSort(item, index))}
        </ScrollView>
      </Block>
    );
  };
  const renderCasesList = () => {
    return (
      <Block style={{ paddingHorizontal: theme.SIZES.BASE }}>
        <ScrollView vertical={true} showsVerticalScrollIndicator={false}>
          { 
            cases && cases.map((val) => {
              return <ListItem category={val} horizontal role="doctorCase"/>;
            })
          }
        </ScrollView>
      </Block>
    );
  };
  const renderFilter = () => {
    return (
      <Block flex flexDirection="row" style={{ margin: 10 }}>
        {filterCategories.map((value, index) => {
          return (
            <Block
              key={index}
              flex={1}
              style={{ justifyContent: "center", alignItems: "center" }}
            >
              <TouchableOpacity
                onPress={() => setFilterIndex(index)}
              >
                <Text
                  color={index == filterIndex ? "#06D81E" : "black"}
                  size={12}
                >
                  {value.title}
                </Text>
              </TouchableOpacity>
            </Block>
          );
        })}
      </Block>
    );
  };
  const navbar = () => {
    return (
      <Block row style={styles.navbar} center>
        <TouchableOpacity onPress={() => navigation.openDrawer()}>
          <Icon
            name="align-justify"
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
          {IMLocalized("Case History")}
        </Text>
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
        {renderSorts()}
        {renderFilter()}
        {renderCasesList()}
      </ScrollView>
    </Block>
  );
};

const styles = StyleSheet.create({
  components: {
    paddingTop: theme.SIZES.BASE,
    backgroundColor: "#F8F8F8",
  },
  title: {
    paddingVertical: theme.SIZES.BASE,
    paddingHorizontal: theme.SIZES.BASE * 2,
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
    width: 100,
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
  navbar: {
    backgroundColor: "#6E78F7",
    width: width,
    height: height * 0.1,
    paddingTop: theme.SIZES.BASE,
    paddingLeft: theme.SIZES.BASE,
  },
});

export default DoctorCaseHistory;
