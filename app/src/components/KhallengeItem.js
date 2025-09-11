import { TouchableOpacity, View, Image, StyleSheet } from 'react-native';
import RunescapeText from './RunescapeText';
import { khallengePointsByDifficulty } from '../utils/KhallengeUtils';

const images = {
    easy: require('../../../assets/images/easy-task.png'),
    medium: require('../../../assets/images/medium-task.png'),
    hard: require('../../../assets/images/hard-task.png'),
    elite: require('../../../assets/images/elite-task.png'),
    repeatable: require('../../../assets/images/repeatable-task.png')
};

const KhallengeItem = ({ item, index, isComplete, onToggle}) => {
    return (
        <TouchableOpacity onPress={() => {
            onToggle();
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
                        {item.repeatable ? 
                            `Repeatable: ${item.xp} ${item.skill} Experience`
                            : `${item.xp} ${item.skill} Experience, ${khallengePointsByDifficulty(item.difficulty)} Khallenge Points`}
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