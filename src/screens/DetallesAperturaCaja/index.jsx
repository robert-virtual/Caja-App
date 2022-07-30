import { FloatingBtn } from '../../components/FloatingBtn';
import { API_URL } from '../../constantes';
import React, { useEffect, useState } from 'react';
import { Alert, FlatList, Pressable, StyleSheet, Text, TextInput, View } from 'react-native';
import { AntDesign } from '@expo/vector-icons';
export { DetalleAperturaCaja } from './DetalleAperturaCaja';


export function DetallesAperturaCaja({navigation,route}) {

  useEffect(() => {
    fetchDetalles()
  }, [route.params])
  const [detalles, setDetalles] = useState([])
  const [refreshing, setreFreshing] = useState(false)
  async function fetchDetalles(aperturacaja_idregistro = 0) {
    try {
      setreFreshing(true)
      const res = await fetch(`${API_URL}/detalleaperturacaja?aperturacaja_idregistro=${aperturacaja_idregistro}`)
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
        placeholder="Buscar por Id Apertura Caja..."
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
            onPress={() => navigation.navigate("DetalleAperturaCaja", item)}
            style={styles.item}>
            <Text>  Id: {item.idregistro}, Cantidad:{item.cantidad}, Monto:{item.monto}, Id Apertura Caja:{item.aperturacaja_idregistro}</Text>
          </Pressable>
        )}
      />
      <FloatingBtn
        onPress={() => navigation.navigate("AgregarDetalleAperturaCaja")}>
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
