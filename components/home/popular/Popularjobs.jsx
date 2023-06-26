import { useState } from 'react'
import { View, Text, TouchableOpacity, FlatList, ActivityIndicator } from 'react-native'
import { useRouter } from 'expo-router'

import styles from './popularjobs.style'
import { COLORS, SIZES } from '../../../constants'

import PopularJobCard from '../../../components/common/cards/popular/PopularJobCard'

const Popularjobs = () => {
  const router = useRouter()
  const isLoading = false
  const error = false
  
  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Popular Jobs</Text>
        <TouchableOpacity>
          <Text style={styles.headerBtn}>Show all</Text>
        </TouchableOpacity>
      </View>
      
      <View style={styles.cardsContainer}>
        {isLoading ? (
          <ActivityIndicator size='large' color={COLORS.primary} />
        ) : error ? (
          <Text>Something missing</Text>
        ) : (
          <FlatList
            data={[1,2,3,4,5]}
            keyExtractor={item => item?.id}
            contentContainerStyle={{columnGap: SIZES.medium}}
            renderItem={(item) => (
              <PopularJobCard item={item} />
            )}
            horizontal
          />
        )}
      </View>
    </View>
  )
}

export default Popularjobs