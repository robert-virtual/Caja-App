import { FloatingBtn } from '../../components/FloatingBtn';
import { API_URL } from '../../constantes';
import React, { useEffect, useState } from 'react';
import { Alert, FlatList, Pressable, StyleSheet, Text, TextInput, View } from 'react-native';
import { AntDesign } from '@expo/vector-icons';
export { DetalleCierreCajaPos } from './DetalleCierreCajaPos';


export function DetallesCierreCajaPos({navigation,route}) {

  useEffect(() => {
    fetchDetalles()
  }, [route.params])
  const [detalles, setDetalles] = useState([])
  const [refreshing, setreFreshing] = useState(false)
  async function fetchDetalles(cierrecaja_idregistro = 0) {
    try {
      setreFreshing(true)
      const res = await fetch(`${API_URL}/detallecierrecajapos?cierrecaja_idregistro=${cierrecaja_idregistro}`)
      const { data } = await res.json()
      setreFreshing(false)
      setDetalles(data)
      return true
    } catch (error) {
      setreFreshing(false)
      Alert.alert("Ups ha habido un error. Vuelve a intentar mas tarde")
    }
  }
  const [buscar, setBuscar] = useState('')

  return (
    <View style={styles.container}>
      <TextInput
        style={{ margin: 15 }}
        onChangeText={setBuscar}
        value={buscar}
        placeholder="Buscar por Id Cierre Caja..."
        keyboardType={"numeric"}
        onSubmitEditing={() => fetchDetalles(parseInt(buscar))}
      />
      <FlatList
        data={detalles}
        keyExtractor={(item) => item.idregistro}
        refreshing={refreshing}
        onRefresh={fetchDetalles}
        renderItem={({ item }) => (
          <Pressable
            onPress={() => navigation.navigate("DetalleCierreCajaPos", item)}
            style={styles.item}>
            <Text>  Id: {item.idregistro},Id Tipo:{item.idtipos}, Devolucion:{item.devolucion}, Monto:{item.monto}, Id Cierre Caja:{item.cierrecaja_idregistro}</Text>
          </Pressable>
        )}
      />
      <FloatingBtn
        onPress={() => navigation.navigate("AgregarDetalleCierreCajaPos")}>
        <AntDesign name="plus" size={24} color="white" />
      </FloatingBtn>
    </View>
  );

}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  item: {
    padding: 10,
    backgroundColor: "#fff",
    margin: 5
  },
});
