import PropTypes from 'prop-types';
import React from 'react';
import { View, TextInput } from 'react-native';
import { HelperText, useTheme } from 'react-native-paper';
import inputProps from '../constants/inputProps';
import validators from '../constants/validators';
import { isValid } from '../src/utils/helpers';
import { theme } from "galio-framework";
import { placeholder } from 'i18n-js';

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
  placeholder,
  ...props
}) => {
  const { dimensions, colors } = useTheme();
  const inputProperties = inputProps.find((i) =>
    label.toLowerCase().includes(i.label.toLowerCase()),
  );

  const valid = requested
    ? (isValid(inputProperties?.label.toLowerCase(), value) && value != '')
    : isValid(inputProperties?.label.toLowerCase(), value) || value == '';
  
  if(leftIcon != null && rightIcon != null){
    return (
      <View style={containerStyle}>
        <TextInput
          onChangeText={onChangeText}
          // mode={mode}
          underlineColor="transparent"
          error={validate && !valid}
          placeholder={placeholder}
          {...props}
          value={value}
          style={style}
          selectionColor="green"
        />
        
        {validate && (
          <HelperText
            type={'error'}
            visible={!valid}
          >
            {validators[inputProperties.label?.toLowerCase()]?.text}
          </HelperText>
        )}
      </View>
    );
  }
  if(leftIcon != null && rightIcon == null){
    return (
      <Block style={{width: '100%'}}>
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
            height: 35,
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
