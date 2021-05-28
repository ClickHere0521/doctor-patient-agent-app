import React from 'react';
import { ScrollView, StyleSheet, Dimensions, TouchableOpacity } from 'react-native';

import LinearGradient from 'react-native-linear-gradient';
import { Block, Button, Text, theme, Icon } from 'galio-framework';
import { IMLocalized, init } from "../localization/IMLocalization";
import materialTheme from '../constants/Theme';

const { width, height } = Dimensions.get("screen");

const Privacy = (props) => {
  const { navigation } = props;
  const navbar = () => {
    return (
      <Block>
        <Block row style={styles.navbar} center>
          <TouchableOpacity onPress={() => navigation.goBack()}>
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
            style={{ paddingLeft: theme.SIZES.BASE }}
            size={22}
            fontWeight="semiBold"
          >
            {IMLocalized("Privacy")}
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
        overScrollMode='always'
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.privacy}
        >
        <Text size={16}>
          In recent months, Facebook, Google, IBM, Microsoft and others have aggressively lobbied officials in the Trump administration and elsewhere to start outlining a federal privacy law, according to administration officials and the companies. The law would have a dual purpose, they said: It would overrule the California law and instead put into place a kinder set of rules that would give the companies wide leeway over how personal digital information was handled.
        </Text>
        <Text size={16} color='rgba(0, 0, 0, 0.5)' style={{ paddingTop: 9 }}>
          “We are committed to being part of the process and a constructive part of the process,” said Dean Garfield, president of a leading tech industry lobbying group, the Information Technology Industry Council, which is working on proposals for the federal law. “The best way is to work toward developing our own blueprint.”
        </Text>
        <Text size={16} color='rgba(0, 0, 0, 0.5)' style={{ paddingTop: 9 }}>
          The efforts could set up a big fight with consumer and privacy groups, especially as companies like Facebook face scrutiny for mishandling users’ personal data. Many of the internet companies depend on the collection and analysis of such data to help them target the online ads that generate the bulk of their revenue.
        </Text>
        
        <Text size={16} color='rgba(0, 0, 0, 0.5)' style={{ paddingTop: 9 }}>
          At a board meeting for the Information Technology Industry Council in May, Joel Kaplan, Facebook’s top lobbyist, warned that an early proposal for privacy in California posed a threat to the industry and that the trade group needed to make the issue of privacy a priority, according to two people briefed on the meeting, who were not authorized to speak publicly.
        </Text>
      </ScrollView>
      <LinearGradient colors={['rgba(255,255,255,0)', 'rgba(255,255,255,1)']} style={styles.gradient} />
    </Block>
  );
}

const styles = StyleSheet.create({
  page: {
    backgroundColor: 'white'
  },
  privacy: {
    paddingVertical: theme.SIZES.BASE,
    paddingHorizontal: theme.SIZES.BASE * 2,
    paddingBottom: theme.SIZES.BASE * 5,
  },
  buttonsWrapper: {
    zIndex: 2,
    position: 'absolute',
    left: 0,
    right: 0,
    bottom: 0,
    paddingHorizontal: theme.SIZES.BASE,
    paddingVertical: theme.SIZES.BASE * 1.75,
  },
  privacyButton: {
    width: '48%',
    height: theme.SIZES.BASE * 3,
    alignItems: 'center',
    shadowColor: "rgba(0, 0, 0, 0.2)",
    shadowOffset: { width: 0, height: 4 },
    shadowRadius: 8,
    shadowOpacity: 1
  },
  gradient: {
    zIndex: 1,
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    height: '30%',
  },
  navbar: {
    backgroundColor: "white",
    width: width,
    height: height * 0.1,
    paddingTop: theme.SIZES.BASE,
    paddingLeft: theme.SIZES.BASE,
    borderBottomWidth: 1,
    borderColor: "rgba(112, 112, 112, 0.1)",
  },  
});

export default Privacy;