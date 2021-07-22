import React, { useEffect, useState } from "react";
import {
  StatusBar,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  Dimensions,
} from "react-native";
import { Block, Text, theme, Button, Icon } from "galio-framework";
import { RadioButton } from "react-native-paper";
import { I18nManager } from "react-native";
import materialTheme from "../constants/Theme";
import { IMLocalized, init } from "../localization/IMLocalization";
import AsyncStorage from "@react-native-community/async-storage";
import { useDispatch } from "react-redux";

export const LocalizationContext = React.createContext();
const { width, height } = Dimensions.get("screen");

const listData = [
  {
    title: "SF Pro Display",
  },
  {
    title: "Bio Sans",
  },
  {
    title: "Poppins",
  },
  {
    title: "Roboto",
  },
];

const ListItem = ({ item, onPress, style }) => (
  <TouchableOpacity onPress={onPress} style={[styles.item, style]}>
    <Text style={styles.title}>{item.title}</Text>
  </TouchableOpacity>
);

const Font = (props) => {
  const [selectedId, setSelectedId] = useState(0);
  const FontDispatch = useDispatch();
  const { navigation } = props;

  const setFonts = () => {
    switch (selectedId) {
      case 0:
        // init("en-US");
        // FontDispatch({ type: "SET_LAN", payload: "en-US" });
        break;
      case 1:
        // init("fr-FR");
        // FontDispatch({ type: "SET_LAN", payload: "fr-FR" });
        break;
      case 2:
        // init("fr-FR");
        break;
      case 3:
        // init("fr-FR");
        // break;
    }
  };

  useEffect(() => {
    setFonts();
  }, [selectedId]);

  const navbar = () => {
    return (
      <Block>
        <Block row style={styles.navbar} center>
          <TouchableOpacity style={styles.touchableArea} onPress={() => navigation.goBack()}>
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
            {IMLocalized("Font")}
          </Text>
        </Block>
        <Block style={{ borderTopWidth: 1, borderColor: "white" }}></Block>
      </Block>
    );
  };

  return (
    <Block flex style={styles.page}>
      {navbar()}
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.Fonts}
        overScrollMode="always"
      >
        {listData.map((value, index) => {
          return (
            <Block key={index} flex flexDirection="row" style={styles.FontRow}>
              <RadioButton
                flex={1}
                value={index}
                status={selectedId === index ? "checked" : "unchecked"}
                onPress={() => setSelectedId(index)}
              />

              <Block style={styles.FontTitle}>
                <Text flex={3} color={"black"} size={18}>
                  {value.title}
                </Text>
              </Block>
            </Block>
          );
        })}
      </ScrollView>
    </Block>
  );
};

const styles = StyleSheet.create({
  page: {
    backgroundColor: "white",
  },
  Fonts: {
    padding: theme.SIZES.BASE * 2,
  },
  container: {
    flex: 1,
    marginTop: StatusBar.currentHeight || 0,
  },
  item: {
    padding: 10,
    marginVertical: 2,
  },
  title: {
    fontSize: 16,
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
    paddingTop: theme.SIZES.BASE,
    paddingLeft: theme.SIZES.BASE * 0.5,
    borderBottomWidth: 1,
    borderColor: "rgba(112, 112, 112, 0.1)",
  },
  FontTitle: {
    justifyContent: "center",
    alignItems: "center",
  },
  FontRow: {
    marginVertical: theme.SIZES.BASE * 0.5,
  },
});

export default Font;
