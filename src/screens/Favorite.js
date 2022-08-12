import { Button, SafeAreaView, Text } from 'react-native'
import React, { useCallback } from 'react'
import { useState } from 'react';
import { getPokemonsFavoriteApi } from '../api/favorite';
import useAuth from '../hooks/useAuth'
import { getPokemonDetailsApi, getPokemonDetailsByUrlApi } from '../api/pokemon';
import PokemonList from '../components/PokemonList';
import { useFocusEffect } from '@react-navigation/native';
import NoLogged from '../components/NoLogged';

export default function Favorite() {

  const [favorites, setFavorites] = useState([])
  const {auth} = useAuth()

  useFocusEffect(
    useCallback(()=>{
      if (auth) {
        (
          async ( ) => {
            const response = await getPokemonsFavoriteApi()
            console.log(response);
            let pokemonArray = []
            for await (const id of response){
              const pokemonDetails = await getPokemonDetailsApi(id)
              
              pokemonArray.push({
                id: pokemonDetails.id,
                name: pokemonDetails.name,
                type: pokemonDetails.types[0].type.name,
                order: pokemonDetails.order,
                image: pokemonDetails.sprites.other['official-artwork'].front_default
              })
            } 
            setFavorites(pokemonArray)
          }
        )()
      }
    }, [auth])
  )

  

  return !auth ? 
    <NoLogged/>
    :
    <PokemonList pokemons={favorites} />
}