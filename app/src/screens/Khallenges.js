import { SafeAreaView, View, SectionList } from 'react-native';
import khallengeJson from '../../../assets/config/khallenge_config.json';
import RunescapeText from '../components/RunescapeText';
import {useCallback, useState} from 'react';
import KhallengeItem from '../components/KhallengeItem';
import { useFocusEffect } from '@react-navigation/native';
import { sendRequest, fetchDeviceId } from '../utils/MiscUtils';


const Khallenges = () => {
    const [completedItems, setCompletedItems] = useState({});
    const [showPetModal, setShowPetModal] = useState(false);

    // Transform the data into sections for SectionList
    const sections = Object.keys(khallengeJson).map((key) => ({
        title: key, // The key (e.g., "Super Monkey Ball 2")
        data: khallengeJson[key].map((item) => ({
            ...item,
            id: item.id, // Add the section title to each item
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
            console.log("Here");
            const fetchCompletion = async() => {
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
                }
            };
            fetchCompletion();
        }, [])
    );

    return (
        <SafeAreaView style={{ flex: 1, backgroundColor: 'rgb(88, 85, 80)' }}>
            <SectionList
                sections={sections}
                renderItem={({ item, index }) => <KhallengeItem item={item} 
                                                    index={index} 
                                                    isComplete={completedItems[item.id]} 
                                                    onToggle={async() => {
                                                        setCompletedItems(prev => {
                                                            const newState = { ...prev };
                                                            if (newState[item.id]) {
                                                                delete newState[item.id];
                                                            } else {
                                                                newState[item.id] = true;
                                                            };
                                                            return newState;
                                                        });
                                                }}/>}
                renderSectionHeader={renderSectionHeader}
                keyExtractor={(item) => item.id}
            />
        </SafeAreaView>
    );
}

export default Khallenges;