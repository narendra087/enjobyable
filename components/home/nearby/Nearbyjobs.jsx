import { View, Text, TouchableOpacity, ActivityIndicator } from 'react-native'
import { useRouter } from 'expo-router'

import useFetch from '../../../hooks/useFetch'

import { jobList } from '../../../constants/dummy'

import styles from './nearbyjobs.style'
import { COLORS, SIZES } from '../../../constants'

import NearbyJobCard from '../../common/cards/nearby/NearbyJobCard'

const NearbyJobs = () => {
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
  
  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Nearby Jobs</Text>
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
          data?.map((job) => (
            <NearbyJobCard
              key={job?.job_id}
              jobData={job}
              handleNavigate={() => router.push(`/job-details/${job?.job_id}`)}
            />
          ))
        )}
      </View>
    </View>
  )
}

export default NearbyJobs