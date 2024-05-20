import { StyleSheet } from "react-native";
import React from 'react';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { ReactNativeJoystick } from '@korsolutions/react-native-joystick';
import { sendJoystickData } from '../services/joystickService';
import _ from 'lodash'; 
import { COLORS } from "../constants/theme";

function scaleValue(oldValue, oldMin, oldMax, newMin, newMax) {
    return ((oldValue - oldMin) * (newMax - newMin) / (oldMax - oldMin)) + newMin;
}

const JoystickHandler = () => {
    const handleMove = _.throttle((event) => {
        const x = scaleValue(event.position.x, -25, 125, -1, 1);
        const y = scaleValue(event.position.y, -25, 125, -1, 1);
        sendJoystickData(x, y);
    }, 100); // 100 ms aralıklarla handleMove fonksiyonunu sınırlandır

    const handleStop = () => {
        console.log('Joystick stopped');
        sendJoystickData(0, 0);
        handleMove.cancel(); // Joystick durduğunda throttle'ı iptal edin
    };

    return (
        <GestureHandlerRootView style={joystickstyle.container}>
            <ReactNativeJoystick
                radius={75}
                onMove={handleMove}
                onStop={handleStop}
                color='#FFFFFF'
            />
        </GestureHandlerRootView>
    );
}

const joystickstyle = StyleSheet.create({
    container: {
        
        marginBottom:30,
        marginRight:30,
        justifyContent: 'flex-end',
        alignItems: 'flex-end'
    },
});

export default JoystickHandler;
