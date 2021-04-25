import React from "react";
import { ScrollView, StyleSheet, Dimensions, TouchableOpacity } from "react-native";
import { Block, Text, theme, Icon } from "galio-framework";
import { IMLocalized, init } from "../src/localization/IMLocalization";

const { width, height } = Dimensions.get("screen");

const Agreement = (props) => {

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
            {IMLocalized("User Agreement")}
          </Text>
        </Block>
        <Block style={{ borderTopWidth: 1, borderColor: "white" }}></Block>
      </Block>
    );
  };

  return (
    <Block flex style={styles.agreement}>
      {navbar()}
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.agreements}
        overScrollMode="always"
      >
        <Text size={16}>
          It all started in the early 1970s, when, floundering a bit in her
          post-college life, she landed a gig at WBFO, a radio station in
          Buffalo. There she would call subjects and interview them for the
          program she hosted, “This Is Radio.” She moved to Philadelphia in 1975
          to host “Fresh Air,” the brainchild of a colleague from WBFO.
        </Text>
        <Text muted size={16} style={{ paddingTop: 9 }}>
          Ms. Gross brings a combination of empathy and rigorous preparation to
          the job. “I read, watch or listen to as much of the person’s work as
          possible, so I have an understanding of what makes them, or their
          story, important,” she said. “I try to clarify in my own mind why this
          person matters, and why it’s worthy of our listeners’ time.”
        </Text>
        <Text muted size={16} style={{ paddingTop: 9 }}>
          One thing she does not allow of her interview subjects, however, is
          input on the edit. “When the interview is over, you don’t have a
          chance to call back and say, ‘Well I like my answer to this, I don’t
          like my answer to that, can you edit that out,” she said. (As someone
          who has been interviewed by Ms. Gross, I would like to say that I wish
          I hadn’t insisted that her cats hate her. That said, I never asked for
          my comment to be removed from that particular episode of “Fresh Air.”)
        </Text>
      </ScrollView>
    </Block>
  );
};

const styles = StyleSheet.create({
  agreement: {
    backgroundColor: 'white'
  },  
  agreements: {
    paddingVertical: theme.SIZES.BASE,
    paddingHorizontal: theme.SIZES.BASE * 2
  },
  navbar: {
    backgroundColor: "white",
    width: width,
    height: height * 0.16,
    paddingTop: theme.SIZES.BASE * 2,
    paddingLeft: theme.SIZES.BASE,
    borderBottomWidth: 1,
    borderColor: "rgba(112, 112, 112, 0.1)",
  },
});

export default Agreement;
