import { useState } from 'react'
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  Image,
  FlatList,

} from 'react-native'
import { useRouter } from 'expo-router'
import styles from './welcome.style'

import { icons, SIZES } from '../../../constants'

const robotTypes=['TurtleBot','IHA','SIHA']
const Welcome = () => {
  const router = useRouter();
  const [activeJobType,setActiveJobType]=useState('TurtleBot')
  return (
    <View>
      <View style={styles.container}>
        <Text style={styles.userName}>Hello Selcuk</Text>
        <Text style={styles.welcomeMessage}>Be careful while you controlling the robot!</Text>

      </View>
      <View style={styles.searchContainer}>
        <View style={styles.searchWrapper}>
        <TextInput
          style={styles.searchInput}
          value=''
          onChange={()=>{}}
          placeholder='Please write your tcp IP of your broker'
        />

        </View>
        <TouchableOpacity style={styles.searchBtn} onPress={()=>{}}>
        <Image
          source={icons.search}
          resizeMode='contain'
          style={styles.searchBtnImage}

        />
      </TouchableOpacity>
      </View>
      {/* <View>
      <FlatList
        data={robotTypes}
        renderItem={(({item})=>(
          <TouchableOpacity style={styles.tab(activeJobType,item)}>
            <Text>{item}</Text>
          </TouchableOpacity>
        ))}
      />

      </View> */}
     
    </View>
  )
}

export default Welcome