import { Dimensions, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React from 'react'
import Modal from 'react-native-modal';

import CloseModalIcon from '@/assets/images/closeModal.svg';
import { COLORS } from '@/utils/colors';

const SCREEN_HEIGHT = Dimensions.get('window').height;

interface HelpProps {
    setIsOpenHelpModal: any;
    isHelpDetailModal: boolean;
}


const HelpModal = ({ setIsOpenHelpModal, isHelpDetailModal }: HelpProps) => {
    const toggleModal = () => {
        setIsOpenHelpModal(!isHelpDetailModal);
    };

    return (
        <View style={styles.container}>
            <Modal
                isVisible={isHelpDetailModal}
                onBackdropPress={toggleModal}
                backdropColor='rgba(255, 255, 255, 0.8)'
                style={styles.bottomModal}
            >
                <View style={styles.modalContent}>
                    <View style={styles.modalTitle}>
                        <Text style={styles.headline}>Hilfe und Support</Text>
                        <TouchableOpacity onPress={() => setIsOpenHelpModal(false)}>
                            <CloseModalIcon width={32} height={32} />
                        </TouchableOpacity>
                    </View>
                    <View style={{marginTop: 16, minHeight: 304}}>
                        <Text style={styles.text}>
                        Bei Fragen oder Anliegen kannst du dich jederzeit 
                        an unser Support-Team unter support@corplife.at wenden.
                        </Text>
                    </View>
                </View>
            </Modal>
        </View>
    )
}

export default HelpModal

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        zIndex: 1
    },
    bottomModal: {
        justifyContent: 'flex-end',
        margin: 0,
    },
    modalContent: {
        backgroundColor: 'rgba(250, 250, 250, 0.93)',
        borderWidth: 0,
        paddingHorizontal: 16,
        borderTopLeftRadius: 13,
        borderTopRightRadius: 13,
        maxHeight: SCREEN_HEIGHT * 0.82,

    },
    modalTitle: {
        paddingVertical: 18,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        height: 86,
        borderBottomColor: 'rgba(173, 184, 204, 0.2)',
        borderBottomWidth: 1
    },
    headline: {
        fontFamily: 'OpenSans-Bold',
        fontSize: 15,
        lineHeight: 20.43,
        color: COLORS.modalText
    },
    text: {
        fontFamily: 'OpenSans-Regular',
        fontSize: 14,
        lineHeight: 19.07,
        color: '#000'
    }
});
