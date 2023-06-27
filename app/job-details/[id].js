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

const tabs = [
  'About', 'Qualification', 'Responsibilities'
]

const JobDetails = () => {
  const params = useSearchParams()
  const router = useRouter()
  
  const isLoading = false
  const error = false
  
  const [data, setData] = useState()
  const [refreshing, setRefreshing] = useState(false)
  const [activeTab, setActiveTab] = useState(tabs[0])
  
  useEffect(() => {
    const jobIndex = jobList.findIndex((job) => job?.job_id === params?.id)
    if (jobIndex !== -1) {
      setData(jobList[jobIndex])
    }
  }, [params])
  
  // const { data, isLoading, error, refetch } = useFetch('job-details', {
  //   job_id: params.id
  // })
  
  
  const onRefresh = () => {
    console.log('on refresh')
  }
  
  const renderJobContent = () => {
    switch (activeTab) {
      case 'About':
        return <JobAbout
          info={data?.job_description ?? 'No Data Provided'}
        />

      case 'Qualification':
        return <Specifics
          title='Qualifications'
          points={data?.job_highlights?.Qualifications ?? ['N/A']}
        />

      case 'Responsibilities':
        return <Specifics
          title='Responsibilities'
          points={data?.job_highlights?.Responsibilities ?? ['N/A']}
        />

      default:
        break;
    }
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
              
              <JobTabs
                tabs={tabs}
                activeTab={activeTab}
                setActiveTab={setActiveTab}
              />
              
              {renderJobContent()}
            </View>
          )}
        </ScrollView>
        
        <JobFooter url={data?.job_apply_link ?? 'https://careers.google.com/jobs/results'} />
      </>
    </SafeAreaView>
  )
}

export default JobDetails