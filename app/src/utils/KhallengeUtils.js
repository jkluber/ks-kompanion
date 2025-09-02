import { modifyXP } from "./MiscUtils";

export const kompleteKhallenge = async(difficulty, skill) => {
    let deviceId = await fetchDeviceId();
    modifyXP(deviceId, skill, xpByDifficulty(difficulty), "+");
    //apply kp to user once me and 2shoes figure out saves
    rollKhallengePet(difficulty);
};

export const xpByDifficulty = (difficulty) => {
    switch (difficulty) {
        case "easy":
            return 100;
        case "medium":
            return 200;
        case "hard":
            return 300;
        case "elite":
            return 400;
    }
};

export const khallengePointsByDifficulty = (difficulty) => {
    switch (difficulty) {
        case "easy":
            return 1;
        case "medium":
            return 2;
        case "hard":
            return 3;
        case "elite":
            return 4;
    }
};

export const rollKhallengePet = () => {
    const roll = Math.floor(Math.random() * 1000);
    console.log(roll);
    if (999 == roll) {
        console.log("You rolled a pet!");
    }
};

async function fetchDeviceId() {
    if ('iOS' === Device.osName) {
        return await Application.getIosIdForVendorAsync();
    } else {
        return Application.getAndroidId();
    }
}