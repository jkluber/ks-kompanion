import { useState, useEffect } from 'react';
import {SafeAreaView, StyleSheet, ImageBackground, Text, TextInput, TouchableOpacity, View, Image} from 'react-native';
import { checkNewUser, fetchDeviceId, rollRandomEvent, useXpLamp } from '../utils/MiscUtils';
import DefaultModal from '../components/DefaultModal';
import RunescapeText from '../components/RunescapeText';
import { SKILLS } from './Skills';

const Home = () => {

    const [newUser, setNewUser] = useState(false);
    const [username, setUsername] = useState('');
    const [randomEventResult, setRandomEventResult] = useState('');
    const [randomEventModalVisible, setRandomEventModalVisible] = useState(false);
    const [xpLampModalVisible, setXpLampModalVisible] = useState(false);
    const [lampType, setLampType] = useState(null);
    const [selectedSkill, setSelectedSkill] = useState(null);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        const checkDeviceId = async() => {
            let deviceId = await fetchDeviceId();
            let result = await checkNewUser(deviceId, null);
            setNewUser(result);
        }
        checkDeviceId();
    }, []);

    async function onSubmit() {
        if (username.trim()) {
            let deviceId = await fetchDeviceId();
            let result = await checkNewUser(deviceId, username.trim());
            if (result) {
                setNewUser(false);
            }
        }
    }

    async function handleRollRandomEvent() {
        let deviceId = await fetchDeviceId();
        const result = await rollRandomEvent(deviceId);
        setRandomEventResult(result);
        setRandomEventModalVisible(true);
    }

    async function applyLamp() {
        if (!selectedSkill) return;
        setLoading(true);
        let deviceId = await fetchDeviceId();
        try {
            await useXpLamp(deviceId, lampType, selectedSkill);
            setXpLampModalVisible(false);
            setSelectedSkill(null);
            setLampType(null);
        } catch (err) {
            console.error("Failed to apply " + lampType + " lamp to " + deviceId);
        } finally {
            setLoading(false);
        }
    }

    return (
        <>
            {newUser && (
            <DefaultModal visible={newUser}>
                <RunescapeText
                    font='RunescapeBold'
                    fontSize={24}
                    style={{ 
                        textAlign: 'center',
                        marginBottom: 24
                    }}>
                    Welcome to the Klubscroll! Please enter a username:
                </RunescapeText>
                <TextInput style={styles.input} placeholder="Username" placeholderTextColor="#999" onChangeText={setUsername}/>
                <TouchableOpacity style={styles.submit} onPress={onSubmit}>
                    <Text>Submit</Text>
                </TouchableOpacity>
            </DefaultModal>
            )}

            <DefaultModal visible={randomEventModalVisible}>
                <RunescapeText
                    font="RunescapeBold"
                    fontSize={20}
                    style={{ textAlign: 'center', marginBottom: 24 }}>
                    {randomEventResult}
                </RunescapeText>
                <TouchableOpacity style={styles.submit} onPress={() => setRandomEventModalVisible(false)}>
                    <Text style={{ color: 'white' }}>Close</Text>
                </TouchableOpacity>
            </DefaultModal>

            <DefaultModal visible={xpLampModalVisible}>
                <TouchableOpacity style={styles.closeButton} onPress={() => {
                    setXpLampModalVisible(false);
                    setSelectedSkill(null);
                    setLampType(null);
                }}>
                    <Text style={styles.closeButtonText}>X</Text>
                </TouchableOpacity>

                <RunescapeText
                    font="RunescapeBold"
                    fontSize={20}
                    style={{ textAlign: 'center', marginBottom: 24 }}>
                    Which skill would you like to use your lamp on?
                </RunescapeText>
                
                <View style={styles.skillRow}>
                    {SKILLS.map(skill => (
                        <TouchableOpacity
                            key={skill.name}
                            style={[styles.skillOption, selectedSkill === skill.name && styles.skillSelected]}
                            onPress={() => setSelectedSkill(skill.name)}
                        >
                            <Image source={skill.icon} style={styles.skillIcon} resizeMode="contain"/>
                            <RunescapeText font="RunescapeBold" fontSize={12} style={{marginTop: 8}}>
                                {skill.name}
                            </RunescapeText>
                        </TouchableOpacity>
                    ))}
                </View>

                <TouchableOpacity style={[styles.submit, (!selectedSkill || loading) && {opacity: 0.6}]} onPress={applyLamp} disabled={!selectedSkill || loading}>
                    <Text style={{ color: 'white' }}>
                        {loading ? "Applying XP..." : "Submit"}
                    </Text>
                </TouchableOpacity>
            </DefaultModal>

            <SafeAreaView style={styles.container}>
                <ImageBackground source={require("../../../assets/images/background.png")} style={styles.background}>
                    <View style={styles.grid}>
                        <TouchableOpacity style={[styles.quadrant, {paddingLeft: 24}]} onPress={handleRollRandomEvent}>
                            <Image source={require('../../../assets/images/genie.png')} style={styles.icon} resizeMode="contain"/>
                            <RunescapeText
                                font='RunescapeBold'
                                fontSize={16}
                                style={{ 
                                    textAlign: 'center',
                                    marginTop: 24,
                                    marginBottom: 24
                                }}>
                                Roll random event
                            </RunescapeText>
                        </TouchableOpacity>
                        <TouchableOpacity style={[styles.quadrant, {paddingRight: 48}]}>
                            <Image source={require('../../../assets/images/GnomeChild.png')} style={styles.icon} resizeMode="contain"/>
                            <RunescapeText
                                font='RunescapeBold'
                                fontSize={16}
                                style={{ 
                                    textAlign: 'center',
                                    marginTop: 24,
                                    marginBottom: 24
                                }}>
                                Enter a code
                            </RunescapeText>
                        </TouchableOpacity>
                        <TouchableOpacity style={[styles.quadrant, {paddingLeft: 40}]} onPress={() => {
                            setXpLampModalVisible(true);
                            setLampType("small");
                        }}>
                            <Image source={require('../../../assets/images/SmallLamp.png')} style={styles.icon} resizeMode="contain"/>
                            <RunescapeText
                                font='RunescapeBold'
                                fontSize={16}
                                style={{ 
                                    textAlign: 'center',
                                    marginTop: 24,
                                    marginBottom: 24
                                }}>
                                Use a Small XP Lamp
                            </RunescapeText>
                        </TouchableOpacity>
                        <TouchableOpacity style={[styles.quadrant, {paddingRight: 40}]} onPress={() => {
                            setXpLampModalVisible(true);
                            setLampType("large");
                        }}>
                            <Image source={require('../../../assets/images/LargeLamp.png')} style={styles.icon} resizeMode="contain"/>
                            <RunescapeText
                                font='RunescapeBold'
                                fontSize={16}
                                style={{ 
                                    textAlign: 'center',
                                    marginTop: 24,
                                    marginBottom: 24
                                }}>
                                Use a Large XP Lamp
                            </RunescapeText>
                        </TouchableOpacity>
                    </View>
                </ImageBackground>
            </SafeAreaView>
         </>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "black"
    },
    background: {
        flex: 1
    },
    input: {
        height: 40,
        borderColor: 'blue',
        borderWidth: 1,
        borderRadius: 8,
        paddingHorizontal: 10,
        color: 'black',
    },
    submit: {
        backgroundColor: '#007AFF',
        paddingVertical: 12,
        paddingHorizontal: 24,
        borderRadius: 25,
        alignItems: 'center',
        marginTop: 24
    },
    grid: {
        flex: 1,
        flexDirection: 'row',
        flexWrap: 'wrap',
    },
    quadrant: {
        width: '50%',
        height: '50%',
        justifyContent: 'center',
        alignItems: 'center'
    },
    icon: {
        width: 160,
        height: 160
    },
    skillRow: {
        flexDirection: 'row',
        justifyContent: 'space-around',
        alignItems: 'center',
        marginBottom: 16,
    },
    skillOption: {
        alignItems: 'center',
        justifyContent: 'center',
        padding: 4,
        borderRadius: 6,
        borderWidth: 1,
        borderColor: '#333',
        marginHorizontal: 4,
        backgroundColor: 'transparent',
    },
    skillSelected: {
        borderColor: '#007AFF',
        backgroundColor: 'rgba(0,122,255,0.15)',
    },
    skillIcon: {
        width: 40,
        height: 40,
    },
    closeButton: {
        position: 'absolute',
        top: -18,
        right: -18,
        zIndex: 20,
        width: 36,
        height: 36,
        borderRadius: 18,
        backgroundColor: 'rgba(0,0,0,0.6)',
        alignItems: 'center',
        justifyContent: 'center',
    },
    closeButtonText: {
        fontSize: 22,
        fontWeight: 'bold',
        color: 'white',
        lineHeight: 22,
    },
})

export default Home;