import React, { useState } from "react";
import { StyleSheet, Switch, FlatList, Platform } from "react-native";
import { Block, Text, theme } from "galio-framework";

import materialTheme from '../constants/Theme';

const Notifications = (props) => {
  
  const notifications = [
    { title: "Someone mentions me", id: "mentions" },
    { title: "Anyone follows me", id: "follows" },
    { title: "Someone comments me", id: "comments" },
    { title: "A seller follows me", id: "seller" }
  ];

  const [itemId, setItemId] = useState({});

  const toggleSwitch = switchNumber =>
    setItemId({ [switchNumber]: !itemId[switchNumber] });

  const renderItem = ({ item }) => (
    <Block row middle space="between" style={styles.rows}>
      <Text size={theme.SIZES.FONT}>{item.title}</Text>
      <Switch
        onValueChange={() => toggleSwitch(item.id)}
        ios_backgroundColor={materialTheme.COLORS.SWITCH_OFF}
        thumbColor={Platform.OS === 'android' ? materialTheme.COLORS.SWITCH_OFF : null}
        trackColor={{ false: materialTheme.COLORS.SWITCH_OFF, true: materialTheme.COLORS.SWITCH_ON }}
        value={itemId[item.id]}
      />
    </Block>
  );

  return (
    <Block flex style={styles.notification}>
      <FlatList
        data={notifications}
        keyExtractor={(item, index) => item.id}
        renderItem={renderItem}
        ListHeaderComponent={
          <Block style={styles.title}>
            <Text bold center size={16} style={{ paddingBottom: 5 }}>
              Notifications Settings
            </Text>
            <Text center muted size={12}>
              These are the most important settings
            </Text>
          </Block>
        }/>
    </Block>
  );
}

const styles = StyleSheet.create({
  notification: {
    paddingVertical: theme.SIZES.BASE / 3,
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

export default Notifications;