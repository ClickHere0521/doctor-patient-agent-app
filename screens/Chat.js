import React, { useState } from 'react';
import {
  View,
  Image,
  Dimensions,
  StyleSheet,
  ScrollView,
  FlatList,
  KeyboardAvoidingView,
} from 'react-native';

import { LinearGradient } from 'expo-linear-gradient';
import { Input, Block, Text, Button, theme } from 'galio-framework';
import { Icon } from '../components/';

import Images from "../constants/Images";
import materialTheme from '../constants/Theme';

const { width } = Dimensions.get('screen');
const message = [
  {
    id: 1,
    avatar: Images.Avatar,
    message: `Hey there! How are you today? Can we me et and talk? Thanks!`,
    time: `10:31 PM`,
  },
  {
    id: 2,
    message: `Sure, just let me finish something and I’ll call you.`,
    time: `10:34 PM`,
  },
  {
    id: 3,
    avatar: Images.Avatar,
    message: `OK. Cool! See you!`,
    time: `10:35 PM`,
  },
  {
    id: 4,
    message: `Bye bye`,
    time: `10:36 PM`,
  },
];

const Chat = (props) => {

  const [messages, setMessages] = useState(message);
  const [height, setHeight] = useState(0);

  const messagesScroll = React.createRef();

  const itemLayout = (data, index) => (
    { length: (messages.length - 1), offset: 32 * index, index }
  )

  const handleScroll = () => {

    setTimeout(() => {
        messagesScroll.current.scrollToOffset({ offset: height });
    }, 1);    
  }

  const onContentSizeChange = (width,height) => {
    setHeight(height);
  }

  const renderMessage = (msg) => {
    return (
      <Block key={msg.id}>
        <Block row space={!msg.avatar? 'between' : null}>
          <Image source={{ uri: msg.avatar }} style={[styles.avatar, styles.shadow]} />
          <Block style={styles.messageCardWrapper}>
            {msg.avatar ?
              <Block style={[styles.messageCard, styles.shadow]}>
                <Text>{msg.message}</Text>
              </Block> :
              <LinearGradient
                start={{ x: 0, y: 0 }}
                end={{ x: 1, y: 0 }}
                colors={['#6C24AA', '#AC2688']}
                style={[styles.messageCard, styles.shadow]}>              
                <Text color={theme.COLORS.WHITE}>{msg.message}</Text>
              </LinearGradient>
            }
            <Block right>
              <Text style={styles.time}>{msg.time}</Text>
            </Block>
          </Block>
        </Block>
      </Block>
    )
  }

  const renderMessages = () => {
    const insetBottom = messages.length * (theme.SIZES.BASE * 6.5) + 64; // total messages x message height
    return (
      <FlatList
        ref={messagesScroll}
        data={message}
        keyExtractor={item => `${item.id}`}
        showsVerticalScrollIndicator={false}
        getItemLayout={itemLayout}
        contentContainerStyle={[styles.messagesWrapper]}
        renderItem={({ item }) => renderMessage(item)}
        onContentSizeChange={onContentSizeChange}
      />
    )
  }

  const handleMessageChange = (type, text) => {    
    setMessages(text);
  }

  const handleMessage = () => {
    const date = new Date();

    messages.push({
      id: messages.length + 1,
      message: message,
      time: date.toLocaleString('en-US', { hour: '2-digit', minute: 'numeric' }),
    });

    setMessages(messages);
    handleScroll();
  }

const messageForm = () => {
    const { navigation } = props;
    
    return (
      <View style={styles.messageFormContainer}>
        <Block flex row middle space="between" >
          <Button
            round
            shadowless
            radius={28}
            opacity={0.9}
            style={styles.iconButton}
            color={materialTheme.COLORS.BUTTON_COLOR}
            onPress={() => navigation.navigate('Chat')}>
            <Icon size={16} name="camera-18" family="GalioExtra" color={theme.COLORS.MUTED} />
          </Button>
          <Input
            borderless
            color="#9fa5aa"
            multiline
            blurOnSubmit
            style={styles.input}
            placeholder="Message"
            autoCapitalize="none"
            returnKeyType="send"
            textContentType="none"
            placeholderTextColor="#9fa5aa"
            defaultValue={message}
            onSubmitEditing={handleMessage}
            onChangeText={text => handleMessageChange('message', text)}
          />
        </Block>
      </View>
    );
  }

  return (
    <Block flex space="between" style={styles.container}>
      <KeyboardAvoidingView
        enabled
        behavior="padding"
        style={{ flex: 1 }}
        keyboardVerticalOffset={theme.SIZES.BASE * 3.2}>
        {renderMessages()}
        {messageForm()}
      </KeyboardAvoidingView>
    </Block>
  );
}

const styles = StyleSheet.create({
  container: {
    
  },
  messageFormContainer: {
    height: 96,
    paddingHorizontal: 16,
    paddingTop: 16,
    paddingBottom: 32,    
  },
  input: {
    width: width * 0.78,
    height: theme.SIZES.BASE * 3,
    backgroundColor: theme.COLORS.WHITE,
  },
  iconButton: {
    width: 40,
    height: 40,
    backgroundColor: 'transparent',
  },
  messagesWrapper: {
    flexGrow: 1,
    top: 0,
    paddingLeft: 8,
    paddingRight: 16,
    paddingVertical: 16,
    paddingBottom: 68
  },
  messageCardWrapper: {
    maxWidth: '85%',
    marginLeft: 8,
    marginBottom: 32,
  },
  messageCard: {
    paddingHorizontal: 8,
    paddingVertical: 16,
    borderRadius: 6,
    backgroundColor: theme.COLORS.WHITE,
  },
  shadow: {
    shadowColor: "rgba(0, 0, 0, 0.12)",
    shadowOffset: { width: 0, height: 7 },
    shadowRadius: 20,
    shadowOpacity: 1
  },
  time: {
    fontSize: 11,
    opacity: 0.5,
    marginTop: 8,
  },
  avatar: {
    height: 40,
    width: 40,
    borderRadius: 20,
    marginBottom: theme.SIZES.BASE,
  },
});

export default Chat;