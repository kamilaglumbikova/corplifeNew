import { ActivityIndicator, FlatList, StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { getVouchers } from '@/utils/api';
import { useQuery } from '@tanstack/react-query';
import Deal from './Deal';

const Deals = ({id}: {id: number}) => {

  const { data: vouchers, isLoading } = useQuery({
    queryKey: ['detail', id],
    queryFn: () => getVouchers(Number(id)),
  });

  {isLoading && <ActivityIndicator />}

  return (
    <View style={styles.container}>
      <FlatList
        data={vouchers?.data.deals}
        renderItem={({item}) => <Deal key={item.id} id={item.id} name={item.name} redeemed={item.redeemed} total={item.total_count} />}
        keyExtractor={item => item.id.toString()}
        ListFooterComponent={<View style={{ height: 50 }} />}
      />


    </View>
  )
}

export default Deals

const styles = StyleSheet.create({
    container: {

    }
});