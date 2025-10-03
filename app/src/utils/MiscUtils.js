import * as Application from 'expo-application';
import * as Device from 'expo-device';
import { RANDOMS } from '../../../assets/config/RandomEvents.js'
import { MEGA_RANDOMS }  from '../../../assets/config/MegaRandomEvents.js'
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
        let megaRandom = false;
        if (!result.isBoosted) {
            let roll = Math.floor(Math.random() * 200);
            megaRandom = (199 === roll);
        } else {
            let roll = Math.floor(Math.random() * 50);
            megaRandom = (49 === roll);
        }
        if (megaRandom) {
            let roll = Math.floor(Math.random() * 4);
            if (MEGA_RANDOMS[roll].reward != null) {
                await modifyField(deviceId, MEGA_RANDOMS[roll].reward, MEGA_RANDOMS[roll].unit, "+");
            }
            return (
                <View style={styles.randomEventView}>
                    <RunescapeText
                        font="RunescapeBold"
                        fontSize={30}
                        style={[styles.title,
                            {
                                textShadowColor: '#FFD700',
                                textShadowOffset: { width: 0, height: 0 },
                                textShadowRadius: 10,
                            }
                        ]}>
                        YOU'VE ROLLED A MEGA RANDOM!!!
                    </RunescapeText>
                    <RunescapeText
                        font="RunescapeBold"
                        fontSize={24}
                        style={styles.title}>
                        {MEGA_RANDOMS[roll].title}
                    </RunescapeText>
                    <RunescapeText
                        fontSize={22}
                        style={styles.description}>
                        {MEGA_RANDOMS[roll].description}
                    </RunescapeText>
                    <Image
                        style={styles.image}
                        source={MEGA_RANDOMS[roll].image}/>
                </View>
            );
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
    const response = await fetch("https://script.google.com/macros/s/AKfycbwiTbl6Yq8J0kO8RXcTJESgWK-g1mxT-hsndU0SgGHAFmv9oE565-sJciYhl5MN6bg/exec", {
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
        } else if (code.toLowerCase().includes("chambers") || code.toLowerCase().includes("xeric") || "cox" === code.toLowerCase()) {
            return ARCHIVE_ENTRY.Cox;
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
        } else if (code.toLowerCase().includes("justin")) {
            return ARCHIVE_ENTRY.Justin;
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
        } else if (code.toLowerCase().includes("runescape") || code.toLowerCase().includes("osrs")) {
            return ARCHIVE_ENTRY.Osrs;
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
        } else if (code.toLowerCase().includes("yob edom") || "yob" === code.toLowerCase()) {
            return ARCHIVE_ENTRY.Yob;
        } else if (code.toLowerCase().includes("zach")) {
            return ARCHIVE_ENTRY.Zach;
        } else if (code.toLowerCase().includes("1738")) {
            return ARCHIVE_ENTRY[1738];
        } else if (code.toLowerCase().includes("1950")) {
            return ARCHIVE_ENTRY[1950];
        } else if (code.toLowerCase() === "free gp") {
            return ARCHIVE_ENTRY.RickRoll;
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