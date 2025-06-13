import { useFonts } from 'expo-font'
import {SafeAreaView, StyleSheet, ImageBackground, Text} from 'react-native';

const Home = () => {

    const [loaded] = useFonts({
        'RunescapeFont': require('../../../assets/fonts/runescape_uf.ttf'),
    });

    if (!loaded) {
        return null;
    }

    return (
        <SafeAreaView style={styles.container}>
            <ImageBackground source={require("../../../assets/images/background.png")} style={styles.background}>
            </ImageBackground>
         </SafeAreaView>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "black"
    },
    background: {
        flex: 1
    }
})

export default Home;