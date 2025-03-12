import AwesomeAlert from 'react-native-awesome-alerts';
import React from 'react'
import { COLORS } from '@/utils/colors';

interface CustomAlertProps {
    showAlert: boolean;
    title: string;
    message: string;
    cancelText: string;
    confirmText: string;
    hideAlert: () => void;
    onSubmit: () => void;
}

const CustomAlert = ({ showAlert, title, message, cancelText, confirmText, hideAlert, onSubmit }: CustomAlertProps) => {
    return (
        <AwesomeAlert
            show={showAlert}
            showProgress={false}
            title={title}
            message={message}
            closeOnTouchOutside={false}
            closeOnHardwareBackPress={false}
            showCancelButton={true}
            showConfirmButton={true}
            cancelText={cancelText}
            confirmText={confirmText}
            contentContainerStyle={{
                backgroundColor: 'rgba(19, 15, 48, 1)',
                borderRadius: 14,
                padding: 0,
            }}
            contentStyle={{
                paddingHorizontal: 16,
                height: 130,
            }}
            titleStyle={{
                color: '#fff',
                fontFamily: 'OpenSans-SemiBold',
                fontSize: 15,
                lineHeight: 20.43,
            }}
            messageStyle={{
                color: '#fff',
                fontFamily: 'OpenSans-Regular',
                fontSize: 14,
                lineHeight: 19.07,
            }}
            actionContainerStyle={{
                borderTopWidth: .2,
                borderTopColor: 'rgba(255, 255, 255, 0.2)',
                height: 44,
            }}
            cancelButtonStyle={{
                height: 42,
                borderRightWidth: .5,
                borderRightColor: 'rgba(255, 255, 255, 0.2)',
                borderRadius: 0,
                borderBottomLeftRadius: 14,
                flex: 1,
                justifyContent: 'center',
                alignItems: 'center',
                margin: 0
            }}
            confirmButtonStyle={{
                height: 42,
                borderRadius: 0,
                flex: 1,
                justifyContent: 'center',
                alignItems: 'center',
                margin: 0,
                borderBottomRightRadius: 14,
            }}
            cancelButtonColor='rgba(19, 15, 48, 1)'
            cancelButtonTextStyle={{
                color: COLORS.blueLink,
                fontFamily: 'OpenSans-SemiBold',
                fontSize: 15,
                lineHeight: 20.43,
            }}
            confirmButtonColor="rgba(19, 15, 48, 1)"
            confirmButtonTextStyle={{
                color: COLORS.blueLink,
                fontFamily: 'OpenSans-Bold',
                fontSize: 15,
                lineHeight: 20.43,
            }}
            onCancelPressed={() => {
                hideAlert();
            }}
            onConfirmPressed={() => {
                hideAlert(); onSubmit();
            }}
        />
    )
}

export default CustomAlert
