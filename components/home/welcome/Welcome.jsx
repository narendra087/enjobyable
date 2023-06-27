import { useState } from 'react'
import { useRouter } from 'expo-router'
import { View, Text, Image, TextInput, TouchableOpacity, FlatList } from 'react-native'

import styles from './welcome.style'

import { icons, SIZES } from '../../../constants'

const jobTypes = [
  'Full-Time', 'Part-Time', 'Freelance', 'Internship', 'Contract', 'Volunteer'
]

const Welcome = ({ keyword, setKeyword, handlePress }) => {
  const router = useRouter()
  
  const [activeJobType, setactiveJobType] = useState('Full-Time')
  
  return (
    <View>
      <View style={styles.container}>
        <Text style={styles.userName}>Hello there...</Text>
        <Text style={styles.welcomeMessage}>Find your enjoyable JOB!</Text>
      </View>
      
      <View style={styles.searchContainer}>
        <View style={styles.searchWrapper}>
          <TextInput
            style={styles.searchInput}
            value={keyword}
            onChangeText={(text) => setKeyword(text)}
            placeholder='Search your jobyable'
          />
        </View>
          
        <TouchableOpacity style={styles.searchBtn} onPress={handlePress}>
          <Image
            source={icons.search}
            resizeMode='contain'
            style={styles.searchBtnImage}
          />
        </TouchableOpacity>
      </View>
        
      <View style={styles.tabsContainer}>
        <FlatList
          data={jobTypes}
          keyExtractor={item => item}
          contentContainerStyle={{columnGap: SIZES.small}}
          horizontal
          renderItem={({item}) => (
            <TouchableOpacity
              style={styles.tab(activeJobType, item)}
              onPress={() => {
                setactiveJobType(item)
                router.push(`/search/${item}`)
              }}
            >
              <Text style={styles.tabText(activeJobType, item)}>{item}</Text>
            </TouchableOpacity>
          )}
        />
      </View>
    </View>
  )
}

export default Welcome