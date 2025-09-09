import { TouchableOpacity, View, Image, StyleSheet } from 'react-native';
import RunescapeText from './RunescapeText';
import { kompleteKhallenge } from '../utils/KhallengeUtils';

const images = {
    easy: require('../../../assets/images/easy-task.png'),
    medium: require('../../../assets/images/medium-task.png'),
    hard: require('../../../assets/images/hard-task.png'),
    elite: require('../../../assets/images/elite-task.png'),
};

const handleItemPress = (item, isComplete) => {
    let operator = isComplete ? "+" : "-";
    kompleteKhallenge(item.difficulty, item.skill, item.xp, operator);
}

const KhallengeItem = ({ item, index, isComplete, onToggle}) => {
    return (
        <TouchableOpacity onPress={() => {
            onToggle();
            handleItemPress(item, !isComplete);
        }}>
            <View style={[styles.container, {backgroundColor: index % 2 === 0 ? 'rgb(90, 83, 72)' : 'rgb(79, 69, 59)'}]}>
                <Image source={images[item.difficulty]} style={styles.image}/>
                <View style={{ flex: 1 }}>
                    <RunescapeText
                        style={{ 
                            fontSize: 24, 
                        }}
                        color={isComplete ? 'rgb(0, 191, 134)' : 'rgb(137, 129, 122)'}
                        adjustsFontSizeToFit={true}
                    >
                        {item.description}
                    </RunescapeText>
                    <RunescapeText 
                        style={{ 
                            fontSize: 18, 
                            marginTop: 5,
                        }}
                        adjustsFontSizeToFit={true}
                    >
                        Reward: {item.xp} Experience
                    </RunescapeText>
                </View>
            </View>
        </TouchableOpacity>
    );
};

const styles = StyleSheet.create({
    container: {
        padding: 10,
        borderBottomWidth: 1,
        borderBottomColor: 'black',
        flexDirection: 'row',
        alignItems: 'center'
    },
    image: {
        width: 20,
        height: 20,
        marginRight: 10,
        resizeMode: 'contain'
    }
})

export default KhallengeItem;