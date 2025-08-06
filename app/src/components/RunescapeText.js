import React from 'react';
import { Text, View } from 'react-native';
import {useFonts} from 'expo-font';


const RunescapeText = ({ children, color, shadowColor, fontSize, font, style, ...props }) => {

    const extractedFontSize = style?.fontSize || fontSize || 16;

    return (
        <Text
            style={[
                style, // other styles passed in
                {
                    flex: 1,
                    color: color || 'yellow',
                    fontSize: extractedFontSize || 16,
                    fontFamily: font || 'RunescapeThin',
                    textShadowColor: shadowColor || 'black', 
                    textShadowOffset: { width: 1, height: 1 },
                },
            ]}
            {...props} // Pass additional props like adjustsFontSizeToFit
        >
        {children}
        </Text>
    );
};

export default RunescapeText;