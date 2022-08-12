import { View, Text, FlatList, ActivityIndicator, Platform } from 'react-native'
import React from 'react'
import { StyleSheet } from 'react-native';
import PokemonCard from './PokemonCard';

export default function PokemonList({pokemons, loadPokemon, isNext}) {

  const loadMore = () => {
    loadPokemon()
  }

  return (
    <FlatList
        data={pokemons}
        numColumns={2}
        showsVerticalScrollIndicator={false}
        keyExtractor={(pokemon)=>String(pokemon.id)}
        renderItem={({item})=><PokemonCard pokemon={item} />}
        contentContainerStyle={styles.flatListContentContainer}
        onEndReached={isNext && loadMore}
        onEndReachedThreshold={0.1}
        ListFooterComponent={
          isNext && (
            <ActivityIndicator
              size='large'
              style={styles.spinner}
              color={'#AEAEAE'}
            />
          )
        }
    />
  )
}

const styles = StyleSheet.create({
    flatListContentContainer: {
        paddingHorizontal: 5,
        marginTop: Platform.OS === 'android' ? 30 : 0,
    },
    spinner : {
      marginTop: 20,
      marginBottom: Platform.OS === 'android' ? 90 : 60,
    }
})