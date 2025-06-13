import {useFonts} from 'expo-font';
import {Text, SafeAreaView, View, SectionList, TouchableOpacity, Image} from 'react-native';
import khallengeJson from '../../../assets/config/khallenge_config.json';
import RunescapeText from '../components/RunescapeText';
import React, {useState} from 'react';


const Khallenges = () => {
    const [completedItems, setCompletedItems] = useState([])

    const handleItemPress = (item) => {
        console.log(`Item pressed: ${item.UUID}`); // Log the item description
        setCompletedItems((prevState) => ({
            ...prevState,
            [`${item.UUID}`]: !prevState[`${item.UUID}`], // Toggle the item's completion state
        }));
    }

    // Transform the data into sections for SectionList
    const sections = Object.keys(khallengeJson).map((key) => ({
        title: key, // The key (e.g., "Super Monkey Ball 2")
        data: khallengeJson[key].map((item) => ({
            ...item,
            UUID: `${key}-${item.id}`, // Add the section title to each item
        })),
    }));

    const images = {
        easy: require('../../../assets/images/easy-task.png'),
        medium: require('../../../assets/images/medium-task.png'),
        hard: require('../../../assets/images/hard-task.png'),
        elite: require('../../../assets/images/elite-task.png'),
    };

    const khallengeItem = ({ item, index }) => {
        return (
            <TouchableOpacity onPress={() => handleItemPress(item)}>
                <View 
                    style={{ 
                        padding: 10,
                        borderBottomWidth: 1,
                        borderBottomColor: 'black',
                        backgroundColor: index % 2 === 0 ? 'rgb(90, 83, 72)' : 'rgb(79, 69, 59)',
                        flexDirection: 'row', // Align image and text horizontally
                        alignItems: 'center', // Center align items vertically
                    }}
                >
                    <Image
                        source={images[item.difficulty]}  // Correctly format the dynamic image path
                        style={{
                            width: 20, // Width of the image
                            height: 20, // Height of the image
                            marginRight: 10, // Space between image and text
                            resizeMode: 'contain', // Ensure the icon fits within the container
                        }}
                    />
                    <View style={{ flex: 1 }}>
                        <RunescapeText
                            style={{ 
                                fontSize: 24, 
                            }}
                            color={completedItems[item.UUID] ? 'rgb(0, 191, 134)' : 'rgb(137, 129, 122)'}
                            adjustsFontSizeToFit={true} // Adjust font size to fit the text
                        >
                            {item.description}
                        </RunescapeText>
                        <RunescapeText 
                            style={{ 
                                fontSize: 18, 
                                marginTop: 5,
                            }}
                            color='rgb(0, 191, 134)'
                            adjustsFontSizeToFit={true} // Adjust font size to fit the text
                        >
                            Reward: {item.xp} Experience
                        </RunescapeText>
                    </View>
                </View>
            </TouchableOpacity>
        );
    };

    const renderSectionHeader = ({ section }) => {
        const allCompleted = section.data.every((item) => completedItems[item.UUID]);

        return (
            <View 
                style={{ 
                    backgroundColor: 'rgb(88, 85, 80)', 
                    padding: 10, 
                    borderBottomColor: 'black',
                    borderBottomWidth: 1,
                }}
            >
                <RunescapeText
                    font='RunescapeBold'
                    fontSize={36}
                    style={{ 
                        textAlign: 'center',
                        textShadowOffset: { width: 3, height: 3 },
                    }}>
                    {section.title}
                </RunescapeText>
            </View>
        );
    };

    return (
        <SafeAreaView style={{ flex: 1, backgroundColor: 'rgb(88, 85, 80)' }}>
            <SectionList
                sections={sections} // Use the flattened data array
                renderItem={({ item, index }) => khallengeItem({ item, index })} // Pass index to khallengeItem
                renderSectionHeader={renderSectionHeader} // Render section headers
                keyExtractor={(item) => item.UUID} // Ensure keys are unique
            />
        </SafeAreaView>
    );
}

export default Khallenges;