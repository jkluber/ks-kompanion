import {SafeAreaView, View, FlatList, Text, StyleSheet, Image} from 'react-native';
import Svg, { Path } from 'react-native-svg';
import SkillContainer from '../components/SkillContainer';
import RunescapeText from '../components/RunescapeText';

const skills={
    combat: {
        level: 99,
        experience: 0,
        icon: require('../../../assets/icons/combat.png')
    },
    magic: {
        level: 23,
        experience: 0,
        icon: require('../../../assets/icons/magic.png')
    },
    crafting: {
        level: 4,
        experience: 0,
        icon: require('../../../assets/icons/crafting.png')
    },
    fishing: {
        level: 7,
        experience: 0,
        icon: require('../../../assets/icons/fishing.png')
    }
}

const CIRCLE_SIZE = 10; // Adjust as needed
const ROOT_CONTAINER_COLOR = 'rgb(62, 53, 41)'; // Background color for the entire screen

function getCutoutPath(w, h, r) {
  // This path draws a rectangle with quarter-circle cutouts in each corner
  return `
    M${r},0
    H${w - r}
    A${r},${r} 0 0 1 ${w},${r}
    V${h - r}
    A${r},${r} 0 0 1 ${w - r},${h}
    H${r}
    A${r},${r} 0 0 1 0,${h - r}
    V${r}
    A${r},${r} 0 0 1 ${r},0
    Z
  `;
}

const Skills = () => {

    // Usage in your FlatList renderItem:
    const renderSkill = (item) => {
        const skill = skills[item];
        return (
            <SkillContainer skill={skill}>
            </SkillContainer>
        );
    };

    return (
        <SafeAreaView  style={styles.rootContainer}>
            <FlatList 
                data={Object.keys(skills)} // Use keys of skills object as data
                renderItem={({item}) => renderSkill(item)}
                keyExtractor={(item) => item} // Use index as key for now
                scrollEnabled={false}
                numColumns={2} // Display items in two columns
                contentContainerStyle={{ alignItems: 'center', padding: 20 }} // Center items in the FlatList
            >
            </FlatList>
        </SafeAreaView>
    )
}

const styles = StyleSheet.create({
    rootContainer: {
        flex: 1,
        backgroundColor: ROOT_CONTAINER_COLOR, // Background color for the entire screen
        alignItems: 'center', // Center items horizontally
    },
    // You can add similar styles for other corners:
    // cutoutTopRight, cutoutBottomLeft, cutoutBottomRight
});

export default Skills;