import { StyleSheet, Text, View, Image, ActivityIndicator, TouchableOpacity } from 'react-native';
import React, { useState } from 'react';
import { COLORS } from '@/utils/colors';
import { RedeemDealProps, redeemVoucher } from '@/utils/api';

import BuyerIcon from '@/assets/images/buyerIcon.svg';
import StateIcon from '@/assets/images/stateIcon.svg';
import ZahlungIcon from '@/assets/images/zahlungIcon.svg';
import Toast from 'react-native-toast-message';

const RedeemDeal = ({ deal, code, userId, closeModal }: { deal: RedeemDealProps, code: string, userId: number,closeModal:any }) => {
    const [loading, setLoading] = useState(false);

    const showSuccessToast = (message: string) => {
        Toast.show({
            type: 'successCustomToast',
            text1: message,
        });
    }

    const showErrorToast = (message: string) => {
        Toast.show({
            type: 'errorCustomToast',
            text1: message,
        });
    }

    const redeemDeal = async () => {
        setLoading(true);
        try {
            const response = await redeemVoucher(code, userId);
            if (response.data.success == 1) {
                showSuccessToast(response.data.message);
            } else {
                showErrorToast(response.data.message);
            }
        } catch (error) {
            console.error('Error redeem coupon:', error);
        } finally {
            closeModal();
            setLoading(false);
        }
    }

    return (
        <View style={styles.container}>
            <View style={styles.containerImage}>
                <Image style={styles.img} source={{ uri: `${deal?.image}` }} width={63} height={44.76} />
                <View style={styles.textContainer}>
                    <Text style={styles.text}>{deal.product_name}</Text>
                    <Text style={styles.text}>
                        {deal.valid_dates_range}
                    </Text>
                    <Text style={styles.text}>
                        Limit: {deal.limit.replace(/<\/?[^>]+(>|$)/g, "")}
                    </Text>
                </View>
            </View>
            <View style={styles.infosContainer}>
                <View style={styles.infoContainer}>
                    <BuyerIcon width={20} height={20} />
                    <Text>Buyer:: {deal.buyer}</Text>
                </View>
                <View style={styles.infoContainer}>
                    <StateIcon width={20} height={20} />
                    <Text>State: Activ</Text>
                </View>
                <View style={styles.infoContainer}>
                    <ZahlungIcon width={20} height={20} />
                    <Text>Zahlung: {deal.purchase_date} (Ausstehend)</Text>
                </View>
            </View>
            <View style={styles.buttonContainer}>
                <TouchableOpacity
                    style={styles.button}
                    onPress={redeemDeal}>
                    <Text style={styles.buttonText}>Redeem</Text>
                    {loading && <ActivityIndicator size={20} color="#fff" />}
                </TouchableOpacity>
            </View>
        </View>
    )
}

export default RedeemDeal

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
    },
    containerImage: {
        flexDirection: 'row',
        gap: 10,
    },
    textContainer: {
        gap: 5,
        flex: 1
    },
    text: {
        fontFamily: 'OpenSans-Regular',
        fontSize: 12,
        color: COLORS.dealText
    },
    img: {
        width: 112,
        height: 74,
        borderRadius: 20,
    },
    infosContainer: {
        width: '100%',
        marginTop: 10,
        alignSelf: 'stretch'
    },
    infoContainer: {
        flexDirection: 'row',
        height: 32,
        alignItems: 'center',
        paddingHorizontal: 6,
        gap: 11,
    },
    buttonContainer: {
        marginTop: 20,
        alignSelf: 'stretch'
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
    buttonText: {
        color: '#fff',
        fontFamily: 'OpenSans-Regular',
        fontSize: 15,
        lineHeight: 20.43
    }
});