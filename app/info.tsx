import { Button, Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React from 'react'
import { useRouter } from 'expo-router';
import { SafeAreaView } from 'react-native-safe-area-context';
import { COLORS } from '@/utils/colors';

const InfoScreen = () => {
    const router = useRouter();
    return (
        <SafeAreaView style={styles.container}>
            <Image source={require('../assets/images/login.png')} style={styles.img} />
            <View style={styles.topContainer}>
                <Image source={require('../assets/images/splashlogo1.png')} style={{ width: 140, height: 34,resizeMode:'contain' }} />
                <View style={styles.topText}>
                    <Text style={styles.whiteText}>Willkommen bei</Text>
                    <Text style={[styles.whiteText,{fontFamily:'OpenSans-Bold'}]}>corplife Partner Portal</Text>
                </View>
            </View>
            <View style={styles.textContainer}>
                <View style={styles.logo}>
                    <Image style={styles.logoImg} source={require('../assets/images/infoScreen.png')} />
                </View>
                <View style={styles.textWrapper}>
                    <Text style={styles.text}>
                        Um <Text style={{fontFamily:'OpenSans-Bold'}}>corplife Lunch</Text> nutzen zu können,
                        musst du dein Konto zuerst aktivieren.
                    </Text>
                    <Text style={styles.text}>
                        Du findest die Aktivierungs-E-Mail
                        in deinem Postfach.
                    </Text>
                    <Text style={styles.text}>
                        Mahlzeit!
                    </Text>
                </View>

                <View style={styles.buttonContainer}>
                    <TouchableOpacity style={styles.button} onPress={() => router.replace('/(app)/(auth)/login')}>
                        <Text style={styles.buttonText}>Weiter zum Login</Text>
                        <Image source={require('../assets/images/rightArrow.png')} />
                    </TouchableOpacity>
                </View>
            </View>
        </SafeAreaView>
    )
}

export default InfoScreen

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'flex-end',
        gap: 74
    },
    containerSafe: {
        height: '100%'
    },
    img: {
        resizeMode: 'cover',
        width: '100%',
        height: 371,
        position: 'absolute',
        top: 0
    },
    textContainer: {
        borderRadius: 40,
        backgroundColor: '#fff',
        paddingHorizontal: 20,
        paddingVertical: 30,
        boxShadow: '0px 4px 15px 0px rgba(0, 0, 0, 0.07)',
        marginHorizontal: 10,
        height: '64%'
    },
    logo: {
        alignItems: 'center'
    },
    logoImg: {
        resizeMode: 'contain'
    },
    textWrapper: {
        marginTop: 30,
        alignItems: 'center',
        gap: 30
    },
    text: {
        fontFamily: 'OpenSans-Regular',
        textAlign: 'center'
    },
    buttonContainer: {
        flex: 1, 
        justifyContent: 'flex-end'
    },
    button: {
        backgroundColor: COLORS.primaryButton,
        borderRadius: 62,
        height: 46,
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        gap: 10
    },
    buttonText: {
        color: '#fff',
        fontSize: 15,
        lineHeight: 20
    },
    topContainer: {
        alignItems: 'center',
        gap: 40,
        paddingTop: 40,
        paddingBottom: 34
    },
    topText: {
        justifyContent: 'center',
        alignItems: 'center'
    },
    whiteText: {
        color: '#fff',
        fontSize: 22,
        lineHeight: 30,
        fontFamily: 'OpenSans-Regular'
    }
})
