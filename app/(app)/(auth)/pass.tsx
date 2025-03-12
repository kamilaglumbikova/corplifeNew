import { Link, router } from 'expo-router';
import { View, Text, StyleSheet, Image, TouchableOpacity, KeyboardAvoidingView, Platform, TextInput } from 'react-native'
import React, { useState } from 'react'

import CrossIcon from '@/assets/images/cross.svg';
import { COLORS } from '@/utils/colors';
import { schemaPass } from '@/schema/schema';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { Controller, useForm } from 'react-hook-form';
import { StatusBar } from "expo-status-bar";

import EmailIcon from '@/assets/images/email.svg';
import ButtonIcon from '@/assets/images/button.svg';
import Toast from 'react-native-toast-message';
import { forgotPassword } from '@/utils/api';

type FormData = z.infer<typeof schemaPass>;

const PassScreen = () => {
    const isPresented = router.canGoBack();
    const [message, setMessage] = useState('');
    const { control, handleSubmit, formState: { errors } } = useForm<FormData>({
        resolver: zodResolver(schemaPass),
        defaultValues: {
            email: '',
        },
        mode: 'onChange'
    });

    const showSuccessToast = () => {
        Toast.show({
            type: 'successCustomToast',
            text1: 'Success reset password',
        });
    }

    const showErrorToast = () => {
        Toast.show({
            type: 'errorCustomToast',
            text1: 'Error reset password',
        });
    }

    const onSubmit = async (data: any) => {
        const result = await forgotPassword(data.email);
        if (result.data?.status == 200) {
            router.push('../')
            showSuccessToast()
        } else {
            router.push('../')
            showErrorToast()
        }

    }
    return (
        <View style={styles.container}>
            <StatusBar translucent backgroundColor="transparent" style="light" />
            <View style={styles.crossContainer}>
                {isPresented && <Link href="../" asChild>
                    <TouchableOpacity style={styles.cross}>
                        <CrossIcon width={24} height={24} fill="black" />
                    </TouchableOpacity>
                </Link>}
            </View>
            <View style={styles.textContainer}>
                <Text style={styles.headline}>Hast du dein passwort vergessen?</Text>
                <Text style={styles.text}>Gib deine E-Mail-Adresse ein und wir schicken dir eine E-Mail, um dein Passwort zurückzusetzen.</Text>
            </View>
            <KeyboardAvoidingView behavior={Platform.OS === 'ios' ? 'padding' : 'height'} style={styles.formContainer}>
                <Controller
                    control={control}
                    name="email"
                    render={({ field: { onChange, onBlur, value } }) => (
                        <View style={styles.inputContainer}>
                            <Text style={styles.inputLabel}>E-Mail-Adresse</Text>
                            <TextInput placeholderTextColor={COLORS.placeholder} placeholder='Email eingeben' autoCapitalize='none' keyboardType='email-address' style={[styles.inputSmall, errors.email && { borderColor: COLORS.error }]} onChangeText={onChange} onBlur={onBlur} value={value} />
                            <EmailIcon width={24} height={24} style={styles.inputIcon} />
                            {errors.email && (
                                <Text style={styles.errorText}>{errors.email.message}</Text>
                            )}
                        </View>
                    )}
                />
                <View style={styles.buttonContainer}>
                    <TouchableOpacity style={[styles.button, !errors.email ? {} : styles.buttonDisabled]}
                        disabled={!!errors.email}
                        onPress={handleSubmit(onSubmit)}>
                        <ButtonIcon width={32} height={32} />
                        <Text style={styles.buttonText}>Senden</Text>
                    </TouchableOpacity>
                </View>
            </KeyboardAvoidingView>
        </View>
    )
}

export default PassScreen

const styles = StyleSheet.create({
    container: {
        paddingHorizontal: 16,
        paddingTop: Platform.OS == 'android' ? 39 : 0
    },
    crossContainer: {
        alignItems: 'flex-end',
        marginTop: 10,
    },
    cross: {
        width: 24,
        height: 24
    },
    textContainer: {
        marginTop: 10,
        gap: 4
    },
    headline: {
        color: COLORS.textPrimary,
        fontFamily: 'OpenSans-Bold',
        fontSize: 14,
        lineHeight: 19
    },
    text: {
        fontFamily: 'OpenSans-Regular',
        fontSize: 14,
        lineHeight: 19,
        color: '#000'
    },
    formContainer: {
        marginTop: 20
    },
    inputContainer: {
        gap: 6
    },
    inputSmall: {
        borderWidth: 1,
        borderColor: '#000',
        paddingHorizontal: 10,
        paddingLeft: 44,
        paddingVertical: 9,
        fontSize: 15,
        fontFamily: 'OpenSans-Regular',
        lineHeight: 20.43
    },
    inputLabel: {
        fontFamily: 'OpenSans-Regular',
        fontSize: 12,
        lineHeight: 16.34,
        color: '#000'
    },
    errorText: {
        color: COLORS.error,
        fontFamily: 'OpenSans-Regular',
        fontSize: 12,
        lineHeight: 16.34,
    },
    inputIcon: {
        position: 'absolute',
        top: 25,
        left: 10
    },
    buttonContainer: {
        marginTop: 30,
    },
    button: {
        backgroundColor: '#000',
        borderRadius: 62,
        height: 46,
        justifyContent: 'center',
        alignItems: 'center',
        flexDirection: 'row',
        gap: 10
    },
    buttonDisabled: {

    },
    buttonText: {
        color: '#fff',
        fontFamily: 'OpenSans-Regular',
        fontSize: 15,
        lineHeight: 20.43
    }
})