export const TIER = {
    UNRANKED: {
        name: 'unranked',
        icon: require('../../../assets/images/chat-log.png'),
        threshold: 0,
    },
    EASY: {
        name: 'easy',
        icon: require('../../../assets/images/easy-task.png'),
        threshold: 20,
    },
    MEDIUM: {
        name: 'medium',
        icon: require('../../../assets/images/medium-task.png'),
        threshold: 60,
    },
    HARD: {
        name: 'hard',
        icon: require('../../../assets/images/hard-task.png'),
        threshold: 115,
    },
    ELITE: {
        name: 'elite',
        icon: require('../../../assets/images/elite-task.png'),
        threshold: 170,
    }
};

export const getTierByPoints = (points) => {
    if (points >= TIER.ELITE.threshold) return TIER.ELITE;
    if (points >= TIER.HARD.threshold) return TIER.HARD;
    if (points >= TIER.MEDIUM.threshold) return TIER.MEDIUM;
    if (points >= TIER.EASY.threshold) return TIER.EASY;
    return TIER.UNRANKED;
}

export const getNextTier = (currentTier) => {
    switch (currentTier) {
        case TIER.UNRANKED:
            return TIER.EASY;
        case TIER.EASY:
            return TIER.MEDIUM;
        case TIER.MEDIUM:
            return TIER.HARD;
        case TIER.HARD:
            return TIER.ELITE;
        case TIER.ELITE:
            return null; // No next tier
        default:
            return null;
    }
}