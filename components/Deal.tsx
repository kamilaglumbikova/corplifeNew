import { Dimensions, StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { useQuery } from '@tanstack/react-query';
import { getDetail } from '@/utils/api';
import { Image } from 'react-native';
import { COLORS } from '@/utils/colors';

interface DealProps {
  id: number;
  name: string;
  redeemed: number;
  total: number;
  expired: number;
  expired_amount: number;
  redeemed_amount: number;
  total_count_amount: number;
}

const Deal = ({ id, name, redeemed, total,expired,expired_amount,redeemed_amount,total_count_amount }: DealProps) => {

  const { data: deal, isLoading } = useQuery({
    queryKey: ['detail', id],
    queryFn: () => getDetail(Number(id)),
  });

  return (
    <View style={styles.container}>
      <Image style={styles.img} source={{ uri: `${process.env.EXPO_PUBLIC_URL}/${deal?.data?.data.thumbnail}` }} width={63} height={44.76} />
      <View style={styles.textContainer}>
        <Text style={styles.text}>{name}</Text>
        <Text style={styles.text}>
          Verkauft: {total} (€ {Number(total_count_amount).toFixed(2)})
        </Text>
        <Text style={styles.text}>
          Eingelöst: {redeemed} (€ {Number(redeemed_amount).toFixed(2)})
        </Text>
        <Text style={styles.text}>
          Abgelaufen: {expired} (€ {Number(expired_amount).toFixed(2)})
        </Text>
      </View>
    </View>
  )
}

export default Deal

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    gap: 12,
    paddingVertical: 13
  },
  img: {
    borderRadius: 15
  },
  textContainer: {
    gap: 4
  },
  text: {
    color: COLORS.dealText,
    fontFamily: 'OpenSans-Regular',
    fontSize: 12,
    lineHeight: 16.34,
    flexWrap: "wrap",
    width: Dimensions.get('screen').width-80
  }
});