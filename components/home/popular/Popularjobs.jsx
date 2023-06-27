import { useState } from 'react'
import { View, Text, TouchableOpacity, FlatList, ActivityIndicator } from 'react-native'
import { useRouter } from 'expo-router'

import useFetch from '../../../hooks/useFetch'

import { jobList } from '../../../constants/dummy'

import styles from './popularjobs.style'
import { COLORS, SIZES } from '../../../constants'

import PopularJobCard from '../../../components/common/cards/popular/PopularJobCard'

const Popularjobs = () => {
  const router = useRouter()
  
  // *** Using Dummy Data ***
  const data = jobList
  const isLoading = false
  const error = false
  
  // *** Using Fetch Rapid API ***
  // const { data, isLoading, error } = useFetch("search", {
  //   query: "React developer",
  //   num_pages: "1",
  // });
  
  const [selectedJob, setSelectedJob] = useState();
  
  const handlePress = (item) => {
    // router.push(`/job-details/${item.job_id}`);
    setSelectedJob(item.job_id);
  };
  
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
          <Text>Something wrong</Text>
        ) : (
          <FlatList
            data={data}
            keyExtractor={item => item.job_id}
            contentContainerStyle={{columnGap: SIZES.medium}}
            horizontal
            renderItem={({item}) => (
              <PopularJobCard
                item={item}
                selectedJob={selectedJob}
                handlePress={handlePress}
              />
            )}
          />
        )}
      </View>
    </View>
  )
}

export default Popularjobs