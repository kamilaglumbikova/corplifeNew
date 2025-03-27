
import { ScrollView, StyleSheet, Text, View, Linking, Pressable } from 'react-native'
import React, { useState } from 'react'
import { COLORS } from '@/utils/colors'
import { SafeAreaView } from 'react-native-safe-area-context'
import { useRouter } from 'expo-router';
import { StatusBar } from "expo-status-bar";

import ProfilIcon from '@/assets/images/profilIcon.svg';
import { useAuth } from '@/context/AuthContext';
import { User } from '@/utils/api';
import CustomAlert from '@/components/CustomAlert';

const ProfilScreen = () => {
    const { userInfo, onLogout } = useAuth();
    const router = useRouter();
    const [showAlert, setShowAlert] = useState(false);


    const handlePress = async (url: string) => {
        const supported = await Linking.canOpenURL(url);
        if (supported) {
            await Linking.openURL(url);
        }
    }

    const onSubmit = async () => {
        await onLogout!();
        router.push('/(app)/(auth)/login');
    }

    const hideAlert = () => {
        setShowAlert(false)
      };

    return (
        <SafeAreaView style={styles.container} edges={["bottom", "left", "right"]}>
            <StatusBar translucent backgroundColor="transparent" style="light" />
            <ScrollView>
                <Text style={styles.headline}>Profil</Text>
                <View style={styles.dataContainer}>
                    <Text style={styles.dataContainerTitle}>PERSÖNLICHE DATEN</Text>
                    <View style={[styles.dataContanerWrapper, { flexDirection: 'row', gap: 15, alignItems: 'center' }]}>
                        <ProfilIcon width={58.56} height={58.56} />
                        <View style={styles.textContainer}>
                            <View style={{ flexDirection: 'row', flexWrap: 'wrap' }}>
                                <Text style={[styles.personalText, { fontSize: 22, lineHeight: 29.96 }]}>{`${(userInfo as User)?.firstname} `}</Text>
                                <Text style={[styles.personalText, { fontSize: 22, lineHeight: 29.96 }]}>{`${(userInfo as User)?.lastname}`}</Text>
                            </View>
                            <Text style={styles.personalText}>{(userInfo as User)?.email}</Text>
                        </View>
                    </View>
                    <Text style={styles.textInfo}>
                        Wenn du  Ihre Daten ändern möchten, wenden Sie sich bitte an Ihre pm@corplife.at.
                    </Text>
                </View>
                <View style={styles.dataContainer}>
                    <Text style={styles.dataContainerTitle}>RECHTLICHES</Text>
                    <View style={[styles.dataContanerWrapperLinks]}>
                        <Pressable style={styles.link} onPress={() => handlePress('https://www.corplife.at/Datenschutz/')}>
                            <Text style={styles.blueLink}>Datenschutz</Text>
                        </Pressable>
                        <Pressable style={styles.link} onPress={() => handlePress('https://www.corplife.at/agb/')}>
                            <Text style={styles.blueLink}>AGB</Text>
                        </Pressable>
                        <Pressable style={[styles.link, { borderBottomWidth: 0 }]} onPress={() => handlePress('https://www.corplife.at/impressum/')}>
                            <Text style={styles.blueLink}>Interne Regelungen</Text>
                        </Pressable>
                    </View>
                </View>
                <View style={styles.dataContainer}>
                    <Text style={styles.dataContainerTitle}>ANMELDUNG</Text>
                    <View style={[styles.dataContanerWrapperLinks]}>
                        <Pressable style={[styles.link, { borderBottomWidth: 0 }]} onPress={() => setShowAlert(true)}>
                            <Text style={styles.redLink}>Abmelden</Text>
                        </Pressable>
                    </View>
                </View>
                <CustomAlert showAlert={showAlert} title='Abmelden?' message='Möchtest du wirklich schon gehen?'
                cancelText='Abbrechen' confirmText='Abmelden' hideAlert={hideAlert} onSubmit={onSubmit} />
            </ScrollView>
        </SafeAreaView>
    )
}

export default ProfilScreen

const styles = StyleSheet.create({
    container: {
        flex: 1,
        paddingHorizontal: 16,
        paddingTop: 87
    },
    headline: {
        color: '#fff',
        fontFamily: 'Inter-Bold',
        fontSize: 34,
        lineHeight: 41.15,
        marginBottom: 10
    },
    dataContainer: {
        marginTop: 30
    },
    dataContainerTitle: {
        color: COLORS.placeholder,
        fontFamily: 'OpenSans-SemiBold',
        fontSize: 12,
        lineHeight: 16.34,
        paddingLeft: 10,
        textTransform: 'uppercase'
    },
    dataContanerWrapper: {
        backgroundColor: 'rgba(255, 255, 255, 0.1)',
        borderRadius: 12,
        paddingHorizontal: 15,
        paddingVertical: 10,
        marginTop: 10,
    },
    dataContanerWrapperLinks: {
        backgroundColor: 'rgba(255, 255, 255, 0.1)',
        borderRadius: 12,
        paddingHorizontal: 15,
        paddingVertical: 0,
        marginTop: 10,
    },
    textContainer: {
        gap: 3
    },
    personalText: {
        color: '#fff',
        fontFamily: 'OpenSans-Regular',
        fontSize: 14,
        lineHeight: 19.07,
    },
    textInfo: {
        color: COLORS.placeholder,
        fontFamily: 'OpenSans-SemiBold',
        fontSize: 12,
        lineHeight: 16.34,
        paddingHorizontal: 15,
        paddingTop: 5
    },
    link: {
        height: 44,
        justifyContent: 'center',
        borderBottomColor: 'rgba(255, 255, 255, 0.2)',
        borderBottomWidth: .5
    },
    blueLink: {
        color: COLORS.blueLink,
        fontFamily: 'OpenSans-Regular',
        fontSize: 18,
        lineHeight: 24.51
    },
    redLink: {
        color: COLORS.error,
        fontFamily: 'OpenSans-Regular',
        fontSize: 18,
        lineHeight: 24.51
    }
})