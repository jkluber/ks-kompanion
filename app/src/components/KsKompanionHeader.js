import { Animated, SafeAreaView, ImageBackground, Image, StyleSheet } from 'react-native';
import RunescapeText from './RunescapeText'; // Adjust the path as necessary

const KsKompanionHeader = ({ text, duration = 10000, ...props }) => {
    return (    
        <SafeAreaView style={styles.container}>
            <ImageBackground source={require('../../../assets/images/chat-log.png')} style={styles.background}>
                <RunescapeText color="black" fontSize={36} shadowColor="transparent" style={styles.text}>
                    {text}
                </RunescapeText>
            </ImageBackground>           
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    container: {
        alignItems: 'center',
        justifyContent: 'center'
    },
    background: {
        alignItems: 'center',
        justifyContent: 'center',
        flexDirection: 'row'
    },
    text: {
        textAlign: 'center',
        padding: 15
    }
});

export default KsKompanionHeader;