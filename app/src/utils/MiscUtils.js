export const checkNewUser = async(deviceId, userName) => {
    const response = await fetch("https://script.google.com/macros/s/AKfycbyVdQO1Jb1Ph0fYDPjKs9fOSYvsM8r1Fms8wQNdF8vTrbiqjY0Rnc52gF7yCkb1anc/exec", {
        method: "POST",
        body: JSON.stringify({
            deviceId: deviceId,
            userName: userName
        })
    });
    const result = await response.json();
    return result.newUser;
}

export const rollRandomEvent = async () => {
    let roll = Math.floor(Math.random() * 200);
    if (199 == roll) {
        return "You rolled a mega random!!!!"
    } else {
        let roll = Math.floor(Math.random() * 20);
        return "You rolled this number: " + roll
    }
};