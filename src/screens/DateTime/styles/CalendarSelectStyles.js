import { StyleSheet, Dimensions } from 'react-native'
const { width, height } = Dimensions.get('window')
const screenWidth = width < height ? width : height

export default StyleSheet.create({
    day: {
        margin: 10,
        color: '#000'
    },
    txtHeaderDate: {
        color: '#000',
        fontSize: 25,

    },
    weekdays: {
        margin: 10,
        color: 'white',
        width: screenWidth / 7 - 8,
        textAlign: 'center'
    },
    warpDay: {
        width: screenWidth / 7,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#FFF',
    },
    icLockRed: {
        width: 13 / 2,
        height: 9,
        position: 'absolute',
        top: 2,
        left: 1
    }
})