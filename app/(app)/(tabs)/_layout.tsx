import { Link, Tabs, useRouter } from 'expo-router'
import React, { useState } from 'react';
import { Text, TouchableOpacity, StyleSheet, View, Platform, Button, Modal, TextInput, StatusBar } from 'react-native'

import HomeIcon from '@/assets/images/homeIcon.svg';
import ProfilIcon from '@/assets/images/profilIcon.svg';
import RedeemIcon from '@/assets/images/redeemIcon.svg';
import { COLORS } from '@/utils/colors';
import { ActionSheetProvider, useActionSheet } from "@expo/react-native-action-sheet"
import Redeem from '@/components/Redeem';

const Layout = () => {
  return (
    <ActionSheetProvider>
      <Tabs screenOptions={{
        tabBarLabelStyle: {
          fontFamily: 'OpenSans-Regular',
          fontSize: 12,
          fontWeight: 'normal',
          color: '#000',
          lineHeight: 16.34
        },

        tabBarStyle: {
          backgroundColor: '#fff',
          borderTopWidth: 0,
          height: 86,
          boxShadow: '0px 10px 30px 0px rgba(0, 0, 0, 0.17)'
        },
        sceneStyle: { backgroundColor: '#fff' }
      }}>
        <Tabs.Screen
          name="index"
          options={{
            title: 'Partner Portal',
            headerShown: false,
            tabBarLabel: ({ focused }) => (
              <Text style={{ fontFamily: focused ? 'OpenSans-Bold' : 'OpenSans-Regular', fontSize: 12, lineHeight: 16.34 }}>
                Partner portal
              </Text>
            ),
            tabBarIcon: () => (
              <HomeIcon width={24} height={24} />
            )
          }}
        />
        <Tabs.Screen
          name="redeem"
          options={{
            title: 'Einlösen',
            headerShown: false,
            tabBarButton: (props) => <TabActionButton {...props} />,
          }}
        />
        <Tabs.Screen
          name="profil"
          options={{
            title: 'Profil',
            sceneStyle: {
              backgroundColor: COLORS.background,
            },
            headerShown: false,
            tabBarLabel: ({ focused }) => (
              <Text style={{ fontFamily: focused ? 'OpenSans-Bold' : 'OpenSans-Regular', fontSize: 12, lineHeight: 16.34 }}>
                Profil
              </Text>
            ),
            tabBarIcon: () => (
              <ProfilIcon width={24} height={24} />
            ),
          }}
        />
      </Tabs>
    </ActionSheetProvider>
  )
}

function TabActionButton() {
  const { showActionSheetWithOptions } = useActionSheet();
  const [modalVisible, setModalVisible] = useState(false);
  const [typeRedeem, setTypeRedeem] = useState('');

  const handleOpenSheet = () => {
    const options = ["QR Code scannen", "Gutschein manuell hinzufügen", "Abbrechen"];
    const cancelButtonIndex = 2;

    showActionSheetWithOptions(
      {
        options,
        cancelButtonIndex,
      },
      (selectedIndex) => {
        if (selectedIndex === 0) {
          setModalVisible(true)
          setTypeRedeem('scan');
        } else if (selectedIndex === 1) {
          setTypeRedeem('manual');
          setModalVisible(true)
        }
      }
    );
  };

  return (
    <View style={{
      flex:1,
      justifyContent: 'center',
      alignItems: 'center',
    }}>
      <StatusBar barStyle="dark-content" />
      <TouchableOpacity onPress={handleOpenSheet} style={{
        top: Platform.OS == 'ios' ? -9 : -28,
        gap: 4,
        alignItems: 'center',
      }}>
        <RedeemIcon width={46} height={46} />
        <Text style={{ fontFamily: 'OpenSans-Regular', fontSize: 12, lineHeight: 16.34 }}>
          Einlösen
        </Text>
      </TouchableOpacity>

      <Redeem modalVisible={modalVisible} setModalVisible={setModalVisible} typeRedeem={typeRedeem} />
    </View>
  );
}

export default Layout