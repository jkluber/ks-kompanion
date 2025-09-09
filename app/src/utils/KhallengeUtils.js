import { modifyXP, fetchDeviceId, sendRequest } from "./MiscUtils";

export const kompleteKhallenge = async(difficulty, skill, xp, operator) => {
    let deviceId = await fetchDeviceId();
    modifyXP(deviceId, skill, xp, operator);
    modifyKhallengePoints(deviceId, difficulty, operator);
    rollKhallengePet(difficulty);
};

export const modifyKhallengePoints = async(deviceId, difficulty, operator) => {
    const result = sendRequest("POST", JSON.stringify({
        deviceId: deviceId,
        points: khallengePointsByDifficulty(difficulty),
        operator: operator,
        method: "modifyKhallengePoints"
    }));
    return result.updated;
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
        default:
            return 0;
    }
};

export const rollKhallengePet = () => {
    const roll = Math.floor(Math.random() * 1000);
    if (999 == roll) {
        console.log("You rolled a pet!");
    }
};