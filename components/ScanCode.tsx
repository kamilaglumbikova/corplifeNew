import { useAuth } from '@/context/AuthContext';
import { getDetail, getValidVoucher, User } from '@/utils/api';
import { CameraView, CameraType, useCameraPermissions } from 'expo-camera';
import React, { useEffect, useState } from 'react'
import { View, StyleSheet, FlatList, Text, Button, TouchableOpacity, Modal, Pressable } from 'react-native'
import { Ionicons } from '@expo/vector-icons';

const ScanCode = ({ setValidCode, setDealId, setDeal, closeModal, setCode }: any) => {
    const { userInfo } = useAuth();
    const [facing, setFacing] = useState<CameraType>('back');
    const [flash, setFlash] = useState<boolean>(false);
    const [permission, requestPermission] = useCameraPermissions();
    const [scannedCode, setScannedCode] = useState('');
    const [scannerEnable, setScannerEnable] = useState(true);
    const [modalVisible, setModalVisible] = useState(false)

    const scanCode = async (data: any) => {
        if (scannerEnable) {
            setScannedCode(data.data);
            try {
                setScannerEnable(false);
                const response = await getValidVoucher(data.data, (userInfo as User)?.id);
                setValidCode(response.data.message);
                setCode(data.data);
                if (response.data.deal_id) {
                    setDealId(response.data.deal_id);
                    setDeal(response.data);
                } else {
                    setModalVisible(true)
                    setDealId(0);
                    setTimeout(() => {
                        setModalVisible(false);
                        setScannerEnable(true);
                    }, 3000)
                }
            } catch (error) {
                console.error('Error fetching data:', error);
            }
        }
    }

    if (!permission) {
        return <View />;
    }

    if (!permission.granted) {
        return (
            <View style={styles.container}>
                <Text style={styles.message}>We need your permission to show the camera</Text>
                <Button onPress={requestPermission} title="grant permission" />
            </View>
        );
    }

    return (
        <View style={styles.container}>
            <CameraView enableTorch={flash} onBarcodeScanned={(data) => {
                scanCode(data)
            }} barcodeScannerSettings={{
                barcodeTypes: ["qr", "code128", "ean13", "aztec", "ean8", "pdf417", "upc_e", "datamatrix", "code39", "code93", "itf14", "codabar", "upc_a"],
            }} style={styles.camera} facing={facing}>
                <View style={styles.buttonContainer}>
                    <View style={styles.topControls}>
                        <TouchableOpacity onPress={closeModal}>
                            <Ionicons name="close" size={24} color="white" />
                        </TouchableOpacity>
                        <TouchableOpacity
                            onPress={() => setFlash(!flash)}
                        >
                            <Ionicons
                                name={!flash ? "flash-off" : "flash"}
                                size={24}
                                color="white"
                            />
                        </TouchableOpacity>
                    </View>
                </View>
                <Modal
                    animationType="slide"
                    transparent={true}
                    visible={modalVisible}
                    onRequestClose={() => {
                        setModalVisible(!modalVisible);
                    }}>
                    <View style={styles.centeredView}>
                        <View style={styles.modalView}>
                            <Text style={styles.modalText}>Gültigen Code eingeben</Text>
                        </View>
                    </View>
                </Modal>
            </CameraView>
        </View>
    )
}

const styles = StyleSheet.create({
    innerContainer: {
        flex: 1,
        backgroundColor: '#fff',
        paddingTop: 30,
    },
    message: {
        textAlign: 'center',
        paddingBottom: 10,
    },
    camera: {
        flex: 1,
        width: '100%',
    },
    buttonContainer: {
        flex: 1,
        flexDirection: 'row',
        backgroundColor: 'transparent',
        margin: 20,
    },
    container: {
        flex: 1,
        alignItems: 'center',
        backgroundColor: '#fff',
        position: 'absolute',
        top: 0,
        width: '100%',
        height: '100%'

    },
    errroMessage: {
        color: '#ff2c2c',
        marginBottom: 15
    },
    topControls: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        width: '100%',
        position: "absolute",
        top: 0,
        left: 0,
    },
    centeredView: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    modalView: {
        margin: 20,
        backgroundColor: 'white',
        borderRadius: 20,
        paddingVertical: 25,
        paddingHorizontal: 25,
        alignItems: 'center',
        justifyContent: 'center',
        shadowColor: '#000',
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 4,
        elevation: 5,
    },
    modalText: {
        textAlign: 'center',
        fontFamily: 'OpenSans-SemiBold',
    },
})

export default ScanCode