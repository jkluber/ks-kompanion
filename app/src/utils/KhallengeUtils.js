import { modifyField, fetchDeviceId, sendRequest } from "./MiscUtils";

export const kompleteKhallenge = async(difficulty, skill, xp, operator, id) => {
    let deviceId = await fetchDeviceId();
    await modifyField(deviceId, skill, xp, operator);
    await modifyKhallengePoints(deviceId, difficulty, operator, id);
    await rollKhallengePet(difficulty);
};

export const modifyKhallengePoints = async(deviceId, difficulty, operator, id) => {
    const result = await sendRequest("POST", JSON.stringify({
        deviceId: deviceId,
        points: khallengePointsByDifficulty(difficulty),
        operator: operator,
        method: "modifyKhallengePoints",
        id: id
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