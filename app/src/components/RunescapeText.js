import { Text, StyleSheet } from 'react-native';
import {useFonts} from 'expo-font';


const RunescapeText = ({ children, color, shadowColor, fontSize, font, style, ...props }) => {

    const extractedFontSize = style?.fontSize || fontSize || 16;

    return (
        <Text
            style={[
                {
                    color: color || 'yellow',
                    fontSize: extractedFontSize || 16,
                    fontFamily: font || 'RunescapeThin',
                    textShadowColor: shadowColor || 'black',
                },
                style,
                styles.text
            ]}
            {...props} // Pass additional props like adjustsFontSizeToFit
        >
            {children}
        </Text>
    );
};

const styles = StyleSheet.create({
    text: {
        flex: 1,
        textShadowOffset: { width: 1, height: 1 }
    }
});

export default RunescapeText;