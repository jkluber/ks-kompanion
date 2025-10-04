import React, { useRef, useEffect } from 'react';
import { Animated, View, StyleSheet } from 'react-native';
import Svg, { Line } from 'react-native-svg';
import RunescapeText from './RunescapeText';

const ticks = [0.1175, 0.3529, 0.6764]
const TIER_THRESHOLDS = [20, 60, 115, 170]
const BAR_HEIGHT = 50;
const MAX_KHALLENGE_POINTS = 170;

const ProgressBar = ({ khallengePoints }) => {

    const progress = Math.min(khallengePoints / MAX_KHALLENGE_POINTS, 1);

    /*
    const determinePointDisplay = (points) => {
        let pointsUntilNextTier = points
        for (let i = 0; i < TIER_THRESHOLDS.length; i++) {
            if (points >= TIER_THRESHOLDS[i]) {
                pointsUntilNextTier = pointsUntilNextTier - TIER_THRESHOLDS[i];
            } else {
                return [pointsUntilNextTier, TIER_THRESHOLDS[i]];
            }
        }
        return [MAX_KHALLENGE_POINTS, TIER_THRESHOLDS[TIER_THRESHOLDS.length - 1]];
    }

    var displayPoints = determinePointDisplay(khallengePoints);
    */

    return (
        <View style={[styles.progressBarBackground, { height: 50, backgroundColor: 'rgb(88, 17, 83)' , borderColor: 'black', borderWidth: 2 }]}>
            <View
                style={[
                    {
                        height: 50,
                        backgroundColor: 'yellow',
                        width: progress * 100 + '%',
                    },
                ]}
            />
            {/* Vertical lines */}
            <View style={StyleSheet.absoluteFill}>
                <Svg width="100%" height={BAR_HEIGHT}>
                    {ticks.map((tick, idx) => (
                        <Line
                            key={idx}
                            x1={`${tick * 100}%`}
                            y1={0}
                            x2={`${tick * 100}%`}
                            y2={BAR_HEIGHT}
                            stroke="black"
                            strokeWidth={2}
                        />
                    ))}
                </Svg>
            </View>
            <View style={{
                position: 'absolute',
                top: 0, left: 0, right: 0, bottom: 0,
                justifyContent: 'center', 
                alignItems: 'center'
            }}>
                <RunescapeText
                    style={{
                        fontSize: 24,
                        textAlign: 'center',
                        alignItems: 'center',
                        color: 'white'
                    }}
                >
                {khallengePoints} KPs
                </RunescapeText>
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    progressBarBackground: {
        width: '100%',
        overflow: 'hidden',
    },
});

export default ProgressBar;
