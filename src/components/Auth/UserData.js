import { StyleSheet, Text, View, Button } from 'react-native'
import React from 'react'
import useAuth from '../../hooks/useAuth'
import { useFocusEffect } from '@react-navigation/native';
import { getPokemonsFavoriteApi } from '../../api/favorite';
import { size } from 'lodash';
import { useState, useCallback } from 'react';

export default function UserData() {

  const {auth, logout} = useAuth()

  const [total, setTotal] = useState(0)
  
  useFocusEffect(
    useCallback(()=>{
      (
        async () => {
          try {
            const response = await getPokemonsFavoriteApi()
            setTotal(size(response))
          } catch (error) {
            setTotal(0)
          }
        }
      )()
    },[])
  )

  return (
    <View style={styles.content} >
      <View style={styles.titleBlock} >
        <Text style={styles.title} >Bienvenido</Text>
        <Text style={styles.title} >
          {`${auth.firstName} ${auth.lastName}`}
        </Text>
      </View>
      <View style={styles.dataContent}>
        <ItemMenu title="Nombre" text={`${auth.firstName} ${auth.lastName}`}/>
        <ItemMenu title="UserName" text={auth.username}/>
        <ItemMenu title="Email" text={auth.email}/>
        <ItemMenu title="Total Favoritos" text={`'${total} Pokemons'`}/>
      </View>
      <Button title='Desconectarse' onPress={logout} style={styles.btnLogOut} />
    </View>
  )
}

function ItemMenu(props){
  const {title, text} = props;
  return (
    <View style={styles.itemMenu}>
      <Text style={styles.itemMenuTitle}>{title}:</Text>
      <Text>{text}</Text>
    </View>
  )
}

const styles = StyleSheet.create({
  content: {
    marginHorizontal: 20,
    marginTop: 20
  },
  titleBlock: {
    marginBottom: 30,
  },
  title: {
    fontWeight: 'bold',
    fontSize: 22
  },
  dataContent: {
    marginBottom: 20
  },
  itemMenu: {
    flexDirection: 'row',
    paddingVertical: 20,
    borderBottomWidth: 1,
    borderColor: '#cfcfcf'
  },
  itemMenuTitle: {
    fontWeight: 'bold',
    paddingRight: 10,
    width: 120
  },
  btnLogOut: {
    paddingTop: 20
  }
})