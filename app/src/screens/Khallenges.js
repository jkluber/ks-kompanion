import { SafeAreaView, View, SectionList } from 'react-native';
import khallengeJson from '../../../assets/config/khallenge_config.json';
import RunescapeText from '../components/RunescapeText';
import {useState} from 'react';
import KhallengeItem from '../components/KhallengeItem';


const Khallenges = () => {
    const [completedItems, setCompletedItems] = useState({});
    const [showPetModal, setShowPetModal] = useState(false);

    // Transform the data into sections for SectionList
    const sections = Object.keys(khallengeJson).map((key) => ({
        title: key, // The key (e.g., "Super Monkey Ball 2")
        data: khallengeJson[key].map((item) => ({
            ...item,
            UUID: `${key}-${item.id}`, // Add the section title to each item
        })),
    }));

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
                sections={sections}
                renderItem={({ item, index }) => <KhallengeItem item={item} 
                                                    index={index} 
                                                    isComplete={completedItems[item.UUID]} 
                                                    onToggle={() => setCompletedItems(prev => {
                                                        const newState = { ...prev };
                                                        if (newState[item.UUID]) {
                                                            delete newState[item.UUID];
                                                        } else {
                                                            newState[item.UUID] = true;
                                                        }
                                                        return newState;
                                                    })}/>}
                renderSectionHeader={renderSectionHeader}
                keyExtractor={(item) => item.UUID}
            />
        </SafeAreaView>
    );
}

export default Khallenges;