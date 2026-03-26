export const TIER = {
    UNRANKED: {
        name: 'Unranked',
        icon: require('../../../assets/images/dung.png'),
        threshold: 0,
    },
    EASY: {
        name: 'Bronze',
        icon: require('../../../assets/images/bronze.png'),
        threshold: 20,
    },
    MEDIUM: {
        name: 'Steel',
        icon: require('../../../assets/images/steel.png'),
        threshold: 50,
    },
    HARD: {
        name: 'Rune',
        icon: require('../../../assets/images/rune.png'),
        threshold: 100,
    },
    ELITE: {
        name: 'Dragon',
        icon: require('../../../assets/images/dragon.png'),
        threshold: 160,
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
            return null;
        default:
            return null;
    }
}