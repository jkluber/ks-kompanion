import {SafeAreaView, View, FlatList, Text, StyleSheet, Image, ActivityIndicator} from 'react-native';
import SkillContainer from '../components/SkillContainer';
import { useFocusEffect } from '@react-navigation/native';
import {useCallback, useState} from 'react';
import { sendRequest, fetchDeviceId } from '../utils/MiscUtils';

export const SKILLS = [
    { name: 'Combat', icon: require('../../../assets/icons/combat.png') },
    { name: 'Magic', icon: require('../../../assets/icons/magic.png') },
    { name: 'Thieving', icon: require('../../../assets/icons/thieving.png') },
    { name: 'Gathering', icon: require('../../../assets/icons/fishing.png') },
    { name: 'Survival', icon: require('../../../assets/icons/survival.png') }
];

const initialSkills={
    combat: {
        experience: 0,
        icon: require('../../../assets/icons/combat.png')
    },
    magic: {
        experience: 0,
        icon: require('../../../assets/icons/magic.png')
    },
    thieving: {
        experience: 0,
        icon: require('../../../assets/icons/thieving.png')
    },
    gathering: {
        experience: 0,
        icon: require('../../../assets/icons/fishing.png')
    },
    survival: {
        experience: 0,
        icon: require('../../../assets/icons/survival.png')
    }
}


const ROOT_CONTAINER_COLOR = 'rgb(62, 53, 41)'; // Background color for the entire screen

const Skills = () => {

    const [skills, setSkills] = useState(initialSkills);
    const [loading, setLoading] = useState(false);

    useFocusEffect(
        useCallback(() => {
            const fetchCompletion = async() => {
                setLoading(true);
                try {
                    console.log('Fetching skills data...');
                    let deviceId = await fetchDeviceId();
                    const result = await sendRequest("POST", JSON.stringify({
                        deviceId: deviceId,
                        method: "getPlayerData",
                        whatDoIWantToday: "skills"
                    }));
                    console.log('Fetched skills data:', result);
                    setSkills({
                        combat: { ...skills.combat, experience: result[0][0] },
                        magic: { ...skills.magic, experience: result[0][1] },
                        survival: { ...skills.survival, experience: result[0][2] },
                        gathering: { ...skills.gathering, experience: result[0][3] },
                        thieving: { ...skills.thieving, experience: result[0][4] },
                    });
                } catch (err) {
                    console.error(err);
                } finally {
                    setLoading(false)
                }
            };
            fetchCompletion();
        }, [])
    );

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
            {loading && (
                <View
                    style={{
                        position: "absolute",
                        top: 0, left: 0, right: 0, bottom: 0,
                        backgroundColor: "rgba(0,0,0,0.4)",
                        justifyContent: "center",
                        alignItems: "center"
                    }}
                >
                    <ActivityIndicator size="large" color="#fff"/>
                </View>
            )}
        </SafeAreaView>
    )
}

const styles = StyleSheet.create({
    rootContainer: {
        flex: 1,
        backgroundColor: ROOT_CONTAINER_COLOR, // Background color for the entire screen
        alignItems: 'center', // Center items horizontally
    },
});

export default Skills;