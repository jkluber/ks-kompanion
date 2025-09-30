import {SafeAreaView, View, FlatList, Text, StyleSheet, Modal, ActivityIndicator, Pressable} from 'react-native';
import SkillContainer from '../components/SkillContainer';
import { useFocusEffect } from '@react-navigation/native';
import {useCallback, useState} from 'react';
import { sendRequest, fetchDeviceId } from '../utils/MiscUtils';
import { SKILL_UNLOCKS } from '../../../assets/config/SkillUnlocks'; 
import DefaultModal from '../components/DefaultModal';
import RunescapeText from '../components/RunescapeText';

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
    const [skillModalVisible, setSkillModalVisible] = useState(false);
    const [selectedSkill, setSelectedSkill] = useState(null);


    useFocusEffect(
        useCallback(() => {
            const fetchCompletion = async() => {
                setLoading(true);
                try {
                    let deviceId = await fetchDeviceId();
                    const result = await sendRequest("POST", JSON.stringify({
                        deviceId: deviceId,
                        method: "getPlayerData",
                        whatDoIWantToday: "skills"
                    }));
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
            <SkillContainer 
                skill={skill}
                onPress={() => handleSkillPress(item)}
            />
        );
    };

    const handleSkillPress = (skill) => {
        setSelectedSkill(skill);
        setSkillModalVisible(true);
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
            <DefaultModal
                visible={skillModalVisible}
                onRequestClose={() => setSkillModalVisible(false)}
            >
                {selectedSkill && (
                    <>
                    <RunescapeText
                        font="RunescapeBold"
                        fontSize={24}
                        style={{marginBottom: 10}}
                    >
                        {selectedSkill.charAt(0).toUpperCase() + selectedSkill.slice(1)}
                    </RunescapeText>
                    <View style={{ width: "100%", alignItems: "flex-start" }}>
                        {SKILL_UNLOCKS[selectedSkill].map((unlock, idx) => (
                            <View key={idx} style={{ marginBottom: 20 }}>
                            <RunescapeText
                                font="RunescapeThin"
                                fontSize={18}
                                style={{ textAlign: "left", marginBottom: 2, color: "white" }}
                            >
                                Lvl {unlock.level} – {unlock.name}
                            </RunescapeText>
                            <RunescapeText
                                font="RunescapeThin"
                                fontSize={18}
                                style={{ textAlign: "left", marginBottom: 10, color: "white" }}
                            >
                                {unlock.description}
                            </RunescapeText>
                            </View>
                        ))}
                    </View>
                    </>
                )}

                <Pressable onPress={() => setSkillModalVisible(false)}>
                    <Text style={{ color: "blue", textAlign: "center", marginTop: 20 }}>
                    Close
                    </Text>
                </Pressable>
            </DefaultModal>
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