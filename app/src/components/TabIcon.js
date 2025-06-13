import { View, ImageBackground, Image, StyleSheet } from 'react-native';

const TabIcon = ({focused, iconSource}) => {
    return (
        <View
            style={styles.iconContainer} // Use a fixed width for the icon container
        >
            <ImageBackground
                source={require('../../../assets/icons/glyph.png')} // Ensure this path is correct
                style={styles.fillContainer}
            >
                <View
                    style={[
                        styles.fillContainer,
                        {
                            backgroundColor: focused ? 'rgba(122, 41, 32, 0.7)' : 'transparent', // Change background color when focused
                        }
                    ]}
                >
                    <Image
                        source={iconSource}
                        style={styles.iconImage}
                    />
                </View>
            </ImageBackground>
        </View>
    );
};

const styles = StyleSheet.create({
    iconContainer: {
        width: '70%',
        justifyContent: 'center',
        alignItems: 'center',
        flexDirection: 'row',
        borderWidth: 3,
        borderRadius: 5,
        borderColor: 'black',
    },
    fillContainer: {
        width: '100%',
        height: '100%',
        alignItems: 'center',
        justifyContent: 'center',
    },
    iconImage: {
        width: 40,
        height: 40,
        resizeMode: 'contain', 
    },
});

export default TabIcon;