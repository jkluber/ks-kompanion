import {useFonts} from 'expo-font';
import {SafeAreaView, Text, View,  FlatList} from 'react-native';
import khallengeJson from '../../../assets/config/khallenge_config.json';
import { KeyboardState } from 'react-native-reanimated';

const Khallenges = () => {
    const [loaded] = useFonts({
        'RunescapeFont': require('../../../assets/fonts/runescape_uf.ttf'),
    });

    if (!loaded) {
        return null;
    }

    // Flatten the data structure to combine all items into a single array
    const flattenedData = Object.keys(khallengeJson).flatMap((key) =>
        khallengeJson[key].map((item) => ({
            ...item,
            keyTitle: key, // Add the key (title) to each item
        }))
    );

    const khallengeItem = ({ item }) => (
        <View style={{ padding: 10, borderBottomWidth: 1, borderBottomColor: 'black', backgroundColor: 'gray' }}>
            <Text style={{ fontFamily: 'RunescapeFont', fontSize: 32, color: 'yellow', marginBottom: 10, textAlign: 'center'}}>
                {item.keyTitle}
            </Text>
            <Text style={{ fontFamily: 'RunescapeFont', fontSize: 20, color: 'yellow'}}>
                {item.description}
            </Text>
        </View>
    )

    return (
        <SafeAreaView>
            <FlatList
                data={flattenedData} // Use the flattened data array
                renderItem={khallengeItem} // Render each item
                keyExtractor={(item) => `${item.keyTitle}-${item.id}`} // Ensure keys are unique
            />
        </SafeAreaView>
    );
}

export default Khallenges;