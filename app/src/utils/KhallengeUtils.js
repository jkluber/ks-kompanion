export const kompleteKhallenge = (difficulty) => {
    //apply xp to skill once me and 2shoes figure out saves
    //apply kp to user once me and 2shopes figure out saves
    rollKhallengePet(difficulty);
};

export const xpByDifficulty = (difficulty) => {
    switch (difficulty) {
        case "easy":
            return 100;
            break;
        case "medium":
            return 200;
            break;
        case "hard":
            return 300;
            break;
        case "elite":
            return 400;
            break;
    }
};

export const khallengePointsByDifficulty = (difficulty) => {
    switch (difficulty) {
        case "easy":
            return 1;
            break;
        case "medium":
            return 2;
            break;
        case "hard":
            return 3;
            break;
        case "elite":
            return 4;
            break;
    }
}

export const rollKhallengePet = () => {
    const roll = Math.floor(Math.random() * 1000);
    console.log(roll);
    if (999 == roll) {
        console.log("You rolled a pet!");
    }
}