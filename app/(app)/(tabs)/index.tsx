import { useAuth } from '@/context/AuthContext';
import { View, Text, StyleSheet, TouchableOpacity, FlatList } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import InfoIcon from '@/assets/images/info.svg';
import Deal from '@/components/Deal';
import { getVouchers, Merchant } from '@/utils/api';
import { COLORS } from '@/utils/colors';
import { StatusBar } from "expo-status-bar";

import TotalsIcon from '@/assets/images/totalsBlock.svg';
import { useState } from 'react';
import HelpModal from '@/components/HelpModal';
import { useQuery } from '@tanstack/react-query';

export default function HomeScreen() {
  const { merchantInfo } = useAuth();

  const [isHelpDetailModal, setIsOpenHelpModal] = useState(false);
  const handleOpenHelpModal = () => {
    setIsOpenHelpModal(true)
  }

  const { data: vouchers, isLoading } = useQuery({
    queryKey: ['detail', (merchantInfo as Merchant).merchant_id],
    queryFn: () => getVouchers(Number((merchantInfo as Merchant).merchant_id)),
  });

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar translucent backgroundColor="transparent" style="dark" />
      <View>
        <FlatList
          data={vouchers?.data.deals}
          renderItem={({ item }) => <Deal key={item.id} id={item.id} name={item.name} redeemed={item.redeemed} total={item.total_count} expired={item.expired} expired_amount={item.expired_amount} redeemed_amount={item.redeemed_amount} total_count_amount={item.total_count_amount}  />}
          keyExtractor={item => item.id.toString()}
          ListHeaderComponent={
            <View>
              {/* Header */}
              <View style={styles.header}>
                <Text style={styles.textBold}>Angebotsübericht</Text>
                <TouchableOpacity onPress={handleOpenHelpModal}>
                  <InfoIcon width={24} height={24} />
                </TouchableOpacity>
              </View>
              {/* Info Block */}
              <View style={styles.totalsBlock}>
                <View style={{ gap: 5 }}>
                  <Text style={styles.textSemiBold}>Gesamtübersicht deiner Gutscheine</Text>
                  <Text style={styles.textNormal}>
                    Die Gesamtübersicht zeigt dir alle Gutscheine und deren Summen auf einen Blick.
                  </Text>
                </View>
                <View style={styles.totalsValues}>
                  <View style={{ gap: 8 }}>
                    <View style={{ gap: 3 }}>
                      <Text style={styles.textNormal}>Gesamtverkauf (€):</Text>
                      <Text style={styles.textBold}>{(merchantInfo as Merchant)?.total_vouchers} (€{Number(160000).toFixed(2)})</Text>
                    </View>
                    <View style={{ gap: 3 }}>
                      {/* Redeem vouchers */}
                      <Text style={styles.textNormal}>Gesamt eingelöst (€):</Text>
                      <Text style={styles.textBold}>{(merchantInfo as Merchant)?.redeemed_vouchers} (€{Number((merchantInfo as Merchant)?.redeemed_vouchers_amount).toFixed(2)})</Text>
                    </View>
                    <View style={{ gap: 3 }}>
                      {/* Pendign vouchers */}
                      <Text style={styles.textNormal}>Gesamt abgelaufen (€):</Text>
                      <Text style={styles.textBold}>{(merchantInfo as Merchant)?.pending_vouchers} (€{Number((merchantInfo as Merchant)?.pending_vouchers_amount || 0).toFixed(2)})</Text>
                    </View>
                  </View>
                  <TotalsIcon width={83.5} height={66.9} />
                </View>
              </View>
            </View>
          }
          ListFooterComponent={<View style={{ height: 10 }} />}
        />
        <HelpModal isHelpDetailModal={isHelpDetailModal} setIsOpenHelpModal={setIsOpenHelpModal} />
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 16,
    paddingTop: 16
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 17
  },
  textBold: {
    fontFamily: 'OpenSans-Bold',
    fontSize: 15,
    color: '#000',
    lineHeight: 20.43
  },
  textSemiBold: {
    fontFamily: 'OpenSans-SemiBold',
    fontSize: 18,
    color: '#000',
    lineHeight: 24.51
  },
  textNormal: {
    fontFamily: 'OpenSans-Regular',
    fontSize: 12,
    color: '#000',
    lineHeight: 16.34
  },
  totalsBlock: {
    backgroundColor: COLORS.totalsBg,
    padding: 10,
    borderRadius: 8,
    gap: 10
  },
  totalsValues: {
    flexDirection: 'row',
    alignItems: 'flex-end',
    justifyContent: 'space-between'
  }
});
