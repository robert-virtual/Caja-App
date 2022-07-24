import React from "react";
import { FlatList, StyleSheet, Text} from "react-native";
import { Pressable } from "react-native";
const pages = {
  Monedas: "Monedas",
  DetalleAperturaCaja: "Detalle Apertura Caja",
  DetalleCierreCaja: "Detalle Cierre Caja",
  DetalleCierreCajaPos: "Detalle Cierre CajaPos"
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
