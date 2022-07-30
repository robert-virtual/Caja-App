import { API_URL } from '../../constantes';
import { Entypo } from '@expo/vector-icons';
import { StatusBar } from 'expo-status-bar';
import React, { useReducer } from 'react';
import { StyleSheet, Text, TextInput, View, Alert, Pressable } from 'react-native';
import { FloatingBtn } from '../../components/FloatingBtn';

const monedaDefault = {
  idregistro: 0,
  nombre: "",
  descripcion: "",
  simbolo: "",
  cambio: 0,
  nacional: 0,
}

export function Moneda({ navigation, route }) {
  const [moneda, setMoneda] = useReducer((prevState, newState) => {
    return {
      ...prevState,
      ...newState
    }
  },
    route.params || monedaDefault)
  async function crearMoneda() {
    try {
      const res = fetch(`${API_URL}/monedas${route.params ? "/" + moneda.idregistro : ""}`, {
        method: route.params ? "PUT" : "POST",
        body: JSON.stringify(moneda),
        headers: {
          "Content-Type": "application/json"
        }
      })

      Alert.alert(`Moneda ${route.params ? "Actualizada" : "Guardada"} con exito`)
      if (route.params) {
        return
      }
      setMoneda(monedaDefault)
    } catch (error) {
      console.warn(error)
      Alert.alert("Ups ha habido un problema. Intenta mas tarde")
    }
  }
  async function eliminarMoneda() {
    try {
      await fetch(`${API_URL}/monedas/${moneda.idregistro}`, {
        method: "DELETE",
      })
      Alert.alert("Eliminar Moneda", "Moneda eliminda exitosamente")
      navigation.navigate({
        name: "Monedas",
        params: { refresh: true },
        merge: true
      })

    } catch (error) {
      console.error(error)
      Alert.alert("Eliminar Moneda", "Ups ha habido un error al eliminar Moneda. Intenta mas tarde")

    }
  }
  return (
    <View style={styles.container}>
      <Text style={styles.titulo}>{route.params ? 'Editar' : 'Agregar'} Moneda</Text>
      <Text style={styles.label}>Id Registro</Text>
      <TextInput
        style={styles.input}
        onChangeText={(idregistro) => setMoneda({ idregistro })}
        value={moneda.idregistro}
        keyboardType='numeric'
      />
      <Text style={styles.label}>Nombre</Text>
      <TextInput
        style={styles.input}
        onChangeText={(nombre) => setMoneda({ nombre })}
        value={moneda.nombre}
        placeholder="Nombre"
      />
      <Text style={styles.label}>Descripcion</Text>
      <TextInput
        style={styles.input}
        onChangeText={(descripcion) => setMoneda({ descripcion })}
        value={moneda.descripcion}
        placeholder="Descripcion"
      />
      <Text style={styles.label}>Simbolo</Text>
      <TextInput
        style={styles.input}
        onChangeText={(simbolo) => setMoneda({ simbolo })}
        value={moneda.simbolo}
        placeholder="Simbolo"
        maxLength={3}
      />
      <Text style={styles.label}>Cambio</Text>
      <TextInput
        style={styles.input}
        onChangeText={(cambio) => setMoneda({ cambio })}
        value={moneda.cambio}
        keyboardType='numeric'
      />
      <Text style={styles.label}>Nacional</Text>
      <TextInput
        style={styles.input}
        onChangeText={(nacional) => setMoneda({ nacional })}
        value={moneda.nacional}
        keyboardType='numeric'
      />
      { route.params && 
        <Pressable style={styles.label} onPress={eliminarMoneda}>
          <Text style={styles.redText}>Eliminar</Text>
        </Pressable>

      }
      <FloatingBtn onPress={crearMoneda}>
        <Entypo name="save" size={24} color="white" />
      </FloatingBtn>
      <StatusBar style="auto" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  input: {
    margin: 15,
    backgroundColor: '#fff',
    padding: 10
  },
  titulo: {
    textAlign: "center",
    fontSize: 25,
    margin: 20
  },
  label: {
    marginStart: 15,
    fontSize: 15
  },
  redText: {
    color: "#d63031",
    fontSize: 17
  }
});
