import PropTypes from 'prop-types';
import React, { useState } from 'react';
import { View } from 'react-native';
import { HelperText, TextInput, useTheme } from 'react-native-paper';
import inputProps from '../constants/inputProps';
import validators from '../constants/validators';
import { isValid } from '../utils/helpers';
import { theme } from "galio-framework";
import { useSelector } from 'react-redux';

const Input = ({
  onChangeText,
  containerStyle,
  style,
  value,
  label,
  mode,
  validate,
  leftIcon,
  rightIcon,
  requested,
  ...props
}) => {
  const { dimensions, colors } = useTheme();
  const inputProperties = inputProps.find((i) =>
    label.toLowerCase().includes(i.label.toLowerCase()),
  );

  const valid = requested
    ? (isValid(inputProperties?.label.toLowerCase(), value) && value != '')
    : isValid(inputProperties?.label.toLowerCase(), value) || value == '';
  const [eye, setEye] = useState(false);

  if(leftIcon != null && rightIcon != null){
    return (
      <View style={containerStyle}>
        <TextInput
          onChangeText={onChangeText}
          // mode={mode}
          underlineColor="transparent" 
          error={validate && !valid}
          {...inputProperties}
          {...props}
          label={label}
          value={value}
          secureTextEntry={!eye}
          style={{
            textTransform: 'capitalize',
            marginBottom: validate ? 0 : 15,
            minWidth: '100%',
            borderRadius: 9,
            borderTopLeftRadius: 9,
            borderTopRightRadius: 9,
            height: 45,
          }}
          left={
            <TextInput.Icon
              name={leftIcon} // where <Icon /> is any component from vector-icons or anything else
              color="grey"
              size={theme.SIZES.BASE}
              onPress={() => {}}
            />
          }
          right={ rightIcon == "eye" ? (
            <TextInput.Icon
              name={eye ? "eye-off" : rightIcon } // where <Icon /> is any component from vector-icons or anything else
              color="grey"
              size={theme.SIZES.BASE}
              onPress={() => setEye(!eye)}
            />
          ) : (
            <TextInput.Icon
              name={ rightIcon } // where <Icon /> is any component from vector-icons or anything else
              color="grey"
              size={theme.SIZES.BASE}
              onPress={() => {} }
            />
          )
          }
        />
        
        {validate && (
          <HelperText
            type={value.length ? 'error' : ''}
            visible={!valid}
            style={{ marginBottom: valid ? 0 : 5 }}
          >
            {validators[inputProperties.label?.toLowerCase()]?.text}
          </HelperText>
        )}
      </View>
    );
  }
  if(leftIcon != null && rightIcon == null){
    return (
      <Block style={containerStyle}>
        <TextInput
          onChangeText={onChangeText}
          // mode={mode}
          underlineColor="transparent" 
          error={validate && value.length && !valid}
          {...inputProperties}
          {...props}
          label={label}
          value={value}
          style={{
            textTransform: 'capitalize',
            marginBottom: validate ? 0 : 15,
            minWidth: '100%',
            borderRadius: 9,
            borderTopLeftRadius: 9,
            borderTopRightRadius: 9,
            height: 45,
          }}
          left={
            <TextInput.Icon
              name={leftIcon} // where <Icon /> is any component from vector-icons or anything else
              color="grey"
              size={theme.SIZES.BASE}
              onPress={() => {}}
            />
          }
        />
        
        {validate && (
          <HelperText
            type={value.length ? 'error' : ''}
            visible={!valid}
            style={{ marginBottom: valid ? 0 : 5 }}
          >
            {validators[inputProperties.label?.toLowerCase()]?.text}
          </HelperText>
        )}
      </Block>
    );
  }
  if(leftIcon == null && rightIcon != null){
    return (
      <View style={containerStyle}>
        <TextInput
          onChangeText={onChangeText}
          // mode={mode}
          underlineColor="transparent" 
          error={validate && value.length && !valid}
          {...inputProperties}
          {...props}
          label={label}
          value={value}
          style={{
            textTransform: 'capitalize',
            marginBottom: validate ? 0 : 15,
            minWidth: '100%',
            borderRadius: 9,
            borderTopLeftRadius: 9,
            borderTopRightRadius: 9,
            height: 45,
          }}
          right={
            <TextInput.Icon
              name={rightIcon} // where <Icon /> is any component from vector-icons or anything else
              color="grey"
              size={theme.SIZES.BASE}
              onPress={() => {}}
            />
          }
        />
        
        {validate && (
          <HelperText
            type={value.length ? 'error' : ''}
            visible={!valid}
            style={{ marginBottom: valid ? 0 : 5 }}
          >
            {validators[inputProperties.label?.toLowerCase()]?.text}
          </HelperText>
        )}
      </View>
    );
  }
};

Input.propTypes = {
  onChangeText: PropTypes.func.isRequired,
  value: PropTypes.string,
  label: PropTypes.string,
  props: PropTypes.objectOf(PropTypes.any),
  mode: PropTypes.string,
  validate: PropTypes.bool,
  containerStyle: PropTypes.objectOf(PropTypes.any),
};

Input.defaultProps = {
  value: '',
  label: '',
  props: {},
  containerStyle: {},
  style: {},
  mode: 'outlined',
  validate: true,
};

export default Input;
