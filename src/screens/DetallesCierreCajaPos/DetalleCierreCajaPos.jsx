import { API_URL } from '../../constantes';
import { Entypo } from '@expo/vector-icons';
import { StatusBar } from 'expo-status-bar';
import React, { useReducer } from 'react';
import { StyleSheet, Text, TextInput, View, Alert, Pressable, ScrollView } from 'react-native';
import { FloatingBtn } from '../../components/FloatingBtn';

const detalleDefault = {
  idregistro: 1,
  idcierre: 1,
  idtipos: 1,
  monto: 1.00,
  devolucion: 1,
  cierrecaja_idregistro: 1
}

const campos = [
  "Id Registro",
  "Id Cierre",
  "Id Tipos",
  "Monto",
  "Devolucion",
  "Id Cierre Caja"
]

export function DetalleCierreCajaPos({ navigation, route }) {

  const [detalle, setDetalle] = useReducer((prevState, newState) => {
    return {
      ...prevState,
      ...newState
    }
  },
    route.params || detalleDefault)
  async function crearDetalle() {
    try {
      const res = fetch(`${API_URL}/detallecierrecajapos${route.params ? "/" + detalle.idregistro : ""}`, {
        method: route.params ? "PUT" : "POST",
        body: JSON.stringify(
          detalle,
        ),
        headers: {
          "Content-Type": "application/json"
        }
      })

      Alert.alert(`Detalle ${route.params ? "Actualizado" : "Guardado"} con exito`)
      if (route.params) {
        return
      }
      setDetalle(detalleDefault)
    } catch (error) {
      console.warn(error)
      Alert.alert("Ups ha habido un problema. Intenta mas tarde")
    }
  }
  async function eliminarDetalle() {
    try {
      await fetch(`${API_URL}/detallecierrecajapos/${detalle.idregistro}`, {
        method: "DELETE",
      })
      Alert.alert("Eliminar Detalle", "Detalle eliminado exitosamente")
      navigation.navigate({
        name: "DetallesCierreCajaPos",
        params: { refresh: true },
        merge: true
      })

    } catch (error) {
      console.error(error)
      Alert.alert("Eliminar Detalle", "Ups ha habido un error al eliminar Detalle. Intenta mas tarde")

    }
  }
  return (
    <ScrollView style={styles.container}>
      <Text style={styles.titulo}>{route.params ? 'Editar' : 'Agregar'} Detalle</Text>
      {
        Object.keys(detalleDefault).map((e, i) => (
          <View key={e}>
            <Text style={styles.label}>{campos[i]}</Text>
            <TextInput
              style={styles.input}
              onChangeText={(param) => setDetalle({
                [e]: typeof detalleDefault[e] == 'number' 
                ? new Number(param) 
                : param
              })}
              value={detalle[e] ?? ''}
              keyboardType={typeof detalleDefault[e] == 'number' ? 'numeric' : 'default'}
            />
          </View>
        ))
      }
      {route.params &&
        <Pressable style={styles.label} onPress={eliminarDetalle}>
          <Text style={styles.redText}>Eliminar</Text>
        </Pressable>

      }
      <FloatingBtn onPress={crearDetalle}>
        <Entypo name="save" size={24} color="white" />
      </FloatingBtn>
      <StatusBar style="auto" />
    </ScrollView>
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
