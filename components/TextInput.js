import React from 'react'
import {View, TextInput, Text, StyleSheet} from 'react-native'

const TextInput = ({validation, willValidate, value, onChangeValue, errorTxt, type}) => {
    return (
        <>
        <TextInput
            error={willValidate?validation:false}
            value={value}
            onChangeValue
        />
        {validation&&<Text>{errorTxt}</Text>}
        
        </>
    )
}

const styles = StyleSheet.create({

})