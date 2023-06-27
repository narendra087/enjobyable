import React, { useCallback, useEffect, useState } from 'react'
import {
  Text,
  View,
  SafeAreaView,
  ScrollView,
  ActivityIndicator,
  RefreshControl,
} from 'react-native'
import { Stack, useRouter, useSearchParams } from 'expo-router'

import {
  Company,
  JobAbout,
  JobFooter,
  JobTabs,
  ScreenHeaderBtn,
  Specifics,
} from '../../components'
import { COLORS, SIZES, icons } from '../../constants'

import { jobList } from '../../constants/dummy'

import useFetch from '../../hooks/useFetch'

const JobDetails = () => {
  const params = useSearchParams()
  const router = useRouter()
  
  const isLoading = false
  const error = false
  
  const [data, setData] = useState()
  const [refreshing, setRefreshing] = useState(false)
  
  useEffect(() => {
    const jobIndex = jobList.findIndex((job) => job?.job_id === params?.id)
    if (jobIndex !== -1) {
      setData(jobList[jobIndex])
    } else {
      router.push('/')
    }
  }, [params])
  
  // const { data, isLoading, error, refetch } = useFetch('job-details', {
  //   job_id: params.id
  // })
  
  
  const onRefresh = () => {
    console.log('on refresh')
  }
  
  return (
    <SafeAreaView style={{ flex:1, backgroundColor: COLORS.lightWhite }} >
      <Stack.Screen
        options={{
          headerStyle: {backgroundColor: COLORS.lightWhite},
          headerShadowVisible: false,
          headerBackVisible: false,
          headerTitle: '',
          headerLeft: () => (
            <ScreenHeaderBtn icon={icons.left} dimension='60%' handlePress={() => router.back()} />
          ),
          headerRight: () => (
            <ScreenHeaderBtn icon={icons.share} dimension='60%' />
          )
        }}
      />
      
      <>
        <ScrollView
          showsVerticalScrollIndicator={false}
          refreshControl={<RefreshControl refreshing={refreshing} onRefresh={onRefresh} />}
        >
          {isLoading ? (
            <ActivityIndicator size='large' />
          ) : error ? (
            <Text>Something wrong</Text>
          ) : (
            <View style={{padding: SIZES.medium, paddingBottom: 100}}>
              <Company
                logo={data?.employer_logo}
                title={data?.job_title}
                name={data?.employer_name}
                location={data?.job_country}
              />
              
              <JobTabs />
              
              
            </View>
          )}
        </ScrollView>
      </>
    </SafeAreaView>
  )
}

export default JobDetails