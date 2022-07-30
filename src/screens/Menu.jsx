import React from 'react';
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { Moneda, Monedas } from './Monedas';
import { DetallesAperturaCaja, DetalleAperturaCaja } from './DetallesAperturaCaja';
import { DetallesCierreCaja,DetalleCierreCaja } from './DetallesCierreCaja';
import { DetallesCierreCajaPos,DetalleCierreCajaPos } from './DetallesCierreCajaPos';
import { Inicio } from './Inicio';
const Stack = createNativeStackNavigator()

export function Menu() {
  return (
    <Stack.Navigator>
      <Stack.Screen name="Inicio" component={Inicio} />
      <Stack.Screen name="Monedas" component={Monedas} />
      <Stack.Screen
        name="DetallesAperturaCaja"
        component={DetallesAperturaCaja} />
      <Stack.Screen
        name="DetallesCierreCaja"
        component={DetallesCierreCaja} />
      <Stack.Screen
        name="DetallesCierreCajaPos"
        component={DetallesCierreCajaPos} />

      <Stack.Screen name="AgregarMoneda" component={Moneda} />
      <Stack.Screen name="Moneda" component={Moneda} />

      <Stack.Screen name="AgregarDetalleAperturaCaja" component={DetalleAperturaCaja} />
      <Stack.Screen name="DetalleAperturaCaja" component={DetalleAperturaCaja} />

      
      <Stack.Screen name="AgregarDetalleCierreCaja" component={DetalleCierreCaja} />
      <Stack.Screen name="DetalleCierreCaja" component={DetalleCierreCaja} />

      <Stack.Screen name="AgregarDetalleCierreCajaPos" component={DetalleCierreCajaPos} />
      <Stack.Screen name="DetalleCierreCajaPos" component={DetalleCierreCajaPos} />

    </Stack.Navigator>
  );
}

