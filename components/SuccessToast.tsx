import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { COLORS } from '@/utils/colors'

import SuccessIcon from '@/assets/images/success.svg';

const SuccessToast = ({text1}: {text1:string}) => {
  return (
    <View style={{width: '100%', flex: 1, height: 48, marginTop: 10}}>
      <View style={{ height: 60,marginHorizontal: 10, paddingHorizontal: 10, paddingVertical:8, backgroundColor: COLORS.success, borderRadius: 4, gap: 14, flexDirection: 'row', alignItems: 'center' }}>
        <SuccessIcon width={32} height={32} />
        <Text style={{
        fontSize: 12,
        color: '#fff',
        fontFamily: 'OpenSans-Bold',
      }}>{text1}</Text>
      </View>
    </View>
  )
}

export default SuccessToast

const styles = StyleSheet.create({})