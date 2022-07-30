import { API_URL } from '../../constantes';
import React, { useEffect, useState } from 'react';
import { Alert, FlatList, Pressable, StyleSheet, Text, TextInput, View } from 'react-native';
import { FloatingBtn } from '../../components/FloatingBtn';
import { AntDesign } from '@expo/vector-icons';
export { Moneda } from './Moneda';


export function Monedas({ navigation,route }) {
  useEffect(() => {
    fetchMonedas()
  }, [route.params])
  const [monedas, setMonedas] = useState([])
  const [refreshing, setreFreshing] = useState(false)
  async function fetchMonedas(nombre = '') {
    try {
      setreFreshing(true)
      const res = await fetch(`${API_URL}/monedas?nombre=${buscar}`)
      const { data } = await res.json()
      setreFreshing(false)
      setMonedas(data)
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
        placeholder="Buscar"
        keyboardType={"web-search"}
        onSubmitEditing={() => fetchMonedas(buscar)}
      />
      <FlatList
        data={monedas}
        keyExtractor={(item) => item.idregistro}
        refreshing={refreshing}
        onRefresh={fetchMonedas}
        renderItem={({ item }) => (
          <Pressable
            onPress={() => navigation.navigate("Moneda", item)}
            style={styles.item}>
            <Text> {item.nombre}, Id: {item.idregistro}</Text>
          </Pressable>
        )}
      />
      <FloatingBtn
        onPress={() => navigation.navigate("AgregarMoneda")}>
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
