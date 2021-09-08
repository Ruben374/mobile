import React, { useState, useEffect } from 'react'
import Tmdb from '../Tmdb'
import {
  View,
  Text,
  ScrollView,
  StyleSheet,
  ImageBackground
} from 'react-native'
import Header from '../components/header'
import Hero from '../components/hero'
import Featured from '../components/featured'

export default ({ navigation }) => {
  const [movieList, setmovieList] = useState([])
  const [featuredData, setfeaturedData] = useState(null)

  useEffect(() => {
    const loadAll = async () => {
      let list = await Tmdb.getHomelist()
      setmovieList(list)
      ///////
      let originals = list.filter(i => i.slug === 'originals')
      let randomChosen = Math.floor(
        Math.random() * (originals[0].items.results.length - 1)
      )
      let chosen = originals[0].items.results[randomChosen]
      let chosenInfo = await Tmdb.getMovieInfo(chosen.id, 'tv')
      setfeaturedData(chosenInfo)
    }

    loadAll()
  }, [])

  return (
   
    <View style={styles.container}>
      <Header/>

      {featuredData && <Featured item={featuredData} />}

      {movieList.map((item, key) => (
        <Text style={styles.b}>{item.title}</Text>
      ))}
      
    </View>
   
  )
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#000000',
    flex: 1
  },
  hero: {
    height: 400,
    width: '100%',
    flex: 1
  },
  b: { color: 'red' }
})
