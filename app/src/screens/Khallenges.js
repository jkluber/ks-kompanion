import { SafeAreaView, View, SectionList, ActivityIndicator } from 'react-native';
import khallengeJson from '../../../assets/config/khallenge_config.json';
import RunescapeText from '../components/RunescapeText';
import {useCallback, useState} from 'react';
import KhallengeItem from '../components/KhallengeItem';
import { useFocusEffect } from '@react-navigation/native';
import { sendRequest, fetchDeviceId } from '../utils/MiscUtils';
import {kompleteKhallenge} from '../utils/KhallengeUtils';


const Khallenges = () => {
    const [completedItems, setCompletedItems] = useState({});
    const [showPetModal, setShowPetModal] = useState(false);
    const [loading, setLoading] = useState(false);

    const sections = Object.keys(khallengeJson).map((key) => ({
        title: key,
        data: khallengeJson[key].map((item) => ({
            ...item,
            id: item.id,
        })),
    }));

    const renderSectionHeader = ({ section }) => {
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

    useFocusEffect(
        useCallback(() => {
            const fetchCompletion = async() => {
                setLoading(true);
                try {
                    let deviceId = await fetchDeviceId();
                    const result = await sendRequest("POST", JSON.stringify({
                        deviceId: deviceId,
                        method: "getKhallengePoints"
                    }));
                    const newCompleted = {};
                    if (result.ids && Array.isArray(result.ids)) {
                        result.ids.forEach(id => {
                            newCompleted[id] = true;
                        });
                    }
                    setCompletedItems(newCompleted);
                } catch (err) {
                    console.error(err);
                } finally {
                    setLoading(false);
                }
            };
            fetchCompletion();
        }, [])
    );

    const handleToggle = async(item, isComplete) => {
        if (loading) return;
        setLoading(true);
        try {
            let operator = !isComplete || item.repeatable ? "+" : "-";
            await kompleteKhallenge(item.difficulty, item.skill, item.xp, operator, item.id);
            setCompletedItems(prev => {
                const newState = { ...prev };
                if (newState[item.id] || item.repeatable) {
                    delete newState[item.id];
                } else {
                    newState[item.id] = true;
                }
                return newState;
            });
        } catch (err) {
            console.error(err);
        } finally {
            setLoading(false);
        }
    };

    return (
        <SafeAreaView style={{ flex: 1, backgroundColor: 'rgb(88, 85, 80)' }}>
            <SectionList
                sections={sections}
                renderItem={({ item, index }) => <KhallengeItem item={item} 
                                                    index={index} 
                                                    isComplete={completedItems[item.id]} 
                                                    disabled={loading}
                                                    onToggle={() => handleToggle(item, completedItems[item.id])}
                                                    />
                            }
                renderSectionHeader={renderSectionHeader}
                keyExtractor={(item) => item.id}
            />
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
    );
}

export default Khallenges;