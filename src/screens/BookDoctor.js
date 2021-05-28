import React, { useEffect, useState } from 'react';
import { Image, StyleSheet, Dimensions, View, TouchableOpacity, ScrollView } from 'react-native';
import { Block, Button, Text, theme, Input } from 'galio-framework';
import materialTheme from '../constants/Theme';
import {IMLocalized, init} from '../localization/IMLocalization';
import { useFonts } from 'expo-font';
import AppLoading from 'expo-app-loading';
import { useDispatch, useSelector } from 'react-redux';
import { roleSelector } from '../store/duck/action'
import SvgUri from "react-native-svg-uri";
import { Icon } from "../components";
import SearchBar from "react-native-dynamic-search-bar";
import LocateItem from "../components/LocateItem";
import products from "../constants/images/home";
const { height, width } = Dimensions.get('screen');

const InsuranceInfo = (props) => {
    const { navigation } = props;    
    const navbar = () => {
      return (
        <Block row style={styles.navbar} center>
            <TouchableOpacity onPress={() => navigation.navigate("DashboardPatient")}>
          <Icon
              name="arrow-left"
              family="font-awesome"
              color="white"
              size={16}
              style={styles.chevronLeft}
              />
              </TouchableOpacity>
          <Text color="white" style={{paddingLeft: theme.SIZES.BASE}} size={17} bold>Book Doctor</Text>
          <Block style={styles.searchBox}>
            <SearchBar
                placeholder="Search here"
                onChangeText={(text) => console.log(text)}
                style={{borderRadius: 50, color: 'grey', height: 50, 
                borderWidth: 1,
                borderColor: "#DDD"}}
            />
          </Block>
        </Block>
      )
    }

    return (
        <Block style={{backgroundColor: "white"}}>
            {navbar()}
            <Block  style={{marginTop: theme.SIZES.BASE * 3, padding: theme.SIZES.BASE}}>
                {/* <Text style={{color: '#3F4079', marginBottom: theme.SIZES.BASE}} size={12}>{IMLocalized('doctorsNearbyYou')}</Text> */}
                <Text style={{color: '#3F4079', marginBottom: theme.SIZES.BASE}} size={12}>Doctors Nearby you</Text>
                <ScrollView style={{height: height * 0.65}}>
                    <Block flex>
                        <LocateItem product={products[0]} horizontal />
                        <LocateItem product={products[1]} horizontal />
                        <LocateItem product={products[3]} horizontal />
                        <LocateItem product={products[4]} horizontal />
                        <LocateItem product={products[2]} horizontal />
                        <LocateItem product={products[0]} horizontal />
                        <LocateItem product={products[0]} horizontal />
                        <LocateItem product={products[0]} horizontal />
                        <LocateItem product={products[1]} horizontal />
                    </Block>
                </ScrollView>
            </Block>
        </Block>
    )
}
const styles = StyleSheet.create({
    searchBox: {
        position: "absolute",
        width: width,
        top: height * 0.14,
    },
    inputNote: {
        width: width * 0.9,
        borderRadius: theme.SIZES.BASE,
        borderColor: 'grey',
        borderWidth: 1,
        marginTop: theme.SIZES.BASE,
        height: height * 0.4,
    },
    inputItem: {
        width: width * 0.9,
        borderRadius: theme.SIZES.BASE,
        borderColor: 'grey',
        borderWidth: 1,
        marginTop: theme.SIZES.BASE
    },
    location: {
        marginTop: theme.SIZES.BASE,
        width: width * 0.8,
        borderRadius: 10,
        padding: 5,
        borderRadius: 15,
        borderColor: '#DEDEDE',
        borderWidth: 1,
    },
    cardStyle: {
        borderWidth: 1,
        borderColor: '#EDEDED',
        borderRadius: 30,
        width: width,
        height:100,
        marginTop: theme.SIZES.BASE * 1.5,
        padding: theme.SIZES.BASE
    },
    navbar: {
        backgroundColor: "#6E78F7",
        borderBottomRightRadius: 24,
        borderBottomLeftRadius: 24,
        width: width,
        height: height * 0.16,
        paddingTop: theme.SIZES.BASE * 2,
        paddingLeft: theme.SIZES.BASE,
    },
    input: {
        marginVertical: theme.SIZES.BASE,
        width: width * 0.8,
        borderBottomWidth: 1,
        borderBottomColor: materialTheme.COLORS.PLACEHOLDER,
        color: 'black',
    },
    inputActive: {
        borderBottomColor: "black",
    },
});
export default InsuranceInfo;