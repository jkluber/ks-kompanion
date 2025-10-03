import { modifyField } from "./MiscUtils";

const thresholds = [0, 100, 250, 450, 700, 1000, 1350, 1750, 2200, 2700, 3250, 3850, 4500, 5200, 5950, 6750, 7600, 8500, 9450, 10450];

export const useXpLamp = async(deviceId, lampType, skill) => {
    if ("small" === lampType) {
        await modifyField(deviceId, skill, 100, "+");
        await modifyField(deviceId, "smalllamp", 1, "-");
    } else {
        await modifyField(deviceId, skill, 500, "+");
        await modifyField(deviceId, "largelamp", 1, "-");
    }
};

export const getLevelFromXp = (xp) => {
    let level = 0;
    for (let i = 0; i < thresholds.length; i++) {
        if (xp >= thresholds[i]) {
            level++;
        } else {
            return level;
        }
    }
    return level;
}

export const getXpToNextLevel = (xp) => {
    for (let i = 0; i < thresholds.length; i++) {
        if (xp < thresholds[i]) {
            return thresholds[i] - xp;
        }
    }
    return null;
}