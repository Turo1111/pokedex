import { StyleSheet, Text, View, TextInput, Button, Keyboard } from 'react-native'
import React from 'react'
import { useFormik } from 'formik'
import * as Yup from 'yup'
import { user, userDetails } from '../../utils/userDB'
import { useState } from 'react';
import useAuth from '../../hooks/useAuth'

export default function LoginForm() {

    const [error, setError] = useState("")

    const {login} = useAuth()

    const formik = useFormik({
        initialValues: initialValues(),
        validationSchema: Yup.object(validationSchema()),
        validateOnChange: false,
        onSubmit: (formValue) => {
            const { userName, password } = formValue;
            if (userName !== user.username || password !== user.password) {
                console.log("no correcto");
                setError("Usuario o contraseña incorrecto")
            }else{
                login(userDetails)
                console.log("correcto");
                console.log(userDetails);
            }
        }
    })

  return (
    <View>
      <Text style={styles.title} >Iniciar sesion</Text>
      <TextInput
        placeholder='Nombre de usuario'
        style={styles.input}
        autoCapitalize='none'
        value={formik.values.userName}
        onChangeText={(text)=> formik.setFieldValue('userName', text)}
      />
      <TextInput
        placeholder='Contraseña'
        style={styles.input}
        secureTextEntry={true}
        value={formik.values.password}
        onChangeText={(text)=> formik.setFieldValue('password', text)}
      />
      <Button
        title='Entrar'
        onPress={formik.handleSubmit}
      />
      <Text style={styles.error}>{formik.errors.userName}</Text>
      <Text style={styles.error}>{formik.errors.password}</Text>
      <Text style={styles.error}>{error}</Text>
    </View>
  )
}

function initialValues() {
    return {
        userName: "",
        password: ""
    }
}

function validationSchema() {
    return {
        userName: Yup.string().required("El usuario es obligatorio"),
        password: Yup.string().required("La contraseña es obligatorio")
    }
}

const styles = StyleSheet.create({
    title: {
        textAlign: 'center',
        fontSize: 28,
        fontWeight: 'bold',
        marginTop: 50,
        marginBottom: 15
    },
    input: {
        height: 40,
        margin: 12,
        borderWidth: 1,
        padding: 10,
        borderRadius: 10
    },
    error:{
        textAlign: 'center',
        color: 'red',
        marginTop: 20
    }
})