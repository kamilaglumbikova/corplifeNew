import { Modal, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native'
import React, { useEffect, useState } from 'react'
import { useLocalSearchParams, useRouter } from "expo-router";

const RedeemScreen = () => {
  const { type } = useLocalSearchParams();
  const [modalVisible, setModalVisible] = useState(true);
  const [code, setCode] = useState('');
  const router = useRouter();

  useEffect(() => {
    setModalVisible(true)
  }, [])

  return (
    <Modal
      animationType="slide"
      transparent={false}
      visible={modalVisible}
      presentationStyle="pageSheet"
      onRequestClose={() => { setModalVisible(false); router.back(); }}
    >
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', padding: 20 }}>
        <Text style={{ fontSize: 20, fontWeight: 'bold' }}>Redeem code manually</Text>
        <Text style={{ marginVertical: 10 }}>Enter your voucher code to redeem it.</Text>

        <TextInput
          style={styles.input}
          placeholder="0000 0000 0000 0000"
          keyboardType="number-pad"
          value={code}
          onChangeText={setCode}
        />

        <TouchableOpacity
          style={styles.button}
          onPress={() => setModalVisible(false)}
        >
          <Text style={styles.confText}>Confirm</Text>
        </TouchableOpacity>

        <TouchableOpacity onPress={() => setModalVisible(false)} style={{ marginTop: 20 }}>
          <Text style={{ color: 'red' }}>Close</Text>
        </TouchableOpacity>
      </View>
    </Modal>
  )
}

export default RedeemScreen

const styles = StyleSheet.create({
  input: {
    width: '100%',
    borderWidth: 1,
    padding: 10,
    borderRadius: 5,
    textAlign: 'center',
    fontSize: 18,
    marginVertical: 10,
  },
  button: {
    backgroundColor: 'black',
    padding: 15,
    borderRadius: 30,
    width: '100%',
    alignItems: 'center',
    marginTop: 10,
  },
  confText: {
    color: 'white',
    fontSize: 18
  }
})