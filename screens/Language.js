import React, { useState }from 'react';
import { FlatList, SafeAreaView, StatusBar, StyleSheet, TouchableOpacity, ScrollView } from 'react-native';
import { Block, Text, theme, Button } from 'galio-framework';
import * as Localization from 'expo-localization';
import { I18nManager } from 'react-native';
import materialTheme from '../constants/Theme';
import { IMLocalized, init } from '../src/localization/IMLocalization';
import AsyncStorage from '@react-native-community/async-storage';
import { useDispatch } from 'react-redux';
  
export const LocalizationContext = React.createContext();

const listData = [
    {
        id: '1',
        title: 'English',
    },
    {
        id: '2',
        title: 'French',
    },
    {
        id: '3',
        title: 'Arbic',
    },
];

const ListItem = ( { item, onPress, style } ) => (
    <TouchableOpacity onPress={onPress} style={[styles.item, style]}>
        <Text style={styles.title}>{item.title}</Text>
    </TouchableOpacity>
);


const Language = () => {    
    const [selectedId, setSelectedId] = useState(null);
    const languageDispatch = useDispatch();

    const renderItem = ({ item }) => {
        const backgroundColor = item.id === selectedId ? '#aaaaaa' : '#ffffff';
        return <ListItem item={item} onPress={() => setSelectedId(item.id)} style={{ backgroundColor }} />;
    };
    const setLanguages = () => {
        switch(selectedId)
        {
          case '1':
            init('en-US');
            languageDispatch({type:'SET_LAN', payload:'en-US'});
            break;
          case '2':
            init('fr-FR');
            languageDispatch({type:'SET_LAN', payload:'fr-FR'});
            break;
          case '3':
            init('fr-FR');
            break;
        }
      };
    setLanguages();
    return (
      <Block flex style={{ position: 'relative' }}>
        <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={styles.languages} overScrollMode='always'>
            <FlatList
                data={listData}
                renderItem={renderItem}
                keyExtractor={item => item.id}
                extraData={selectedId}
            />
        </ScrollView>
      </Block>
    );
};

const styles = StyleSheet.create({
    languages: {
        padding: theme.SIZES.BASE,
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
  });

export default Language;