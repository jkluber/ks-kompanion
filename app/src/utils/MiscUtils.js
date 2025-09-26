import * as Application from 'expo-application';
import * as Device from 'expo-device';
import { randoms } from '../../../assets/config/RandomEvents.js'
import { View, Image, StyleSheet } from 'react-native';
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
            if (randoms[roll].reward != null) {
                await modifyField(deviceId, randoms[roll].reward, randoms[roll].unit, "+");
            }
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
        return "Zero doin' right now, Kong-dude!";
    }
};

export const modifyField = async(deviceId, field, unit, operator) => {
    return await sendRequest("POST", JSON.stringify({
        deviceId: deviceId,
        method: "modifyField",
        field: field,
        unit, unit,
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
    const response = await fetch("https://script.google.com/macros/s/AKfycbzxOUTydnHpLgM1BT3R7HXtH6962_YBfif06y4Nal4AfMXAF9QVh_metMpD-zv3LRs/exec", {
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