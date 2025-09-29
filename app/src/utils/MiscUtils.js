import * as Application from 'expo-application';
import * as Device from 'expo-device';
import { RANDOMS } from '../../../assets/config/RandomEvents.js'
import { View, Image, StyleSheet } from 'react-native';
import RunescapeText from '../components/RunescapeText';
import ARCHIVE_ENTRY from '../../../assets/config/archive_entry.json';

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
            if (RANDOMS[roll].reward != null) {
                await modifyField(deviceId, RANDOMS[roll].reward, RANDOMS[roll].unit, "+");
            }
            return (
                <View style={styles.randomEventView}>
                    <RunescapeText
                        font="RunescapeBold"
                        fontSize={24}
                        style={styles.title}>
                        {RANDOMS[roll].title}
                    </RunescapeText>
                    <RunescapeText
                        fontSize={22}
                        style={styles.description}>
                        {RANDOMS[roll].description}
                    </RunescapeText>
                    <Image
                        style={styles.image}
                        source={RANDOMS[roll].image}/>
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
    const response = await fetch("https://script.google.com/macros/s/AKfycbyArnDDvApJlKJqBUXSwfR1HS_cKDSa9DvHVP6i6I2yDhon1AkwoXcTyolnhU12Tqk/exec", {
        method: method,
        body: body
    });
    const result = await response.json();
    return result;
}

export const processCode = async(code) => {
    if (code) {
        code = code.trim();
        if ("FGdiedLOL420" === code) {
            return ARCHIVE_ENTRY.FG;
        } else if (code.toLowerCase().includes("addy")) {
            return ARCHIVE_ENTRY.Addy;
        } else if (code.toLowerCase().includes("andrew")) {
            return ARCHIVE_ENTRY.Andrew;
        } else if (code.toLowerCase().includes("allison")) {
            return ARCHIVE_ENTRY.Allison;
        } else if (code.toLowerCase().includes("emily") || code.toLowerCase() === "em") {
            return ARCHIVE_ENTRY.Em;
        } else if (code.toLowerCase().includes("balsamo")) {
            return ARCHIVE_ENTRY.Balsamo;
        } else if (code.toLowerCase().includes("hayden")) {
            return ARCHIVE_ENTRY.Hayden;
        } else if (code.toLowerCase().includes("irem")) {
            return ARCHIVE_ENTRY.Irem;
        } else if (code.toLowerCase().includes("jack")) {
            return ARCHIVE_ENTRY.Jack;
        } else if (code.toLowerCase().includes("jake")) {
            return ARCHIVE_ENTRY.Jake;
        } else if (code.toLowerCase().includes("jj")) {
            return ARCHIVE_ENTRY.JJ;
        } else if (code.toLowerCase().includes("kate")) {
            return ARCHIVE_ENTRY.Kate;
        } else if (code.toLowerCase().includes("kyle")) {
            return ARCHIVE_ENTRY.Kyle;
        } else if (code.toLowerCase().includes("lizzie")) {
            return ARCHIVE_ENTRY.Lizzie;
        } else if (code.toLowerCase().includes("maya")) {
            return ARCHIVE_ENTRY.Maya;
        } else if (code.toLowerCase() === "penis") {
            return ARCHIVE_ENTRY.Penis
        } else if (code.toLowerCase() === "sam") {
            return ARCHIVE_ENTRY.Sam;
        } else if (code.toLowerCase().includes("sam k") || code.toLowerCase().includes("samuel")) {
            return ARCHIVE_ENTRY['Sam K'];
        } else if (code.toLowerCase().includes("sam o") || code.toLowerCase().includes("samantha")) {
            return ARCHIVE_ENTRY['Sam O'];
        } else if (code.toLowerCase().includes("sid")) {
            return ARCHIVE_ENTRY.Sid;
        } else if (code.toLowerCase().includes("slippy")) {
            return ARCHIVE_ENTRY.Slippy;
        } else if (code.toLowerCase().includes("zach")) {
            return ARCHIVE_ENTRY.Zach;
        } else if (code.toLowerCase().includes("1738")) {
            return ARCHIVE_ENTRY[1738];
        } else if (code.toLowerCase().includes("1950")) {
            return ARCHIVE_ENTRY[1950];
        }
    }
    return "No results."
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