import { useState, useEffect } from 'react';
import {SafeAreaView, StyleSheet, ImageBackground, Text, TextInput, TouchableOpacity, View, Image} from 'react-native';
import * as Application from 'expo-application';
import * as Device from 'expo-device';
import { checkNewUser, rollRandomEvent } from '../utils/MiscUtils';
import DefaultModal from '../components/DefaultModal';
import RunescapeText from '../components/RunescapeText';

const Home = () => {

    const [newUser, setNewUser] = useState(false);
    const [username, setUsername] = useState('');
    const [randomEventResult, setRandomEventResult] = useState('');
    const [randomEventModalVisible, setRandomEventModalVisible] = useState(false);

    useEffect(() => {
        const checkDeviceId = async() => {
            let deviceId = await fetchDeviceId();
            let result = await checkNewUser(deviceId, null);
            setNewUser(result);
        }
        checkDeviceId();
    }, []);

    async function fetchDeviceId() {
        if ('iOS' === Device.osName) {
            return await Application.getIosIdForVendorAsync();
        } else {
            return Application.getAndroidId();
        }
    }

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
        const result = rollRandomEvent(deviceId);
        setRandomEventResult(result);
        setRandomEventModalVisible(true);
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
                                    marginBottom: 24
                                }}>
                                Roll random event
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
        width: 200,
        height: 200
    }
})

export default Home;