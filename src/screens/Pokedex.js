import { SafeAreaView, Text } from 'react-native'
import React, {useState, useEffect} from 'react'
import { getPokemonApi, getPokemonDetailsByUrlApi } from '../api/pokemon'
import PokemonList from '../components/PokemonList'

export default function Pokedex() {

  const [pokemons, setPokemons] = useState([])
  const [ nextUrl, setNextUrl] = useState(null)

  useEffect(()=> {
    (
      async () => {
        await loadPokemon()
      } 
    )();
  }, [])

  const loadPokemon = async ( ) => {
    try {
      const response = await getPokemonApi(nextUrl)
      setNextUrl(response.next)
      let pokemonArray = []
      for await (const pokemonItem of response.results){
        const pokemonDetails = await getPokemonDetailsByUrlApi(pokemonItem.url)
        
        pokemonArray.push({
          id: pokemonDetails.id,
          name: pokemonDetails.name,
          type: pokemonDetails.types[0].type.name,
          order: pokemonDetails.order,
          image: pokemonDetails.sprites.other['official-artwork'].front_default
        })
      }
      setPokemons([...pokemons, ...pokemonArray])
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <SafeAreaView>
      <PokemonList pokemons={pokemons} loadPokemon={loadPokemon} isNext={nextUrl} />
    </SafeAreaView>
  )
}