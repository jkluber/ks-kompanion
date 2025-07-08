import {SafeAreaView, View, FlatList, Text, StyleSheet} from 'react-native';

const skills={
    combat: {
        level: 1,
        experience: 0
    },
    magic: {
        level: 1,
        experience: 0
    },
    crafting: {
        level: 1,
        experience: 0
    },
    fishing: {
        level: 1,
        experience: 0
    }
}

const CIRCLE_SIZE = 10; // Adjust as needed
const ROOT_CONTAINER_COLOR = 'rgb(62, 53, 41)'; // Background color for the entire screen


const Skills = () => {

    const renderSkill = (item) => {    
        console.log(item); // Log the item to see what it contains
        const skill = skills[item]; // Access the skill object using the item key
        return (
            <View style={styles.skillContainer}>
                <View style={styles.cutoutTopLeft} />
                <View style={styles.cutoutTopRight} />
                <View style={styles.cutoutBottomLeft} />
                <View style={styles.cutoutBottomRight} />
                {/* Render the skill name and level */}
                <Text>
                    {item}: Level {skill.level}
                </Text>
            </View>
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
    },
});

export default Skills;