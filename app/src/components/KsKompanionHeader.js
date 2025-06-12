import React, { useState } from 'react';
import { View, ImageBackground } from 'react-native';
import RunescapeText from './RunescapeText'; // Adjust the path as necessary

const KsKompanionHeader = ({ text, ...props }) => {

    return (    
        <View
            style={{
                width: '100%', // Full width
                alignItems: 'center',
                justifyContent: 'center',
                borderWidth: 2,
                borderColor: 'gray',
            }}
        >
            <ImageBackground
                source={require('../../../assets/images/chat-log.png')} // Ensure this path is correct
                style={{
                    width: '100%', // Full width
                    flexDirection: 'row',
                    alignItems: 'center',
                    justifyContent: 'center',
                }}
            >
                <RunescapeText
                color="black"
                fontSize={40}
                style={{
                    padding: 10,
                    maxWidth: '70%',
                    textAlign: 'center',
                }}
                >
                    {text}
                </RunescapeText>
            </ImageBackground>           
        </View>
    );
};

export default KsKompanionHeader;