import React from "react";
import { FlatList, StyleSheet, Text} from "react-native";
import { Pressable } from "react-native";
const pages = {
  Monedas: "Monedas",
  DetallesAperturaCaja: "Detalle Apertura Caja",
  DetallesCierreCaja: "Detalle Cierre Caja",
  DetallesCierreCajaPos: "Detalle Cierre CajaPos"
}

export function Inicio({navigation}) {
  function navigate (page) {
   navigation.navigate(page) 
  }
  return (
    <FlatList 
      data={Object.keys(pages)}
      keyExtractor={(item)=> item}
      renderItem={({item}) => (
        <Pressable
        onPress={()=>navigate(item)}
        style={styles.item}>
          <Text>{pages[item]}</Text>
        </Pressable>
      )}>

    </FlatList>
  )
}
const styles = StyleSheet.create({
  item: {
    padding: 10,
    backgroundColor: "#fff",
    margin: 5
  },
});
