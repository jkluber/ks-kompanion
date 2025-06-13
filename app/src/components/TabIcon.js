import { View, ImageBackground, width, Image } from 'react-native';

const TabIcon = ({focused, iconSource}) => {
    return (
        <View
            style={{
                width: '70%', // Set a fixed width for the icon container
                justifyContent: 'center',
                alignItems: 'center',
                flexDirection: 'row',
                borderWidth: 3,
                borderRadius: 5, // Add rounded corners to the icon container
                borderColor: 'black', // Add border to the icon container
            }}
        >
            <ImageBackground
                source={require('../../../assets/icons/glyph.png')} // Ensure this path is correct
                style={{
                    width: '100%',
                    height: '100%',
                    alignItems: 'center',
                    justifyContent: 'center',
                }}
                imageStyle={{
                    tintColor: focused ? 'rgb(122, 41, 32, 0.5)' : null, // Change background color when focused
                }}
            >
                <View
                    style={{
                        width: '100%',
                        height: '100%',
                        alignItems: 'center',
                        justifyContent: 'center',
                        backgroundColor: focused ? 'rgba(122, 41, 32, 0.7)' : 'transparent', // Change background color when focused
                    }}>
                    <Image
                        source={iconSource}
                        style={{
                        width: 40,
                        height: 40,
                        resizeMode: 'contain', // Ensure the icon fits within the container
                        }}
                    />
                </View>
            </ImageBackground>
        </View>
    );
};

export default TabIcon;