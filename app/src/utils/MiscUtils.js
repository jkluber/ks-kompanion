import * as Application from 'expo-application';
import * as Device from 'expo-device';

export const checkNewUser = async(deviceId, userName) => {
    const result = sendRequest("POST", JSON.stringify({
        deviceId: deviceId,
        userName: userName,
        method: "newUser"
    }));
    return result.newUser;
};

export const rollRandomEvent = async(deviceId) => {
    const result = sendRequest("POST", JSON.stringify({
        deviceId: deviceId,
        method: "randomEvent"
    }));

    if (result.ready) {
        let roll = Math.floor(Math.random() * 200);
        if (199 == roll) {
            return "You rolled a mega random!!!!"
        } else {
            let roll = Math.floor(Math.random() * 20);
            return "You rolled this number: " + roll
        }
    } else {
        return "Zero doin' right now, Kong-dude!"
    }
};

export const modifyXP = async(deviceId, skill, xp, operator) => {
    return sendRequest("POST", JSON.stringify({
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
    const response = await fetch("https://script.google.com/macros/s/AKfycbwsFJYvi8WQF67LyEUWROhif3w45JWcS3hSivvx_FSKwPrC15Y5mHVxj5W0g8Hhve4/exec", {
        method: method,
        body: body
    });
    const result = await response.json();
    return result;
}