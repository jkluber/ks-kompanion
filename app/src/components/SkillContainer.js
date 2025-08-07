import React, { useState } from 'react';
import { View, Text, Dimensions, Image } from 'react-native';
import Svg, { Path, Rect, Circle, Defs, Mask, Line } from 'react-native-svg';
import RunescapeText from './RunescapeText'; // Adjust the path as necessary

const { width } = Dimensions.get('window');
const CONTAINER_WIDTH = width * .4;
const CONTAINER_HEIGHT = 80;
const RADIUS = 10;

function getCutoutPath(w, h, r) {
  // This path draws a rectangle with quarter-circle cutouts in each corner
  return `
    M${r},0
    H${w - r}
    A${r},${r} 0 0 1 ${w},${r}
    V${h - r}
    A${r},${r} 0 0 1 ${w - r},${h}
    H${r}
    A${r},${r} 0 0 1 0,${h - r}
    V${r}
    A${r},${r} 0 0 1 ${r},0
    Z
  `;
}

// ChatGPT wrote the SVG stuff i have no clue how it works
const SkillContainer = ({ skill }) => {
    console.log('SkillContainer skill:', skill);
    const [textWidth, setTextWidth] = useState(0);
    const [textHeight, setTextHeight] = useState(0);
    return (
    <View style={[styles.container]}>
        <Svg
            width={CONTAINER_WIDTH}
            height={CONTAINER_HEIGHT}
            style={{ position: 'absolute', top: 0, left: 0 }}
        >
            <Defs>
                <Mask id="cutoutMask">
                    {/* Full rectangle (white = visible) */}
                    <Rect
                        x="0"
                        y="0"
                        width={CONTAINER_WIDTH}
                        height={CONTAINER_HEIGHT}
                        fill="white"
                    />
                    {/* Circles in each corner (black = cut out) */}
                    <Circle cx={0} cy={0} r={RADIUS} fill="black" />
                    <Circle cx={CONTAINER_WIDTH} cy={0} r={RADIUS} fill="black" />
                    <Circle cx={0} cy={CONTAINER_HEIGHT} r={RADIUS} fill="black" />
                    <Circle cx={CONTAINER_WIDTH} cy={CONTAINER_HEIGHT} r={RADIUS} fill="black" />
                </Mask>
            </Defs>
            {/* Fill */}
            <Path
                d={getCutoutPath(CONTAINER_WIDTH, CONTAINER_HEIGHT, RADIUS)}
                fill="gray"
                mask="url(#cutoutMask)"
                stroke={'black'}
                strokeWidth={6}
            />
        </Svg>
        <View style={[styles.skillContentContainer]}>
            <Image
                source={skill.icon}
                style={[styles.skillIcon]} // Adjust size as needed
            />
            <View style={[styles.levelDisplayContainer]}>
                <RunescapeText
                    style={{
                        position: 'absolute',
                        top: 0,
                        left: 0,
                        fontSize: 32,
                        transform: [
                            { translateX: -textWidth / 2 },
                            { translateY: -textHeight / 2 },
                        ]
                    }}
                    onLayout={e => {
                        setTextWidth(e.nativeEvent.layout.width);
                        setTextHeight(e.nativeEvent.layout.height);
                    }}
                >
                    {skill.level}
                </RunescapeText>
                <RunescapeText
                    style={{
                        position: 'absolute',
                        bottom: 0,
                        right: 0,
                        fontSize: 32,
                        transform: [
                            { translateX: textWidth / 2 },
                            { translateY: textHeight / 2 },
                        ]
                    }}
                >
                    {skill.level}
                </RunescapeText>
                <Svg
                    width={60}
                    height={60}
                    style={{ position: 'absolute', top: 0, left: 0, zIndex: 1 }}
                >
                    <Line
                    x1={-2}
                    y1={33}
                    x2={33}
                    y2={-2}
                    stroke="black"
                    strokeWidth={2}
                    />
                </Svg>
            </View>
        </View>
    </View>
  );
};

const styles = {
    container: {
        width: CONTAINER_WIDTH,
        height: CONTAINER_HEIGHT,
        margin: 2,
    },
    skillContentContainer: {
        width: '100%',
        height: '100%',
        borderColor: 'black',
        top: 0,
        left: 0,
        zIndex: 1,
        flexDirection: 'row',
        position: 'relative',
    },
    skillIcon: {
        width: 50,
        height: 50,
        resizeMode: 'contain',
        alignSelf: 'center',
        position: 'absolute',
        left: 0,
        margin: 15,
    },
    levelDisplayContainer: {
        width: 35,
        height: 35,
        position: 'absolute',
        alignSelf: 'center',
        right: 0,
        marginRight: 25,
    },
}


export default SkillContainer;