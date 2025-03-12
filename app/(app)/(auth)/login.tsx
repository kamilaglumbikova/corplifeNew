import { View, Text, StyleSheet, Alert, KeyboardAvoidingView, Platform, TextInput, TouchableOpacity, Dimensions, ImageBackground } from 'react-native';
import { Link, useRouter } from 'expo-router';
import { schemaLogin } from '@/schema/schema';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { Controller, useForm } from 'react-hook-form';
import React, { useEffect, useState } from 'react';
import { COLORS } from '@/utils/colors';
import { useAuth } from '@/context/AuthContext';
import { StatusBar } from "expo-status-bar";
import { SafeAreaView } from 'react-native-safe-area-context';

import EyeIcon from '@/assets/images/eye.svg';
import CrossEyeIcon from '@/assets/images/crosseye.svg';
import LogoIcon from '@/assets/images/logo.svg';

type FormData = z.infer<typeof schemaLogin>;

export default function LoginScreen() {
  const router = useRouter();
  const { onLogin, message } = useAuth();
  const [showMessage, setShowMessage] = useState('');
  const [isFocused, setIsFocused] = useState(false);
  const [showPass, setShowPass] = useState(false);
  const { height } = Dimensions.get("window");

  const { control, handleSubmit, trigger, formState: { errors } } = useForm<FormData>({
    resolver: zodResolver(schemaLogin),
    defaultValues: {
      email: '',
      password: ''
    },
    mode: 'onChange'
  });

  const onSubmit = async (data: any) => {
    const result = await onLogin!(data.email, data.password);

    if (result && result.error) {
      Alert.alert('Error', result.msg)
    }
    if (result.data.status === 200) {
      router.push('/(app)/(tabs)')
    }
  }

  useEffect(() => {
    if (message) {
      setShowMessage(message);
      setTimeout(() => {
        setShowMessage('');
      }, 2000)
    }
  }, [message])


  return (
    <SafeAreaView style={styles.container} edges={["bottom", "left", "right"]}>
      <StatusBar translucent backgroundColor="transparent" style="light" />
      <KeyboardAvoidingView behavior={Platform.OS === 'ios' ? 'padding' : 'height'} style={{ flex: 1, }}>
        <View style={styles.topContainer}>
          <ImageBackground source={require('../../../assets/images/login.png')} style={styles.img} />
          <LogoIcon width={140} height={34} />
          <View style={styles.topText}>
            <Text style={styles.whiteText}>Willkommen bei</Text>
            <Text style={[styles.whiteText, { fontFamily: 'OpenSans-Bold' }]}>corplife Partner Portal</Text>
          </View>
        </View>
        <View style={styles.textContainer}>
          <View style={styles.logo}>
            <Text style={styles.headline}>Login</Text>
          </View>
          <View style={{ height: height * 0.42 }}>
            <View style={styles.formContainer}>
              <Controller
                control={control}
                name="email"
                render={({ field: { onChange, onBlur, value } }) => (
                  <View style={styles.inputContainer}>
                    <TextInput placeholderTextColor={COLORS.placeholder} placeholder='Username' autoCapitalize='none' keyboardType='email-address' style={styles.input} onChangeText={onChange} onBlur={onBlur} value={value} />
                    {errors.email && (
                      <Text style={styles.errorText}>{errors.email.message}</Text>
                    )}
                  </View>
                )}
              />
              <Controller
                control={control}
                name="password"
                render={({ field: { onChange, value } }) => (
                  <View style={styles.inputContainer}>
                    <TextInput onFocus={() => setIsFocused(true)} onBlur={() => setIsFocused(false)} placeholderTextColor={COLORS.placeholder} secureTextEntry={!showPass} placeholder='Password' style={styles.input} onChangeText={onChange} value={value} />
                    {isFocused &&
                      <TouchableOpacity style={styles.eyeIcon} onPress={() => setShowPass(prev => !prev)}>
                        {showPass ? <CrossEyeIcon width={24} height={24} /> : <EyeIcon width={24} height={24} />}
                      </TouchableOpacity>
                    }
                    {errors.password && (
                      <Text style={styles.errorText}>{errors.password.message}</Text>
                    )}
                  </View>
                )}
              />
            </View>
            {showMessage != '' && <Text style={[styles.errorText, { marginTop: 15 }]}>{showMessage}</Text>}
            <View style={styles.textInfoContainer}>
              <Text style={[styles.text, { fontFamily: 'OpenSans-Bold' }]}>Hast du dein Passwort vergessen?</Text>
              <Text style={[styles.text, { display: 'none' }]}>Kontaktiere den corplife Support</Text>
              <Text style={[styles.text, { display: 'none' }]}>pm@corplife.at</Text>
              <Link href='/(app)/(auth)/pass'>
                <Text style={styles.link}>Passwort zurücksetzen</Text>
              </Link>
            </View>
          </View>

          <View style={styles.buttonContainer}>
            <TouchableOpacity style={[styles.button, !errors.email && !errors.password ? {} : styles.buttonDisabled]}
              disabled={!!errors.email || !!errors.password}
              onPress={handleSubmit(onSubmit)}>
              <Text style={styles.buttonText}>Einloggen</Text>
            </TouchableOpacity>
          </View>
        </View>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: "white",
    paddingTop: 0
  },
  container: {
    flex: 1,
  },
  containerSafe: {
    height: '100%',
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
  },
  logo: {
    alignItems: 'center'
  },
  textWrapper: {
    marginTop: 30,
    alignItems: 'center',
    gap: 30
  },
  text: {
    fontSize: 14,
    lineHeight: 19,
    color: COLORS.textPrimary,
    fontFamily: 'OpenSans-Regular',
  },
  buttonContainer: {
    flex: 1,
    justifyContent: 'flex-end',
    marginTop: 50
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
    lineHeight: 20,
    fontFamily: 'OpenSans-Regular'
  },
  formContainer: {
    gap: 15,
    marginTop: 30
  },
  inputContainer: {
    gap: 6
  },
  textInfoContainer: {
    marginTop: 15,
  },
  headline: {
    color: '#000',
    fontSize: 18,
    lineHeight: 24,
    fontWeight: 400
  },
  topContainer: {
    alignItems: 'center',
    gap: 40,
    paddingBottom: 0,
    flex: 1,
    paddingTop: 80,
    height: 371
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
  },
  errorText: {
    color: COLORS.error,
    fontFamily: 'OpenSans-Regular',
    fontSize: 12,
    lineHeight: 16.34
  },
  input: {
    height: 46,
    borderRadius: 100,
    borderWidth: 1,
    paddingHorizontal: 20,
    justifyContent: 'center'
  },
  buttonDisabled: {
    opacity: 0.5
  },
  eyeIcon: {
    position: 'absolute',
    top: 11,
    right: 13
  },
  link: {
    color: COLORS.link,
    fontFamily: 'OpenSans-Regular',
    fontSize: 15,
    lineHeight: 20.43
  }
})
