import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5'
import FontAwesome from 'react-native-vector-icons/FontAwesome'
import { addPokemonFavoriteApi, isPokemonFavoriteApi, removePokemonFavorite } from '../../api/favorite'
import { useState } from 'react';
import { useEffect } from 'react';

export default function Favorite({id}) {

    const [isFavorite, setIsFavorite] = useState(undefined)
    const [reload, setReload] = useState(false)

    const Icon = isFavorite ? FontAwesome : FontAwesome5

    useEffect(()=>{
        (
            async () => {
                try {
                    const response = await isPokemonFavoriteApi(id)
                    setIsFavorite(response)
                } catch (error) {
                    setIsFavorite(false)
                }
            }
        )()
    },[id, reload])

    const onReload = () =>{
        setReload((prev)=> !prev)
    }

    const addFavorite = async () => {
        try {
            await addPokemonFavoriteApi(id)
            onReload()
        } catch (error) {
            console.log(error);
        }
    }

    const removeFavorite = async () => {
        try {
            await removePokemonFavorite(id)
        } catch (error) {
            console.log(error);
        }
    }

  return (
    <Icon name='heart' color='#fff' size={20} 
        onPress={ isFavorite ? removeFavorite : addFavorite} 
        style={{marginRight: 20}}
    />
  )
}

const styles = StyleSheet.create({})