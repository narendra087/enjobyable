import { useState } from 'react'
import { Text, View, ScrollView, SafeAreaView } from 'react-native'
import { Stack, useRouter } from 'expo-router'

import { COLORS, SIZES, icons, images } from '../constants'

import { Nearbyjobs, Popularjobs, ScreenHeaderBtn, Welcome } from '../components'

const Home = () => {
  const router = useRouter()
  
  const [keyword, setKeyword] = useState('')
  
  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: COLORS.lightWhite }}>
      <Stack.Screen
        options={{
          headerStyle: { backgroundColor: COLORS.lightWhite },
          headerShadowVisible: false,
          headerLeft: () => (
            <ScreenHeaderBtn icon={icons.menu} dimension="60%" />
          ),
          headerRight: () => (
            <ScreenHeaderBtn icon={icons.user} dimension="100%" />
          ),
          headerTitle: ""
        }}
      />
      
      <ScrollView showsVerticalScrollIndicator={false}>
        <View style={{flex:1, padding: SIZES.medium}}>
          <Welcome
            keyword={keyword}
            setKeyword={setKeyword}
            handlePress={() => {
              if (keyword) {
                router.push(`/search/${keyword}`)
              }
            }}
          />
          
          <Popularjobs />
          
          <Nearbyjobs />
        </View>
      </ScrollView>
      
    </SafeAreaView>
  )
}

export default Home