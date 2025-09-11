import {SafeAreaView, View, FlatList, Text, StyleSheet, Image} from 'react-native';
import SkillContainer from '../components/SkillContainer';

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

const ROOT_CONTAINER_COLOR = 'rgb(62, 53, 41)'; // Background color for the entire screen
const CIRCLE_SIZE = 10;

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
    },
    skillContainer: {
        width: '45%', // Adjust width to fit two items per row
        height: 80,
        alignItems: 'center', // Center items horizontally
        backgroundColor: 'gray', // Background color for each skill item
        position: 'relative', // Position relative for cutouts
    },
    cutoutTopLeft: {
        position: 'absolute',
        top: 0,
        left: 0,
        width: CIRCLE_SIZE,
        height: CIRCLE_SIZE,
        backgroundColor: ROOT_CONTAINER_COLOR, // Match your background color
        borderBottomRightRadius: CIRCLE_SIZE,
        zIndex: 10,
    },
    cutoutTopRight: {
        position: 'absolute',
        top: 0,
        right: 0,
        width: CIRCLE_SIZE,
        height: CIRCLE_SIZE,
        backgroundColor: ROOT_CONTAINER_COLOR, // Match your background color
        borderBottomLeftRadius: CIRCLE_SIZE,
        zIndex: 10,
    },
    cutoutBottomLeft: {
        position: 'absolute',
        bottom: 0,
        left: 0,
        width: CIRCLE_SIZE,
        height: CIRCLE_SIZE,
        backgroundColor: ROOT_CONTAINER_COLOR, // Match your background color
        borderTopRightRadius: CIRCLE_SIZE,
        zIndex: 10,
    },
    cutoutBottomRight: {
        position: 'absolute',
        bottom: 0,
        right: 0,
        width: CIRCLE_SIZE,
        height: CIRCLE_SIZE,
        backgroundColor: ROOT_CONTAINER_COLOR, // Match your background color
        borderTopLeftRadius: CIRCLE_SIZE,
        zIndex: 10,
    }
});

export default Skills;