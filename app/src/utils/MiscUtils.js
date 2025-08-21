export const checkNewUser = async(deviceId, userName) => {
    const response = await fetch("https://script.google.com/macros/s/AKfycbxeUR6X_LEsiURxLmkjvr6QZGUOtik7HrOHwvgCGHw3Z5oFGXCNTuZogJ1JwiEC_fs/exec", {
        method: "POST",
        body: JSON.stringify({
            deviceId: deviceId,
            userName: userName,
            method: "newUser"
        })
    });
    const result = await response.json();
    return result.newUser;
}

export const rollRandomEvent = async(deviceId) => {
    const response = await fetch("https://script.google.com/macros/s/AKfycbxeUR6X_LEsiURxLmkjvr6QZGUOtik7HrOHwvgCGHw3Z5oFGXCNTuZogJ1JwiEC_fs/exec", {
        method: "POST",
        body: JSON.stringify({
            deviceId: deviceId,
            method: "randomEvent"
        })
    });
    const result = await response.json();
    console.log(result);

    if (result.ready) {
        let roll = Math.floor(Math.random() * 200);
        if (199 == roll) {
            return "You rolled a mega random!!!!"
        } else {
            let roll = Math.floor(Math.random() * 20);
            return "You rolled this number: " + roll
        }
    } else {
        return "Zero doin Donkey!"
    }
};