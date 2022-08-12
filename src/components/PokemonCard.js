import { View, Text, StyleSheet, Image, TouchableWithoutFeedback } from 'react-native'
import React from 'react'
import getColorByPokemonType from './../utils/getColorByPokermonType';
import { capitalize } from 'lodash';
import { useNavigation } from '@react-navigation/native';

export default function PokemonCard({pokemon}) {

    const navigation = useNavigation()

    const pokemonColor = getColorByPokemonType(pokemon.type)

    const bgStyles = {backgroundColor: pokemonColor, ...styles.bgStyles }

    const goToPokemon = () => {
        console.log(pokemon.name);
        navigation.navigate('Pokemon', { id: pokemon.id })
    }

  return (
    <TouchableWithoutFeedback onPress={goToPokemon}>
      <View style={styles.card}>
          <View style={styles.spacing}>
              <View style={bgStyles}>
                <Text style={styles.order}>#{`${pokemon.order}`.padStart(3, 0)}</Text>
                <Text style={styles.name}>{capitalize(pokemon.name)}</Text>
                <Image
                    source={{uri: pokemon.image}}
                    style={styles.image}
                />
              </View>
          </View>
      </View>
    </TouchableWithoutFeedback>
  )
}

const styles = StyleSheet.create({
    card: {
        flex: 1,
        height: 130,
    },
    spacing: {
        flex: 1,
        padding: 5
    },
    bgStyles: {
        flex: 1,
        borderRadius: 15,
        padding: 10
    },
    name: {
        color: 'white',
        fontWeight: 'bold',
        fontSize: 15,
        paddingTop: 10,
    },
    order:{
        position: 'absolute',
        right: 10,
        top: 10,
        color: '#fff',
        fontSize: 11
    },
    image: {
        position: 'absolute',
        bottom: 2,
        right: 2,
        width: 90,
        height: 90
    },
})