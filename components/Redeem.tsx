import { ActivityIndicator, KeyboardAvoidingView, Modal, Platform, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native'
import React, { useEffect, useState } from 'react'

import CrossIcon from '@/assets/images/cross.svg';
import RedeemIcon from '@/assets/images/redeem.svg';
import { COLORS } from '@/utils/colors';

import { getDetail, getValidVoucher, User } from '@/utils/api';
import { useAuth } from '@/context/AuthContext';
import RedeemDeal from './RedeemDeal';
import ScanCode from './ScanCode';

const debounce = (func: any, delay: number) => {
    let timeoutId: any;
    return (...args: any[]) => {
        clearTimeout(timeoutId);
        timeoutId = setTimeout(() => {
            func.apply(this, args);
        }, delay);
    };
};

const Redeem = ({ modalVisible, setModalVisible, typeRedeem }: { modalVisible: boolean, setModalVisible: any, typeRedeem: string }) => {
    const { userInfo } = useAuth();
    const [code, setCode] = useState('');
    const [loading, setLoading] = useState(false);
    const [validCode, setValidCode] = useState('');
    const [showRemoveIcon, setShowRemoveIcon] = useState(false);
    const [dealId, setDealId] = useState(0);
    const [deal, setDeal] = useState<any>();
    

    const closeModal = () => {
        setModalVisible(false);
        resetCode();
    }

    const resetCode = () => {
        setCode('');
        setValidCode('');
        setDealId(0);
        setDeal(undefined);
    }

    const handleInput = (text: string) => {
        if (text !== '') {
            setShowRemoveIcon(true);
        } else {
            setShowRemoveIcon(false);
        }
        let cleaned = text.replace(/\D/g, "");
        cleaned = cleaned.slice(0, 16);
        let formatted = cleaned.replace(/(\d{4})/g, "$1 ").trim();
        setCode(formatted);
    }

    const fetchValidCode = async () => {
        try {
            const response = await getValidVoucher(code, (userInfo as User)?.id);
            setValidCode(response.data.message);
            if (response.data.deal_id) {
                setDealId(response.data.deal_id);
            } else {
                setDealId(0);
            }
        } catch (error) {
            console.error('Error fetching data:', error);
        }
    };

    const debouncedSearch = debounce(fetchValidCode, 500);

    const onSubmit = async (data: any) => {
        setLoading(true);
        try {
            const response = await getValidVoucher(code, (userInfo as User)?.id);
            setValidCode(response.data.message);
            if (response.data.deal_id) {
                setDeal(response.data);
            } else {
                setDeal(undefined);
            }
        } catch (error) {
            console.error('Error fetching data:', error);
        } finally {
            setLoading(false);
        }
    }

    useEffect(() => {
        if (code.length === 19) {
            debouncedSearch();
        }
    }, [code])


    return (
        <>
            {deal ? <Modal
                animationType="slide"
                transparent={false}
                visible={modalVisible}
                presentationStyle="pageSheet"
                onRequestClose={closeModal}>
                <View style={styles.modalContainer}>
                    <View style={styles.closeContainer}>
                        <TouchableOpacity onPress={closeModal} style={{ width: 24, height: 24 }}>
                            <CrossIcon width={24} height={24} />
                        </TouchableOpacity>
                    </View>
                    <RedeemDeal deal={deal} code={code} userId={(userInfo as User)?.id} closeModal={closeModal} />
                </View>
            </Modal> :
                <>

                    <Modal
                        animationType="slide"
                        transparent={false}
                        visible={modalVisible}
                        presentationStyle="pageSheet"
                        onRequestClose={closeModal}
                    >
                        {typeRedeem === 'scan' ? <ScanCode closeModal={closeModal} setDeal={setDeal} setDealId={setDealId} setValidCode={setValidCode} setCode={setCode} /> :
                            <View style={styles.modalContainer}>
                                <View style={styles.closeContainer}>
                                    <TouchableOpacity onPress={closeModal} style={{ width: 24, height: 24 }}>
                                        <CrossIcon width={24} height={24} />
                                    </TouchableOpacity>
                                </View>
                                <View style={styles.titleContainer}>
                                    <Text style={styles.headline}>Redeem code manually</Text>
                                    <Text style={styles.subtitle}>Enter your voucher code to redeem it.</Text>
                                </View>

                                <KeyboardAvoidingView behavior={Platform.OS === 'ios' ? 'padding' : 'height'} style={styles.formContainer}>
                                    <View style={styles.inputContainer}>
                                        <TextInput
                                            style={[styles.input, (validCode !== 'VALID' && code.length > 0) && { borderColor: COLORS.error }]}
                                            value={code}
                                            onChangeText={handleInput}
                                            keyboardType="numeric"
                                            maxLength={19}
                                            placeholder="0000 0000 0000 0000"
                                            placeholderTextColor={COLORS.placeholder} />
                                        <RedeemIcon width={24} height={24} style={styles.inputIcon} />
                                        {showRemoveIcon && <CrossIcon width={24} height={24} style={styles.removeCode} onPress={resetCode} />}
                                        {(validCode !== 'VALID' && code.length > 0) && <Text style={styles.errorText}>Gültigen Code eingeben</Text>}
                                    </View>
                                    <View style={styles.buttonContainer}>
                                        <TouchableOpacity
                                            style={[styles.button, code.length !== 19 ? styles.buttonDisabled : {}]}
                                            onPress={onSubmit}>
                                            <Text style={styles.buttonText}>Confirm</Text>
                                            {loading && <ActivityIndicator size={20} color="#fff" />}
                                        </TouchableOpacity>
                                    </View>
                                </KeyboardAvoidingView>
                            </View>
                        }
                    </Modal>
                </>
            }
        </>
    )
}

export default Redeem

const styles = StyleSheet.create({
    modalContainer: {
        flex: 1,
        alignItems: 'center',
        paddingHorizontal: 16
    },
    closeContainer: {
        width: '100%',
        flexDirection: 'row',
        justifyContent: 'flex-end',
        paddingVertical: 10
    },
    titleContainer: {
        width: '100%',
        gap: 4
    },
    headline: {
        color: COLORS.redeemTitle,
        fontFamily: 'OpenSans-Bold',
        fontSize: 14
    },
    subtitle: {
        color: '#000',
        fontFamily: 'OpenSans-Regular',
        fontSize: 14
    },
    formContainer: {
        width: '100%',
    },
    inputContainer: {
        gap: 6
    },
    input: {
        paddingVertical: 9,
        paddingHorizontal: 10,
        paddingLeft: 44,
        borderWidth: 1,
        borderColor: '#000',
        width: '100%',
        height: 42,
        marginTop: 20,
        color: '#000',
        fontFamily: 'OpenSans-Regular',
        fontSize: 15,
    },
    errorText: {
        color: COLORS.error,
        fontFamily: 'OpenSans-Regular',
        fontSize: 12,
        lineHeight: 16.34,
    },
    inputIcon: {
        position: 'absolute',
        top: 29,
        left: 10
    },
    removeCode: {
        position: 'absolute',
        right: 9,
        top: 29
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