import React, { useEffect, useState } from 'react';
import { View, StyleSheet, Animated, Image } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { StatusBar } from "expo-status-bar";

import { LinearGradient } from 'expo-linear-gradient';

export default function SplashScreen({ onFinish }: { onFinish: () => void }) {
    const [progress, setProgress] = useState(0);

    useEffect(() => {
        const interval = setInterval(() => {
            setProgress((oldProgress) => {
                const newProgress = oldProgress + 10;
                if (newProgress >= 100) {
                    clearInterval(interval);
                    onFinish();
                }
                return newProgress;
            });
        }, 300);

        return () => clearInterval(interval);
    }, []);

    return (
        <SafeAreaView style={styles.container}>
                <StatusBar translucent backgroundColor="transparent" style="light" />
            <LinearGradient
                colors={['rgba(34, 27, 88, 1)', 'rgba(19, 15, 48, 1)']}
                style={styles.background}
            />
            <View style={styles.logosContainer}>
                <Image source={require('../assets/images/splashlogo1.png')} style={{ width: 140, height: 34,resizeMode:'contain' }} />
                <Image source={require('../assets/images/splashlogo2.png')} style={{ width: 281, height: 280,marginTop: 120,resizeMode:'contain' }} />
            </View>
            <View style={styles.progressBar}>
                <Animated.View
                    style={[
                        styles.progress,
                        { width: `${progress}%` },
                    ]}
                />
            </View>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: 'rgba(19, 15, 48, 1)',
    },
    background: {
        position: 'absolute',
        left: 0,
        right: 0,
        top: 0,
        height: '100%',
        transform: [{ rotate: '0.24deg' }],

    },
    button: {
        padding: 15,
        alignItems: 'center',
        borderRadius: 5,
    },
    text: {
        fontSize: 20,
        marginBottom: 20,
    },
    progressBar: {
        width: 280,
        height: 8,
        backgroundColor: 'rgba(255, 255, 255, 0.5)',
        borderRadius: 100,
        overflow: 'hidden',
        position: 'absolute',
        bottom: 56
    },
    progress: {
        height: '100%',
        backgroundColor: 'rgba(255, 255, 255, 1)',
    },
    logosContainer: {
        flex: 1,
        alignItems: 'center',
        marginTop: 40
    },
});
