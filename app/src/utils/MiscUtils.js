import * as Application from 'expo-application';
import * as Device from 'expo-device';
import { randoms } from '../../../assets/config/RandomEvents.js'
import { View, Text, Image, StyleSheet } from 'react-native';
import RunescapeText from '../components/RunescapeText';

export const checkNewUser = async(deviceId, userName) => {
    const result = await sendRequest("POST", JSON.stringify({
        deviceId: deviceId,
        userName: userName,
        method: "newUser"
    }));
    return result.newUser;
};

export const rollRandomEvent = async(deviceId) => {
    const result = await sendRequest("POST", JSON.stringify({
        deviceId: deviceId,
        method: "randomEvent"
    }));

    if (result.ready) {
        let roll = Math.floor(Math.random() * 200);
        if (199 == roll) {
            return "You rolled a mega random!!!!"
        } else {
            let roll = Math.floor(Math.random() * 20);
            return (
                <View style={styles.randomEventView}>
                    <RunescapeText
                        font="RunescapeBold"
                        fontSize={24}
                        style={styles.title}>
                        {randoms[roll].title}
                    </RunescapeText>
                    <RunescapeText
                        fontSize={22}
                        style={styles.description}>
                        {randoms[roll].description}
                    </RunescapeText>
                    <Image
                        style={styles.image}
                        source={randoms[roll].image}/>
                </View>
            );
        }
    } else {
        return "Zero doin' right now, Kong-dude!"
    }
};

export const modifyXP = async(deviceId, skill, xp, operator) => {
    return await sendRequest("POST", JSON.stringify({
        deviceId: deviceId,
        method: "modifyXP",
        skill: skill,
        xp: xp,
        operator: operator
    }));
};

export const fetchDeviceId = async() => {
    if ('iOS' === Device.osName) {
        return await Application.getIosIdForVendorAsync();
    } else {
        return Application.getAndroidId();
    }
};

export const sendRequest = async(method, body) => {
    const response = await fetch("https://script.google.com/macros/s/AKfycbwJm0Gmj31fK14c9wzI0ZJuZujNgCcKTTo1KkFo_yCakyvDxAT2-hQTWnc4EUqvVPU/exec", {
        method: method,
        body: body
    });
    const result = await response.json();
    return result;
}

const styles = StyleSheet.create({
    randomEventView: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        padding: 20
    },
    title: {
        textAlign: "center",
        marginBottom: 24
    },
    description: {
        fontWeight: "bold",
        marginBottom: 10
    },
    image: {
        width: 120,
        height: 120,
        resizeMode: "contain"
    }
});