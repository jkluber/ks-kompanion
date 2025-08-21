import React, { useRef, useEffect } from 'react';
import { Animated, View, ImageBackground, Image } from 'react-native';
import RunescapeText from './RunescapeText'; // Adjust the path as necessary

const KsKompanionHeader = ({ text, ...props }) => {
    return (    
        <View
            style={{
                alignItems: 'center',
                justifyContent: 'center',
            }}
        >
            <ImageBackground
                source={require('../../../assets/images/chat-log.png')} // Ensure this path is correct
                style={{
                    alignItems: 'center',
                    justifyContent: 'center',
                    flexDirection: 'row',
                }}
            >
                <RunescapeText
                    color="black"
                    fontSize={36}
                    style={{
                        textAlign: 'center',
                        padding: 15
                    }}
                >
                    {text}
                </RunescapeText>
            </ImageBackground>           
        </View>
    );
};

export default KsKompanionHeader;