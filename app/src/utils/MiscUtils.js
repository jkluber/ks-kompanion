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